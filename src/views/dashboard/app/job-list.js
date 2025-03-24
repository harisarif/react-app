import React, { useState, useEffect,useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import { Row, Col, Container, Button } from "react-bootstrap";
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
                          <p className="card-text turncate-3 paragraph-holder elipsis-3" style={{fontSize: '15px', lineHeight: '1.5', fontWeight: '300'}}>{job.short_description}</p>
                          <Button className='px-3 text-capitalize btn-purpule radius-8' 
                            variant="primary" style={{fontWeight: '400'}}
                            onClick={() => setJobViewModal(true)}
                          >
                            View Job Detail
                          </Button>
                        </Card.Body>
                      </Card>
                      <ViewJobDetailModal show={jobViewModal} onHide={() => setJobViewModal(false)} />
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
        onHide={() => setShowCreateModal(false)}
        onJobCreated={handleJobCreated}
      />
    </>
  );
};

export default JobList;
