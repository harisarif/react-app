import React from "react";
import { Col, Modal, Row, Form, Button, Card } from "react-bootstrap";

// img
import embed from "../assets/images/icon/embed.png";
import whatsapp from "../assets/images/icon/whatsapp.png";
import facebook from "../assets/images/icon/facebook.png";
import twitter from "../assets/images/icon/twitter.png";
import pinterest from "../assets/images/icon/pinterest.png";
import linkdin from "../assets/images/icon/linkedin.png";

import { Link } from "react-router-dom";
import { getProfileImageUrl } from "../utils/helpers";

import avatar from "../assets/images/logo-white.png";

const ViewJobDetailModal = ({ show, onHide }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="job-detail-view-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title  id="contained-modal-title-vcenter"  className="d-flex justify-content-between w-100">
            <div>
            <h3 className="modal-title text-dark">
              Job Deatil
            </h3>
            <span className=''>Complete the form below to have a copy of our resource sent direct your inbox.</span>
            </div>
            <button  className="model-close-btn">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
                <path d="M10.6992 17.3016L17.3026 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3026 17.3016L10.6992 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row gap-3">
          <Card className="h-100 job-list-card">
            <div className="job-card-img">
              <img 
                src='https://equity-api.techtrack.online/images/jobs/1739620303_pexels-sheinshine-3127883.jpg'
                className="card-img-top" 
                alt=''
                loading="lazy"
              />
            </div>
            <Card.Body className="">
              <h4 className="card-title turncate-2 text-black" style={{fontSize: 20, fontWeight: '600'}}>
                Sales and Growth Executive
              </h4>
              <p className="card-text turncate-6 paragraph-holder elipsis-6 text-dark" style={{fontSize: '15px', lineHeight: '1.5', fontWeight: '300'}}>
                The Sales and Growth Executive will spearhead the company’s revenue generation 
                strategies by driving sales growth through effective relationship-building and 
                solution-based sales. This role focuses on acquiring new customers, nurturing long-term 
                client relationships, and implementing product solutions that align with client needs. 
                The ideal candidate will be adept in farming existing accounts, managing inbound and outbound 
                sales activities, and providing exceptional product solutions to clients.
              </p>
            </Card.Body>
          </Card>
          <Card className="h-100 job-form">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your First Name" className="" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" className="" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="user@gmail.com" className="" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Select Your Country" className="" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Upload CV* (Only PDF)</Form.Label>
                <Form.Control type="file" placeholder="" className="" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="email" placeholder="Enter your Job Title" className="" readOnly />
              </Form.Group>
              <Button variant="primary" className="btn-purpule radius-8 w-100" type="submit">
                Apply For Job
              </Button>
            </Form>   
          </Card>      
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewJobDetailModal;
