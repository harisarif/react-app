import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import axios from '../utils/axios';
import { UserContext } from '../context/UserContext';
import { getProfileImageUrl } from '../utils/helpers';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import CreateJob from './job/CreateJob';
import toast from 'react-hot-toast';

import { IoIosHeartEmpty } from "react-icons/io";

//images
import user1 from "../assets/images/user/1.jpg";
import img1 from "../assets/images/icon/02.png";
import img2 from "../assets/images/icon/02.png";
import img3 from "../assets/images/icon/03.png";

const CreatePost = ({ 
  posts, 
  setPosts, 
  userCanCreatePostCategories, 
  className, 
  editPostData,  
  onEditComplete  
}) => {
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({ images: [], videos: [], documents: [] });
  const [previews, setPreviews] = useState({ images: [], videos: [], documents: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }));
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    images: [],
    videos: [],
    documents: [],
    visibility: 'public'
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    type: 'conference',
    is_active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set default category based on URL
    const path = location.pathname;
    let defaultCategoryId = '';

    if (path.includes('/business')) {
      defaultCategoryId = '1';
    } else if (path.includes('/fitness')) {
      defaultCategoryId = '2';
    } else if (path.includes('/crypto')) {
      defaultCategoryId = '3';
    } else if (path.includes('/mindset')) {
      defaultCategoryId = '4';
    }

    if (defaultCategoryId) {
      setFormData(prev => ({
        ...prev,
        category_id: defaultCategoryId
      }));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (editPostData) {
      setShow(true);
      setIsEditing(true);
      // Prepare form data from edit post data
      setFormData({
        title: editPostData.title || '',
        description: editPostData.description || '',
        category_id: editPostData.category_id || '',
        images: editPostData.images || [],
        videos: editPostData.videos || [],
        documents: editPostData.documents || [],
        visibility: editPostData.visibility || 'public'
      });



      // Prepare previews
      const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
      setPreviews({
        images: editPostData.images?.map(img => `${baseurl}/data/images/${img}`) || [],
        videos: editPostData.videos?.map(video => `${baseurl}/data/videos/${video}`) || [],
        documents: editPostData.documents?.map(doc => doc.split('/').pop()) || []
      });

      setSelectedFiles({
        images: editPostData.images || [],
        videos: editPostData.videos || [],
        documents: editPostData.documents || []
      });
    }
  }, [editPostData]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const filteredCategories = response.data.filter((item) =>
        userCanCreatePostCategories?.includes(item.id)
      );
      setCategories(filteredCategories); // Set the filtered categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

  const hasUnsavedChanges = () => {
    const hasContent = formData.title && formData.title.trim() !== '';
    const hasDescription = formData.description && formData.description.trim() !== '';
    const hasImages = formData.images && formData.images.length > 0;
    const hasVideos = formData.videos && formData.videos.length > 0;
    const hasDocuments = formData.documents && formData.documents.length > 0;
    const hasModifiedVisibility = formData.visibility !== 'public';
    const hasModifiedCategory = formData.category_id !== undefined;

    return hasContent || hasDescription || hasImages || hasVideos || hasDocuments || 
           hasModifiedVisibility || hasModifiedCategory;
  };

  const handleClose = (bypassConfirmation = false) => {
    // Check if there are unsaved changes and confirmation is not bypassed
    if (!bypassConfirmation && hasUnsavedChanges()) {
      setShowDiscardConfirmation(true);
      return; // Stop here to show confirmation
    }

    // Reset all form-related states
    setIsEditing(false);
    setSelectedFiles({ images: [], videos: [], documents: [] });
    setPreviews({ images: [], videos: [], documents: [] });
    setFormData({
      title: '',
      description: '',
      category_id: '',
      images: [],
      videos: [],
      documents: [],
      visibility: 'public'
    });

    // Call edit complete callback if in edit mode
    if (isEditing && onEditComplete) {
      onEditComplete(null);
    }

    // Close the modal
    setShow(false);
    setShowDiscardConfirmation(false);
  };

  const confirmDiscard = () => {
    setShowDiscardConfirmation(false);
    setIsEditing(false);
    setSelectedFiles({ images: [], videos: [], documents: [] });
    setPreviews({ images: [], videos: [], documents: [] });
    setFormData({
      title: '',
      description: '',
      category_id: '',
      images: [],
      videos: [],
      documents: [],
      visibility: 'public'
    });

    if (isEditing && onEditComplete) {
      onEditComplete(null);
    }
    setShow(false);
  };

  const cancelDiscard = () => {
    setShowDiscardConfirmation(false);
  };

  const handleShow = () => {
    if (!userData || userCanCreatePostCategories?.includes(1, 2, 3, 4, 5)) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Only Admin can create posts',
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
    setShow(true);
  };

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

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
      videos: [...formData.videos, ...newVideos],
      documents: [...formData.documents, ...newDocuments]
    });
  };

  const removeFile = (type, index) => {
    const newFiles = { ...selectedFiles };
    const newPreviews = { ...previews };
    const newFormData = { ...formData };

    if (type === 'images' || type === 'videos') {
      URL.revokeObjectURL(newPreviews[type][index]);
    }
    newFiles[type].splice(index, 1);
    newPreviews[type].splice(index, 1);
    newFormData[type].splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setFormData(newFormData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSubmit = new FormData();
    
    formDataToSubmit.append('visibility', formData.visibility || 'public');
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('selectedStyle', selectedStyle || null);
    formDataToSubmit.append('category_id', formData.category_id);
    
    if (isEditing && editPostData?.id) {
      formDataToSubmit.append('_method', 'PUT');
    }

    const keptImages = formData.images.filter(img => typeof img === 'string');
    const keptVideos = formData.videos.filter(video => typeof video === 'string');
    const keptDocuments = formData.documents.filter(doc => typeof doc === 'string');

    if (keptImages.length > 0) {
      formDataToSubmit.append('kept_images', JSON.stringify(keptImages));
    }
    if (keptVideos.length > 0) {
      formDataToSubmit.append('kept_videos', JSON.stringify(keptVideos));
    }
    if (keptDocuments.length > 0) {
      formDataToSubmit.append('kept_documents', JSON.stringify(keptDocuments));
    }

    const newImages = formData.images.filter(img => img instanceof File);
    const newVideos = formData.videos.filter(video => video instanceof File);
    const newDocuments = formData.documents.filter(doc => doc instanceof File);

    newImages.forEach((file, index) => {
      formDataToSubmit.append(`images[${index}]`, file);
    });
    newVideos.forEach((file, index) => {
      formDataToSubmit.append(`videos[${index}]`, file);
    });
    newDocuments.forEach((file, index) => {
      formDataToSubmit.append(`documents[${index}]`, file);
    });

    if (formData.visibility === 'password_protected') {
      formDataToSubmit.append('password', formData.password);
    }

    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      let response;
      if (isEditing && editPostData?.id) {
        response = await axios.post(`/api/posts/${editPostData.id}`, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data && response.data.post) {
          toast.success('Post updated successfully!');
          
          if (onEditComplete) {
            onEditComplete(response.data.post);
          }
        }
      } else {
        response = await axios.post('/api/posts', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data && response.data.post) {
          toast.success('Post created successfully!');
          setPosts(prevPosts => [response.data.post, ...prevPosts]);
        }
      }

      handleClose(true);
    } catch (error) {
      console.error('Error saving post:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Something went wrong while saving the post!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisibilityChange = (visibility) => {
    setFormData((prev) => ({
      ...prev,
      visibility: visibility || prev.visibility, // If no value, keep previous value
    }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/events', eventFormData);
      toast.success('Event created successfully!');
      setShowEventModal(false);
      setEventFormData({
        title: '',
        subtitle: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
        type: 'conference',
        is_active: true
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEventDescriptionChange = (value) => {
    setEventFormData(prev => ({
      ...prev,
      description: value
    }));
  };

  useEffect(() => {
    if (!formData.visibility) {
      setFormData((prev) => ({
        ...prev,
        visibility: prev.visibility === "public" ? "private" : "public",
      }));
    }
  }, [formData.visibility]);

  const [colorPanel, setColorPanel] = useState(false);

  const modalClose = {
    fontSize: '18px', background: '#bbb', padding: '3px',
  }
  const postViewChanger = {
    height: 'fit-content', minWidth: 'fit-content', maxWidth: '100px',
  }
  const postViewIcon = {
    fontSize: '16px'
  }
  const uploadBtn = {
    width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    border: '2px solid #dddddd', background: '#fff', borderRadius: '8px',
    fontSize: '28px'
  }
  const imageView = {
    width: "80px", height: "80px", objectFit: "cover", border: '2px solid #dddddd', borderRadius: '8px'
  }
  const videoView = {
    width: "80px", height: "80px", border: '2px solid #dddddd', borderRadius: '8px'
  }
  const uploadIcon = {
    color: '#d3d3d3', fontSize: '28px'
  }
  const docVeiw = {
    width: '80px', height: '80px', border: '2px solid #dddddd',
    display: 'flex', flexDirection: 'column', gap: '4px',
    justifyContent: 'center', alignItems: 'center'
  }

  const rubyText = {
    display: 'ruby-text',
  }

  const ex = (file) => {
    if (file instanceof File) {
      return file.name.split('.').pop();
    }
    if (typeof file === 'string') {
      return file.split('.').pop();
    }
    return '';
  };

  const [selectedStyle, setSelectedStyle] = useState(null);
  const quillRef = useRef(null);

  const styles = [
    {
      color: "#ff6b6b",
      textColor: "#fff",
    },
    {
      color: "#48dbfb",
      textColor: "#000",
    },
    {
      color: "#1dd1a1",
      textColor: "#fff",
    },
    {
      color: "#feca57",
      textColor: "#000",
    },
    {
      color: "#222f3e",
      textColor: "#fff",
    },
    {
      color: "linear-gradient(to right, #ff9a9e, #fad0c4)",
      textColor: "#000",
    },
  ];

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (selectedStyle) {
        editor.root.style.background = selectedStyle.color;
        editor.root.style.color = selectedStyle.textColor;
        editor.root.style.fontSize = "18px";
        editor.root.style.textAlign = "center";
        editor.root.style.minHeight = "250px";
        editor.root.style.padding = "30px 20px";
      } else {
        editor.root.style.background = "";
        editor.root.style.color = "";
        editor.root.style.fontSize = "";
        editor.root.style.textAlign = "";
        editor.root.style.minHeight = "";
        editor.root.style.padding = "";
      }
    }
  }, [selectedStyle]);

  const handleStyleClick = (style) => {
    setSelectedStyle(selectedStyle === style ? null : style);
  };

  const resetStyles = () => {
    setSelectedStyle(null);
  };

  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordProtectionData, setPasswordProtectionData] = useState({
    type: formData.visibility || 'public',
    password: ''
  });

  const handleVisibilityModalSubmit = () => {
    setFormData(prev => ({
      ...prev,
      visibility: passwordProtectionData.type,
      password: passwordProtectionData.type === 'password_protected' 
        ? passwordProtectionData.password 
        : ''
    }));
    setShowVisibilityModal(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordProtectionChange = (type) => {
    setPasswordProtectionData(prev => ({
      ...prev,
      type: type
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordProtectionData(prev => ({
      ...prev,
      password: e.target.value
    }));
  };

  return (
    <>
      <Card className={className}>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img
                src={getProfileImageUrl(userData)}
                alt="userimg"
                className="avatar-50 rounded-circle"
              />
            </div>
            <div className="post-text ms-2 w-100" onClick={handleShow}>
              <input
                type="text"
                className="form-control create-post-form-cntrl "
                placeholder={isEditing ? "Edit Post" : "Let's Post Something..."}
                style={{ cursor: "pointer" }}
                readOnly
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between create-post-icons-main">

            <div className="d-flex align-items-center photo-with-icon" onClick={handleShow} style={{ cursor: "pointer" }}>
              <span class="material-symbols-outlined">
                photo_library
              </span>
              <span>Photo/video</span>
            </div>
            <div 
              className="d-flex align-items-center event-with-icon" 
              onClick={() => setShowEventModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">
                event
              </span>
              <span>Events</span>
            </div>
            <div 
              className="d-flex align-items-center jobs-with-icon"
              onClick={() => setShowJobModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">
                work
              </span>
              <span>Jobs</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header className="d-flex justify-content-between p-3">

          <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
            <div className="d-flex align-items-center flex-grow-1">
              {(isEditing && editPostData?.id) ? 
              <h2 className="fs-16 fw-700 mb-0">Edit Post</h2> : 
              <h2 className="fs-16 fw-700 mb-0">Create Post</h2>
              }
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={() => handleClose(false)}>
            <span className="material-symbols-outlined text-dark rounded-4">close</span>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 gap-2 align-items-center mb-3">
            <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-40 rounded-circle" />
            <div className="d-flex flex-column gap-0">
              <h5 className="mb-0">{userData?.name}</h5>
              <div className="d-flex align-items-center">
                <Dropdown className="">
                  <Dropdown.Toggle variant="link" className="p-0" style={postViewChanger} onClick={() => setShowVisibilityModal(true)}>
                    <span
                      className={`badge py-0 px-4 d-flex gap-2 justify-content-center align-items-center ${formData.visibility === "public" ? "bg-primary" : formData.visibility === "private" ? "bg-danger" : "bg-warning"}`}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="material-symbols-outlined" style={postViewIcon}>
                        {formData.visibility === "public" ? "people" : 
                         formData.visibility === "private" ? "person" : "lock"}
                      </span>
                      {formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1).replace('_', ' ')}
                      <span className="material-symbols-outlined text-white" style={postViewIcon}>arrow_drop_down</span>
                    </span>
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <br />
            <div className="d-flex gap-1 overflow-auto">
              {categories.map(category => (
                <div className={`py-1 px-2 text-white rounded cursor-pointer border ${category.id.toString() === formData.category_id ? 'bg-primary-2' : 'bg-primary'}`}>
                  <input
                    type="radio"
                    key={category.id}
                    value={category.id}
                    checked={category.id.toString() === formData.category_id}
                    id={category.id}
                    style={{ display: 'none' }}
                    name="category_id"
                    onChange={handleInputChange}
                    required
                  />
                  <label for={category.id} className="cursor-pointer">{category.name.split(" ")[0]}</label>
                </div>
              ))}
            </div>
          </Form.Group>
          <div className="mb-3">

            <ReactQuill
              placeholder="Write something here..."
              value={formData.description}
              onChange={handleDescriptionChange}
              ref={quillRef}
              style={{}}
              onFocus={() => console.log('Description value:', formData.description)}
            />
          </div>

          <div className="position-relative">
            <div className="d-flex gap-2">
              <span className="border rounded bg-gradient color-plate" onClick={() => { setColorPanel(!colorPanel); resetStyles() }}>
                <span class="material-symbols-outlined">
                  {colorPanel ? "block" : ""}                  
                </span>
              </span>
              <div className={`${colorPanel ? "d-flex" : "d-none"} gap-2 color-panel`}>
                {styles.map((style, index) => (<span className={`border rounded color-plate`} style={{ background: style.color }} key={index} title="Click to Apply" onClick={() => handleStyleClick(style)}></span>))}
              </div>
            </div>
          </div>

          {Object.entries(previews).some(([_, files]) => true) && (
            <div className="preview-section mt-3">
              <h6 className="mb-2">Attachments</h6>
              <div className="d-flex gap-2 overflow-auto">
                <div className="position-relative">
                  <div className="file-upload-section">
                    <input
                      type="file"
                      multiple
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    />
                    <Button
                      className=""
                      onClick={() => fileInputRef.current.click()}
                      style={uploadBtn}
                    >
                      <span class="material-symbols-outlined" style={uploadIcon}>
                        cloud_upload
                      </span>
                    </Button>
                  </div>
                </div>
                {Object.entries(previews).flatMap(([type, files]) =>
                  files.map((preview, index) => (
                    <div key={`${type}-${index}`} className="position-relative">
                      {type === "images" && (
                        <img src={preview} alt="" style={imageView} />
                      )}

                      {type === "videos" && (
                        <video style={videoView} controls>
                          <source src={preview} />
                        </video>
                      )}

                      {type === "documents" && (
                        <div className="document-preview" style={docVeiw}>
                          <span class="material-symbols-outlined" style={uploadIcon}>
                            {
                              ex(selectedFiles[type][index].name) === 'pdf' ?
                                'picture_as_pdf' :
                                ex(selectedFiles[type][index].name) === 'doc' || ex(selectedFiles[type][index].name) === 'docx' ?
                                  'docs' :
                                  ex(selectedFiles[type][index].name) === 'xls' || ex(selectedFiles[type][index].name) === 'xlsx' ?
                                    'table' :
                                    ex(selectedFiles[type][index].name) === 'ppt' || ex(selectedFiles[type][index].name) === 'pptx' ?
                                      'jamboard_kiosk' : 'description'
                            }
                          </span>
                          {/* <span>{selectedFiles[type][index].name}</span> */}
                        </div>
                      )}

                      <button
                        className="btn position-absolute top-0 end-0" style={{ padding: '1px 5px 0px', background: '#d31717', borderRadius: '20px' }}
                        onClick={() => removeFile(type, index)}
                      >
                        <span class="material-symbols-outlined" style={{ fontSize: '12px' }}>
                          close
                        </span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="mt-3 w-100"
            disabled={isLoading || !formData.category_id || (!formData.description.trim() && !Object.values(selectedFiles).some(files => files.length > 0))}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                {isEditing ? 'Updating...' : 'Posting...'}
              </>
            ) : (isEditing ? 'Update' : 'Post')}
          </Button>

        </Modal.Body>
      </Modal>

      {showDiscardConfirmation && (
        <Modal size="sm" show={showDiscardConfirmation} onHide={cancelDiscard} centered>
          <Modal.Header closeButton>
            <Modal.Title>Discard Changes?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to discard your changes? All unsaved modifications will be lost.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDiscard}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDiscard}>
              Discard
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Visibility Selection Modal */}
      <Modal 
        show={showVisibilityModal} 
        onHide={() => setShowVisibilityModal(false)} 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Visibility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <div 
              className={`d-flex align-items-center px-3 py-2 rounded cursor-pointer ${passwordProtectionData.type === 'public' ? 'bg-primary text-white' : 'border'}`}
              onClick={() => handlePasswordProtectionChange('public')}
            >
              <span className="material-symbols-outlined me-3 fs-18">people</span>
              <div>
                <h6 className="mb-0">Public</h6>
                <small>Anyone can see your post</small>
              </div>
              {passwordProtectionData.type === 'public' && (
                <span className="material-symbols-outlined ms-auto">check_circle</span>
              )}
            </div>

            <div 
              className={`d-flex align-items-center px-3 py-2 rounded cursor-pointer ${passwordProtectionData.type === 'private' ? 'bg-primary text-white' : 'border'}`}
              onClick={() => handlePasswordProtectionChange('private')}
            >
              <span className="material-symbols-outlined me-3 fs-18">person</span>
              <div>
                <h6 className="mb-0">Private</h6>
                <small>Only you can see your post</small>
              </div>
              {passwordProtectionData.type === 'private' && (
                <span className="material-symbols-outlined ms-auto">check_circle</span>
              )}
            </div>

            <div 
              className={`d-flex align-items-center px-3 py-2 rounded cursor-pointer ${passwordProtectionData.type === 'password_protected' ? 'bg-primary text-white' : 'border'}`}
              onClick={() => handlePasswordProtectionChange('password_protected')}
            >
              <span className="material-symbols-outlined me-3 fs-18">lock</span>
              <div>
                <h6 className="mb-0">Password Protected</h6>
                <small>Only people with password can view</small>
              </div>
              {passwordProtectionData.type === 'password_protected' && (
                <span className="material-symbols-outlined ms-auto">check_circle</span>
              )}
            </div>

            {passwordProtectionData.type === 'password_protected' && (
              <div className="position-relative">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={passwordProtectionData.password}
                  onChange={handlePasswordChange}
                  className="pr-5"
                />
                <Button 
                  variant="link" 
                  className="position-absolute top-50 end-0 translate-middle-y"
                  onClick={togglePasswordVisibility}
                >
                  <span className="material-symbols-outlined">
                    {passwordVisible ? 'visibility_off' : 'visibility'}
                  </span>
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleVisibilityModalSubmit}
            disabled={passwordProtectionData.type === 'password_protected' && !passwordProtectionData.password.trim()}
          >
            Set Visibility
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Event Modal */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEventSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={eventFormData.title}
                onChange={handleEventInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                value={eventFormData.subtitle}
                onChange={handleEventInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                theme="snow"
                value={eventFormData.description}
                onChange={handleEventDescriptionChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="event_date"
                    value={eventFormData.event_date}
                    onChange={handleEventInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={eventFormData.start_time}
                    onChange={handleEventInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={eventFormData.end_time}
                    onChange={handleEventInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={eventFormData.type}
                onChange={handleEventInputChange}
              >
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="talk">Talk</option>
                <option value="seminar">Seminar</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                checked={eventFormData.is_active}
                onChange={handleEventInputChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button 
                variant="secondary" 
                className="me-2" 
                onClick={() => setShowEventModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : 'Create Event'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Job Modal */}
      <CreateJob 
        show={showJobModal} 
        onHide={() => setShowJobModal(false)}
        onJobCreated={() => {
          setShowJobModal(false);
          toast.success('Job created successfully!');
        }}
      />
    </>
  );
};
export default CreatePost;