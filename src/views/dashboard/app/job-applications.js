import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Tabs, Tab, Badge } from "react-bootstrap";
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';

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
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : getFilteredApplications('pending').length === 0 ? (
              <div className="text-center py-5">
                <h4>No pending applications</h4>
              </div>
            ) : (
              getFilteredApplications('pending').map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </Tab>
          <Tab eventKey="accepted" title={`Accepted (${getFilteredApplications('accepted').length})`}>
            {!loading && getFilteredApplications('accepted').map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </Tab>
          <Tab eventKey="rejected" title={`Rejected (${getFilteredApplications('rejected').length})`}>
            {!loading && getFilteredApplications('rejected').map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default JobApplications;
