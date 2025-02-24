import React, { useState , useEffect} from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

//img
import LogoFull from "../../../assets/images/Equity_Circle_full.png";
import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";
import axios from 'axios';

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
                  className="list-inline m-0 p-0"
                  spaceBetween={30}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  <ul className="swiper-wrapper list-inline m-0 p-0">
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
                <Form className="mt-5" onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                 {success && <div className="alert alert-success" role="alert">{success}</div>}
                  
                  <Form.Group className="form-group text-start">
                    <h6 className="form-label fw-bold">Your Full Name</h6>
                    <Form.Control
                      type="text"
                      className="form-control mb-0"
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="form-group text-start">
                    <h6 className="form-label fw-bold">Email Address</h6>
                    <Form.Control
                      type="email"
                      className="form-control mb-0"
                      placeholder="marvin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="form-group text-start">
                    <h6 className="form-label fw-bold">Your Password</h6>
                    <Form.Control
                      type="password"
                      className="form-control mb-0"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between">
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
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-primary mt-4 fw-semibold text-uppercase w-100"
                  >
                      {IsLoader ? (
                      <div className="Authloader" style={{margin: '0 auto'}}></div>
                    ) : (
                      'Sign up'
                    )}
                  </Button>

                  <div className="mt-4">
                    <div className="or-divider">
                      <span className="or-text">OR</span>
                    </div>

                    <div className="mt-4">
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
                      <button onClick={handleFBLogin} type="button" className="btn btn-primary">
      Login with Facebook
    </button>
                    </div>
                  </div>

                  <h6 className="mt-5">
                    Already Have An Account ?{" "}
                    <Link to={"/auth/sign-in"}>Login</Link>
                  </h6>
                </Form>
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