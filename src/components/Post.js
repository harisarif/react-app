import React, { useState, useContext, useEffect } from 'react';
import { Card, Dropdown, OverlayTrigger, Tooltip, Collapse, Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import ShareOffcanvasNew from './ShareOffcanvasNew';
import CommentOffcanvasNew from './CommentOffcanvasNew';
import axios from '../utils/axios';
import user1 from "../assets/images/user/1.jpg";
import { getProfileImageUrl } from '../utils/helpers';
import moment from 'moment';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import CreatePost from './create-post';

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { LiaTelegram } from "react-icons/lia";
import { FiSmile } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineCameraAlt } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { HiMiniArrowUturnRight } from "react-icons/hi2";
import { TbMessage } from "react-icons/tb";

const FollowButton = styled.button`
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &.follow-btn {
    background: linear-gradient(45deg, #007bff, #6610f2);
    color: white;
    
    &:hover {
      background: linear-gradient(45deg, #0056b3, #520dc2);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    }
  }
  
  &.unfollow-btn {
    background: #f8f9fa;
    color: #dc3545;
    border: 1px solid #dc3545;
    
    &:hover {
      background: #dc3545;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }
  
  &:active::after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
`;

// Helper function to get category badge
const getCategoryBadge = (categoryId) => {
  switch (categoryId) {
    case 1:
      return {
        text: 'Business',
        className: 'bg-primary text-white px-3 py-1 rounded-pill info-btn'
      };
    case 2:
      return {
        text: 'Fitness',
        className: 'bg-success text-white px-3 py-1 rounded-pill fitness-info-btn'
      };
    case 3:
      return {
        text: 'Crypto',
        className: 'bg-warning text-dark px-3 py-1 rounded-pill crypto-info-btn '
      };
    case 4:
      return {
        text: 'Technology',
        className: 'bg-info text-white px-3 py-1 rounded-pill tech-info-btn'
      };
    default:
      return {
        text: 'Mindset',
        className: 'bg-secondary text-white px-3 py-1 rounded-pill mindset-info-btn'
      };
  }
};

