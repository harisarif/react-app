import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";


//profile-header
import ProfileHeader from "../../../components/profile-header";

// image
import job_img_6 from "../../../assets/images/page-img/bussiness(1).jpg";
import job_img_7 from "../../../assets/images/page-img/gym(1).jpg";
import job_img_3 from "../../../assets/images/page-img/job-img-3.jpg";
import job_img_4 from "../../../assets/images/page-img/job-img-4.jpg";
import job_img_5 from "../../../assets/images/page-img/job-img-5.jpg";
import gym_img_1 from "../../../assets/images/page-img/gym.jpg";
import gym_img_2 from "../../../assets/images/page-img/gym(1).jpg";
import gym_img_3 from "../../../assets/images/page-img/gym(3).jpg";
import gym_img_4 from "../../../assets/images/page-img/gym(4).jpg";
import gym_img_5 from "../../../assets/images/page-img/gym(9).jpg";

import Bannerimg from "../../../assets/images/page-img/Banner.jpg";
import loaderimg from "../../../assets/images/page-img/loader.png";
import Equityimg from "../../../assets/images/page-img/Equity.png";



import pro_img_1 from "../../../assets/images/page-img/pro(1).jpg";
import pro_img_2 from "../../../assets/images/page-img/pro(2).jpg";
import pro_img_3 from "../../../assets/images/page-img/pro(3).jpg";

const Index = () => {


  return (
    <>

  

<section className="banner-section">
  <div className="top-header-div d-flex justify-content-between align-items-center w-100 px-4 ">
   
    <div className="banner-img">
      <img
        src={loaderimg}
        className="shadowfilter logo"
        alt=""
      />
      <img
        src={Equityimg}
        className="shadowfilter logo2"
        alt=""
      />
    </div>
  </div>
  <div className="image-div position-relative" style={{ top: 0, left: 0 }}>
    <img
      src={Bannerimg}
      alt=""
      className="image-wrapper"
    />
    <div
      className="links"
      style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
    >
      <a href="education" className="link-item" id="laptop">
        <span className="tooltip">Branded Laptops</span>
      </a>
      <a href="fitness" className="link-item" id="cap">
        <span className="tooltip">Lattest Design Caps</span>
      </a>
      <a href="crypto" className="link-item" id="shoes">
        <span className="tooltip">Branded Shoes</span>
      </a>
      <a href="business" className="link-item" id="cap-2">
        <span className="tooltip">Caps</span>
      </a>
    </div>
  </div>
</section>

</>

  );
};

export default Index;
