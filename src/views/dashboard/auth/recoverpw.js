import React, { useState } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

// img
import LogoFull from "../../../assets/images/Equity_Circle-sign-in.png";

import login1 from "../../../assets/images/login/1.jpg";
import login2 from "../../../assets/images/login/2.jpg";
import login3 from "../../../assets/images/login/3.jpg";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// Redux Selector / Action
import { useSelector } from "react-redux";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Recoverpw = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const appName = useSelector(SettingSelector.app_name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post("/api/forgot-password", { email });
      setSuccess(response.data.message);
      toast.success(response.data.message);
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
            <Col lg={6}>
            </Col>
            <Col lg={6} className="d-flex align-items-center" style={{ height: '100vh' }}>
              <div className="sign-in-from">
                <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={200} alt='' />
                </Link>
                <h6 className='mt-5 mb-2 fw-bold'>Forget Password</h6>
                <p className="mb-0 font-size-16" style={{ fontSize: '14px', lineHeight: 'normal' }}>
                  Welcome to Equity Circle, a platform to connect with the <br />social world
                </p>
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
                <Form className="mt-5" onSubmit={handleSubmit}>
                  <Form.Group className="form-group text-start mb-0">
                    <h6 className="form-label fw-bold" style={{ fontSize: '14px', fontWeight: '600' }}>Email</h6>
                    <Form.Control
                      type="email"
                      className="mb-0 radius-8"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-purpule radius-8 mt-4 w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  {/* <button
                    type="submit"
                    className="btn btn-primary mt-4 fw-semibold text-uppercase letter-spacing-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </button> */}

                  <h6 className="mt-5 text-center">
                    <span style={{ fontSize: '14px', fontWeight: '400' }}>Already Have An Account ?{" "}</span>
                    <Link to="/auth/sign-in" style={{ fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>Login</Link>
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

export default Recoverpw;