const Post = ({ post, posts, setPosts, onDelete, categories, handleFollow }) => {
  const badge = getCategoryBadge(post.category_id);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || []);
  const [showComments, setShowComments] = useState(false);
  const [showShareOffcanvas, setShowShareOffcanvas] = useState(false);
  const [showCommentOffcanvas, setShowCommentOffcanvas] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { userData } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [isLiking, setIsLiking] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [editPostData, setEditPostData] = useState(null);

  const handleEditShow = () => {
    // Prepare the post data for editing
    const images = typeof post.images === 'string' ? JSON.parse(post.images || '[]') : (post.images || []);
    const videos = typeof post.videos === 'string' ? JSON.parse(post.videos || '[]') : (post.videos || []);
    const documents = typeof post.documents === 'string' ? JSON.parse(post.documents || '[]') : (post.documents || []);

    const editData = {
      id: post.id,
      title: post.title || '',
      description: post.description || '',
      content: post.content || '',
      category_id: post.category_id?.toString() || '',
      images: images,
      videos: videos,
      documents: documents,
      visibility: post.visibility || 'public'
    };

    setEditPostData(editData);
    setShowCreatePostModal(true);
  };

  const handleEditComplete = (updatedPost) => {
    if (updatedPost) {
      // Update the post in the list
      setPosts(prevPosts =>
        prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
      );
    }
    setShowCreatePostModal(false);
    setEditPostData(null);
  };

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setIsAnimating(true);

    try {
      // Check if userData exists and is valid
      if (!userData || Object.keys(userData).length === 0) {
        Swal.fire({
          title: 'Login Required',
          text: 'Please login to like posts',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/auth/sign-in';
          }
        });
        setIsLiking(false);
        setIsAnimating(false);
        return;
      }

      // Retrieve the token from local storage
      const token = localStorage.getItem('access_token');

      // Optimistic update
      const wasLiked = isLiked;
      setIsLiked(!wasLiked);
      setLikes(prevLikes =>
        wasLiked
          ? prevLikes.filter(like => like.user_id !== userData.id)
          : [...prevLikes, { user_id: userData.id }]
      );

      const response = await axios.post(`/api/posts/${post.id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Update with server response
        setLikes(response.data.likes);
        setIsLiked(response.data.liked);
      } else {
        // Revert changes if server response is not as expected
        setIsLiked(wasLiked);
        setLikes(prevLikes =>
          wasLiked
            ? [...prevLikes, { user_id: userData.id }]
            : prevLikes.filter(like => like.user_id !== userData.id)
        );
      }
    } catch (error) {
      console.error('Error liking post:', error);
      setIsAnimating(false);
      // Show error message
      Swal.fire({
        title: 'Error',
        text: 'Failed to update like status',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    } finally {
      // Keep the animation running for a moment after the request completes
      setTimeout(() => {
        setIsLiking(false);
        setIsAnimating(false);
      }, 800); // Match this with animation duration
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!(userData && Object.keys(userData).length > 0)) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need to be logged in to comment',
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

    setIsCommentLoading(true);

    try {
      setIsCommentLoading(true);
      const token = localStorage.getItem('access_token');

      const data = new FormData();
      data.append('content', newComment);

      // Ensure selectedFiles is an array
      if (selectedFiles && selectedFiles.length > 0) {
        Array.from(selectedFiles).forEach((file, index) => {
          console.log(`Appending file: ${file.name}`);
          data.append(`media[${index}]`, file);
        });
      }

      console.log("FormData before sending:");
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]); // Log FormData contents
      }

      const response = await axios.post(`/api/posts/${post.id}/comment`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Optional, axios usually sets this automatically
        },
      });

      setComments([...comments, response.data.comment]);
      setNewComment('');
      setSelectedFiles([]); // Reset selected files after upload
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsCommentLoading(false);
    }

  };

  const handleMediaClick = (mediaUrl, type, index) => {
    setSelectedMedia({ url: mediaUrl, type });
    setCurrentMediaIndex(index);
    setShowMediaModal(true);
  };

  const handleGalleryNav = (direction) => {
    if (direction === 'prev') {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
    setSelectedMedia(post.media[currentMediaIndex]);
  };

  const handlePreview = async (item) => {
    const extension = getFileExtension(item.url);
    if (extension === 'pdf') {
      setSelectedDocument(item);
      setShowPdfPreview(true);
      setIsDocumentLoading(true);
      setDocumentError(null);

      try {
        const response = await fetch(item.url);
        if (!response.ok) throw new Error('Failed to load document');

        // Check if it's actually a PDF
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/pdf')) {
          throw new Error('Invalid PDF document');
        }
      } catch (error) {
        console.error('Error loading document:', error);
        setDocumentError(error.message);
      } finally {
        setIsDocumentLoading(false);
      }
    } else {
      try {
        const response = await fetch(item.url);
        if (!response.ok) throw new Error('Failed to load document');
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, '_blank');
        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('Error previewing file:', error);
        Swal.fire({
          title: 'Error',
          text: 'Unable to preview this file type',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        });
      }
    }
  };

  const handleDownload = async (url) => {
    try {
      setIsDocumentLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to download file',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false
      });
    } finally {
      setIsDocumentLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const getFileIcon = (extension) => {
    const iconMap = {
      pdf: 'picture_as_pdf',
      doc: 'description',
      docx: 'description',
      xls: 'table_view',
      xlsx: 'table_view',
      txt: 'article'
    };
    return iconMap[extension] || 'insert_drive_file';
  };

  const isDocument = (url) => {
    const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];
    return documentExtensions.includes(getFileExtension(url));
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const unlockContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/post/unlock', {
        id: post.id,
        password: password,
      });
      setPosts(prevPosts =>
        prevPosts.map(p => p.id === post.id ? response.data.post : p)
      );
      setPassword('');
    } catch (error) {
      console.error('Error unlocking content:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error unlocking content',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false
      });
    } finally {
      setLoading(false);
      setModalIsOpen(false); // Close modal after submission
    }
  };

const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);

const handleEmojiSelect = (emoji) => {
  setNewComment(newComment + emoji.emoji);
  setShowEmojiDropdown(false);
};


  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (event) => {
    // alert();
    setSelectedFiles(event.target.files);
    const files = Array.from(event.target.files).map((file) => file.name);
    setFileNames(files);
  };

  const [link, setLink] = useState([]);

  const handleLinkChange = (event) => {
    setSelectedFiles(event.target.files);
    const links = Array.from(event.target.files).map(file => file.name);
    setLink(links);
  };


  return (
    <>
                    
      <Card className="card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data ">
            <div className="d-flex align-items-center justify-content-between">
              <div className="me-2 flex-shrink-0">
                <img
                  src={post.user ? getProfileImageUrl(post.user) : user1}
                  className="user-post-profile avatar-50 rounded-circle"
                  alt={post.user?.name || 'User'}
                />
              </div>
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="user-profile-info d-flex justify-content-center flex-column g-0">
                      <h6 className="mb-0 me-2 text-dark fw-bold">{post.user?.name || 'Anonymous'}</h6>
                      <p className="mb-0 mt-n1 text-dark" style={{fontSize: 16, fontWeight: '300'}}>Graphic Designer | Social Media Manager | Visual Communication</p>
                      <p className="mb-0 mt-n1 text-gray" style={{fontSize: 14, fontWeight: '400'}}>                        {moment(post.created_at).fromNow()}
          {' '}
          {moment(post.created_at).format('h:mm a')}</p>
                    </div>
                  </div>
                  <div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <Dropdown>
                        <Dropdown.Toggle className="text-secondary p-0 no-caret" style={{ background: 'none', border: 'none', }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>more_horiz</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end" className="shadow-sm">
                          <>
                            <Dropdown.Item
                              className="d-flex align-items-center"
                              onClick={handleEditShow}
                            >
                              <span className="material-symbols-outlined me-2">edit</span>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-danger d-flex align-items-center"
                              onClick={async () => {
                                const result = await Swal.fire({
                                  title: 'Are you sure?',
                                  text: "You won't be able to revert this!",
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Yes, delete it!'
                                });

                                if (result.isConfirmed) {
                                  try {
                                    const token = localStorage.getItem('access_token');
                                    await axios.delete(`/api/posts/${post.id}`, {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    });
                                    Swal.fire(
                                      'Deleted!',
                                      'Your post has been deleted.',
                                      'success'
                                    );
                                    // Refresh the page or update the posts list
                                    setPosts(posts?.filter(p => p.id !== post.id))
                                  } catch (error) {
                                    console.error('Error deleting post:', error);
                                    Swal.fire(
                                      'Error',
                                      'Failed to delete the post',
                                      'error'
                                    );
                                  }
                                }
                              }}
                            >
                            <span className="material-symbols-outlined me-2">delete</span>
                              Delete
                            </Dropdown.Item>
                          </>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <h3>{post.title}</h3>
          </div> */}
          <div className="mt-2">
            <div className="text-dark elipsis-4" style={{fontSize: '14px', lineHeight: '1.5'}}  dangerouslySetInnerHTML={{ __html: post.description }}>
            </div>
          </div>
          {/* <div className={`media-grid position-relative media-grid-1`}>
            <div className="media-item" > */}
            {post.media && post.media.length > 0 && (
<div className={`media-grid position-relative media-grid-${Math.min(post.media.length, 5)}`}>
{post.media.slice(0, 5)?.map((item, index) => (
  <div key={index} className="media-item">
    {isDocument(item.url) ? (
      <div className="document-preview">
        <div className="document-header">
          <div className={`document-icon ${getFileExtension(item.url)}`}>
            <span className="material-symbols-outlined">
              {getFileIcon(getFileExtension(item.url))}
            </span>
          </div>
          <div className="document-info">
            <p className="document-name">{item.url.split('/').pop()}</p>
            <div className="document-meta">
              <span>{formatFileSize(item.size)}</span>
              <span>•</span>
              <span>{getFileExtension(item.url).toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="document-actions">
          <button
            className="btn btn-preview"
            onClick={() => handlePreview(item)}
          >
            <span className="material-symbols-outlined">visibility</span>
            Preview
          </button>
        </div>
      </div>
    ) : item.type === 'video' ? (
      <div className="media-item" >
        <div className="position-relative w-100 h-100"
          onClick={() => handleMediaClick(item.url, item.type, index)}
        >
          <video>
            <source src={item.url} />
          </video>
          <div className="play-button">
            <span className="material-symbols-outlined">play_circle</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="media-item" >
        <div className="position-relative w-100 h-100"
          onClick={() => handleMediaClick(item.url, item.type, index)}
        >
          <img
            src={item.url}
            alt={`Media ${index + 1}`}
          />
          {index === 4 && post.media.length > 5 && (
            <div className="media-overlay">
              <div className="overlay-text">
                +{post.media.length - 5}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
))}
<span className={`${badge.className} position-absolute top-left-12`}>{badge.text}</span>
{/* <span className={`badge badge-business position-absolute top-left-12`}>Business</span> */}
</div>
)}
              {/* <div className="position-relative w-100 h-100" >
                <img src={post} alt='' />
              </div> */}
            {/* </div> */}
            {/* <span className={`badge badge-business position-absolute top-left-12`}>Business</span> */}
          {/* </div> */}
          <div className="comment-area pt-3">
            <div className="d-flex align-items-center justify-content-between gap-2 w-100 px-4">
              <div className="like-block d-flex align-items-center">
                <button
                                  onClick={handleLike}
                                  className={`btn btn-link text-body p-0   ${isLiked ? 'liked' : ''}`}
                                  disabled={isLiking}
                >
                  {isLiked?
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" fill="#FC2A2A" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  }
                  
                </button>
                <span className="ms-1 post-footer-icon text-gray">{likes.length}</span>
              </div>
              <div className='d-flex align-items-center'>
                <button
                  className="btn btn-link text-body p-0"
                  onClick={() => setShowCommentOffcanvas(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.50049 10.5H15.5005" stroke="#888888" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.99951 18.4299H10.9995L15.4495 21.39C16.1095 21.83 16.9995 21.3599 16.9995 20.5599V18.4299C19.9995 18.4299 21.9995 16.4299 21.9995 13.4299V7.42993C21.9995 4.42993 19.9995 2.42993 16.9995 2.42993H6.99951C3.99951 2.42993 1.99951 4.42993 1.99951 7.42993V13.4299C1.99951 16.4299 3.99951 18.4299 6.99951 18.4299Z" stroke="#888888" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <span className="ms-1 post-footer-icon text-gray">{comments.length}</span>
              </div>
              <div className='d-flex align-items-center'>
                <button
                  className="btn btn-link text-body p-0"
                  onClick={() => setShowShareOffcanvas(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.9995 8.00025L20.6359 8.63664L21.2723 8.00025L20.6359 7.36385L19.9995 8.00025ZM14.9995 19.9002C15.4966 19.9002 15.8995 19.4973 15.8995 19.0002C15.8995 18.5032 15.4966 18.1002 14.9995 18.1002L14.9995 19.9002ZM15.6359 13.6366L20.6359 8.63664L19.3631 7.36385L14.3631 12.3638L15.6359 13.6366ZM20.6359 7.36385L15.6359 2.36385L14.3631 3.63664L19.3631 8.63664L20.6359 7.36385ZM19.9995 7.10025L9.49951 7.10024L9.49951 8.90024L19.9995 8.90024L19.9995 7.10025ZM9.49951 19.9002L14.9995 19.9002L14.9995 18.1002L9.49951 18.1002L9.49951 19.9002ZM3.09951 13.5002C3.09951 17.0349 5.96489 19.9002 9.49951 19.9002L9.49951 18.1002C6.959 18.1002 4.89951 16.0408 4.89951 13.5002L3.09951 13.5002ZM9.49951 7.10024C5.96489 7.10024 3.09951 9.96562 3.09951 13.5002L4.89951 13.5002C4.89951 10.9597 6.959 8.90024 9.49951 8.90024L9.49951 7.10024Z" fill="#888888"/>
                  </svg>
                </button>
                <span className="ms-1 post-footer-icon text-gray">0</span>
              </div>
            </div>
            <Form onSubmit={handleComment}>
              <div className="leave-comment-area d-flex align-items-center gap-2 pt-3" >
                <div className="input-wrap w-100 d-flex align-items-center">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="Write a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isCommentLoading}
                  />
                  <input
                    type="file"
                    id="cameraFile"
                    className="d-none"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    capture="environment"
                  />
                  <input
                    type="file"
                    id="linkFile"
                    className="d-none"
                    onChange={(e) => handleLinkChange(e)}
                  />
                  <span className='cursor-pointer'  onClick={() => document.getElementById("linkFile").click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8.02442 13.951H5.06146C2.87959 13.951 1.11084 12.1823 1.11084 10.0004V10.0004C1.11084 7.81856 2.87959 6.0498 5.06146 6.0498H8.02442" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.9506 10H6.04932" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.9751 13.951H14.9381C17.1199 13.951 18.8887 12.1823 18.8887 10.0004V10.0004C18.8887 7.81856 17.1199 6.0498 14.9381 6.0498H11.9751" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className='cursor-pointer ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6753 6.58173V13.3742C17.6753 15.8909 16.1003 17.6659 13.5837 17.6659H6.37533C3.85866 17.6659 2.29199 15.8909 2.29199 13.3742V6.58173C2.29199 4.06506 3.86699 2.29089 6.37533 2.29089H13.5837C16.1003 2.29089 17.6753 4.06506 17.6753 6.58173Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.40137 13.6918L5.6747 12.3476C6.1172 11.8785 6.8547 11.856 7.3247 12.2976C7.33887 12.3118 8.10553 13.091 8.10553 13.091C8.56803 13.5618 9.32387 13.5693 9.7947 13.1076C9.82553 13.0776 11.7397 10.756 11.7397 10.756C12.233 10.1568 13.1189 10.071 13.7189 10.5651C13.7589 10.5985 15.5672 12.4543 15.5672 12.4543" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59423 7.60986C8.59423 8.41736 7.94007 9.07153 7.13257 9.07153C6.32507 9.07153 5.6709 8.41736 5.6709 7.60986C5.6709 6.80236 6.32507 6.14819 7.13257 6.14819C7.94007 6.14903 8.59423 6.80236 8.59423 7.60986Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className='cursor-pointer ms-2' onClick={() => document.getElementById("cameraFile").click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0178 2.12781C14.0201 2.52673 14.3267 3.91603 14.7366 4.36259C15.1464 4.80915 15.7329 4.96098 16.0574 4.96098C17.7821 4.96098 19.1803 6.3592 19.1803 8.08292V13.8336C19.1803 16.1458 17.3048 18.0213 14.9926 18.0213H5.00951C2.69633 18.0213 0.821777 16.1458 0.821777 13.8336V8.08292C0.821777 6.3592 2.22 4.96098 3.94472 4.96098C4.26822 4.96098 4.8547 4.80915 5.26554 4.36259C5.67538 3.91603 5.98103 2.52673 6.9833 2.12781C7.98657 1.72888 12.0155 1.72888 13.0178 2.12781Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.4541 7.53475H15.463" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1556 11.1357C13.1556 9.39308 11.7435 7.98096 10.0009 7.98096C8.25831 7.98096 6.84619 9.39308 6.84619 11.1357C6.84619 12.8782 8.25831 14.2903 10.0009 14.2903C11.7435 14.2903 13.1556 12.8782 13.1556 11.1357Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </div>
                <button
                    disabled={isCommentLoading}
                  type="submit"
                  className="icon-wrap comment-btn border-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                  <path d="M1.49906 2.13311L4.71649 7.76363C4.85491 8.00586 4.92412 8.12698 4.92412 8.25977C4.92412 8.39255 4.85491 8.51367 4.71649 8.7559L1.49906 14.3864C0.879904 15.4699 0.570328 16.0117 0.81174 16.2804C1.05315 16.549 1.62481 16.2989 2.76812 15.7987L17.9059 9.17592C18.8037 8.78316 19.2526 8.58677 19.2526 8.25977C19.2526 7.93276 18.8037 7.73637 17.9059 7.34361L2.76812 0.720817C1.62481 0.220619 1.05315 -0.0294802 0.81174 0.239179C0.570328 0.507839 0.879904 1.0496 1.49906 2.13311Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </Form>
            {showEmojiDropdown && (
<EmojiPicker
  onEmojiClick={handleEmojiSelect}
  disableSearchBar
  emojiStyle={{ width: '20px', height: '20px' }}
/>
)}
<div className="d-flex gap--2">
<div className="mt-1 text-gray-700 text-dark text-sm px-1">
{fileNames.length > 0 ? fileNames.join(", ") : ""}
</div>
<div className="mt-1 text-gray-700 text-dark text-sm px-1">
  {link.length > 0 ? '12345' : ""}
</div>
</div>
          </div>
        </Card.Body>
      </Card>
                 


      {/* Media Gallery Modal */}
      <Modal
        show={showMediaModal}
        onHide={() => setShowMediaModal(false)}
        fullscreen
        className="media-gallery-modal"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          {selectedMedia && (
            <div className="gallery-content">
              {selectedMedia.type === 'video' ? (
                <video controls autoPlay>
                  <source src={selectedMedia.url} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedMedia.url} alt="Gallery media" />
              )}

              <div className="gallery-nav">
                <button
                  onClick={() => handleGalleryNav('prev')}
                  disabled={currentMediaIndex === 0}
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  onClick={() => handleGalleryNav('next')}
                  disabled={currentMediaIndex === post.media.length - 1}
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              <div className="gallery-counter">
                {currentMediaIndex + 1} / {post.media.length}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <ShareOffcanvasNew show={showShareOffcanvas} onHide={() => setShowShareOffcanvas(false)} />
      <CommentOffcanvasNew setPosts={setPosts} posts={posts} isDocument={isDocument} getFileExtension={getFileExtension} getFileIcon={getFileIcon} badge={badge} formatFileSize={formatFileSize} setShowCommentOffcanvas={setShowCommentOffcanvas} setShowShareOffcanvas={setShowShareOffcanvas} setNewComment={setNewComment} handleEmojiSelect={handleEmojiSelect} isCommentLoading={isCommentLoading}  showEmojiDropdown={showEmojiDropdown} fileNames={fileNames} link={link} handleEditShow={handleEditShow} handleFileChange={handleFileChange} handleLinkChange={handleLinkChange} handleMediaClick={handleMediaClick} handlePreview={handlePreview} handleComment={handleComment} newComment={newComment} isLiked={isLiked} handleLike={handleLike} isLiking={isLiking} likes={likes} comments={comments} post={post} show={showCommentOffcanvas} onHide={() => setShowCommentOffcanvas(false)} />
      <Modal
        show={showPdfPreview}
        onHide={() => {
          setShowPdfPreview(false);
          setDocumentError(null);
          setIsDocumentLoading(false);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-danger">picture_as_pdf</span>
              {selectedDocument?.url.split('/').pop()}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="pdf-preview">
            {isDocumentLoading ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div>Loading document...</div>
              </div>
            ) : documentError ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-3 text-danger">
                <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>error</span>
                <div>{documentError}</div>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => handleDownload(selectedDocument?.url)}
                >
                  Download Instead
                </button>
              </div>
            ) : (
              <iframe
                src={selectedDocument?.url}
                title="PDF Preview"
                onError={() => setDocumentError('Failed to load PDF preview')}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowPdfPreview(false)}
          >
            Close
          </button>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => handleDownload(selectedDocument?.url)}
            disabled={isDocumentLoading}
          >
            {isDocumentLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Downloading...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">download</span>
                Download
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
      
      {showCreatePostModal && (
        <CreatePost
          posts={posts}
          setPosts={setPosts}
          userCanCreatePostCategories={[1, 2, 3, 4, 5]}  // Adjust as needed
          editPostData={editPostData}
          onEditComplete={handleEditComplete}
          className="d-none"  // Hide the create post card
        />
      )}
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header>
          <Modal.Title>Enter Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={unlockContent} disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
