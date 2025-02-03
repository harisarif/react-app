import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Tabs, Tab, Badge } from "react-bootstrap";
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import NoDataFound from '../../../components/NoDataFound';
import LoadingSpinner from '../../../components/LoadingSpinner';

const JobApplications = () => {
  const { userData } = useContext(UserContext);
  const isAdmin = userData?.role === 'admin';
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
          </div>
          {isAdmin && application.status === 'pending' && (
            <div>
              <Button
                variant="success"
                className="me-2"
                onClick={() => handleStatusUpdate(application.id, 'accepted')}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => handleStatusUpdate(application.id, 'rejected')}
              >
                Reject
              </Button>
            </div>
          )}
          <Badge bg={
            application.status === 'accepted' ? 'success' :
            application.status === 'rejected' ? 'danger' : 'warning'
          }>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
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
      <Container>
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
