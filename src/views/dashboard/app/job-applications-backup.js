import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Tabs, Tab, Badge, Dropdown } from "react-bootstrap";
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import NoDataFound from '../../../components/NoDataFound';
import LoadingSpinner from '../../../components/LoadingSpinner';

const JobApplications = () => {
  const { userData } = useContext(UserContext);
  const isAdmin = userData?.permissions[0]?.can_create_jobs == 1;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/job-applications');
      if (response.data && response.data.applications) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch job applications',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/api/job-applications/${id}`, { status });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Application ${status} successfully`,
      });
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Error updating application:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update application status',
      });
    }
  };

  const getFilteredApplications = (status) => {
    return applications.filter(app => app.status === status);
  };

const viewApplicantDetails = (application) => {
  Swal.fire({
    title: 'Applicant Details',
    html: `
      <div class="text-start">
        <p><strong>Name:</strong> ${application.first_name} ${application.last_name}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Country:</strong> ${application.country}</p>
        <p><strong>Company:</strong> ${application.company || 'N/A'}</p>
        <p><strong>Job Title:</strong> ${application.job_title || 'N/A'}</p>
        <p><strong>Application Status:</strong> ${application.status}</p>
      </div>
    `,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'View Profile',
    cancelButtonText: 'View CV',
    cancelButtonColor: '#3085d6',
    confirmButtonColor: '#28a745',
    preConfirm: () => {
      // Redirect to user profile
      window.location.href = `/profile/${application.user_id}`;
      return false; // Prevent modal from closing
    },
    didRender: () => {
      // Add event listener to cancel button (View CV)
      const cancelButton = Swal.getCancelButton();
      cancelButton.addEventListener('click', () => {
        if (application.cv_file_path) {
          // Open CV in new tab
          window.open(`${process.env.REACT_APP_BACKEND_BASE_URL}/${application.cv_file_path}`, '_blank');
        } else {
          Swal.fire({
            icon: 'info',
            title: 'No CV Uploaded',
            text: 'This applicant has not uploaded a CV.'
          });
        }
      });
    }
  });
};

  const ApplicationCard = ({ application }) => (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{application.job.title}</h5>
            <p className="card-text">
              <strong>Applicant:</strong> {application.user.name}<br />
              <strong>Applied on:</strong> {new Date(application.created_at).toLocaleDateString()}
            </p>
            <Link 
              to={`/job-list-detail/${application.job_id}`} 
              className="btn btn-info btn-sm"
            >
              View Job Details
            </Link>
            &nbsp;&nbsp;
            <button 
              onClick={() => viewApplicantDetails(application)}
              className="btn btn-info btn-sm"
            >
              View Applicant Details
            </button>
          </div>
          <Badge bg={
            application.status === 'accepted' ? 'success' :
            application.status === 'rejected' ? 'danger' : 'warning'
          }>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
          {isAdmin && (application.status === 'accepted' || application.status === 'pending' || application.status === 'rejected') && (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="p-0 border-0 bg-transparent">
                <i className="ri-more-2-fill"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {application.status === 'pending' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'accepted')}>
                      Accept
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'rejected')}>
                      Reject
                    </Dropdown.Item>
                  </>
                )}
                {application.status === 'accepted' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'pending')}>
                      Move to Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'rejected')}>
                      Reject
                    </Dropdown.Item>
                  </>
                )}
                {application.status === 'rejected' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'pending')}>
                      Move to Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusUpdate(application.id, 'accepted')}>
                      Accept
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = (status) => {
    const filteredApplications = getFilteredApplications(status);
    
    if (loading) {
      return <LoadingSpinner />;
    }
    
    if (filteredApplications.length < 1) {
      const messages = {
        pending: "No pending job applications to review.",
        accepted: "No accepted job applications yet.",
        rejected: "No rejected job applications."
      };
      
      return (
        <NoDataFound 
          message={messages[status]}
          containerClassName="text-center py-5"
        />
      );
    }
    
    return filteredApplications.map(application => (
      <ApplicationCard key={application.id} application={application} />
    ));
  };

  return (
    <div id="content-page" className="content-inner">
      <Container className="custom-conatiner">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Job Applications</h2>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="pending" title={`Pending (${getFilteredApplications('pending').length})`}>
            {renderTabContent('pending')}
          </Tab>
          <Tab eventKey="accepted" title={`Accepted (${getFilteredApplications('accepted').length})`}>
            {renderTabContent('accepted')}
          </Tab>
          <Tab eventKey="rejected" title={`Rejected (${getFilteredApplications('rejected').length})`}>
            {renderTabContent('rejected')}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default JobApplications;
