import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';

//images
import user1 from "../assets/images/user/1.jpg";

const CreatePost = (props) => {
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({ images: [], videos: [], documents: [] });
  const [previews, setPreviews] = useState({ images: [], videos: [], documents: [] });
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setSelectedFiles({ images: [], videos: [], documents: [] });
    setPreviews({ images: [], videos: [], documents: [] });
    setPostText("");
  };

  const handleShow = () => setShow(true);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const newVideos = [];
    const newDocuments = [];
    const imagePreviewUrls = [];
    const videoPreviewUrls = [];
    const documentPreviewUrls = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newImages.push(file);
        imagePreviewUrls.push(URL.createObjectURL(file));
      } else if (file.type.startsWith('video/')) {
        newVideos.push(file);
        videoPreviewUrls.push(URL.createObjectURL(file));
      } else if (
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-powerpoint' ||
        file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        file.type === 'text/plain'
      ) {
        newDocuments.push(file);
        documentPreviewUrls.push(file.name); // Just store the filename for documents
      }
    });

    setSelectedFiles({
      images: [...selectedFiles.images, ...newImages],
      videos: [...selectedFiles.videos, ...newVideos],
      documents: [...selectedFiles.documents, ...newDocuments]
    });

    setPreviews({
      images: [...previews.images, ...imagePreviewUrls],
      videos: [...previews.videos, ...videoPreviewUrls],
      documents: [...previews.documents, ...documentPreviewUrls]
    });
  };

  const removeFile = (type, index) => {
    const newFiles = { ...selectedFiles };
    const newPreviews = { ...previews };
    
    if (type === 'images' || type === 'videos') {
      URL.revokeObjectURL(newPreviews[type][index]);
    }
    newFiles[type].splice(index, 1);
    newPreviews[type].splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', postText);
    formData.append('description', postText);

    selectedFiles.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    selectedFiles.videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });

    selectedFiles.documents.forEach((document, index) => {
      formData.append(`documents[${index}]`, document);
    });

    try {
      const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
      const response = await axios.post(`${baseUrl}/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      console.log('Post created:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div id="post-modal-data" className={`card ${props.class}`}>
        <div className="card-header d-flex justify-content-between border-bottom">
          <div className="header-title">
            <h5 className="card-title">Add a Post</h5>
          </div>
          <Dropdown >
            <Dropdown.Toggle className="lh-1" id="post-option" as="div" bsPrefix=" ">
              <span className="material-symbols-outlined">more_horiz</span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              variant="right"
              aria-labelledby="post-option"
              style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(0px, -27px)' }}
            >
              <Dropdown.Item
                href="#"
                onClick={handleShow}
              >
                Check in
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={handleShow}
              >
                Live Video
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={handleShow}
              >
                GIF
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={handleShow}
              >
                Watch Party
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={handleShow}
              >
                Play with Friend
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-5">
            <form className="post-text w-100" onClick={handleShow}>
              <input
                type="text"
                className="form-control rounded px-0"
                placeholder="Write And Share Your Post With Your Friends..."
                style={{ border: "none" }}
                readOnly
              />
            </form>
          </div>
        </div>
        <div className="card-body bg-primary-subtle rounded-bottom-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="create-post-data">
              <ul className="list-inline m-0 p-0 d-flex align-items-center gap-4">
                <li>
                  <Link to="#" className="text-body">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.5334 1.3761C12.3751 1.7111 12.6326 2.87776 12.9767 3.25276C13.3209 3.62776 13.8134 3.75526 14.0859 3.75526C15.5342 3.75526 16.7084 4.92943 16.7084 6.37693V11.2061C16.7084 13.1478 15.1334 14.7228 13.1917 14.7228H4.80841C2.86591 14.7228 1.29175 13.1478 1.29175 11.2061V6.37693C1.29175 4.92943 2.46591 3.75526 3.91425 3.75526C4.18591 3.75526 4.67841 3.62776 5.02341 3.25276C5.36758 2.87776 5.62425 1.7111 6.46591 1.3761C7.30841 1.0411 10.6917 1.0411 11.5334 1.3761Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5794 5.91667H13.5869"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.6489 8.94C11.6489 7.47667 10.4631 6.29083 8.99975 6.29083C7.53642 6.29083 6.35059 7.47667 6.35059 8.94C6.35059 10.4033 7.53642 11.5892 8.99975 11.5892C10.4631 11.5892 11.6489 10.4033 11.6489 8.94Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-body">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.23043 11.6718C4.02709 11.6718 1.29126 12.156 1.29126 14.096C1.29126 16.036 4.01043 16.5377 7.23043 16.5377C10.4346 16.5377 13.1696 16.0527 13.1696 14.1135C13.1696 12.1743 10.4513 11.6718 7.23043 11.6718Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.23042 8.90493C9.33292 8.90493 11.0371 7.20076 11.0371 5.09826C11.0371 2.99576 9.33292 1.2916 7.23042 1.2916C5.12875 1.2916 3.42459 2.99576 3.42459 5.09826C3.41709 7.19326 5.10875 8.89743 7.20459 8.90493H7.23042Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0031 6.22427V9.56594"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.7079 7.895H13.2996"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-body">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.08341 7.75041C9.08341 6.59935 8.15072 5.66666 7.0005 5.66666C5.84944 5.66666 4.91675 6.59935 4.91675 7.75041C4.91675 8.90063 5.84944 9.83332 7.0005 9.83332C8.15072 9.83332 9.08341 8.90063 9.08341 7.75041Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99959 16.5C6.00086 16.5 0.75 12.2486 0.75 7.80274C0.75 4.3222 3.54758 1.5 6.99959 1.5C10.4516 1.5 13.25 4.3222 13.25 7.80274C13.25 12.2486 7.99832 16.5 6.99959 16.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-inline m-0 p-0 d-flex align-items-center gap-4">
                <li>
                  <Link to="#" className="text-body fw-medium">
                    Discard
                  </Link>
                </li>
                <li>
                  <button type="button" className="btn btn-primary px-4">
                    Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center mb-3">
              <img src={user1} alt="user1" className="avatar-60 rounded-circle me-3" />
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What's on your mind?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                className="d-none"
                onChange={handleFileSelect}
              />
              <Button 
                variant="outline-primary" 
                onClick={() => fileInputRef.current.click()}
                className="w-100"
              >
                <i className="material-symbols-outlined me-2">add_photo_alternate</i>
                Add Photos/Videos/Documents
              </Button>
            </div>

            {/* Image Previews */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {previews.images.map((preview, index) => (
                <div key={`image-${index}`} className="position-relative">
                  <img 
                    src={preview} 
                    alt={`preview-${index}`} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => removeFile('images', index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>

            {/* Video Previews */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {previews.videos.map((preview, index) => (
                <div key={`video-${index}`} className="position-relative">
                  <video 
                    src={preview} 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    controls
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => removeFile('videos', index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>

            {/* Document Previews */}
            <div className="d-flex flex-wrap gap-2">
              {previews.documents.map((filename, index) => (
                <div key={`document-${index}`} className="position-relative border rounded p-2">
                  <div className="d-flex align-items-center">
                    <i className="material-symbols-outlined me-2">description</i>
                    <span>{filename}</span>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => removeFile('documents', index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={isLoading || (!postText && !selectedFiles.images.length && !selectedFiles.videos.length && !selectedFiles.documents.length)}
            >
              {isLoading ? 'Posting...' : 'Post'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className={`modal-backdrop fade ${show ? "show" : "d-none"}`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default CreatePost;
