import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import axios from '../../utils/axios';
import { Link } from "react-router-dom";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';


const CreateJob = ({ show, onHide, onJobCreated, job, isEditing, setShowCreateModal }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setShortDescription(job.short_description || '');
      setDescription(job.description || '');
      setImagePreview(job.main_image || '');
    } else {
      // Reset form when job is null
      setTitle('');
      setShortDescription('');
      setDescription('');
      setImagePreview('');
    }
  }, [job]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
      if (isEditing) {
        formData.append('_method', 'PUT')
      }
      const response = await (isEditing
        ? axios.post(`/api/jobs/${job.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        : axios.post('/api/jobs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      );

      if (response.data && response.data.job) {
        Swal.fire({
          icon: 'success',
          title: isEditing ? 'Updated!' : 'Created!',
          text: isEditing ? 'Job updated successfully' : 'Job created successfully',
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
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || (isEditing ? 'Something went wrong while updating the job!' : 'Something went wrong while creating the job!'),
      });
      onHide();
    } finally {
      setIsLoading(false);
    }
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDescEmojiPicker, setShowDescEmojiPicker] = useState(false);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="d-flex justify-content-between px-3 py-2">
        <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
          <div className="d-flex align-items-center flex-grow-1">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </div>
        </Modal.Title>
        <Link to="#" className="lh-1" onClick={() => setShowCreateModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
            <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group className="mb-3">
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
                required={isEditing ? false : true}
              />
            </div>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Main Image</Form.Label>
            <div
              onClick={() => document.getElementById('mainImageUpload').click()}
              className="border border-dashed main-job-list-img-uploder border-secondary rounded-3 d-flex align-items-center justify-content-center"
              style={{
                height: '120px',
                cursor: 'pointer',
                position: 'relative',
                border: '2px dashed #CCCCCC !important'
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div className="text-muted text-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="7" r="1.3" stroke="#73787E" stroke-width="1.4" stroke-linecap="round" />
                    <path d="M5.03652 17.5H15.9635C16.6107 17.5 16.99 16.7715 16.6189 16.2412L11.1554 8.43627C10.8369 7.98129 10.1631 7.98129 9.84461 8.43627L4.38114 16.2412C4.00998 16.7715 4.38931 17.5 5.03652 17.5Z" stroke="#73787E" stroke-width="1.4" stroke-linecap="round" />
                    <path d="M10.5 17.5H19.0566C19.685 17.5 20.068 16.8088 19.735 16.276L16.1784 10.5854C15.8651 10.0841 15.1349 10.0841 14.8216 10.5854L13.8594 12.125" stroke="#73787E" stroke-width="1.4" stroke-linecap="round" />
                  </svg>

                  {/* <p>Click to upload</p> */}
                </div>
              )}
              <input
                id="mainImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required={!isEditing}
              />
            </div>
          </Form.Group>


          {/* <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='radius-8 light-model-border-color its-title-of-main'
              placeholder='Enter Title'
            />
          </Form.Group> */}
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Title*</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className='radius-8 light-model-border-color its-title-of-main'
                placeholder='Enter Title'
              />
              <Button
                variant="light"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="ms-2 jobList-title-emojis"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_870_57302)">
                    <path d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.33337H7.50833" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5 8.33337H12.5083" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.91699 12.5C8.18856 12.7772 8.5127 12.9974 8.87043 13.1477C9.22816 13.298 9.61229 13.3754 10.0003 13.3754C10.3884 13.3754 10.7725 13.298 11.1302 13.1477C11.488 12.9974 11.8121 12.7772 12.0837 12.5" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_870_57302">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </Button>
            </div>
            {showEmojiPicker && (
              <div className="position-absolute z-3" style={{ top: '100%', left: 0 }}>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => setTitle(prev => prev + emoji.native)}
                  theme="light"
                />
              </div>
            )}
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              className='radius-8 light-model-border-color'
              placeholder='Write here...'
            />
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
  <Form.Label>Description</Form.Label>
  
  <div className="d-flex align-items-start">
    <Form.Control
      as="textarea"
      rows={5}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="radius-8 light-model-border-color"
      placeholder="Write here..."
    />

    <Button
      variant="light"
      size="sm"
      onClick={() => setShowDescEmojiPicker(!showDescEmojiPicker)}
      className="ms-2 mt-1 jobList-des-title-emojis  "
    >
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_870_57302)">
                    <path d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.33337H7.50833" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5 8.33337H12.5083" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.91699 12.5C8.18856 12.7772 8.5127 12.9974 8.87043 13.1477C9.22816 13.298 9.61229 13.3754 10.0003 13.3754C10.3884 13.3754 10.7725 13.298 11.1302 13.1477C11.488 12.9974 11.8121 12.7772 12.0837 12.5" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_870_57302">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
    </Button>
  </div>

  {showDescEmojiPicker && (
    <div className="position-absolute z-3" style={{ top: '100%', left: 0 }}>
      <Picker
        data={data}
        onEmojiSelect={(emoji) => setDescription((prev) => prev + emoji.native)}
        theme="light"
      />
    </div>
  )}
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
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditing ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJob;
