import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Badge, Image } from "react-bootstrap";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';

const CreateSubjectModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    available: '',
    startDate: '',
    endDate: '',
    image: null,
    dailyGoals: '',
    courseIntroduction: '',
    courseDetail: '',
    videoUrl: '',
    transcripts: [{ startTime: '', transcription: '' }],
    notes: '',
    summary: '',
    attachments: [],
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [attachmentsPreview, setAttachmentsPreview] = useState([]);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Subject title is required.';
      if (!formData.available.trim()) newErrors.available = 'Availability is required.';
      if (!formData.startDate) newErrors.startDate = 'Start date is required.';
      if (!formData.endDate) newErrors.endDate = 'End date is required.';
      if (!formData.image) newErrors.image = 'Subject image is required.';
    } else if (step === 2) {
      if (!formData.dailyGoals.trim() || formData.dailyGoals.trim().length < 100) {
        newErrors.dailyGoals = 'Daily goals must be at least 100 characters.';
      }
      if (!formData.courseIntroduction.trim() || formData.courseIntroduction.trim().length < 100) {
        newErrors.courseIntroduction = 'Course introduction must be at least 100 characters.';
      }
      if (!formData.courseDetail.trim() || formData.courseDetail.trim().length < 100) {
        newErrors.courseDetail = 'Course detail must be at least 100 characters.';
      }
    } else if (step === 3) {
      if (!formData.videoUrl.trim()) newErrors.videoUrl = 'Video URL is required.';
      formData.transcripts.forEach((transcript, index) => {
        if (!transcript.startTime.trim()) {
          newErrors[`transcriptStartTime${index}`] = 'Start time is required.';
        }
        if (!transcript.transcription.trim() || transcript.transcription.trim().length < 100) {
          newErrors[`transcriptText${index}`] = 'Transcription must be at least 100 characters.';
        }
      });
    } else if (step === 4) {
      if (!formData.notes.trim() || formData.notes.trim().length < 100) {
        newErrors.notes = 'Notes must be at least 100 characters.';
      }
    } else if (step === 5) {
      if (!formData.summary.trim() || formData.summary.trim().length < 100) {
        newErrors.summary = 'Summary must be at least 100 characters.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.table(formData);
      Swal.fire({
        icon: 'success',
        title: 'Subject Created',
        text: 'Your subject has been successfully created!',
      });
      resetForm();
      handleClose();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      available: '',
      startDate: '',
      endDate: '',
      image: null,
      dailyGoals: '',
      courseIntroduction: '',
      courseDetail: '',
      videoUrl: '',
      transcripts: [{ startTime: '', transcription: '' }],
      notes: '',
      summary: '',
      attachments: [],
    });
    setErrors({});
    setImagePreview(null); // Clear the image preview
    setAttachmentsPreview([]); // Clear the attachments preview
    setStep(1); // Reset to the first step
  };

  const handleModalClose = () => {
    // Check if any field in formData has data or if an image is selected
    const hasUnsavedChanges = Object.values(formData).some(
      (value) =>
        (Array.isArray(value) ? value.length > 0 : value && value !== '') || imagePreview
    );

    if (hasUnsavedChanges) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You have unsaved changes. Do you really want to close?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, close it!',
        cancelButtonText: 'No, keep editing',
      }).then((result) => {
        if (result.isConfirmed) {
          resetForm();
          handleClose();
        }
      });
    } else {
      resetForm();
      handleClose();
    }
  };

  const handleAddTranscript = () => {
    setFormData({
      ...formData,
      transcripts: [...formData.transcripts, { startTime: '', transcription: '' }],
    });
  };

  const handleRemoveTranscript = (index) => {
    const updatedTranscripts = formData.transcripts.filter((_, i) => i !== index);
    setFormData({ ...formData, transcripts: updatedTranscripts });
  };

  const onDropImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const onDropAttachments = (acceptedFiles) => {
    setFormData({ ...formData, attachments: [...formData.attachments, ...acceptedFiles] });
    setAttachmentsPreview((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onDropImage,
    accept: 'image/*',
    multiple: false,
  });

  const { getRootProps: getAttachmentsRootProps, getInputProps: getAttachmentsInputProps } = useDropzone({
    onDrop: onDropAttachments,
    accept: '*',
    multiple: true,
  });

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      size="xl"
      centered
      dialogClassName="modal-90vh"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-auto model-create-new-subject" style={{ width: '60%', height: 'calc(90vh - 120px)', overflowY: 'auto' }}>
        <Form onSubmit={handleFormSubmit}>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Subject Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ borderColor: errors.title ? '#cf0202' : '' }}
                  className='radius-10'
                />
                {errors.title && <div style={{ color: '#cf0202' }}>{errors.title}</div>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Available Seats</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.available}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove non-digit characters
                    value = value.replace(/\D/g, '');

                    // Enforce a minimum value of 1
                    if (value !== '' && parseInt(value, 10) < 1) {
                      value = '1';
                    }

                    setFormData({ ...formData, available: value });
                  }}
                  style={{ borderColor: errors.available ? '#cf0202' : '' }}
                  className="radius-10"
                />
                {errors.available && <div style={{ color: '#cf0202' }}>{errors.available}</div>}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => {
                        const startDate = e.target.value;
                        const endDate = formData.endDate;

                        // Update the start date
                        setFormData({ ...formData, startDate });

                        // Clear errors for start date
                        setErrors((prevErrors) => ({ ...prevErrors, startDate: '' }));

                        // Reset end date if it is earlier than the new start date + 1 day
                        if (endDate && new Date(endDate) <= new Date(startDate)) {
                          setFormData({ ...formData, startDate, endDate: '' });
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            endDate: 'End date must be at least 1 day after the start date.',
                          }));
                        }
                      }}
                      style={{ borderColor: errors.startDate ? '#cf0202' : '' }}
                      className="radius-10"
                    />
                    {errors.startDate && <div style={{ color: '#cf0202' }}>{errors.startDate}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => {
                        const endDate = e.target.value;

                        // Validate end date
                        if (new Date(endDate) > new Date(formData.startDate)) {
                          setFormData({ ...formData, endDate });
                          setErrors((prevErrors) => ({ ...prevErrors, endDate: '' })); // Clear errors for end date
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            endDate: 'End date must be at least 1 day after the start date.',
                          }));
                        }
                      }}
                      style={{ borderColor: errors.endDate ? '#cf0202' : '' }}
                      className="radius-10"
                    />
                    {errors.endDate && <div style={{ color: '#cf0202' }}>{errors.endDate}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Subject Image</Form.Label>
                <div
                  {...getImageRootProps()}
                  className="dropzone border rounded p-3 text-center radius-10 border-2-dash"
                  style={{ borderColor: errors.image ? '#cf0202' : '', cursor: 'pointer' }}

                >
                  <input {...getImageInputProps()} />
                  {formData.image ? (
                    <p>{formData.image.name}</p>
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
                {errors.image && <div style={{ color: '#cf0202' }}>{errors.image}</div>}
                {imagePreview && (
                  <div className="mt-3">
                    <Image src={imagePreview} style={{ maxWidth: '120px' }} alt="Preview" thumbnail />
                  </div>
                )}
              </Form.Group>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className='d-flex justify-content-between align-items-center'>
                  Daily Goals
                  <div className="text-end">
                    <small>{formData.dailyGoals.length}/2000</small>
                  </div>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.dailyGoals}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, dailyGoals: value });

                    // Clear error dynamically
                    if (value.trim().length >= 100) {
                      setErrors((prevErrors) => ({ ...prevErrors, dailyGoals: '' }));
                    }
                  }}
                  className="radius-10"
                  style={{
                    minHeight: '150px',
                    maxHeight: '150px',
                    borderColor: errors.dailyGoals ? '#cf0202' : '',
                  }}
                />
                {errors.dailyGoals && <div style={{ color: '#cf0202' }}>{errors.dailyGoals}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='d-flex justify-content-between align-items-center'>
                  Course Introduction
                  <div className="text-end">
                    <small>{formData.courseIntroduction.length}/2000</small>
                  </div>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.courseIntroduction}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, courseIntroduction: value });

                    // Clear error dynamically
                    if (value.trim().length >= 100) {
                      setErrors((prevErrors) => ({ ...prevErrors, courseIntroduction: '' }));
                    }
                  }}
                  className="radius-10"
                  style={{
                    minHeight: '150px',
                    maxHeight: '150px',
                    borderColor: errors.courseIntroduction ? '#cf0202' : '',
                  }}
                />
                {errors.courseIntroduction && <div style={{ color: '#cf0202' }}>{errors.courseIntroduction}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='d-flex justify-content-between align-items-center'>
                  Course Detail
                  <div className="text-end">
                    <small>{formData.courseDetail.length}/2000</small>
                  </div>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.courseDetail}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, courseDetail: value });

                    // Clear error dynamically
                    if (value.trim().length >= 100) {
                      setErrors((prevErrors) => ({ ...prevErrors, courseDetail: '' }));
                    }
                  }}
                  className="radius-10"
                  style={{
                    minHeight: '150px',
                    maxHeight: '150px',
                    borderColor: errors.courseDetail ? '#cf0202' : '',
                  }}
                />
                {errors.courseDetail && <div style={{ color: '#cf0202' }}>{errors.courseDetail}</div>}
              </Form.Group>
            </>
          )}
          {step === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => {
                    const value = e.target.value;
                    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

                    if (!youtubeRegex.test(value)) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        videoUrl: 'Please enter a valid YouTube URL.',
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        videoUrl: '',
                      }));
                    }

                    setFormData({ ...formData, videoUrl: value });
                  }}
                  className="radius-10"
                  style={{ borderColor: errors.videoUrl ? '#cf0202' : '' }}
                />
                {errors.videoUrl && <div style={{ color: '#cf0202' }}>{errors.videoUrl}</div>}
              </Form.Group>
              {formData.transcripts.map((transcript, index) => (
                <div key={index} className="parent">
                  <div className="div1">
                    <Form.Group>
                      <Form.Label className='d-flex justify-content-between align-items-center'>
                        Transcription
                        <div className="text-end">
                          <small>{transcript.transcription.length}/2000</small>
                        </div>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={transcript.transcription}
                        onChange={(e) => {
                          const updatedTranscripts = [...formData.transcripts];
                          updatedTranscripts[index].transcription = e.target.value;
                          setFormData({ ...formData, transcripts: updatedTranscripts });

                          // Clear error dynamically
                          if (e.target.value.trim().length >= 100) {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [`transcriptText${index}`]: '',
                            }));
                          }
                        }}
                        className="radius-10"
                        style={{
                          minHeight: '98px',
                          maxHeight: '200px',
                          borderColor: errors[`transcriptText${index}`] ? '#cf0202' : '',
                        }}
                      />

                      {errors[`transcriptText${index}`] && (
                        <span style={{ color: '#cf0202' }} className="me-3">
                          {errors[`transcriptText${index}`]}
                        </span>
                      )}
                      {errors[`transcriptStartTime${index}`] && (
                        <span style={{ color: '#cf0202' }}>
                          {errors[`transcriptStartTime${index}`]}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="div2">
                    <Form.Group>
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control
                        type="text"
                        value={transcript.startTime}
                        onChange={(e) => {
                          let value = e.target.value;

                          // Remove non-digit characters
                          value = value.replace(/\D/g, '');

                          // Format based on the number of digits
                          if (value.length === 3) {
                            value = value.replace(/(\d{1})(\d{2})/, '$1-$2'); // Format as 1-23
                          } else if (value.length === 4) {
                            value = value.replace(/(\d{2})(\d{2})/, '$1-$2'); // Format as 12-34
                          } else if (value.length === 5) {
                            value = value.replace(/(\d{1})(\d{2})(\d{2})/, '$1-$2-$3'); // Format as 1-23-45
                          } else if (value.length === 6) {
                            value = value.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3'); // Format as 12-34-56
                          }

                          const updatedTranscripts = [...formData.transcripts];
                          updatedTranscripts[index].startTime = value;
                          setFormData({ ...formData, transcripts: updatedTranscripts });
                        }}
                        className="radius-10"
                        style={{
                          borderColor: errors[`transcriptStartTime${index}`] ? '#cf0202' : '',
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className="div3">
                    {index === formData.transcripts.length - 1 ? (
                      <Button
                        variant="success"
                        className="flex-grow-1 w-100 btn-purpule py-2 radius-10 border-0"
                        onClick={handleAddTranscript}
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        className="flex-grow-1 w-100 btn-red py-2 radius-10 border-0"
                        onClick={() => handleRemoveTranscript(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {step === 4 && (
            <Form.Group className="mb-3">
              <Form.Label className='d-flex justify-content-between align-items-center'>
                Notes
                <div className="text-end">
                  <small>{formData.notes.length}/2000</small>
                </div>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.notes}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, notes: value });

                  // Clear error dynamically
                  if (value.trim().length >= 100) {
                    setErrors((prevErrors) => ({ ...prevErrors, notes: '' }));
                  }
                }}
                className="radius-10"
                style={{
                  minHeight: '150px',
                  height: '400px',
                  borderColor: errors.notes ? '#cf0202' : '',
                }}
              />
              {errors.notes && <div style={{ color: '#cf0202' }}>{errors.notes}</div>}
            </Form.Group>
          )}
          {step === 5 && (
            <Form.Group className="mb-3">
              <Form.Label className='d-flex justify-content-between align-items-center'>
                Summary
                <div className="text-end">
                  <small>{formData.summary.length}/2000</small>
                </div>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.summary}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, summary: value });

                  // Clear error dynamically
                  if (value.trim().length >= 100) {
                    setErrors((prevErrors) => ({ ...prevErrors, summary: '' }));
                  }
                }}
                className="radius-10"
                style={{
                  minHeight: '150px',
                  height: '400px',
                  borderColor: errors.summary ? '#cf0202' : '',
                }}
              />
              <div className="text-end">
                <small>{formData.summary.length}/2000</small>
              </div>
              {errors.summary && <div style={{ color: '#cf0202' }}>{errors.summary}</div>}
            </Form.Group>
          )}
          {step === 6 && (
            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <div
                {...getAttachmentsRootProps()}
                className="dropzone border rounded p-3 text-center radius-10 border-2-dash"
                style={{ cursor: 'pointer' }}
              >
                <input {...getAttachmentsInputProps()} />
                <p>Drag & drop files here, or click to select files</p>
              </div>
              {/* {formData.attachments.length > 0 && (
                <ul>
                  {formData.attachments.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )} */}
              {attachmentsPreview.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {attachmentsPreview.map((preview, index) => (
                    <div key={index} className="position-relative">
                      <Image
                        src={preview}
                        style={{ maxWidth: '120px' }}
                        alt={`Attachment ${index}`}
                        thumbnail
                        className='h-100'
                      />
                      <Button
                        variant="danger"
                        className="btn-preview-close"
                        onClick={() => {
                          // Remove the selected attachment and its preview
                          const updatedAttachments = formData.attachments.filter((_, i) => i !== index);
                          const updatedPreviews = attachmentsPreview.filter((_, i) => i !== index);
                          setFormData({ ...formData, attachments: updatedAttachments });
                          setAttachmentsPreview(updatedPreviews);
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" className='btn-gray-2 border-0 text-dark py-2 px-4 radius-10' onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {step < 6 && (
          <Button variant="primary" className='btn-purpule border-0 py-2 px-4 radius-10' onClick={handleNext}>
            Next
          </Button>
        )}
        {step === 6 && (
          <Button variant="success" className='btn-green border-0 py-2 px-4 radius-10' onClick={handleFormSubmit}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};


const Education = () => {

  const [search, setSearch] = useState('');
  const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false);

  const sampleCategory = [
    { img: 'Concept_152-02.png', caption: 'Commercial Gym', seat: '1', duration: '17-5-2005 - 29-7-2025' },
    { img: 'education-6-app.png', caption: 'CrossFit Boxes', seat: '5', duration: '25-5-2005 - 25-7-2025' },
    { img: 'HD_M148_010.jpg', caption: 'Powerlifting Gyms', seat: '3', duration: '28-5-2005 - 11-7-2025' },
    { img: 'sport_1.jpg', caption: 'Bodybuilding Gyms', seat: '1', duration: '19-5-2005 - 25-9-2025' },
    { img: 'THG_M294_09.jpg', caption: 'Home Gyms', seat: '2', duration: '25-5-2005 - 25-7-2025' },
    { img: 'TV_M186_06.jpg', caption: 'Combat Gyms', seat: '3', duration: '25-5-2005 - 25-7-2025' },
    { img: 'VNU_M551_11.jpg', caption: 'Sports Performance', seat: '3', duration: '25-5-2005 - 25-7-2025' },
    { img: 'gym.png', caption: 'Fitness Clubs', seat: '4', duration: '25-5-2005 - 25-7-2025' },
  ]


  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <div className="custom-main-container">
          <div id="content">
            <Card className='create-education-card'>
              <Card.Body className='d-flex justify-content-between align-items-center w-100'>
                <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Education</h2>
                <Button variant="primary" className='py-0 btn-purpule' style={{ fontWeight: '400' }} onClick={() => setShowCreateSubjectModal(true)}>
                  Create New Subject
                </Button>
              </Card.Body>
            </Card>

            <CreateSubjectModal
              show={showCreateSubjectModal}
              handleClose={() => setShowCreateSubjectModal(false)}
            />

            <Row className="g-3 mb-3 subject-create-new-model">
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Search by caption..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-100 radius-8"
                />
              </Col>
              {sampleCategory.filter(sub => sub.caption.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                sampleCategory
                  .filter(sub => sub.caption.toLowerCase().includes(search.toLowerCase()))
                  .map((sub, id) => {
                    return (
                      <Col key={id} md={6} sm={6}>
                        <Link to="/subjectDetail">
                          <Card className="education-subject-card border">
                            <Card.Body className='img-div'>
                              <Image src={`./Sample/gym/${sub.img}`} className='w-100 transition-transform duration-300 hover:scale-110' alt={sub.caption} />
                              <div className='caption'>{sub.caption}</div>
                            </Card.Body>
                            <Card.Body className='d-flex flex-column caption-area'>
                              <h4 className='text-dark'>Avaiable Seats: {sub.seat}</h4>
                              <p className='text-dark mb-0'>
                                Duration: {sub.duration}
                              </p>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    );
                  })
              ) : (
                <NoDataFound
                  message="No Content Available!"
                  containerClassName="text-center py-5 col-12"
                />
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
