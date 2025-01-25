import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import styles from './index.module.css';

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

      <section className={styles['banner-section']}>
        <div className={`${styles['top-header-div']} d-flex justify-content-between align-items-center w-100 px-4`}>
          <div className={styles['banner-img']}>
            <img
              src={loaderimg}
              className="shadowfilter logo"
              alt="Loader"
            />
            <img
              src={Equityimg}
              className="shadowfilter logo2"
              alt="Equity"
            />
          </div>
        </div>
        <div className={styles['image-div']}>
          <div className={styles['image-wrapper']}>
            <img
              src={Bannerimg}
              alt="Banner"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className={styles.links}>
              <a href="/education" className={`${styles['link-item']} ${styles.laptop}`}>
                <span className={styles.tooltip}>Branded Laptops</span>
              </a>
              <a href="/fitness" className={`${styles['link-item']} ${styles.cap}`}>
                <span className={styles.tooltip}>Latest Design Caps</span>
              </a>
              <a href="/crypto" className={`${styles['link-item']} ${styles.shoes}`}>
                <span className={styles.tooltip}>Branded Shoes</span>
              </a>
              <a href="/business" className={`${styles['link-item']} ${styles.cap2}`}>
                <span className={styles.tooltip}>Caps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Index;
