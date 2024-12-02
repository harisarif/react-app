import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//profile-header
import ProfileHeader from "../../../components/profile-header";

// image
import job_img_1 from "../../../assets/images/page-img/job-img-1.jpg";
import job_img_2 from "../../../assets/images/page-img/job-img-2.jpg";
import job_img_3 from "../../../assets/images/page-img/job-img-3.jpg";
import job_img_4 from "../../../assets/images/page-img/job-img-4.jpg";
import job_img_5 from "../../../assets/images/page-img/job-img-5.jpg";

const JobList = () => {
  return (
    <>
      {/* <ProfileHeader title="Music" img={profilebg8} /> */}
      <div id="content-page" className="content-inner">
        <div class="container">
          <div class="custom-container-card">
            <div id="content">
              <div class="row g-3">

                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={job_img_1} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2"> <a href="/job-list-detail" class="text-black">How a Customer Academy Improves Retention</a></h4>                     
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="/job-list-read-more" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={job_img_2} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2"><a href="/job-list-detail" class="text-black">LMS Request For Personal Tooltik</a></h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="/job-list-read-more" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={job_img_3} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2"><a href="/job-list-detail" class="text-black">Build an LMS Buiness Case</a></h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="/job-list-read-more" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={job_img_4} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2"><a href="/job-list-detail" class="text-black">Training Evalution From Template</a></h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="/job-list-read-more" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={job_img_5} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2"> <a href="/job-list-detail" class="text-black">How a Customer Academy Improves Retention</a></h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="/job-list-read-more" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
