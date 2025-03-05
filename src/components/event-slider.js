import React, { useContext, useEffect, useState, useCallback } from "react";
import sliderImg from "../assets/images/page-img/sliderImg.png";
import { Col } from "react-bootstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const EventSlider =()=>{
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
      <Col sm={12} className="incoming-slider">
                <Slider {...settings}>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px" , width:"100%"}} />
      </div>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px", width:"100%" }} /> 
      </div>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px", width:"100%" }} /> 
      </div>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px", width:"100%" }} /> 
      </div>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px" , width:"100%"}} /> 
      </div>
      <div className="img-wrapper">
      <img src={sliderImg} alt="loader" style={{ height: "250px" , width:"100%"}} /> 
       
      </div>
    </Slider>
                </Col>
      </>
    );
}

export default EventSlider;