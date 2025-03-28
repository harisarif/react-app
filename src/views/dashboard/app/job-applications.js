import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Tabs, Tab, Badge, Dropdown, Card, Modal } from "react-bootstrap";
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import NoDataFound from '../../../components/NoDataFound';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ViewAppDetailModal from "../../../components/ViewAppDetailModal";
import ViewJobDetailModal from "../../../components/ViewJobDetailModal";
const statusArray = ['pending', 'accepted', 'rejected']

const JobApplications = () => {
  const { userData } = useContext(UserContext);
  const isAdmin = userData?.permissions[0]?.can_create_jobs == 1;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [currentStatus, setCurrentStatus] = useState('pending');
  const [appViewModal, setAppViewModal] = useState(false);
  const [jobViewModal, setJobViewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
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
    <>
      <Card className="mb-3 job-app-card">
        <Card.Body className='d-flex flex-column gap-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <Badge bg={
              application.status === 'accepted' ? 'success' :
              application.status === 'rejected' ? 'danger' : 'warning'
            }>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
            {isAdmin && (application.status === 'accepted' || application.status === 'pending' || application.status === 'rejected') && (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="p-0 border-0 bg-transparent">
                  <i className="ri-more-2-fill" style={{fontSize: 18}}></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {statusArray.map(status => (
                    application.status === status ? '' : (
                      <Dropdown.Item className="text-capitalize" onClick={() => handleStatusUpdate(application.id, status)}>
                        {status}
                      </Dropdown.Item>
                    )
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className='d-flex flex-column gap-2'>
            <h5 className="card-title mb-0">{application.job.title}</h5>
            <div className='d-flex flex-column gap-0'>
              <span className='text-dark'><strong className="card-sub-title text-dark">Applicant:</strong> {application.user.name}</span>
              <span className='text-dark mt-n1'><strong className="card-sub-title">Applied on:</strong> {new Date(application.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='d-flex gap-2 justify-content-start'>
            <Button className='px-3 text-capitalize btn-purpule radius-8' 
              variant="primary" style={{fontWeight: '400'}}
              onClick={() => {
                setSelectedApplication(application);
                setJobViewModal(true);
            }}
            >
              View Job Detail
            </Button>
            <Button className='px-3 text-capitalize btn-outline-purpule radius-8' 
              variant="outline-primary" style={{fontWeight: '400'}} 
              onClick={() => {
                setSelectedApplication(application);
                setAppViewModal(true);
            }}
            >
              View Applicant Detail
            </Button>
          </div>
        </Card.Body>
      </Card>
      
    </>
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
        <Card className='filter-job-app-card'>
          <Card.Body className='d-flex justify-content-between align-items-center w-100'>
            <h2 className='text-dark' style={{fontSize: '16px', fontWeight: '500'}}>Job Applications</h2>
            {userData && userData?.permissions[0]?.can_create_education == 1 && (
              <div className="d-flex flex-row gap-2">
                {statusArray.map(status => (
                  <Button className={`py-0 text-capitalize ${currentStatus === status ? 'btn-purpule' : 'btn-outline-purpule'} `} variant="primary" style={{fontWeight: '400'}} onClick={() => setCurrentStatus(status)}>
                    {`${status} `}
                    {/* ${' '} (${getFilteredApplications(status).length}) */}
                  </Button>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>

        {renderTabContent(currentStatus)}
        {selectedApplication && <ViewAppDetailModal app={selectedApplication} show={appViewModal} onHide={() => setAppViewModal(false)} />}
        {selectedApplication && <ViewJobDetailModal id={selectedApplication?.job_id} show={jobViewModal} onHide={() => setJobViewModal(false)} />}
      </Container>
    </div>
  );
};

export default JobApplications;
