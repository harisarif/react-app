import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";

//img
import LogoFull from "../../../assets/images/Equity_Circle_full.png";
// import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {
  const navigate = useNavigate();
  const appName = useSelector(SettingSelector.app_name);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const Google_client_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log('Google Client ID:', Google_client_ID);


  const [IsLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function FormDataEvent(event){
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function submitForm(){
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

  return (
    <>
      <section className="sign-in-page">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6} className="overflow-hidden position-relative">
              <div className="bg-primary w-100 h-100 position-absolute top-0 bottom-0 start-0 end-0"></div>
              <div className="container-inside z-1">
                <div className="main-circle circle-small"></div>
                <div className="main-circle circle-medium"></div>
                <div className="main-circle circle-large"></div>
                <div className="main-circle circle-xlarge"></div>
                <div className="main-circle circle-xxlarge"></div>
              </div>
              <div className="sign-in-detail container-inside-top">
                <Swiper
                  className="list-inline m-0 p-0 "
                  spaceBetween={30}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  <ul className="swiper-wrapper list-inline m-0 p-0 ">
                    <SwiperSlide>
                      <img
                        src={login1}
                        className="signin-img img-fluid mb-5 rounded-3"
                        alt="images"
                      />
                      <h2 className="mb-3 text-white fw-semibold">
                        Power UP Your Friendship
                      </h2>
                      <p className="font-size-16 text-white mb-0">
                        It is a long established fact that a reader will be
                        <br /> distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={login2}
                        className="signin-img img-fluid mb-5 rounded-3"
                        alt="images"
                      />
                      <h2 className="mb-3 text-white fw-semibold">
                        Connect with the world
                      </h2>
                      <p className="font-size-16 text-white mb-0">
                        It is a long established fact that a reader will be
                        <br /> distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={login3}
                        className="signin-img img-fluid mb-5 rounded-3"
                        alt="images"
                      />
                      <h2 className="mb-3 text-white fw-semibold">
                        Together Is better
                      </h2>
                      <p className="font-size-16 text-white mb-0">
                        It is a long established fact that a reader will be
                        <br /> distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </ul>
                </Swiper>
              </div>
            </Col>
            <Col md={6}>
              <div className="sign-in-from text-center">
              <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={120} />
                </Link>
                <p className="mt-3 font-size-16">
                  Welcome to Equity Circle, a platform to connect with
                  <br /> the social world
                </p>
                <Form className="mt-5">
                 {error && <div className="alert alert-danger" role="alert">{error}</div>}
                 {success && <div className="alert alert-success" role="alert">{success}</div>}
                  

                  <Form.Group className="form-group text-start">
                    <h6 className="form-label fw-bold">
                      Username or Email Address
                    </h6>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control mb-0"
                      placeholder="Your Full Name"
                      defaultValue="marvin"
                      onChange={FormDataEvent}
                    />
                  </Form.Group>
                  <Form.Group className="form-group text-start">
                    <h6 className="form-label fw-bold">Your Password</h6>
                    <Form.Control
                      type="password"
                      name="password"
                      className="form-control mb-0"
                      placeholder="Password"
                      defaultValue="marvin"
                      onChange={FormDataEvent}
                    />
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Check className="form-check d-inline-block m-0">
                      <Form.Check.Input
                        type="checkbox"
                        className="form-check-input"
                      />
                      <h6 className="form-check-label fw-bold">Remember Me</h6>
                    </Form.Check>
                    <Link to="/auth/recoverpw" className="font-italic">
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={submitForm}
                    className="btn btn-primary mt-4 fw-semibold text-uppercase w-100"
                  >

                    {IsLoader ? (
                      <div className="Authloader" style={{margin: '0 auto'}}></div>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                  <div className="mt-4">
                    <div className="d-flex align-items-center justify-content-center mb-4">
                      <hr className="flex-grow-1" />
                      <span className="mx-3">OR</span>
                      <hr className="flex-grow-1" />
                    </div>
                    <GoogleOAuthProvider clientId={Google_client_ID}>
                      <GoogleLogin
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
                  <h6 className="mt-5">
                    Don't Have An Account ?{" "}
                    <Link to="/auth/sign-up" >Sign Up</Link>
                  </h6>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
