import React, { useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import axios from '../../utils/axios';
import { Link } from "react-router-dom";

const CreateJob = ({ show, onHide, onJobCreated, setShowCreateModal }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('short_description', shortDescription);
      formData.append('description', description);
      if (mainImage) {
        formData.append('main_image', mainImage);
      }

      const response = await axios.post('/api/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data && response.data.job) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Job created successfully',
          timer: 1500,
          showConfirmButton: false
        });

        // Reset form
        setTitle('');
        setShortDescription('');
        setDescription('');
        setMainImage(null);
        setImagePreview('');
        onHide();

        // Notify parent component
        if (onJobCreated) {
          onJobCreated(response.data.job);
        }
      }
    } catch (error) {
      console.error('Error creating job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong while creating the job!',
      });
      onHide();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="d-flex justify-content-between px-3 py-2">
        <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
          <div className="d-flex align-items-center flex-grow-1">
            Create New Job
          </div>
        </Modal.Title>
        <Link to="#" className="lh-1" onClick={() => setShowCreateModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375"/>
            <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Main Image</Form.Label>
            <div className="d-flex flex-column align-items-center">
              {imagePreview && (
                <div className="mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='radius-8'
              placeholder='Enter Title'
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              className='radius-8'
              placeholder='Write here...'
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className='radius-8'
              placeholder='Write here...'
            />
            {/* <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              style={{ height: '200px', marginBottom: '50px' }}
            /> */}
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="primary" 
              type="submit"
              disabled={isLoading}
              className='btn-purpule radius-8 w-100'
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Creating...
                </>
              ) : 'Create Job'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJob;
