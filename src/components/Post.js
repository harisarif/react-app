import React, { useState, useContext, useEffect } from 'react';
import { Card, Dropdown, OverlayTrigger, Tooltip, Collapse, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import ShareOffcanvasNew from './ShareOffcanvasNew';
import axios from '../utils/axios';
import user1 from "../assets/images/user/1.jpg";
import { getProfileImageUrl } from '../utils/helpers';
import moment from 'moment';

const Post = ({ post, onDelete }) => {
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || []);
  const { userData } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState(null);

  if (!post) return null;

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

    try {
      // Retrieve the token from local storage
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

  return (
    <>
      <Card className="card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data">
            <div className="d-flex align-items-center justify-content-between">
              <div className="me-3 flex-shrink-0">
                <img
                  src={post.user ? getProfileImageUrl(post.user) : user1}
                  className="border border-2 rounded-circle user-post-profile"
                  alt={post.user?.name || 'User'}
                />
              </div>
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-0 d-inline-block">{post.user?.name || 'Anonymous'}</h6>
                    {post.user?.verified && (
                      <span className="d-inline-block text-primary">
                        <svg className="align-text-bottom" width="17" height="17" viewBox="0 0 17 17">
                          {/* Verified badge SVG path */}
                        </svg>
                      </span>
                    )}
                    <p className="mb-0">
                      {moment(post.created_at).fromNow()}
                      {' '}
                      {moment(post.created_at).format('h:mm a')}
                    </p>
                  </div>
                  <div>
                    <Dropdown>
                    {userData && (userData.id === post.user_id || userData.roles === 'admin') && (
                      <Dropdown.Toggle className="text-secondary p-0 no-caret" style={{ background: 'none', border: 'none', }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>more_vert</span>
                      </Dropdown.Toggle>
                    )}
                      <Dropdown.Menu align="end" className="shadow-sm">
                        {userData && (userData.id === post.user_id || userData.roles === 'admin') && (
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
                                window.location.reload();
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
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="m-0">{post.title}</p>
          </div>
          {post.media && post.media.length > 0 && (
            <div className={`media-grid media-grid-${Math.min(post.media.length, 5)}`}>
              {post.media.slice(0, 5).map((item, index) => (
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
          <div className="comment-area mt-4 pt-4 border-top">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <button 
                  onClick={handleLike}
                  className={`btn btn-link text-body p-0 like-button ${isLiked ? 'liked' : ''}`}
                  disabled={isLiking}
                >
                  <span 
                    className={`material-symbols-outlined align-text-top font-size-20 like-icon ${isLiked ? 'liked' : ''}`}
                  >
                    {isLiked ? 'thumb_up' : 'thumb_up_off_alt'}
                  </span>
                  <span className="ms-1">{likes.length} Likes</span>
                  
                  {/* Like animation overlay */}
                  <div className={`like-animation ${isAnimating ? 'animate' : ''}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '100%', color: '#0d6efd' }}>
                      thumb_up
                    </span>
                  </div>
                </button>
              </div>
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-link text-body p-0"
                  onClick={() => setShowComments(!showComments)}
                >
                  <span className="material-symbols-outlined align-text-top font-size-20">
                    comment
                  </span>
                  <span className="ms-1">{comments.length} Comments</span>
                </button>
                <button
                  className="btn btn-link text-body p-0"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <span className="material-symbols-outlined align-text-top font-size-20">
                    share
                  </span>
                  <span className="ms-1">Share</span>
                </button>
              </div>
            </div>

            <Collapse in={showComments}>
              <div className="comments-section mt-4">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-item mb-3">
                    <div className="d-flex gap-3">
                      <img
                        src={comment.user ? getProfileImageUrl(comment.user) : user1}
                        alt="user"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                      />
                      <div>
                        <h6 className="mb-1">{comment.user?.name || 'Anonymous'}</h6>
                        <p className="mb-0">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <form onSubmit={handleComment} className="mt-3">
                  <div className="d-flex gap-3">
                    <img
                      src={userData && Object.keys(userData).length > 0 && userData.profile_image ? 
                        baseurl + '/storage/' + userData.profile_image : 
                        user1}
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
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                  </div>
                </form>
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

      <ShareOffcanvasNew show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />

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
    </>
  );
};

export default Post;
