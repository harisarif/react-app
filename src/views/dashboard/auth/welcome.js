import { useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React, { useState, useRef } from "react";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";

//img
import LogoFull from "../../../assets/images/sign-in-logo.png";



// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {

  return (
    <>
      <section className="sign-in-page">
        <Container fluid>
          <Row className="d-flex align-items-center ">
            {/* <Col lg={6} className="log-in-page-left-area">
            </Col> */}
            <Col lg={12} className="d-flex align-items-center log-in-page-data-form" style={{ height: '100vh' }}>
              <div className="sign-in-from">
                {/* <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={80} alt='' className="sing-in-page-logo"/>
                  <h5 className='h5 mb-0 text-light' style={{fontSize: '46px', fontWeight: '800'}}>Equity Circle</h5>
                </Link>  */}
                <div className="form-inner-content-holder d-flex flex-column gap-4">
                  <div className="d-flex flex-column gap-3">
                    <h5 className="sign-in-title text-uppercase">Welcome to Equity Circle</h5>
                    <h3 className="sign-in-sub-title text-uppercase">Your all-in-one career, learning, fitness & finance hub.</h3>
                    <p className="sign-in-text text-uppercase">Access personalized tools and insights to grow your skills, health, and wealth—everything in one place.</p>
                  </div>
                  <div className="d-flex flex-column">
                    <Link to='/auth/sign-up' className='sign-in-secondary-btn text-center mb-3'>Create an Account</Link>
                    <Link to='/auth/sign-in' className='sign-in-primary-btn text-center'>Sign In</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
