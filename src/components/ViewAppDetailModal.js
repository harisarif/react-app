import React from "react";
import { Col, Modal, Row, Form, Button } from "react-bootstrap";

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

const ViewAppDetailModal = ({ show, onHide, app }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="app-detail-view-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="modal-title text-center text-dark">
              Applicant Deatil
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3 d-flex flex-column gap-3">
          <div className='d-flex flex-column gap-2 align-items-center mb-3'>
            <img src={avatar} className='veiw-modal-img' alt='Avatar' />
            <div className='d-flex flex-column gap-0 applicant-detail'>
              <h4>Applicant Name</h4>
              <span>Applicant Email</span>
            </div>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" className="disable" readOnly />
            </Form.Group>
            <Row className="g-3">
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Country</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" className="disable" readOnly />
              </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" className="disable" readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Applicant Status</Form.Label>
              <Form.Control type="email" placeholder="status" value={app.job.status} className="disable" readOnly />
            </Form.Group>
          </Form>   
          <div className='d-flex flex-row gap-3 mt-2'>
            <Button className='px-3 text-capitalize btn-outline-purpule radius-8 flex-grow-1' variant="primary" style={{fontWeight: '400'}}>
              View Profile
            </Button>
            <Button className='px-3 text-capitalize btn-purpule radius-8 flex-grow-1' variant="primary" style={{fontWeight: '400'}}>
              View CV
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewAppDetailModal;
