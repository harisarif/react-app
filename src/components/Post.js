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

const Post = ({ post, posts, setPosts, onDelete , categories ,handleFollow}) => {
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
  
  // Edit related state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    images: [],
    videos: [],
    documents: [],
    visibility: 'public'
  });
  const [selectedFiles, setSelectedFiles] = useState({ images: [], videos: [], documents: [] });
  const [previews, setPreviews] = useState({ images: [], videos: [], documents: [] });
  // const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.createRef(null);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get('/api/categories');
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  const handleEditShow = () => {
    // Parse the existing media arrays if they're strings
    const images = typeof post.images === 'string' ? JSON.parse(post.images || '[]') : (post.images || []);
    const videos = typeof post.videos === 'string' ? JSON.parse(post.videos || '[]') : (post.videos || []);
    const documents = typeof post.documents === 'string' ? JSON.parse(post.documents || '[]') : (post.documents || []);

    // Set the initial form data with existing post data
    setEditFormData({
      title: post.title || '',
      content: post.content || '',
      category_id: post.category_id?.toString() || '',
      images: images,
      videos: videos,
      documents: documents,
      visibility: post.visibility
    });

    // Set previews for existing media
    setPreviews({
      images: images?.map(img => `${baseurl}/data/images/${img}`),
      videos: videos?.map(video => `${baseurl}/data/videos/${video}`),
      documents: documents?.map(doc => doc.split('/').pop()) // Get filename from path
    });

    // Set selected files (needed for the UI)
    setSelectedFiles({
      images: images,
      videos: videos,
      documents: documents
    });

    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setSelectedFiles({ images: [], videos: [], documents: [] });
    setPreviews({ images: [], videos: [], documents: [] });
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
        documentPreviewUrls.push(file.name);
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

    setEditFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
      videos: [...prev.videos, ...newVideos],
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const removeFile = (type, index) => {
    const newFiles = { ...selectedFiles };
    const newPreviews = { ...previews };
    
    // If it's a File object, just remove it
    // If it's a string (existing file), mark it for removal
    if (newFiles[type][index] instanceof File) {
      if (type === 'images' || type === 'videos') {
        URL.revokeObjectURL(newPreviews[type][index]);
      }
    }
    
    newFiles[type].splice(index, 1);
    newPreviews[type].splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      
      console.log('Form Data before sending:', {
        title: editFormData.title,
        category_id: editFormData.category_id,
        selectedFiles: selectedFiles
      });

      // Add basic info
      formData.append('title', editFormData.title || '');
      formData.append('visibility', editFormData.visibility || 'public');
      formData.append('category_id', editFormData.category_id || '');
      formData.append('_method', 'PUT');

      // Add new files
      if (selectedFiles.images) {
        selectedFiles.images.forEach((file) => {
          if (file instanceof File) {
            formData.append('images[]', file);
          }
        });
      }

      if (selectedFiles.videos) {
        selectedFiles.videos.forEach((file) => {
          if (file instanceof File) {
            formData.append('videos[]', file);
          }
        });
      }

      if (selectedFiles.documents) {
        selectedFiles.documents.forEach((file) => {
          if (file instanceof File) {
            formData.append('documents[]', file);
          }
        });
      }

      // Handle removed media
      const originalImages = typeof post.images === 'string' ? JSON.parse(post.images || '[]') : (post.images || []);
      const originalVideos = typeof post.videos === 'string' ? JSON.parse(post.videos || '[]') : (post.videos || []);
      const originalDocuments = typeof post.documents === 'string' ? JSON.parse(post.documents || '[]') : (post.documents || []);

      // Find removed files by comparing original arrays with current selectedFiles
      const removedImages = originalImages.filter(img => 
        !selectedFiles.images.some(file => 
          file instanceof File ? false : file === img
        )
      );
      
      const removedVideos = originalVideos.filter(vid => 
        !selectedFiles.videos.some(file => 
          file instanceof File ? false : file === vid
        )
      );
      
      const removedDocuments = originalDocuments.filter(doc => 
        !selectedFiles.documents.some(file => 
          file instanceof File ? false : file === doc
        )
      );

      // Add removed media to formData
      removedImages.forEach(img => formData.append('remove_media[]', img));
      removedVideos.forEach(vid => formData.append('remove_media[]', vid));
      removedDocuments.forEach(doc => formData.append('remove_media[]', doc));

      // Keep existing media that wasn't removed
      const keptImages = selectedFiles.images.filter(file => !(file instanceof File));
      const keptVideos = selectedFiles.videos.filter(file => !(file instanceof File));
      const keptDocuments = selectedFiles.documents.filter(file => !(file instanceof File));

      formData.append('kept_images', JSON.stringify(keptImages));
      formData.append('kept_videos', JSON.stringify(keptVideos));
      formData.append('kept_documents', JSON.stringify(keptDocuments));

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }

      const response = await axios.post(`/api/posts/${post.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Post updated successfully',
          timer: 1500,
          showConfirmButton: false
        });

        // Update the post in the UI
        const updatedPost = response.data.post;
        setPosts(prevPosts => 
          prevPosts?.map(p => 
            p.id === post.id ? updatedPost : p
          )
        );

        handleEditClose();
      }
    } catch (error) {
      console.error('Error updating post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong while updating the post!',
      });
    } finally {
      setIsLoading(false);
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

  // const handleFollow = async (userId) => {
  //   if (!userData) {
  //     Swal.fire({
  //       title: 'Please Login',
  //       text: 'You need to be logged in to follow users',
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonText: 'Login',
  //       cancelButtonText: 'Cancel'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.href = '/auth/sign-in';
  //       }
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`/api/follow/${userId}`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
  //       }
  //     });

  //     if (response.data.status == 'success') {
  //       // Update the post's is_following status
  //       setPosts(posts.map(p => {
  //         if (p.user?.id === userId) {
  //           return {
  //             ...p,
  //             is_following: !p.is_following
  //           };
  //         }
  //         return p;
  //       }));

  //       // Show success message
  //       Swal.fire({
  //         title: 'Success',
  //         text: response.data.message,
  //         icon: 'success',
  //         timer: 2000,
  //         showConfirmButton: false
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error following/unfollowing user:', error);
  //     Swal.fire({
  //       title: 'Error',
  //       text: 'Failed to follow/unfollow user',
  //       icon: 'error',
  //       timer: 2000,
  //       showConfirmButton: false
  //     });
  //   }
  // };

  const handleVisibilityChange = (visibility) => {
    setEditFormData(prev => ({
      ...prev,
      visibility: visibility 
    }));
  };

  return (
    <>
      <Card className="card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data ">
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
                    <div className="user-profile-info d-flex align-items-center g-1">
                      <h6 className="mb-0 me-2">{post.user?.name || 'Anonymous'}</h6>
                    <p className="mb-0">
                      {moment(post.created_at).fromNow()}
                      {' '}
                      {moment(post.created_at).format('h:mm a')}
                    </p>
                  </div>
                    {post.visibility == 'private' && (
                      <span className="badge  bg-danger text-white ms-2">Private</span>
                    )}
                    {post.user?.id != userData?.id && (
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
                  )}

                   
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
          <div className="mt-4">
            <div className="m-0" dangerouslySetInnerHTML={{ __html: post.title }} />
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
                  onClick={() => setShowShareOffcanvas(true)}
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
                        <h6 className="mb-1">{comment.user?.name || 'Anonymous'}</h6>
                        <p className="mb-0">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <form onSubmit={handleComment} className="mt-3">
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

      {/* Edit Post Modal */}
      <Modal show={showEditModal} onHide={handleEditClose} size="lg" centered>
        <Modal.Header className="d-flex justify-content-between">
        <Modal.Title  className="d-flex align-items-center hover-bg">
            <div className="d-flex align-items-center flex-grow-1">
              <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-60 rounded-circle me-3" />
              <h2 className="mb-0 me-2">{userData?.name}</h2>
              <span className={`badge ${editFormData.visibility === 'public' ? 'bg-success' : 'bg-danger'}`}>{editFormData.visibility.charAt(0).toUpperCase() + editFormData.visibility.slice(1)}</span>
              <Dropdown className="ms-2">
                <Dropdown.Toggle variant="link" className="p-0">
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleVisibilityChange('public')}>Public</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleVisibilityChange('private')}>Private</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={handleEditClose}>
            <span className="material-symbols-outlined">close</span>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <div className="d-flex align-items-center mb-3">
              {/* <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-60 rounded-circle me-3" /> */}
              <ReactQuill
                placeholder="Write something here..."
                value={editFormData.title}
                onChange={(value) => {
                  console.log('Title changed:', value);
                  setEditFormData(prev => ({ ...prev, title: value }));
                }}
                required
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editFormData.category_id}
                onChange={(e) => {
                  console.log('Category changed:', e.target.value);
                  setEditFormData(prev => ({ ...prev, category_id: e.target.value }));
                }}
                required
              >
                <option value="">Select a category</option>
                {categories?.map(category => (
                  <option 
                    key={category.id} 
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          
            {/* File upload section */}
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
                variant="outline-primary" 
                className="me-2"
                onClick={() => fileInputRef.current.click()}
              >
                <i className="material-icons me-1">attach_file</i>
                Add Files
              </Button>
            </div>

            {/* Preview section */}
            {Object.entries(previews)?.map(([type, files]) => (
              files.length > 0 && (
                <div key={type} className="preview-section mt-3">
                  <h6 className="mb-2">{type.charAt(0).toUpperCase() + type.slice(1)}</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {files?.map((preview, index) => (
                      <div key={index} className="position-relative">
                        {type === 'images' && (
                          <img src={preview} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        )}
                        {type === 'videos' && (
                          <video width="100" height="100" controls>
                            <source src={preview} />
                          </video>
                        )}
                        {type === 'documents' && (
                          <div className="document-preview">
                            <i className="material-icons">description</i>
                            <span>{selectedFiles[type][index].name}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0"
                          onClick={() => removeFile(type, index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
            <div className="mt-3">
              <Button variant="secondary" onClick={handleEditClose} className="me-2">
                Close
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isLoading || !editFormData.category_id || !editFormData.title.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : 'Update'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Post;
