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
import { BsEmojiSmile } from "react-icons/bs";
import toast from 'react-hot-toast';

import { IoIosHeartEmpty } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
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
  const [selectedCategory, setSelectedCategory] = useState("Business");


  const handleCategoryChange = (event, category) => {
    handleInputChange(event); // Call parent function to update formData
    setSelectedCategory(category.name.split(" ")[0]); // Update dropdown label
  };


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

  const textAreaRef = useRef(null); // Create a ref for the textarea
  const [selectedStyle, setSelectedStyle] = useState(null);

  const styles = [
    { name: "Black", color: "#000000", text: '#fff' },
    { name: "Orange", color: "#FFAA33", text: '#000' },
    { name: "Brown", color: "#B45309", text: '#fff' },
    { name: "Blue", color: "#2563EB", text: '#fff' },
    { name: "Purple", color: "#9333EA", text: '#fff' },
    { name: "Pink", color: "#F500F5", text: '#fff' },
  ];

  useEffect(() => {
    if (!textAreaRef.current) return;

    const textArea = textAreaRef.current;

    if (selectedStyle) {
      textArea.style.background = selectedStyle.color || "";
      textArea.style.color = selectedStyle.text || "";
      textArea.style.fontSize = "18px";
      textArea.style.textAlign = "center";
      textArea.style.minHeight = "250px";
      textArea.style.padding = "30px 20px";

      // Dynamically set placeholder color
      textArea.style.caretColor = selectedStyle.text || ""; // Changes cursor color
      const sheet = document.styleSheets[0];
      sheet.insertRule(
        `textarea::placeholder { color: ${selectedStyle.text || "#000"} !important; }`,
        sheet.cssRules.length
      );
    } else {
      textArea.style.background = "";
      textArea.style.color = "";
      textArea.style.fontSize = "";
      textArea.style.textAlign = "";
      textArea.style.minHeight = "";
      textArea.style.padding = "";
      textArea.style.caretColor = "";

      // Reset placeholder color
      const sheet = document.styleSheets[0];
      sheet.insertRule(
        `textarea::placeholder { color: #aaa !important; }`, // Default placeholder color
        sheet.cssRules.length
      );
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

  
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description + emoji.emoji
    }));
    setShowEmojiDropdown(false);
  };

  return (
    <>
      <Card className={className}>
        <Card.Body className="create-post-card">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2.58005 19.01L2.56005 19.03C2.29005 18.44 2.12005 17.77 2.05005 17.03C2.12005 17.76 2.31005 18.42 2.58005 19.01Z" fill="#378FE9"/>
              <path d="M9.00012 10.38C10.3146 10.38 11.3801 9.31443 11.3801 8C11.3801 6.68556 10.3146 5.62 9.00012 5.62C7.68568 5.62 6.62012 6.68556 6.62012 8C6.62012 9.31443 7.68568 10.38 9.00012 10.38Z" fill="#378FE9"/>
              <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z" fill="#378FE9"/>
              </svg>      
              </span>

              <span>Photos</span>
            </div>
            <div className="d-flex align-items-center photo-with-icon" onClick={handleShow} style={{ cursor: "pointer" }}>
              {/* <span class="material-symbols-outlined">
                videocam
              </span> */}
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path d="M16.5233 2H8.14325C4.50325 2 2.33325 4.17 2.33325 7.81V16.18C2.33325 19.83 4.50325 22 8.14325 22H16.5133C20.1533 22 22.3233 19.83 22.3233 16.19V7.81C22.3333 4.17 20.1633 2 16.5233 2ZM14.9933 13.73L13.7133 14.47L12.4333 15.21C10.7833 16.16 9.43325 15.38 9.43325 13.48V12V10.52C9.43325 8.61 10.7833 7.84 12.4333 8.79L13.7133 9.53L14.9933 10.27C16.6433 11.22 16.6433 12.78 14.9933 13.73Z" fill="#5F9B41"/>
              </svg>
            </span>

              <span>Videos</span>
            </div>
            <div 
              className="d-flex align-items-center jobs-with-icon"
              onClick={() => setShowJobModal(true)}
              style={{ cursor: 'pointer' }}
            >

              <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M15.9267 22C15.8667 22 15.7967 21.99 15.7367 21.97C13.7267 21.4 11.6167 21.4 9.60666 21.97C9.23666 22.07 8.84666 21.86 8.74666 21.49C8.63666 21.12 8.85666 20.73 9.22666 20.63C11.4867 19.99 13.8667 19.99 16.1267 20.63C16.4967 20.74 16.7167 21.12 16.6067 21.49C16.5067 21.8 16.2267 22 15.9267 22Z" fill="#E06847"/>
                <path d="M19.8767 6.36001C18.8367 4.26001 16.8267 2.71001 14.4967 2.20001C12.0567 1.66001 9.55672 2.24001 7.64672 3.78001C5.72672 5.31001 4.63672 7.60001 4.63672 10.05C4.63672 12.64 6.18672 15.35 8.52672 16.92V17.75C8.51672 18.03 8.50672 18.46 8.84672 18.81C9.19672 19.17 9.71672 19.21 10.1267 19.21H15.2567C15.7967 19.21 16.2067 19.06 16.4867 18.78C16.8667 18.39 16.8567 17.89 16.8467 17.62V16.92C19.9467 14.83 21.8967 10.42 19.8767 6.36001ZM14.3867 11.62L13.3167 13.48C13.1767 13.72 12.9267 13.86 12.6667 13.86C12.5367 13.86 12.4067 13.83 12.2967 13.76C11.9367 13.55 11.8167 13.09 12.0167 12.74L12.8667 11.26H12.0267C11.5267 11.26 11.1167 11.04 10.8967 10.67C10.6767 10.29 10.6967 9.83001 10.9467 9.39001L12.0167 7.53001C12.2267 7.17001 12.6867 7.05001 13.0367 7.25001C13.3967 7.46001 13.5167 7.92001 13.3167 8.27001L12.4667 9.75001H13.3067C13.8067 9.75001 14.2167 9.97001 14.4367 10.34C14.6567 10.72 14.6367 11.19 14.3867 11.62Z" fill="#E06847"/>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.8999 9.85L21.4899 19.74C21.5099 20.01 21.3799 20.19 21.3099 20.27C21.2299 20.36 21.0599 20.5 20.7799 20.5H18.0499L20.2099 9.85H20.8999ZM21.9999 6L21.9899 6.02C22.0099 6.26 21.9899 6.51 21.9299 6.76L14.5599 20.29C14.3199 21.3 13.4199 22 12.3799 22H20.7799C22.0699 22 23.0899 20.91 22.9899 19.62L21.9999 6Z" fill="#C37D16"/>
                <path d="M11.45 2.24002C11.55 1.84002 11.3 1.43002 10.9 1.33002C10.5 1.24002 10.09 1.48002 9.98999 1.88002L9.48999 3.95002H11.03L11.45 2.24002Z" fill="#C37D16"/>
                <path d="M18.0499 2.21005C18.1399 1.80005 17.8799 1.41005 17.4699 1.32005C17.0699 1.23005 16.6699 1.49005 16.5799 1.90005L16.1299 3.97005H17.6699L18.0499 2.21005Z" fill="#C37D16"/>
                <path d="M21.82 5.32994C21.49 4.52994 20.71 3.95994 19.75 3.95994H17.67L17.11 6.54994C17.03 6.89994 16.72 7.13994 16.38 7.13994C16.33 7.13994 16.27 7.13994 16.22 7.11994C15.82 7.02994 15.56 6.62994 15.64 6.22994L16.13 3.94994H11.03L10.4 6.54994C10.32 6.88994 10.01 7.11994 9.67 7.11994C9.61 7.11994 9.55 7.10994 9.49 7.09994C9.09 6.99994 8.84 6.59994 8.94 6.18994L9.48 3.93994H7.45C6.47 3.93994 5.6 4.57994 5.31 5.51994L1.1 19.0699C0.659999 20.5199 1.73 21.9999 3.24 21.9999H16.38C17.42 21.9999 18.32 21.2999 18.56 20.2899L21.93 6.75994C21.99 6.50994 22.01 6.25994 21.99 6.01994C21.97 5.77994 21.92 5.53994 21.82 5.32994ZM14.7 16.7499H6.7C6.29 16.7499 5.95 16.4099 5.95 15.9999C5.95 15.5899 6.29 15.2499 6.7 15.2499H14.7C15.11 15.2499 15.45 15.5899 15.45 15.9999C15.45 16.4099 15.11 16.7499 14.7 16.7499ZM15.7 12.7499H7.7C7.29 12.7499 6.95 12.4099 6.95 11.9999C6.95 11.5899 7.29 11.2499 7.7 11.2499H15.7C16.11 11.2499 16.45 11.5899 16.45 11.9999C16.45 12.4099 16.11 12.7499 15.7 12.7499Z" fill="#C37D16"/>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375"/>
              <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 gap-2 align-items-center mb-3">
            <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-40 rounded-circle" />
            <div className="d-flex flex-column gap-0">
              <h5 className="mb-0">{userData?.name}</h5>
              <div className="d-flex align-items-center category-dropdown-main-wrapper">
                <Dropdown className="">
                  <Dropdown.Toggle variant="link" className="p-0" style={postViewChanger} onClick={() => setShowVisibilityModal(true)}>
                    <span
                      className={`badge cursor-pointer btn-outline-purpule d-flex gap-2 justify-content-center align-items-center ${formData.visibility === "public" ? "bg-primary" : formData.visibility === "private" ? "bg-danger" : "bg-warning"}`}
                      style={{padding: '4px 10px 2px 15px'}}
                    >
                      {formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1).replace('_', ' ')}
                      <span className="material-symbols-outlined text-white" style={postViewIcon}>arrow_drop_down</span>
                    </span>
                  </Dropdown.Toggle>
                </Dropdown>
                <span className='text-secondary mx-2'>|</span> 
                <Dropdown className="">
                  <Dropdown.Toggle variant="link" className="p-0" style={postViewChanger}>
                    <span
                      className={`badge cursor-pointer btn-purpule d-flex gap-2 justify-content-center align-items-center ${formData.visibility === "public" ? "bg-primary" : formData.visibility === "private" ? "bg-danger" : "bg-warning"}`}
                      style={{padding: '4px 10px 2px 15px'}}
                    >
                      {selectedCategory}
                      <span className="material-symbols-outlined text-white" style={postViewIcon}>arrow_drop_down</span>
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{padding: '0.75rem 0.75rem 0.25rem 0.75rem'}}>
                    {categories.map(category => (
                      <Dropdown.Item style={{padding: '0.25rem 0.75rem'}} className="btn btn-purpule mb-2 radius-6 text-white d-flex gap-2 align-items-center" onClick={(e) => handleCategoryChange(e, category)}>
                      {category.id == 1 ?
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                  fill="none"><path d="M6.66685 18.3333H13.3335C16.6835 18.3333 17.2835 16.9917 17.4585 15.3583L18.0835 8.69167C18.3085 6.65833 17.7252 5 14.1668 5H5.83351C2.27518 5 1.69185 6.65833 1.91685 8.69167L2.54185 15.3583C2.71685 16.9917 3.31685 18.3333 6.66685 18.3333Z"
                   stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.66675 4.99996V4.33329C6.66675 2.85829 6.66675 1.66663 9.33341 1.66663H10.6667C13.3334 1.66663 13.3334 2.85829 13.3334 4.33329V4.99996"
                    stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.6666 10.8333V11.6667C11.6666 11.675 11.6666 11.675 11.6666 11.6833C11.6666 12.5917 11.6583 13.3333 9.99992 13.3333C8.34992 13.3333 8.33325 12.6 8.33325 11.6917V10.8333C8.33325 10 8.33325 10 9.16659 10H10.8333C11.6666 10 11.6666 10 11.6666 10.8333Z" 
                    stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0417 9.16663C16.1167 10.5666 13.9167 11.4 11.6667 11.6833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.18335 9.39124C4.05835 10.6746 6.17502 11.4496 8.33335 11.6912"
                     stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
                     : category.id == 2 ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      viewBox="0 0 20 20" fill="none">
                        <path d="M7.47493 18.3333H12.4749C16.6416 18.3333 18.3083 16.6666 18.3083 12.5V7.49996C18.3083 3.33329 16.6416 1.66663 12.4749 1.66663H7.47493C3.30827 1.66663 1.6416 3.33329 1.6416 7.49996V12.5C1.6416 16.6666 3.30827 18.3333 7.47493 18.3333Z"
                         stroke="#6709F5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                         <path d="M1.6416 10.5835L6.6416 10.5668C7.2666 10.5668 7.9666 11.0418 8.19993 11.6251L9.14993 14.0251C9.3666 14.5668 9.70827 14.5668 9.92493 14.0251L11.8333 9.18346C12.0166 8.7168 12.3583 8.70013 12.5916 9.1418L13.4583 10.7835C13.7166 11.2751 14.3833 11.6751 14.9333 11.6751H18.3166" 
                     stroke="#6709F5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
                     : category.id == 3 ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1.66675 7.08337H10.8334" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13.75H6.66667" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" 
                     stroke-linejoin="round"></path><path d="M8.75 13.75H12.0833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.3334 9.44164V13.4249C18.3334 16.3499 17.5917 17.0833 14.6334 17.0833H5.36675C2.40841 17.0833 1.66675 16.3499 1.66675 13.4249V6.57497C1.66675 3.64997 2.40841 2.91663 5.36675 2.91663H11.0667" stroke="#888888" 
                     stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.1667 2.70801H16.7751C17.3501 2.70801 17.8167 3.23301 17.8167 3.74967C17.8167 4.32467 17.3501 4.79134 16.7751 4.79134H14.1667V2.70801Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.1667 4.79138H17.1417C17.8001 4.79138 18.3334 5.25805 18.3334 5.83305C18.3334 6.40805 17.8001 6.87472 17.1417 6.87472H14.1667V4.79138Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.6335 6.87476V7.91642" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.6335 1.66638V2.70805" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.1585 2.70801H13.3335" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.1585 6.87476H13.3335" stroke="#888888"
                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                     : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><g clip-path="url(#clip0_186_1058)"><path d="M12.9167 10.8334C12.1431 10.8334 11.4013 11.1407 10.8543 11.6876C10.3073 12.2346 10 12.9765 10 13.75V14.5834C10 15.3569 10.3073 16.0988 10.8543 16.6458C11.4013 17.1928 12.1431 17.5 12.9167 17.5C13.6902 17.5 14.4321 17.1928 14.9791 16.6458C15.526 16.0988 15.8333 15.3569 15.8333 14.5834V13.0834" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.08341 10.8334C7.85696 10.8334 8.59883 11.1407 9.14581 11.6876C9.69279 12.2346 10.0001 12.9765 10.0001 13.75V14.5834C10.0001 15.3569 9.69279 16.0988 9.14581 16.6458C8.59883 17.1928 7.85696 17.5 7.08341 17.5C6.30987 17.5 5.568 17.1928 5.02102 16.6458C4.47404 16.0988 4.16675 15.3569 4.16675 14.5834V13.0834" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5834 13.3333C15.357 13.3333 16.0988 13.026 16.6458 12.4791C17.1928 11.9321 17.5001 11.1902 17.5001 10.4167C17.5001 9.64312 17.1928 8.90125 16.6458 8.35427C16.0988 7.80729 15.357 7.5 14.5834 7.5H14.1667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.8333 7.75V5.41667C15.8333 4.64312 15.526 3.90125 14.9791 3.35427C14.4321 2.80729 13.6902 2.5 12.9167 2.5C12.1431 2.5 11.4013 2.80729 10.8543 3.35427C10.3073 3.90125 10 4.64312 10 5.41667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.41667 13.3333C4.64312 13.3333 3.90125 13.026 3.35427 12.4791C2.80729 11.9321 2.5 11.1902 2.5 10.4167C2.5 9.64312 2.80729 8.90125 3.35427 8.35427C3.90125 7.80729 4.64312 7.5 5.41667 7.5H5.83333" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.16675 7.75V5.41667C4.16675 4.64312 4.47404 3.90125 5.02102 3.35427C5.568 2.80729 6.30987 2.5 7.08341 2.5C7.85696 2.5 8.59883 2.80729 9.14581 3.35427C9.69279 3.90125 10.0001 4.64312 10.0001 5.41667V13.75" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_186_1058"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>}
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
                        <label for={category.id} className="cursor-pointer" style={{fontSize: '13px', fontWeight: '300'}}>{category.name.split(" ")[0]}</label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
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
              className="radius-10"
              required
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <br />
            <div className="d-flex gap-1 overflow-auto">
              {categories.map(category => (
                <div className={`py-1 px-3 text-white rounded cursor-pointer border ${category.id.toString() === formData.category_id ? 'bg-primary-2' : 'bg-primary'} btn-purpule py-0 radius-10`}>
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
          </Form.Group> */}
          <div className="mb-3">
          {/* <BsEmojiSmile size={25} className='ms-2 bold-icon' onClick={() => setShowEmojiDropdown(!showEmojiDropdown)} style={{ cursor: 'pointer' }} /> */}
          <Form.Label>Description * </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              placeholder="Write something here..."
              value={formData.description}
              onChange={handleInputChange}
              className="radius-10"
              ref={textAreaRef}
            />
                        {showEmojiDropdown && (
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                disableSearchBar
                emojiStyle={{ width: '20px', height: '20px' }}
              />
            )}
          </div>

          <div className="position-relative">
            <div className="d-flex gap-2">
              <span className="border rounded bg-gradient color-plate" onClick={() => { setColorPanel(!colorPanel); resetStyles() }} >
                <span class="material-symbols-outlined" style={{margin: '6px'}}>
                  {colorPanel || (selectedFiles.images.length > 0 || selectedFiles.videos.length > 0 || selectedFiles.documents.length > 0) ? "block" : ""}                  
                </span>
              </span>
              <div className={`${colorPanel ? "d-flex" : "d-none"} gap-2 color-panel`}>
                {styles.map((style, index) => (<span className={`border rounded color-plate position-relative overflow-hidden`} key={index} title="Click to Apply" onClick={() => (selectedFiles.images.length > 0 || selectedFiles.videos.length > 0 || selectedFiles.documents.length > 0)? "" : handleStyleClick(style)}>
                  <span style={{ background: style.color, top: '7px', left: '3px', width: '150%', height: '150%', position: 'absolute', borderRadius: '24px' }}></span>
                </span>))}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2.57999 19.01L2.55999 19.03C2.28999 18.44 2.11999 17.77 2.04999 17.03C2.11999 17.76 2.30999 18.42 2.57999 19.01Z" fill="#888888"/>
                    <path d="M9 10.38C10.3144 10.38 11.38 9.31443 11.38 8C11.38 6.68556 10.3144 5.62 9 5.62C7.68556 5.62 6.62 6.68556 6.62 8C6.62 9.31443 7.68556 10.38 9 10.38Z" fill="#888888"/>
                    <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z" fill="#888888"/>
                    </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM12.66 11.73L11.38 12.47L10.1 13.21C8.45 14.16 7.1 13.38 7.1 11.48V10V8.52C7.1 6.61 8.45 5.84 10.1 6.79L11.38 7.53L12.66 8.27C14.31 9.22 14.31 10.78 12.66 11.73Z" fill="#888888"/>
                        </svg>
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
            className="mt-3 w-100 btn-purpule radius-10 py-2"
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
        <Modal.Header className="d-flex justify-content-start gap-3" style={{padding: '10px 20px'}}>
          <span className='cursor-pointer' onClick={() => setShowVisibilityModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375"/>
              <path d="M12.7847 9.78516L8.5 14.0699L12.7847 18.3546" stroke="#292D32" stroke-width="1.05883" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.5 14.0699H8.6199" stroke="#292D32" stroke-width="1.05883" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <Modal.Title style={{fontSize: '18px', fontWeight: '500'}}>Post Visibility</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingLeft: '35px', paddingRight: '35px'}}>
          <div className="d-flex flex-column gap-0">
            <div className={`d-flex justify-content-between align-items-center px-3 py-2 cursor-pointer `}
              onClick={() => handlePasswordProtectionChange('public')}
            >
              <div className='d-flex gap-3'>
                <div className={`d-flex justify-content-center rounded-circle align-items-center p-3 avatar-40 ${passwordProtectionData.type === 'public' ? 'bg-primary-2 text-white' : 'bg-gray-2 text-dark'}`}>
                  <span className="material-symbols-outlined" style={{fontSize: '16px'}}>people</span>
                </div>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0" style={{fontSize: '14px', fontWeight: '600'}}>Public</h6>
                  <small className='mt-n1' style={{fontSize: '13px', fontWeight: '300'}}>Anyone can see your post</small>
                </div>
              </div>
              <div className='avatar-20 d-flex align-items-center'>
                {passwordProtectionData.type === 'public' && (
                  <span className="material-symbols-outlined">check_circle</span>
                )}
              </div>
            </div>

            <div className={`d-flex justify-content-between align-items-center px-3 py-2 cursor-pointer `}
              onClick={() => handlePasswordProtectionChange('private')}
            >
              <div className='d-flex gap-3'>
                <div className={`d-flex justify-content-center rounded-circle align-items-center p-3 avatar-40 ${passwordProtectionData.type === 'private' ? 'bg-primary-2 text-white' : 'bg-gray-2 text-dark'}`}>
                  <span className="material-symbols-outlined" style={{fontSize: '16px'}}>person</span>
                </div>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0" style={{fontSize: '14px', fontWeight: '600'}}>Private</h6>
                  <small className='mt-n1' style={{fontSize: '13px', fontWeight: '300'}}>Only you can see your post</small>
                </div>
              </div>
              <div className='avatar-20 d-flex align-items-center'>
                {passwordProtectionData.type === 'private' && (
                  <span className="material-symbols-outlined">check_circle</span>
                )}
              </div>
            </div>

            <div className={`d-flex justify-content-between align-items-center px-3 py-2 cursor-pointer `}
              onClick={() => handlePasswordProtectionChange('password_protected')}
            >
              <div className='d-flex gap-3'>
                <div className={`d-flex justify-content-center rounded-circle align-items-center p-3 avatar-40 ${passwordProtectionData.type === 'password_protected' ? 'bg-primary-2 text-white' : 'bg-gray-2 text-dark'}`}>
                  <span className="material-symbols-outlined" style={{fontSize: '16px'}}>lock</span>
                </div>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0" style={{fontSize: '14px', fontWeight: '600'}}>Password Protected</h6>
                  <small className='mt-n1' style={{fontSize: '13px', fontWeight: '300'}}>Only people with password can view</small>
                </div>
              </div>
              <div className='avatar-20 d-flex align-items-center'>
                {passwordProtectionData.type === 'password_protected' && (
                  <span className="material-symbols-outlined">check_circle</span>
                )}
              </div>
            </div>

            {passwordProtectionData.type === 'password_protected' && (
              <div className="position-relative px-3">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={passwordProtectionData.password}
                  onChange={handlePasswordChange}
                  className="pr-5 radius-10"
                />
                <Button 
                  variant="link" 
                  className="position-absolute top-50 end-16px translate-middle-y"
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
        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="secondary" 
            disabled={passwordProtectionData.type === 'password_protected' && !passwordProtectionData.password.trim()}
            className="btn-gray-2 px-3 text-dark border-0"
            onClick={() => setShowVisibilityModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVisibilityModalSubmit}
            disabled={passwordProtectionData.type === 'password_protected' && !passwordProtectionData.password.trim()}
            className="btn-purpule px-3"
          >
            Done
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