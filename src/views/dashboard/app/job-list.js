import React, { useState, useEffect,useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import { Row, Col, Container, Button , Dropdown, DropdownButton, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import axios from '../../../utils/axios'
import CreateJob from "../../../components/job/CreateJob";
import NoDataFound from '../../../components/NoDataFound';
import ViewJobDetailModal from "../../../components/ViewJobDetailModal";

//profile-header
import ProfileHeader from "../../../components/profile-header";

const JobList = () => {
  const { userData } = useContext(UserContext);
  
  const [jobs, setJobs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [jobViewModal, setJobViewModal] = useState(false);
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreated = (newJob) => {
    fetchJobs(); // Refresh the jobs list
  };

  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobData, setJobData] = useState(null);
  const handleOpenModal = (jobId) => {
    setSelectedJob(jobId);
  };
  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsEditing(false);
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(`/api/jobs/${jobId}`);
      if (response.data.message == "Job deleted successfully") {
        fetchJobs();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (jobId) => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      if (response.data && response.data.job) {
        // setSelectedJob(response.data.job);
        setJobData(response.data.job);
        setIsEditing(true);
        setShowCreateModal(true);
      }
    } catch (error) {
      console.error('Error fetching job for editing:', error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <>
      <div id="content-page" className="content-inner">
        <div className="custom-conatiner container">
          <Card className='create-job-list-card'>
            <Card.Body className='d-flex justify-content-between align-items-center w-100'>
              <h2 className='text-dark' style={{fontSize: '16px', fontWeight: '500'}}>Job Listings</h2>
              {userData && userData?.permissions[0]?.can_create_education == 1 && (
              <Button className='py-0 btn-purpule' variant="primary" style={{fontWeight: '400'}} onClick={() => setShowCreateModal(true)}>
                Create Job
              </Button>
            )}
            </Card.Body>
          </Card>

          <div className="custom-container-card">
            <div id="content">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : !jobs || !jobs.data || jobs.data.length === 0 ? (
                <NoDataFound 
                  message="No job listings available at the moment."
                  containerClassName="text-center py-5"
                />
              ) : (
                <div className="row g-4">
                  {jobs.data.map((job) => (
                    <div key={job.id} className="col-12">
                      <Card className="h-100 job-list-card">
                        <div className="edu-card-img">
                          <img 
                            src={`${baseurl}/images/${job.main_image}`}
                            className="card-img-top" 
                            alt={job.title}
                            loading="lazy"
                          />
                        </div>
                        <Card.Body className="">
                          <h4 className="card-title turncate-2" style={{fontSize: 20, fontWeight: '600'}}>
                            <Link to={`/job-list-detail/${job.id}`} className="text-black">
                              {job.title}
                            </Link>
                          </h4>
                          <p className="card-text turncate-3 paragraph-holder rrrrrg elipsis-3" style={{fontSize: '15px', lineHeight: '1.5', fontWeight: '300'}}>{job.short_description}</p>
                          <Button className='px-3 text-capitalize btn-purpule radius-8' 
                            variant="primary" style={{fontWeight: '400'}}
                            onClick={() => handleOpenModal(job.id)}
                          >
                            View Job Detail
                          </Button>
                          <div className="nav-bar-icon">
                          <Dropdown>
                            <Dropdown.Toggle className="bg-transparent toggle-drop-btn btn text-dark p-0 me-2">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-menu-holder">
                              <Dropdown.Item href="#">
                                {userData && userData?.permissions[0]?.can_create_education == 1 && (
                                  <Button
                                    className="btn d-flex align-items-center bg-transparent w-100 drop-edit-btn"
                                    onClick={() => handleEdit(job.id)}
                                    disabled={loading}
                                  >
                                      <svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.81331 11.8953L3.8133 11.8953C3.80074 11.9078 3.78806 11.9205 3.77531 11.9332C3.61906 12.0888 3.45105 12.2561 3.33204 12.4663C3.21302 12.6765 3.15597 12.9067 3.1029 13.1208C3.09857 13.1382 3.09427 13.1556 3.08996 13.1728L2.34951 16.1346C2.34689 16.1451 2.34421 16.1558 2.34149 16.1666C2.30367 16.3174 2.25729 16.5023 2.24165 16.6622C2.22397 16.8429 2.22239 17.1994 2.51149 17.4885C2.80058 17.7776 3.15709 17.776 3.3378 17.7584C3.49775 17.7427 3.68261 17.6963 3.8334 17.6585C3.84423 17.6558 3.85489 17.6531 3.86535 17.6505L6.82717 16.91C6.8444 16.9057 6.86176 16.9014 6.87923 16.8971C7.09329 16.844 7.32346 16.787 7.53367 16.668C7.74387 16.549 7.91121 16.3809 8.06684 16.2247C8.07955 16.2119 8.09217 16.1993 8.10474 16.1867L15.9911 8.30031L16.0228 8.26867C16.3288 7.96266 16.6095 7.68209 16.8071 7.42314C17.0246 7.13798 17.2108 6.79279 17.2108 6.35577C17.2108 5.91874 17.0246 5.57355 16.8071 5.2884C16.6095 5.02944 16.3288 4.74887 16.0228 4.44286L15.9911 4.41123L15.5888 4.00888L15.5572 3.97726C15.2511 3.67117 14.9706 3.39052 14.7116 3.19295C14.4264 2.97538 14.0813 2.78921 13.6442 2.78921C13.2072 2.78921 12.862 2.97538 12.5769 3.19295C12.3179 3.39052 12.0373 3.67115 11.7313 3.97723C11.7208 3.98775 11.7103 3.9983 11.6997 4.00888L3.81331 11.8953Z" stroke="#1E1E1E" stroke-width="1.5" />
                                        <path d="M10.875 5.125L14.875 9.125" stroke="#1E1E1E" stroke-width="1.5" />
                                      </svg>
                                    <div className="text-black dropdown-edit-btn">Edit</div>
                                  </Button>
                                )}
                              </Dropdown.Item>
                              {/* <Dropdown.Item href="#">
                                {userData && content.visibility === 'password_protected' && (
                                  <Button
                                    className="btn d-flex align-items-center bg-transparent w-100 drop-edit-btn"
                                    onClick={() => handleUnlock(content)}
                                    disabled={isLoading}
                                  >
                                    <i className="fas fa-lock text-black me-2 "></i>
                                    <div className="text-black">Unlock Content</div>
                                  </Button>
                                )}
                              </Dropdown.Item> */}
                              <Dropdown.Item href="#">
                                {userData && userData?.permissions[0]?.can_create_education == 1 && (
                                  <Button
                                    className="btn d-flex align-items-center bg-transparent w-100 delete-edit-btn"
                                    onClick={() => handleDelete(job.id)}
                                    disabled={loading}
                                  >
                                      <svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.0835 4.14169L7.26683 3.05002C7.40016 2.25835 7.50016 1.66669 8.9085 1.66669H11.0918C12.5002 1.66669 12.6085 2.29169 12.7335 3.05835L12.9168 4.14169" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.7082 7.61664L15.1665 16.0083C15.0748 17.3166 14.9998 18.3333 12.6748 18.3333H7.32484C4.99984 18.3333 4.92484 17.3166 4.83317 16.0083L4.2915 7.61664" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.6084 13.75H11.3834" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.9165 10.4167H12.0832" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                    <div className="text-black dropdown-delete-btn">Delete</div>
                                  </Button>
                                )}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        </Card.Body>
                      </Card>
                      {/* Open Modal Only for Selected Job */}
                      {selectedJob === job.id && (
                        <ViewJobDetailModal id={job.id} show={true} onHide={handleCloseModal} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateJob 
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
          handleCloseModal();
        }}
        onJobCreated={handleJobCreated}
        job={jobData}
        isEditing={isEditing}
        setShowCreateModal={setShowCreateModal}
      />
    </>
  );
};

export default JobList;
