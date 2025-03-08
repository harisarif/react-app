import React, { useState, useContext, useEffect } from 'react';
import { Card, Dropdown, OverlayTrigger, Tooltip, Collapse, Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import ShareOffcanvasNew from './ShareOffcanvasNew';
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
  const [newComment, setNewComment] = useState('');
  const { userData } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [isLiking, setIsLiking] = useState(false);
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
      const token = localStorage.getItem('access_token');

      const response = await axios.post(`/api/posts/${post.id}/comment`, {
        content: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments([...comments, response.data.comment]);
      setNewComment('');
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
                      <h6 className="mb-0 me-2 text-dark">{post.user?.name || 'Anonymous'}</h6>
                      <p className="mb-0 mt-n-1 fs-12">
                        {moment(post.created_at).fromNow()}
                        {' '}
                        {moment(post.created_at).format('h:mm a')}
                      </p>
                    </div>
                    {/* {post.visibility === 'private' && (
                      <span className="badge  bg-danger text-white ms-2">Private</span>
                    )}
                    {post.visibility === 'password_protected' && (
                      <span className="badge bg-warning text-white ms-2" onClick={() => setModalIsOpen(true)}>
                        Un-lock Content
                      </span>
                    )} */}
                    {/* {post.user?.id !== userData?.id && (
                      <FollowButton
                        className={`ms-2 ${post?.is_following ? 'unfollow-btn' : 'follow-btn'}`}
                        onClick={() => handleFollow(post.user?.id)}
                      >
                        {post?.is_following ? (
                          <>
                            <i className="ri-user-unfollow-line"></i>
                            Unfollow
                          </>
                        ) : (
                          <>
                            <i className="ri-user-follow-line"></i>
                            Follow
                          </>
                        )}
                      </FollowButton>
                    )} */}


                  </div>

                  <div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <span className={badge.className}>{badge.text}</span>

                      <Dropdown>
                        {userData && (userData.id === post.user_id || userData.roles === 'admin') && (
                          <Dropdown.Toggle className="text-secondary p-0 no-caret" style={{ background: 'none', border: 'none', }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>more_vert</span>
                          </Dropdown.Toggle>
                        )}
                        <Dropdown.Menu align="end" className="shadow-sm">
                          {userData && (userData.id === post.user_id || userData.roles === 'admin') && (
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
                                }}>
                                <span className="material-symbols-outlined me-2">delete</span>
                                Delete
                              </Dropdown.Item>
                            </>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 px-2">
            <div className="m-0 text-dark" dangerouslySetInnerHTML={{ __html: post.title }} />
          </div>
          <div className="mt-2 px-2">
            <div className="m-0 text-dark" dangerouslySetInnerHTML={{ __html: post.description }} />
          </div>
          {post.media && post.media.length > 0 && (
            <div className={`media-grid media-grid-${Math.min(post.media.length, 5)}`}>
              {post.media.slice(0, 5)?.map((item, index) => (
                <div
                  key={index}
                  className="media-item"
                >
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
                        {/* <button 
                          className="btn btn-download"
                          onClick={() => handleDownload(item.url)}
                        >
                          <span className="material-symbols-outlined">download</span>
                          Download
                        </button> */}
                      </div>
                    </div>
                  ) : item.type === 'video' ? (
                    <div onClick={() => handleMediaClick(item.url, item.type, index)}>
                      <video>
                        <source src={item.url} />
                      </video>
                      <div className="play-button">
                        <span className="material-symbols-outlined">play_circle</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="position-relative w-100 h-100"
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
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="comment-area mt-4 pt-2 border-top">
            <div className="d-flex align-items-center gap-2 w-100">
              <div className="like-block">
                <button
                  onClick={handleLike}
                  className={`btn btn-link text-body p-0 like-button ${isLiked ? 'liked' : ''}`}
                  disabled={isLiking}
                >
                  {isLiked ? <AiFillHeart size={'1.75rem'} /> : <AiOutlineHeart size={'1.75rem'} />}
                  {/* <span className="ms-1">{likes.length} Likes</span> */}
                </button>
              </div>
              <button
                className="btn btn-link text-body p-0"
                onClick={() => setShowComments(!showComments)}
              >  
                <FaRegComment size={'1.65rem'} />
                {/* <span className="ms-1">{comments.length} Comments</span> */}
              </button>
              <button
                className="btn btn-link text-body p-0"
                onClick={() => setShowShareOffcanvas(true)}
              >
                <LiaTelegram size={'1.75rem'} />
                {/* <span className="ms-1">Share</span> */}
              </button>
            </div>

            <div className="w-100 d-flex">
              <span className="m-1 fw-bold text-dark">{likes.length} Likes</span>
            </div>

            <div className="leave-comment-area d-flex align-items-center gap-2" >
              <div className="input-wrap w-100 d-flex align-items-center">
                <input
                  type="text"
                  className="w-100"
                  placeholder="Write a comment"
                />


                <AiOutlineLink size={25} className='ms-2  bold-icon' />
                <BsEmojiSmile size={25} className='ms-2  bold-icon' />
                <MdOutlineCameraAlt size={25} className='ms-2 me-3 bold-icon' />

              </div>

              <div className="icon-wrap">
                <LiaTelegram size={'1.75rem'} />

              </div>
            </div>
            <Collapse in={showComments}>
              <div className="comments-section mt-0">
                <form onSubmit={handleComment} className="mt-2 mb-3">
                  <div className="d-flex gap-3">
                    <img
                      src={getProfileImageUrl(userData)}
                      alt="user"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={isCommentLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isCommentLoading}
                    >
                      Post
                      {isCommentLoading && (
                        <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                      )}
                    </button>
                  </div>
                </form>
                {comments?.map((comment, index) => (
                  <div key={index} className="comment-item mb-3">
                    <div className="d-flex gap-3">
                      <img
                        src={comment.user ? getProfileImageUrl(comment.user) : user1}
                        alt="user"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                      />
                      <div>
                        <h6 className="m-0">{comment.user?.name || 'Anonymous'}</h6>
                        <p className="m-0">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
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

      {/* PDF Preview Modal */}
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

      {/* CreatePost modal for editing */}
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
