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
        <Modal.Header closeButton className="border-0">
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="modal-title text-dark">
              Job Deatil
            </h3>
            <span className=''>Complete the form below to have a copy of our resource sent direct your inbox.</span>
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
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" className="disable" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Applicant Status</Form.Label>
                <Form.Control type="email" placeholder="status" className="disable" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Applicant Status</Form.Label>
                <Form.Control type="email" placeholder="status" className="disable" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Applicant Status</Form.Label>
                <Form.Control type="email" placeholder="status" className="disable" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Applicant Status</Form.Label>
                <Form.Control type="email" placeholder="status" className="disable" readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Applicant Status</Form.Label>
                <Form.Control type="email" placeholder="status" className="disable" readOnly />
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
