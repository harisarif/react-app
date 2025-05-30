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
// import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";
import googleImage from "../../../assets/images/login/google.png";
import facebookImage from "../../../assets/images/login/facebook.png";


// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {
  const navigate = useNavigate();
  const appName = useSelector(SettingSelector.app_name);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const Google_client_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log('Google Client ID:', Google_client_ID);
  const googleLoginRef = useRef(null);

  // Add the state for Google login visibility
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [IsLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function FormDataEvent(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function submitForm(e) {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoader(true);
    axios.post(`${baseUrl}/api/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setLoader(false);
        console.log('Login successful:', response.data);
        // You can store the token in localStorage or a state management library
        localStorage.setItem('access_token', response.data.access_token);
        setSuccess('Login successful!');
        window.location.href = '/'
      })
      .catch((error) => {
        setLoader(false);
        console.error('Login failed:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.message : 'Login failed. Please try again.');
      });
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/google/callback`, {
        id_token: credentialResponse.credential
      });

      console.log('Google login successful:', response.data);
      localStorage.setItem('access_token', response.data.access_token);
      window.location.href = '/'
    } catch (error) {
      console.error('Google login error:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  const handleGoogleClick = () => {
    // Trigger click on the actual GoogleLogin button
    if (googleLoginRef.current) {
      googleLoginRef.current.click();
    }
  };

  return (
    <>
      <section className="sign-in-page">
        <Container fluid>
          <Row className="d-flex align-items-center ">
            {/* <Col lg={6} className="log-in-page-left-area">
            </Col> */}
            <Col lg={12} className="d-flex align-items-center log-in-page-data-form" style={{ height: '100vh' }}>
              <div className="sign-in-from">
                <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={80} alt='' className="sing-in-page-logo"/>
                  <h5 className='h5 mb-0 text-light' style={{fontSize: '46px', fontWeight: '800'}}>Equity Circle</h5>
                </Link> 
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
