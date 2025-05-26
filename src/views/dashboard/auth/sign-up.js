import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

//img
import LogoFull from "../../../assets/images/sign-in-logo.png";
import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";
import axios from 'axios';
import { useRef } from "react";

import googleImage from "../../../assets/images/login/google.png";
import facebookImage from "../../../assets/images/login/facebook.png";
import { RiH5 } from "react-icons/ri";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
  const navigate = useNavigate();
  const appName = useSelector(SettingSelector.app_name);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const Google_client_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const Facebook_client_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  console.log(Google_client_ID);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [IsLoader, setLoader] = useState(false);

  const googleLoginRef = useRef(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    setSuccess(null);
    setError(null);
    setLoader(true);
    e.preventDefault();

    if (!termsAccepted) {
      alert('You must accept the terms and conditions.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/register`, {
        name: fullName,
        email: email,
        password: password,
        password_confirmation: password,
      });
      setSuccess(response.data.message);
      localStorage.setItem('access_token', response.data.access_token);
      setLoader(false);
      window.location.href = '/'
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response ? error.response.data.message : 'Signup failed. Please try again.');
      setLoader(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send the ID token to your backend
      const response = await axios.post(`${baseUrl}/api/auth/google/callback`, {
        id_token: credentialResponse.credential
      });

      localStorage.setItem('access_token', response.data.access_token);
      window.location.href = '/'
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };


  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: Facebook_client_ID, // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("User logged in", response);

          axios
            .post(`${baseUrl}/api/auth/facebook/callback`, {
              access_token: response.authResponse.accessToken,
            })
            .then((res) => {
              if (res.data.token) {
                console.log("Login successful, token:", res.data.token);
                localStorage.setItem("access_token", res.data.token);
              } else {
                console.error("Login failed:", res.data);
              }
            })
            .catch((error) => {
              console.error("Error during login:", error);
            });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
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
          <Row className="align-items-center">
            {/* <Col lg={6}>
            </Col> */}
            <Col lg={12} className="d-flex align-items-center" style={{ height: '100vh' }}>
              <div className="sign-in-from">
                <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={80} alt='' className="sing-in-page-logo"/>
                  <h5 className='h5 mb-0 text-light' style={{fontSize: '46px', fontWeight: '800'}}>Equity Circle</h5>
                </Link>                
                <div className='form-inner-content-holder'>
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {success && <div className="alert alert-success" role="alert">{success}</div>}

                    <Form.Group className="form-group text-start">
                      <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>Full Name</h6>
                      <Form.Control
                        type="text"
                        className="form-control mb-0 radius-8"
                        placeholder="Your Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group text-start">
                      <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>Email</h6>
                      <Form.Control
                        type="email"
                        className="form-control mb-0 radius-8"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group text-start mb-2">
                      <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>Password</h6>
                      {/* <Form.Control
                        type="password"
                        className="form-control mb-0 radius-8"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      /> */}
                      <div className="position-relative">
                        <Form.Control
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Enter Your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mb-0 radius-8"
                        />
                        <Button
                          variant="link"
                          className="position-absolute top-50 end-4px translate-middle-y cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          <span className="material-symbols-outlined pt-2">
                            {passwordVisible ? 'visibility_off' : 'visibility'}
                          </span>
                        </Button>
                      </div>
                    </Form.Group>
                    {/* <div className="d-flex align-items-center justify-content-between">
                      <Form.Check className="form-check d-inline-block m-0">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <h6 className="form-check-label fw-500 font-size-14">
                          I accept{" "}
                          <Link className="fw-light ms-1" to="/dashboard/extrapages/terms-of-service">
                            Terms and Conditions
                          </Link>
                        </h6>
                      </Form.Check>
                    </div> */}

                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Check className="form-check d-flex gap-2 m-0">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                        />
                        <h6 className="form-check-label mt-1" style={{ fontSize: '12px', fontWeight: '500' }}>Remember Me</h6>
                      </Form.Check>
                      <Link to="/auth/recover-password" className="font-italic" style={{ fontSize: '12px', fontWeight: '500' }}>
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="bg-light border-0 text-dark radius-8 mt-4 w-100"
                    >
                      {IsLoader ? (
                        <div className="Authloader" style={{ margin: '0 auto' }}></div>
                      ) : (
                        'Sign up'
                      )}
                    </Button>

                    <div className="mt-4">
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <hr className="flex-grow-1" />
                        <span className="mx-3" style={{ fontSize: '12px' }}>OR</span>
                        <hr className="flex-grow-1" />
                      </div>
                      <div className="d-flex gap-2 justify-content-between align-items-center">
                        <div className="google-btn" onClick={handleGoogleClick}>
                          <img src={googleImage} alt="Google" />
                          <div className="text">Google</div>
                        </div>
                        <div className="facebook-btn">
                          <img src={facebookImage} alt="FaceBook" />
                          <div className="text">FaceBook</div>
                        </div>
                      </div>

                      <div style={{ display: 'none' }}>
                        
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
                            context="signup"
                          />
                        </GoogleOAuthProvider>
                      </div>
                    </div>

                    <h6 className="mt-5 text-center">
                      <span style={{ fontSize: '14px', fontWeight: '400' }}>Already Have An Account ?{" "}</span>
                      <Link to="/auth/sign-in" style={{ fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>Login</Link>
                    </h6>

                    {/* <h6 className="mt-5">
                      Already Have An Account ?{" "}
                      <Link to={"/auth/sign-in"}>Login</Link>
                    </h6> */}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx>{`
        .or-divider {
          position: relative;
          text-align: center;
          margin: 20px 0;
        }
        .or-divider:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e0e0e0;
        }
        .or-text {
          background: #fff;
          padding: 0 15px;
          color: #666;
          position: relative;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default SignUp;