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

    return hasContent || hasDescription || hasImages || hasVideos || hasDocuments || 
           hasModifiedVisibility;
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
        cancelButtonText: 'Cancel',
        backdrop: true,
        background: '#fff',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
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

    if(!formData.title){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a title',
        heightAuto: false,
        backdrop: true,
        background: '#fff',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    }

    if(!formData.description){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a description',
        heightAuto: false,
        backdrop: true,
        background: '#fff',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    }

    if(!formData.category_id){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a category',
        heightAuto: false,
        backdrop: true,
        background: '#fff',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    }

    const formDataToSubmit = new FormData();
    
    formDataToSubmit.append('visibility', formData.visibility || 'public');
    formDataToSubmit.append('title', formData.title);
    if(selectedStyle){
      const div = document.createElement('div');
      div.style.background = selectedStyle.color;
      div.style.color = selectedStyle.textColor;
      div.style.fontSize = "18px";
      div.style.textAlign = "center";
      div.style.minHeight = "250px";
      div.style.padding = "30px 20px";
      div.innerHTML = formData.description;
      formDataToSubmit.append('description', new XMLSerializer().serializeToString(div));
    }else{
      formDataToSubmit.append('description', formData.description);
    }
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
                placeholder={isEditing ? "Edit Post" : "Create a post!"}
                style={{ cursor: "pointer" }}
                readOnly
              />
            </div>
          </div>
          <div className="create-post-icons-main">

            <div className="d-flex align-items-center photo-with-icon" onClick={handleShow} style={{ cursor: "pointer" }}>
              {/* <span class="material-symbols-outlined">
                photo_library
              </span> */}
             
<span>
<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5393 6.32911C12.9255 6.32911 13.2958 6.19032 13.5689 5.94327C13.8419 5.69623 13.9953 5.36116 13.9953 5.01178C13.9953 4.6624 13.8419 4.32733 13.5689 4.08028C13.2958 3.83323 12.9255 3.69444 12.5393 3.69444C12.1532 3.69444 11.7828 3.83323 11.5098 4.08028C11.2367 4.32733 11.0833 4.6624 11.0833 5.01178C11.0833 5.36116 11.2367 5.69623 11.5098 5.94327C11.7828 6.19032 12.1532 6.32911 12.5393 6.32911ZM3.79167 0C2.78605 0 1.82163 0.361432 1.11055 1.00479C0.399478 1.64814 0 2.52072 0 3.43056V12.9306C0 13.8404 0.399478 14.713 1.11055 15.3563C1.82163 15.9997 2.78605 16.3611 3.79167 16.3611H14.2917C15.2973 16.3611 16.2617 15.9997 16.9728 15.3563C17.6839 14.713 18.0833 13.8404 18.0833 12.9306V3.43056C18.0833 2.52072 17.6839 1.64814 16.9728 1.00479C16.2617 0.361432 15.2973 0 14.2917 0H3.79167ZM1.75 3.43056C1.75 2.41089 2.66467 1.58333 3.79167 1.58333H14.2917C15.4187 1.58333 16.3333 2.41089 16.3333 3.43056V12.9306C16.3333 13.1744 16.2808 13.4077 16.1863 13.6209L10.8348 9.0915C10.3485 8.67995 9.70754 8.451 9.04167 8.451C8.37579 8.451 7.7348 8.67995 7.2485 9.0915L1.897 13.6198C1.80111 13.4003 1.75126 13.1666 1.75 12.9306V3.43056ZM9.639 10.2473L14.8948 14.6954C14.7035 14.7489 14.5024 14.7764 14.2917 14.7778H3.79167C3.58089 14.7778 3.37983 14.7503 3.1885 14.6954L8.44317 10.2473C8.60529 10.1101 8.81903 10.0337 9.04108 10.0337C9.26313 10.0337 9.47688 10.1101 9.639 10.2473ZM6.70833 19C6.0714 19.0002 5.44466 18.8553 4.88597 18.5786C4.32727 18.3019 3.85463 17.9023 3.51167 17.4167H14.875C16.0353 17.4167 17.1481 16.9996 17.9686 16.2573C18.7891 15.515 19.25 14.5081 19.25 13.4583V3.17828C19.7867 3.48858 20.2284 3.91621 20.5342 4.42169C20.8401 4.92718 21.0003 5.49423 21 6.0705V13.4594C20.9997 14.9289 20.3542 16.3382 19.2056 17.3773C18.057 18.4163 16.4992 19 14.875 19H6.70833Z" fill="#378FE9"/>
</svg>      
              </span>

              <span>Photos</span>
            </div>
            <div className="d-flex align-items-center photo-with-icon" onClick={handleShow} style={{ cursor: "pointer" }}>
              {/* <span class="material-symbols-outlined">
                videocam
              </span> */}
            <span>
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 11.7391V3.26087C1 2.66125 1.23413 2.08619 1.65087 1.66219C2.06762 1.2382 2.63285 1 3.22222 1H12.6667C13.256 1 13.8213 1.2382 14.238 1.66219C14.6548 2.08619 14.8889 2.66125 14.8889 3.26087V11.7391C14.8889 12.3388 14.6548 12.9138 14.238 13.3378C13.8213 13.7618 13.256 14 12.6667 14H3.22222C2.63285 14 2.06762 13.7618 1.65087 13.3378C1.23413 12.9138 1 12.3388 1 11.7391ZM20.0756 1.83765L15.6311 5.86539C15.5725 5.91831 15.5256 5.98324 15.4935 6.05591C15.4613 6.12857 15.4446 6.20734 15.4444 6.28704V8.29696C15.4446 8.37666 15.4613 8.45542 15.4935 8.52809C15.5256 8.60076 15.5725 8.66569 15.6311 8.71861L20.0756 12.7463C20.1556 12.8187 20.2546 12.8659 20.3604 12.8824C20.4663 12.8989 20.5745 12.8839 20.6722 12.8392C20.7699 12.7946 20.8528 12.7221 20.911 12.6306C20.9691 12.5392 21 12.4325 21 12.3236V2.26043C21 2.15148 20.9691 2.04484 20.911 1.95336C20.8528 1.86187 20.7699 1.78943 20.6722 1.74476C20.5745 1.70009 20.4663 1.68509 20.3604 1.70157C20.2546 1.71805 20.1556 1.76531 20.0756 1.83765Z" stroke="#42A81D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </span>

              <span>Videos</span>
            </div>
            <div 
              className="d-flex align-items-center jobs-with-icon"
              onClick={() => setShowJobModal(true)}
              style={{ cursor: 'pointer' }}
            >
              {/* <span className="material-symbols-outlined">
                work
              </span> */}

