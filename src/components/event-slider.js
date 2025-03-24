import React, { useContext, useEffect, useState, useCallback } from "react";
import sliderImg from "../assets/images/page-img/sliderImg.png";
import sliderImg1 from "../assets/images/page-img/img-slider-1.png";
import sliderImg2 from "../assets/images/page-img/img-slider-2.png";
import { Dropdown, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";

const EventSlider =()=>{
    var settings = {
      dots: true,
      arrows: false, // Hide left & right arrows
      infinite: true,
      speed: 500,
      autoplay: false, 
      slidesToShow: 1, // Show 1 full + small part of next slide
      slidesToScroll: 1,
      centerMode: true, // Centers the active slide
      centerPadding: "75px", // Adjust to control partial visibility of next slide
      margin: '10px',
      responsive: [
        {
          breakpoint: 1024, // Tablets
          settings: {
            slidesToShow: 1.1,
            centerPadding: "40px"
          }
        },
        {
          breakpoint: 768, // Mobile devices
          settings: {
            slidesToShow: 1,
            centerPadding: "20px"
          }
        }
      ]
    };
    return (
      <>
        <Col sm={12} className="incoming-slider">
          <Card>
            <Card.Body className={`carousel-card`}>
              <Slider {...settings} style={{overflow: 'hidden'}}>
                <div className="img-wrapper">
                <img src={sliderImg} alt="loader" style={{  width:"100%"}} />
                </div>
                <div className="img-wrapper">
                <img src={sliderImg1} alt="loader" style={{ width:"100%" }} /> 
                </div>
                <div className="img-wrapper">
                <img src={sliderImg2} alt="loader" style={{ width:"100%" }} /> 
                </div>
              </Slider>
            </Card.Body>
          </Card>          
        </Col>
      </>
    );
}

export default EventSlider;