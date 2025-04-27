import React, { useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import axios from '../../../utils/axios';
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Badge } from "react-bootstrap";
import { Image } from "react-bootstrap";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';
import toast from 'react-hot-toast';


import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

SwiperCore.use([Autoplay]);

const CreateCategoryModal = ({ show, handleClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Category name is required.';
    }
    if (!categoryImage) {
      newErrors.categoryImage = 'Category image is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Handle category creation logic here
    console.log('Category Name:', categoryName);
    console.log('Category Image:', categoryImage);

    Swal.fire({
      icon: 'success',
      title: 'Category Created',
      text: 'Your category has been successfully created!',
    });

    // Reset form and close modal
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setCategoryName('');
    setCategoryImage(null);
    setErrors({});
  };

  const handleModalClose = () => {
    if (categoryName || categoryImage) {
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

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              className='radius-10'
              onChange={(e) => setCategoryName(e.target.value)}
              isInvalid={!!errors.categoryName}
            />
            {errors.categoryName && (
              <Form.Text className="text-danger">{errors.categoryName}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              className='radius-10'
              onChange={(e) => setCategoryImage(e.target.files[0])}
              isInvalid={!!errors.categoryImage}
            />
            {errors.categoryImage && (
              <Form.Text className="text-danger">{errors.categoryImage}</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 radius-10 btn-purpule">
            Create Category
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Education = () => {
  const { userData } = useContext(UserContext);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [educationContents, setEducationContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    visibility: 'public',
    password: '',
    image: null,
    short_description: '',
    description: '',
    category_id: '',
    media: null,
    video_url: ''
  });

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  useEffect(() => {
    fetchEducationContents();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchEducationContents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/education-contents');
      setEducationContents(response.data);
    } catch (error) {
      console.error('Error fetching education contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    }
    else if (name === "media") {
      setFormData({ ...formData, [name]: files });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }

    const updatedValue =
      name === 'image' ? files[0] :
        name === 'media' ? files :
          value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('short_description', formData.short_description);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('video_url', formData.video_url);

    // Only append image if it's a new file or we're creating new content
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image);
    }
    if (formData.media != null) {
      if (formData.media && formData.media.length > 0) {
        for (let i = 0; i < formData.media.length; i++) {
          formDataToSend.append('media[]', formData.media[i]);
        }
      }
    }
    formDataToSend.append('visibility', formData.visibility);
    if (formData.password) {
      formDataToSend.append('password', formData.password);
    }

    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };

      if (isEditMode) {
        // Add _method field for Laravel to handle PUT request properly
        formDataToSend.append('_method', 'PUT');
        response = await axios.post(`${baseurl}/api/education-contents/${editingContent.id}`, formDataToSend, config);
        setEducationContents(prevContents =>
          prevContents.map(content =>
            content.id === editingContent.id ? response.data : content
          )
        );
      } else {
        response = await axios.post(`${baseurl}/api/education-contents`, formDataToSend, config);
        setEducationContents(prevContents => [...prevContents, response.data]);
      }

      setShowModal(false);
      setFormData({
        title: '',
        category_id: '',
        media: null,
        visibility: 'public',
        password: '',
        short_description: '',
        description: '',
        video_url: '',
        image: null
      });
      setIsEditMode(false);
      setEditingContent(null);
      toast.success(`Content ${isEditMode ? 'updated' : 'created'} successfully`);
      fetchEducationContents(); // Refresh the list to ensure we have the latest data
    } catch (error) {
      console.error('Error:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Error saving content');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWatchVideo = (videoUrl, contentId) => {
    if (!userData) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to watch videos',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/sign-in';
        }
      });
      return;
    }

    setSelectedVideo(videoUrl);
    setSelectedContentId(contentId);
    setPointsAwarded(false);
    setShowVideoModal(true);
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      visibility: content.visibility,
      title: content.title,
      category_id: content.category_id,
      short_description: content.short_description,
      description: content.description,
      video_url: content.video_url
    });
    setShowModal(true);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${baseurl}/api/education-contents/${id}`);
        setEducationContents(prevContents =>
          prevContents.filter(content => content.id !== id)
        );
        toast.success('Content deleted successfully');
      } catch (error) {
        toast.error('Error deleting content');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isYoutubeUrl = (url) => {
    return url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&?\n]+)/);
  };

  const getYoutubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&?\n]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?enablejsapi=1` : url;
  };

  const handleVideoTimeUpdate = async (e) => {
    if (!videoRef.current || pointsAwarded) return;

    let progress;
    if (isYoutubeUrl(selectedVideo)) {
      // For YouTube videos, we'll handle this differently
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
      }
    } else {
      // For direct video files
      const video = videoRef.current;
      progress = (video.currentTime / video.duration) * 100;

      if (progress >= 80 && !pointsAwarded) {
        try {
          await axios.post('/api/award-video-points', {
            content_id: selectedContentId,
            user_id: userData.id
          });
          setPointsAwarded(true);
          Swal.fire({
            title: 'Points Awarded!',
            text: 'You have earned 1 point for watching this video',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error awarding points:', error);
        }
      }
    }
  };

  const handleYouTubePlayerStateChange = async (event) => {
    if (!pointsAwarded && event.data === window.YT.PlayerState.PLAYING) {
      const duration = event.target.getDuration();
      const currentTime = event.target.getCurrentTime();
      const progress = (currentTime / duration) * 100;

      if (progress >= 80 && !pointsAwarded) {
        try {
          await axios.post('/api/award-video-points', {
            content_id: selectedContentId,
            user_id: userData.id
          });
          setPointsAwarded(true);
          Swal.fire({
            title: 'Points Awarded!',
            text: 'You have earned 1 point for watching this video',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error awarding points:', error);
        }
      }
    }
  };

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      // YouTube API is ready
    };
  }, []);

  const handleModalClose = () => {
    setShowVideoModal(false);
    setSelectedVideo('');
    setSelectedContentId(null);
    setPointsAwarded(false);

  };

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  const handleUnlock = (content) => {
    setSelectedContent(content);
    setShowUnlockModal(true);
  };

  const handleUnlockSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/unlock-content', {
        content_id: selectedContent.id,
        password: unlockPassword
      });

      if (response.data.content) {
        // Update the content in the list
        const updatedContent = response.data.content;
        setEducationContents(prevContents =>
          prevContents.map(content =>
            content.id === updatedContent.id ? updatedContent : content
          )
        );
        toast.success('Content unlocked successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to unlock content');
    } finally {
      setIsLoading(false);
      setShowUnlockModal(false);
      setUnlockPassword('');
      setSelectedContent(null);
    }
  };

  const [search, setSearch] = useState('');

  const sampleCategory = [
    { img: 'gym.png', caption: 'Gym' },
    { img: 'education.png', caption: 'Education' },
    { img: 'crypto.png', caption: 'Crypto' },
    { img: 'buisness.png', caption: 'Buisness' },
    { img: 'gym2.png', caption: 'Fitness' },
    { img: 'mindset.png', caption: 'MindSet' },
  ]


  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <div className="custom-main-container">
          <div id="content">
            <Card className='create-education-card'>
              <Card.Body className='d-flex justify-content-between align-items-center w-100'>
                <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Education Content</h2>
                <div className="d-flex justify-content-end gap-2 align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => setShowCreateCategoryModal(true)}
                    className='py-0 btn-purpule'
                    style={{ fontWeight: '400' }}
                  >
                    Create New Category
                  </Button>
                  {userData && userData?.permissions[0]?.can_create_education === 1 && (
                    <Button className='py-0 btn-purpule' variant="primary" style={{ fontWeight: '400' }} onClick={() => setShowModal(true)}>
                      Add New Content
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>

            <CreateCategoryModal
              show={showCreateCategoryModal}
              handleClose={() => setShowCreateCategoryModal(false)}
            />

            <Modal show={showUnlockModal} onHide={() => setShowUnlockModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Unlock Content</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  handleUnlockSubmit();
                }}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={unlockPassword}
                      onChange={(e) => setUnlockPassword(e.target.value)}
                      required
                      className='radius-8'
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowUnlockModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUnlockSubmit}>
                  Unlock
                </Button>
              </Modal.Footer>
            </Modal>

            <Row className="g-3 mb-3">
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Search by caption..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-100 radius-8"
                />
              </Col>
              {sampleCategory.filter(cat => cat.caption.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                sampleCategory
                  .filter(cat => cat.caption.toLowerCase().includes(search.toLowerCase()))
                  .map((cat, id) => {
                    return (
                      <Col key={id} md={4} sm={6}>
                        <Link to="/subject">
                          <Card className="education-category-card">
                            <Card.Body>
                              <Image src={`./Sample/${cat.img}`} className='w-100 transition-transform duration-300 hover:scale-110' alt={cat.caption} />
                              <div className='caption'>{cat.caption}</div>
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

            {/* {isLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Row>
                {educationContents.length > 0 ? (
                  educationContents.map((content) => (
                    <Col sm={12} key={content.id}>
                      <Card className="education-card">
                        <div className="edu-card-img">
                          <Image
                            src={
                              content?.image_path
                                ? `${baseurl}/data/images/education/${content.image_path}`
                                : `${baseurl}/data/images/education/blurred_0RmyStUTRI8PEBCDcW8m.jpg`
                            }
                            alt={content.title}
                            loading="lazy"
                            className="card-img-top"
                            onError={(e) => {
                              e.target.onerror = null; // Prevents infinite fallback loop
                              e.target.src = `${baseurl}/data/images/education/blurred_0RmyStUTRI8PEBCDcW8m.jpg`;
                            }}
                            fluid // Optional: for responsive images
                          />
                        </div>

                        <Card.Body className="">
                          <h4 className="card-title turncate-1 elipsis-1 mb-3" style={{ fontSize: 16, fontWeight: '600' }}>{content.title}</h4>
                          <p className="card-text turncate-3 paragraph-holder elipsis-3 mb-5" style={{ fontSize: '14px', lineHeight: '1.4', fontWeight: '400' }}>{content.short_description}</p>
                          <Button
                            variant='primary'
                            className="btn-purpule radius-10"
                            onClick={() => handleWatchVideo(content.video_url, content.id)}
                            disabled={isLoading}
                          >
                            View Detail
                          </Button>
                        </Card.Body>

                        <div className="nav-bar-icon">
                          <Dropdown>
                            <Dropdown.Toggle className="bg-transparent toggle-drop-btn btn text-dark p-0 me-2">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-menu-holder">
                              <Dropdown.Item href="#">
                                {userData && userData?.permissions[0]?.can_create_education == 1 && (
                                  <Button
                                    className="btn d-flex align-items-center bg-transparent w-100 drop-edit-btn"
                                    onClick={() => handleEdit(content)}
                                    disabled={isLoading}
                                  >
                                    <svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3.81331 11.8953L3.8133 11.8953C3.80074 11.9078 3.78806 11.9205 3.77531 11.9332C3.61906 12.0888 3.45105 12.2561 3.33204 12.4663C3.21302 12.6765 3.15597 12.9067 3.1029 13.1208C3.09857 13.1382 3.09427 13.1556 3.08996 13.1728L2.34951 16.1346C2.34689 16.1451 2.34421 16.1558 2.34149 16.1666C2.30367 16.3174 2.25729 16.5023 2.24165 16.6622C2.22397 16.8429 2.22239 17.1994 2.51149 17.4885C2.80058 17.7776 3.15709 17.776 3.3378 17.7584C3.49775 17.7427 3.68261 17.6963 3.8334 17.6585C3.84423 17.6558 3.85489 17.6531 3.86535 17.6505L6.82717 16.91C6.8444 16.9057 6.86176 16.9014 6.87923 16.8971C7.09329 16.844 7.32346 16.787 7.53367 16.668C7.74387 16.549 7.91121 16.3809 8.06684 16.2247C8.07955 16.2119 8.09217 16.1993 8.10474 16.1867L15.9911 8.30031L16.0228 8.26867C16.3288 7.96266 16.6095 7.68209 16.8071 7.42314C17.0246 7.13798 17.2108 6.79279 17.2108 6.35577C17.2108 5.91874 17.0246 5.57355 16.8071 5.2884C16.6095 5.02944 16.3288 4.74887 16.0228 4.44286L15.9911 4.41123L15.5888 4.00888L15.5572 3.97726C15.2511 3.67117 14.9706 3.39052 14.7116 3.19295C14.4264 2.97538 14.0813 2.78921 13.6442 2.78921C13.2072 2.78921 12.862 2.97538 12.5769 3.19295C12.3179 3.39052 12.0373 3.67115 11.7313 3.97723C11.7208 3.98775 11.7103 3.9983 11.6997 4.00888L3.81331 11.8953Z" stroke="#1E1E1E" stroke-width="1.5" />
                                      <path d="M10.875 5.125L14.875 9.125" stroke="#1E1E1E" stroke-width="1.5" />
                                    </svg>
                                    <div className="text-black dropdown-edit-btn">Edit</div>
                                  </Button>
                                )}
                              </Dropdown.Item>
                              <Dropdown.Item href="#">
                                {userData && userData?.permissions[0]?.can_create_education == 1 && (
                                  <Button
                                    className="btn d-flex align-items-center bg-transparent w-100 delete-edit-btn"
                                    onClick={() => handleDelete(content.id)}
                                    disabled={isLoading}
                                  >
                                    <svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M7.0835 4.14169L7.26683 3.05002C7.40016 2.25835 7.50016 1.66669 8.9085 1.66669H11.0918C12.5002 1.66669 12.6085 2.29169 12.7335 3.05835L12.9168 4.14169" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M15.7082 7.61664L15.1665 16.0083C15.0748 17.3166 14.9998 18.3333 12.6748 18.3333H7.32484C4.99984 18.3333 4.92484 17.3166 4.83317 16.0083L4.2915 7.61664" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M8.6084 13.75H11.3834" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M7.9165 10.4167H12.0832" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="text-black dropdown-delete-btn">Delete</div>
                                  </Button>
                                )}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>

                      </Card>
                    </Col>
                  ))
                ) : (
                  <NoDataFound
                    message="No educational content available at the moment."
                    containerClassName="text-center py-5 col-12"
                  />
                )}
              </Row>
            )} */}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        show={showVideoModal}
        onHide={handleModalClose}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Watch Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ratio ratio-16x9">
            {isYoutubeUrl(selectedVideo) ? (
              <iframe
                src={getYoutubeEmbedUrl(selectedVideo)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={(e) => {
                  if (window.YT && window.YT.Player) {
                    new window.YT.Player(e.target, {
                      events: {
                        onStateChange: handleYouTubePlayerStateChange
                      }
                    });
                  }
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={selectedVideo}
                className="w-100"
                controls
                onTimeUpdate={handleVideoTimeUpdate}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Content Modal */}
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setIsEditMode(false);
        setEditingContent(null);
        setFormData({
          category_id: '',
          visibility: 'public',
          password: '',
          media: null,
          title: '',
          short_description: '',
          description: '',
          video_url: '',
          image: null
        });
      }} size="lg">
        <Modal.Header className="d-flex justify-content-between p-3">
          <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
            <div className="d-flex align-items-center flex-grow-1">
              {isEditMode ? 'Edit Education Content' : 'Add New Education Content'}
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={() => setShowModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
              <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Visibility</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" className="w-100 radius-8">
                  <Badge bg={formData.visibility === 'public' ? 'success' : formData.visibility === 'private' ? 'warning' : 'danger'}>
                    {formData.visibility === 'public' ? 'Public' : formData.visibility === 'private' ? 'Private' : 'Password Protected'}
                  </Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFormData({ ...formData, visibility: 'public' })}>Public</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFormData({ ...formData, visibility: 'private' })}>Private</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowPasswordModal(true)}>Password Protected</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Set Password Protection</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className='radius-8'
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                  setFormData({ ...formData, visibility: 'password_protected' });
                  setShowPasswordModal(false);
                }}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className='radius-8'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category_id"
                value={formData.category_id}
                onChange={
                  (event) => {
                    setFormData({
                      ...formData,
                      category_id: event.target.value
                    });
                  }
                }
                className='radius-8'
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Media</Form.Label>
              <Form.Control
                type="file"
                name="media"
                multiple
                onChange={handleInputChange}
                accept="*/*"
                className='radius-8'
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Main Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required={isEditMode ? false : true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                as="textarea"
                name="short_description"
                value={formData.short_description}
                onChange={handleInputChange}
                rows={3}
                required
                className='radius-8'
                placeholder='Write here...'
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
                className='radius-8'
                placeholder='Write here...'
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Video URL *</Form.Label>
              <Form.Control
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                placeholder="https://..."
                required
                className='radius-8'
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className='btn-purpule w-100 radius-8'
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isEditMode ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                isEditMode ? 'Update Content' : 'Save Content'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Education;