<span>
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.007 20.731H8.605C5.02 20.731 3.228 20.731 2.114 19.596C1 18.461 1 16.634 1 12.981C1 9.32796 1 7.50096 2.114 6.36596C3.228 5.23096 5.02 5.23096 8.605 5.23096H12.408C15.993 5.23096 17.786 5.23096 18.9 6.36596C19.757 7.23896 19.954 8.52196 20 10.731V12.231" stroke="#E06847" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 17.731H15M15 20.731C14.2044 20.731 13.4413 20.4149 12.8787 19.8523C12.3161 19.2897 12 18.5266 12 17.731C12 16.9353 12.3161 16.1722 12.8787 15.6096C13.4413 15.047 14.2044 14.731 15 14.731M18 20.731C18.7956 20.731 19.5587 20.4149 20.1213 19.8523C20.6839 19.2897 21 18.5266 21 17.731C21 16.9353 20.6839 16.1722 20.1213 15.6096C19.5587 15.047 18.7956 14.731 18 14.731M15 5.23096L14.9 4.92096C14.405 3.38096 14.158 2.61096 13.569 2.17096C12.979 1.73096 12.197 1.73096 10.631 1.73096H10.368C8.803 1.73096 8.02 1.73096 7.431 2.17096C6.841 2.61096 6.594 3.38096 6.099 4.92096L6 5.23096" stroke="#E06847" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </span>
              <span>Jobs</span>
            </div>
            <div 
              className="d-flex align-items-center event-with-icon" 
              onClick={() => setShowEventModal(true)}
              style={{ cursor: 'pointer' }}
            >
              {/* <span className="material-symbols-outlined">
                event
              </span> */}
               <span>
               <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.885 15.231C10.3003 15.231 9.80167 15.0243 9.389 14.611C8.97633 14.1977 8.76967 13.6993 8.769 13.116C8.76833 12.5327 8.975 12.0337 9.389 11.619C9.803 11.2043 10.3017 10.998 10.885 11C11.4683 11.002 11.967 11.2087 12.381 11.62C12.795 12.0313 13.0013 12.53 13 13.116C12.9987 13.702 12.792 14.2007 12.38 14.612C11.968 15.0233 11.4697 15.2297 10.885 15.231ZM1.615 18.231C1.155 18.231 0.771 18.077 0.463 17.769C0.155 17.461 0.000666667 17.0767 0 16.616V3.84601C0 3.38601 0.154333 3.00201 0.463 2.69401C0.771667 2.38601 1.156 2.23167 1.616 2.23101H3.385V0.539007C3.385 0.383674 3.436 0.255007 3.538 0.153007C3.64 0.0510068 3.76833 6.89657e-06 3.923 6.89657e-06C4.07767 6.89657e-06 4.20633 0.0510068 4.309 0.153007C4.41167 0.255007 4.46267 0.383674 4.462 0.539007V2.23101H11.616V0.501007C11.616 0.35834 11.6637 0.239007 11.759 0.143007C11.8543 0.0470068 11.9733 -0.00065977 12.116 6.89657e-06C12.2587 0.000673563 12.3773 0.0483401 12.472 0.143007C12.5667 0.237673 12.6147 0.356674 12.616 0.500007V2.23101H14.385C14.845 2.23101 15.2293 2.38534 15.538 2.69401C15.8467 3.00267 16.0007 3.38701 16 3.84701V16.616C16 17.076 15.846 17.4603 15.538 17.769C15.23 18.0777 14.8453 18.2317 14.384 18.231H1.615ZM1.615 17.231H14.385C14.5383 17.231 14.6793 17.167 14.808 17.039C14.9367 16.911 15.0007 16.7697 15 16.615V7.84701H1V16.616C1 16.7693 1.064 16.9103 1.192 17.039C1.32 17.1677 1.461 17.2317 1.615 17.231Z" fill="#C37D16"/>
