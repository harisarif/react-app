import React, { useState, useEffect,useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import { Row, Col, Container, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import axios from '../../../utils/axios'
import CreateJob from "../../../components/job/CreateJob";
import NoDataFound from '../../../components/NoDataFound';

//profile-header
import ProfileHeader from "../../../components/profile-header";

const JobList = () => {
  const { userData } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;

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
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Job Listings</h2>
            {userData && userData.roles == "admin" &&(
            <Button 
              variant="primary" 
              onClick={() => setShowCreateModal(true)}
              className="mb-3 d-flex align-items-center"
            >
              <span className="material-symbols-outlined me-2">add</span>
              Create Job
            </Button>
            )}
          </div>

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
                <div className="row g-3">
                  {jobs.data.map((job) => (
                    <div key={job.id} className="col-sm-6 col-lg-4">
                      <div className="card h-100">
                        <div className="edu-card-img">
                          <img 
                            src={`${baseurl}/images/${job.main_image}`}
                            className="card-img-top" 
                            alt={job.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title turncate-2">
                            <Link to={`/job-list-detail/${job.id}`} className="text-black">
                              {job.title}
                            </Link>
                          </h4>
                          <p className="card-text turncate-3">{job.short_description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to={`/job-list-detail/${job.id}`} className="btn btn-primary">
                              Read More
                            </Link>
                            {userData && job.application && (
                              <span className={`badge ms-2 ${
                                job.application.status === 'accepted' ? 'bg-success' :
                                job.application.status === 'rejected' ? 'bg-danger' :
                                'bg-info'
                              }`}>
                                Status: {job.application.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
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
