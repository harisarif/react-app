import { useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../../utils/axios';
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const changeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
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
                {/* <Link
                  to="/"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <img src={LogoFull} width={80} alt='' className="sing-in-page-logo"/>
                  <h5 className='h5 mb-0 text-light' style={{fontSize: '46px', fontWeight: '800'}}>Equity Circle</h5>
                </Link>  */}
                <div className="form-inner-content-holder d-flex flex-column gap-4">
                  <div className="d-flex flex-column gap-3">
                    <h3 className="sign-in-sub-title text-uppercase">Your Interest.</h3>
                  </div>
                  <div className="d-flex gap-2 mb-4 flex-column">
                  {categories.map((category, index) => {
                    return (
                      <label for={index} className={`interest-in-secondary-btn text-center text-1 ${selectedCategory == category.id && 'checked'}`}>
                        <input
                          type="radio"
                          value={category.id}
                          id={index}
                          checked={selectedCategory === category.id}
                          onChange={() => changeCategory(category.id)}
                          className='d-none'
                        />
                        {category.name}
                      </label>
                    )
                  })}
                  {console.log('Categories', categories)}
                  </div>
                  <div className="d-flex flex-column">
                    <Link to='/lets-begain' className='sign-in-primary-btn text-center'>Next</Link>
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

