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
                <div className="form-inner-content-holder">
                  <h3 className="sign-in-sub-title text-uppercase">Login.</h3>
                  <Form onSubmit={submitForm} className="mt-3">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {success && <div className="alert alert-success" role="alert">{success}</div>}
                    <Form.Group className="form-group text-start">
                      {/* <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>
                        Eamil
                      </h6> */}
                      <Form.Control
                        type="email"
                        name="email"
                        className="mb-0"
                        placeholder="Email"
                        defaultValue=""
                        onChange={FormDataEvent}
                      />
                    </Form.Group>
                    <Form.Group className="form-group text-start mb-2">
                      {/* <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>Password</h6> */}
                      <div className="position-relative">
                        <Form.Control
                          type={passwordVisible ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          defaultValue=""
                          onChange={FormDataEvent}
                          className="mb-0"
                        />
                        <Button
                          variant="link"
                          className="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          <span className="material-symbols-outlined pt-2">
                            {passwordVisible ? 'visibility_off' : 'visibility'}
                          </span>
                        </Button>
                      </div>
                    </Form.Group>
                    <div className="d-flex align-items-center justify-content-end mt-n1">
                      {/* <Form.Check className="form-check d-flex gap-2 m-0">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                        />
                        <h6 className="form-check-label mt-1" style={{ fontSize: '12px', fontWeight: '500' }}>Remember Me</h6>
                      </Form.Check> */}
                      <Link to="/auth/recover-password" className="font-italic" style={{ fontSize: '12px', fontWeight: '500' }}>
                        Forgot Password?
                      </Link>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      className="sign-in-primary-btn mt-4 w-100"
                    >

                      {IsLoader ? (
                        <div className="Authloader" style={{ margin: '0 auto' }}></div>
                      ) : (
                        'Login'
                      )}
                    </Button>
                    <div className="mt-4">
                      {/* <div className="d-flex align-items-center justify-content-center mb-2">
                        <hr className="flex-grow-1" />
                        <span className="mx-3" style={{ fontSize: '12px' }}>OR</span>
                        <hr className="flex-grow-1" />
                      </div> */}
                      {/* <div className="d-flex gap-2 justify-content-between align-items-center social-btn-div">
                        <div className="google-btn" onClick={handleGoogleClick}>
                          <img src={googleImage} alt="Google" />
                          <div className="text">Google</div>
                        </div>
                        <div className="facebook-btn">
                          <img src={facebookImage} alt="FaceBook" />
                          <div className="text">FaceBook</div>
                        </div>
                      </div> */}

                      <div style={{ display: 'none' }}>
                        <GoogleOAuthProvider clientId={Google_client_ID}>
                          <GoogleLogin
                            ref={googleLoginRef}
                            onSuccess={handleGoogleSuccess}
                            onError={(error) => {
                              console.error('Google Login Error:', error);
                              alert('Failed to sign in with Google. Please try again.');
                            }}
                            flow="implicit"
                            auto_select={false}
                            useOneTap={false}
                            context="signin"
                          />
                        </GoogleOAuthProvider>
                      </div>
                    </div>
                    <h6 className="mt-2 text-center">
                      <span style={{ fontSize: '14px', fontWeight: '400' }}>Don't Have An Account ?{" "}</span>
                      <Link to="/auth/sign-up" class='sign-in-link' style={{ fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>Sign Up</Link>
                    </h6>
                  </Form>
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
