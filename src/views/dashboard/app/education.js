import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

//img
import profilebg8 from "../../../assets/images/page-img/profile-bg8.jpg";
import ed1 from "../../../assets/images/page-img/edu-card-1.png";
import ed2 from "../../../assets/images/page-img/edu-card-2.png";
import ed3 from "../../../assets/images/page-img/edu-card-3.png";
import ed4 from "../../../assets/images/page-img/edu-card.png";
//profile-header
import ProfileHeader from "../../../components/profile-header";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
// Import Swiper styles
// import 'swiper/swiper-bundle.min.css'

// install Swiper modules
<style></style>
SwiperCore.use([Autoplay]);

const Education = () => {
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
                      <img src={ed1} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">How a Customer Academy Improves Retention</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed2} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">LMS Request For Personal Tooltik</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed3} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">Build an LMS Buiness Case</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed4} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">Training Evalution From Template</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed1} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">How a Customer Academy Improves Retention</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed2} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">LMS Request For Personal Tooltik</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed3} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">Build an LMS Buiness Case</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="card h-100">
                    <div class="edu-card-img">
                      <img src={ed4} class="card-img-top" alt="#" loading="lazy" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title turncate-2">Training Evalution From Template</h4>
                      <p class="card-text turncate-3">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <a href="#" class="btn btn-primary btn-block">Read More</a>
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
export default Education;
