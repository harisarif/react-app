import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

// img
import embed from "../assets/images/icon/embed.png";
import whatsapp from "../assets/images/icon/whatsapp.png";
import facebook from "../assets/images/icon/facebook.png";
import twitter from "../assets/images/icon/twitter.png";
import pinterest from "../assets/images/icon/pinterest.png";
import linkdin from "../assets/images/icon/linkedin.png";

import { Link } from "react-router-dom";
import { getProfileImageUrl } from "../utils/helpers";

const CommentOffcanvasNew = ({ show, onHide, comments }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="commentmodal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="modal-title text-dark" id="share-btnLabel">
              Comments
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-4">
        {comments?.map((comment, index) => (
          <div className="card mb-2 mt-3" key={index}>
            <div className="card-body p-3 py-2">
              <div className="">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start align-items-center overflow-hidden" style={{ width: '300px' }}>
                      <img src={getProfileImageUrl(comment?.user)} alt="Mubashar Ahmad" className="rounded-circle avatar-40 me-2" />
                      <div className="d-flex flex-column gap-0">
                        <h6 className="mb-0 suggestion-user-name text-dark">{comment?.user?.name}</h6>
                        <p className="mb-0 text-muted suggestion-user-email mt-n1">{comment?.user.email}</p>
                      </div>
                    </div>
                    {/* <button className="ms-2 switch-account p-0">Follow</button> */}
                  </div>
                  <div className="d-flex flex-column gap-0">
                    <p className="elipsis-2">{comment?.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CommentOffcanvasNew;
