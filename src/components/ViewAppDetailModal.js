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
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="d-flex justify-content-between w-100">
            <h3 className="modal-title text-center text-dark">
              Applicant Deatil
            </h3>
            <button closeButton className="model-close-btn">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
                <path d="M10.6992 17.3016L17.3026 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3026 17.3016L10.6992 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3 d-flex flex-column gap-3">
          <div className='d-flex flex-column gap-2 align-items-center mb-3'>
            <img src={getProfileImageUrl(app.user)} className='veiw-modal-img' alt='Avatar' />
            <div className='d-flex flex-column gap-0 applicant-detail'>
              <h4>{app.first_name} {app.last_name}</h4>
              <span>{app.email}</span>
            </div>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" value={app.email} className="disable" readOnly />
            </Form.Group>
            <Row className="g-3">
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" value={app.country} className="disable" readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" value={app.company} className="disable" readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Applicant Status</Form.Label>
              <Form.Control type="email" placeholder="status" value={app.job.status} className="disable" readOnly />
            </Form.Group>
          </Form>
          <div className='d-flex flex-row gap-3 mt-2'>
            <Button onClick={()=> window.open(`/profile/${app.user_id}`, '_blank')} className='px-3 text-capitalize btn-outline-purpule radius-8 flex-grow-1' variant="primary" style={{ fontWeight: '400' }}>
              View Profile
            </Button>
            <Button onClick={() => window.open(`${process.env.REACT_APP_BACKEND_BASE_URL}/${app.cv_file_path}`, '_blank')} className='px-3 text-capitalize btn-purpule radius-8 flex-grow-1' variant="primary" style={{ fontWeight: '400' }}>
              View CV
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewAppDetailModal;
