import React, { useState, useContext, useEffect } from 'react';
import { Card, Dropdown, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import ShareOffcanvasNew from './ShareOffcanvasNew';
import axios from '../utils/axios';
import user1 from "../assets/images/user/1.jpg";

const Post = ({ post }) => {
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileIcon = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: 'picture_as_pdf',
      doc: 'description',
      docx: 'description',
      xls: 'table_view',
      xlsx: 'table_view',
      txt: 'article',
      default: 'insert_drive_file'
    };
    return iconMap[extension] || iconMap.default;
  };

  const handlePreview = async (url) => {
    if (url.toLowerCase().endsWith('.pdf')) {
      setFilePreview(url);
    } else {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, '_blank');
        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('Error previewing file:', error);
        Swal.fire({
          title: 'Error',
          text: 'Unable to preview this file type',
          icon: 'error'
        });
      }
    }
  };

  const handleLike = async () => {
    try {
      // Check if userData exists and is valid
      if (!userData || Object.keys(userData).length === 0) {
        await Swal.fire({
          title: 'Please Login',
          text: 'You need to be logged in to like posts',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to login page
            window.location.href = '/auth/sign-in';
          }
        });
        return; // Prevent further execution if not logged in
      }

      // Retrieve the token from local storage
      const token = localStorage.getItem('access_token');

      // Send like request if userData exists
      const response = await axios.post(`/api/posts/${post.id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.message){
        setLikes(response.data.likes);
      }
    } catch (error) {
      console.error('Error liking post:', error);
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

  const renderMediaGrid = () => {
    const media = post.media || [];
    if (media.length === 0) return null;

    const isDocument = (url) => {
      const documentExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'];
      return documentExtensions.some(ext => url.toLowerCase().endsWith(ext));
    };

    const getFileName = (url) => {
      return url.split('/').pop();
    };

    const handleDownload = (url) => {
      window.open(url, '_blank');
    };

    if (media.length === 1) {
      const item = media[0];
      if (isDocument(item.url)) {
        return (
          <div className="user-post mt-4">
            <div className="document-preview p-3 border rounded">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="material-symbols-outlined me-2">{getFileIcon(item.url)}</span>
                  <div className="d-flex flex-column">
                    <span className="fw-medium">{getFileName(item.url)}</span>
                    <small className="text-muted">{formatFileSize(item.size)}</small>
                  </div>
                </div>
                <div className="d-flex">
                  
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(item.url)}
                  >
                    <span className="material-symbols-outlined">download</span>
                    Download
                  </button>
                </div>
              </div>
              {filePreview && item.url === filePreview && item.url.toLowerCase().endsWith('.pdf') && (
                <div className="mt-3">
                  <iframe
                    src={filePreview}
                    className="w-100"
                    style={{ height: '500px', border: 'none' }}
                    title="PDF Preview"
                  />
                </div>
              )}
            </div>
          </div>
        );
      }
      return (
        <div className="user-post mt-4">
          {item.type === 'video' ? (
            <div className="h-100 position-relative">
              <video 
                className="w-100 h-100 rounded object-fit-cover" 
                controls
                controlsList="nodownload"
                preload="metadata"
                playsInline
              >
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img src={item.url} alt="post" className="img-fluid rounded w-100" />
          )}
        </div>
      );
    }

    return (
      <div className="user-post mt-4">
        <div className="d-grid gap-2" 
             style={{ 
               gridTemplateColumns: media.length === 2 ? '1fr 1fr' : 
                                  media.length === 3 ? '1fr 1fr' : 
                                  '1fr 1fr 1fr 1fr',
               maxHeight: '500px',
               overflow: 'hidden'
             }}>
          {media.slice(0, 4).map((item, index) => (
            <div key={index} className="position-relative" style={{ height: '250px' }}>
              {isDocument(item.url) ? (
                <div className="document-preview h-100 p-3 border rounded">
                  <div className="d-flex flex-column h-100">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-symbols-outlined me-2">{getFileIcon(item.url)}</span>
                      <div className="d-flex flex-column">
                        <span className="text-truncate">{getFileName(item.url)}</span>
                        <small className="text-muted">{formatFileSize(item.size)}</small>
                      </div>
                    </div>
                    <div className="d-flex mt-auto">
                      
                      <button 
                        className="btn btn-primary btn-sm flex-grow-1"
                        onClick={() => handleDownload(item.url)}
                      >
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : item.type === 'video' ? (
                <div className="h-100 position-relative">
                  <video 
                    className="w-100 h-100 rounded object-fit-cover" 
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    playsInline
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img 
                  src={item.url} 
                  alt={`media-${index}`} 
                  className="w-100 h-100 rounded object-fit-cover" 
                />
              )}
              {index === 3 && media.length > 4 && (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 rounded d-flex align-items-center justify-content-center">
                  <h3 className="text-white">+{media.length - 4}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="card-block card-stretch card-height">
      <Card.Body>
        <div className="user-post-data">
          <div className="d-flex align-items-center justify-content-between">
            <div className="me-3 flex-shrink-0">
              <img
                src={post.user && post.user.profile_image ? 
                  baseurl + '/storage/' + post.user.profile_image : 
                  user1}
                className="border border-2 rounded-circle user-post-profile"
                alt=""
              />
            </div>
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0 d-inline-block">{post.user.name}</h6>
                  {post.user.verified && (
                    <span className="d-inline-block text-primary">
                      <svg className="align-text-bottom" width="17" height="17" viewBox="0 0 17 17">
                        {/* Verified badge SVG path */}
                      </svg>
                    </span>
                  )}
                  <p className="mb-0">{post.created_at}</p>
                </div>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" className="text-secondary p-0 no-caret" style={{ background: 'none', border: 'none' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>more_vert</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="shadow-sm">
                      {userData && userData.id === post.user_id && (
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
        {renderMediaGrid()}
        <div className="comment-area mt-4 pt-4 border-top">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="like-block position-relative d-flex align-items-center">
              <button 
                onClick={handleLike}
                className="btn btn-link text-body p-0"
              >
                <span className="material-symbols-outlined align-text-top font-size-20">
                  thumb_up
                </span>
                <span className="ms-1">{likes.length} Likes</span>
              </button>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-link text-body p-0"
                onClick={() => setOpen(!open)}
              >
                <span className="material-symbols-outlined align-text-top font-size-20">
                  comment
                </span>
                <span className="ms-1">{comments.length} Comments</span>
              </button>
              <button
                className="btn btn-link text-body p-0"
                onClick={() => setModalShow(true)}
              >
                <span className="material-symbols-outlined align-text-top font-size-20">
                  share
                </span>
                <span className="ms-1">Share</span>
              </button>
            </div>
          </div>

          <Collapse in={open}>
            <div className="comments-section mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="comment-item mb-3">
                  <div className="d-flex gap-3">
                    <img
                      src={comment.user && comment.user.profile_image ? 
                        baseurl + '/storage/' + comment.user.profile_image : 
                        user1}
                      alt="user"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <div>
                      <h6 className="mb-1">{comment.user.name}</h6>
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
      <ShareOffcanvasNew show={modalShow} onHide={() => setModalShow(false)} />
    </Card>
  );
};

export default Post;
