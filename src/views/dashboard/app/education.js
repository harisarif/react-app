import React, { useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from '../../../utils/axios';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';
import toast from 'react-hot-toast';

//img
import profilebg8 from "../../../assets/images/page-img/profile-bg8.jpg";
import ed1 from "../../../assets/images/page-img/edu-card-1.png";
import ed2 from "../../../assets/images/page-img/edu-card-2.png";
import ed3 from "../../../assets/images/page-img/edu-card-3.png";
import ed4 from "../../../assets/images/page-img/edu-card.png";
//profile-header
import ProfileHeader from "../../../components/profile-header";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
// Import Swiper styles
// import 'swiper/swiper-bundle.min.css'

// install Swiper modules
<style></style>
SwiperCore.use([Autoplay]);

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
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    short_description: '',
    description: '',
    video_url: ''
  });

  useEffect(() => {
    fetchEducationContents();
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('short_description', formData.short_description);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('video_url', formData.video_url);
    
    // Only append image if it's a new file or we're creating new content
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image);
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
      title: content.title,
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

  return (
    <div id="content-page" className="content-inner">
      <div className="container">
        <div className="custom-container-card">
          <div id="content">
            <div className="d-flex justify-content-between mb-3">
              <h2>Education Content</h2>
              {userData && userData?.permissions[0]?.can_create_education == 1 && (
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Add New Content
                </Button>
              )}
            </div>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-3">
                {educationContents.length > 0 ? (
                  educationContents.map((content) => (
                    <div key={content.id} className="col-sm-6 col-lg-4">
                      <div className="card h-100">
                        <div className="edu-card-img">
                          <img 
                            src={content.image_path ? `${baseurl}/data/images/education/${content.image_path}` : 'placeholder-image-url'} 
                            className="card-img-top" 
                            alt={content.title} 
                            loading="lazy" 
                            onError={(e) => {
                              e.target.src = 'placeholder-image-url'; // Add a placeholder image URL
                            }}
                          />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title turncate-2">{content.title}</h4>
                          <p className="card-text turncate-3">{content.short_description}</p>
                          <div className="d-flex gap-2">
                            <Button 
                              className="btn btn-primary flex-grow-1"
                              onClick={() => handleWatchVideo(content.video_url, content.id)}
                              disabled={isLoading}
                            >
                              Watch Video
                            </Button>
                            {userData && userData?.permissions[0]?.can_create_education == 1 && (
                              <>
                                <Button 
                                  className="btn btn-warning"
                                  onClick={() => handleEdit(content)}
                                  disabled={isLoading}
                                >
                                  <i className="fas fa-edit"></i>
                                </Button>
                                <Button 
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(content.id)}
                                  disabled={isLoading}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoDataFound 
                    message="No educational content available at the moment." 
                    containerClassName="text-center py-5 col-12"
                  />
                )}
              </div>
            )}
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
          title: '',
          short_description: '',
          description: '',
          video_url: '',
          image: null
        });
      }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? 'Edit Education Content' : 'Add New Education Content'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
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
