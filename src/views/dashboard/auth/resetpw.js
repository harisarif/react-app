import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

// img
import LogoFull from "../../../assets/images/sign-in-logo.png";
import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";

import { useRef } from "react";

import googleImage from "../../../assets/images/login/google.png";
import facebookImage from "../../../assets/images/login/facebook.png";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const appName = useSelector(SettingSelector.app_name);

  useEffect(() => {
    // Get token from URL query params
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setFormData(prev => ({ ...prev, token }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post("/api/reset-password", formData);
      setSuccess(response.data.message);
      toast.success(response.data.message);
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="sign-in-page">
        <Container fluid>
          <Row className="align-items-center">
            {/* <Col md={6} className="overflow-hidden position-relative">
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
            </Col> */}
            <Col md={12}>
              <div className="sign-in-from">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}
                <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={80} alt='' className="sing-in-page-logo"/>
                  <h5 className='h5 mb-0 text-light' style={{fontSize: '46px', fontWeight: '800'}}>Equity Circle</h5>
                </Link>  
                <div className='form-inner-content-holder'>
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group className="form-group mb-3">
                      <h6 className="form-label fw-bold">Email</h6>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="form-group mb-3">
                      <h6 className="form-label fw-bold">New Password</h6>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        required
                        minLength={8}
                      />
                    </Form.Group>
                    <Form.Group className="form-group mb-3">
                      <h6 className="form-label fw-bold">Confirm Password</h6>
                      <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        required
                        minLength={8}
                      />
                    </Form.Group>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3 fw-semibold text-uppercase letter-spacing-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </Form>
                </div >
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ResetPassword;