</svg>

              </span>
              <span>Events</span>
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
            <Form.Label>Title *</Form.Label>
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
            <Form.Label>Category *</Form.Label>
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
          <Form.Label>Description *</Form.Label>
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
              <span className="border rounded bg-gradient color-plate" onClick={() => { setColorPanel(!colorPanel); resetStyles() }} >
                <span class="material-symbols-outlined">
                  {colorPanel || (selectedFiles.images.length > 0 || selectedFiles.videos.length > 0 || selectedFiles.documents.length > 0) ? "block" : ""}                  
                </span>
              </span>
              <div className={`${colorPanel ? "d-flex" : "d-none"} gap-2 color-panel`}>
                {styles.map((style, index) => (<span className={`border rounded color-plate`} style={{ background: style.color }} key={index} title="Click to Apply" onClick={() => (selectedFiles.images.length > 0 || selectedFiles.videos.length > 0 || selectedFiles.documents.length > 0)? "" : handleStyleClick(style)}></span>))}
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
  accept="image/*,video/*"
  capture="environment" // Opens back camera (use "user" for front camera)
  disabled={selectedStyle}
/>

                 <Button
                   disabled={selectedStyle}
                   className=""
                   onClick={() => fileInputRef.current.click()}
                   style={uploadBtn}
                 >
                   {!selectedStyle ?
                   <span className="material-symbols-outlined" style={uploadIcon}>
                     Camera
                   </span>
                   :
                   <span className="material-symbols-outlined text-danger" style={uploadIcon}>
                     block
                   </span>
                   }
                 </Button>
               </div>
             </div>
                <div className="position-relative">
                  <div className="file-upload-section">
                    <input
                      type="file"
                      multiple
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      disabled={selectedStyle}
                    />
                    <Button
                    disabled={selectedStyle}
                      className=""
                      onClick={() => fileInputRef.current.click()}
                      style={uploadBtn}
                    >
                      {!selectedStyle ?
                      <span class="material-symbols-outlined" style={uploadIcon}>
                        cloud_upload
                      </span>
                      :
                      <span class="material-symbols-outlined text-danger" style={uploadIcon}>
                      block
                      </span>
                      }
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
            disabled={isLoading}
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