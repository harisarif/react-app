import React from "react";
import { Col, Modal, Row, Card, Dropdown, Form } from "react-bootstrap";

// img
import embed from "../assets/images/icon/embed.png";
import whatsapp from "../assets/images/icon/whatsapp.png";
import facebook from "../assets/images/icon/facebook.png";
import twitter from "../assets/images/icon/twitter.png";
import pinterest from "../assets/images/icon/pinterest.png";
import linkdin from "../assets/images/icon/linkedin.png";

import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useContext } from "react";

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
import Swal from 'sweetalert2';
import { HiMiniArrowUturnRight } from "react-icons/hi2";
import { TbMessage } from "react-icons/tb";

import { Link } from "react-router-dom";
import ShareOffcanvasNew from './ShareOffcanvasNew';
import axios from '../utils/axios';
import user1 from "../assets/images/user/1.jpg";
import { getProfileImageUrl } from '../utils/helpers';
import moment from 'moment';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import CreatePost from './create-post';

import avatar from '../assets/images/d0d79bd9c491d22b6f3398fcaedf2780.jpg'
import post from '../assets/images/5d194d4ca634b1e6191d5e4e9181e582.png'

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

const CommentOffcanvasNew = ({handleReply, setShowReply, showReply, setReplyTo, ReplyTo ,setComments, setPosts, posts, isDocument, setShowCommentOffcanvas, getFileExtension, getFileIcon, badge, formatFileSize, setShowShareOffcanvas, setNewComment, handleEmojiSelect, isCommentLoading , showEmojiDropdown , fileNames , link , handleEditShow , handleFileChange , handleLinkChange , handleMediaClick , handlePreview , handleComment , newComment , isCommenting, likes, isLiked, handleLike, isLiking, comments,  post, show, onHide }) => {
  const { userData } = useContext(UserContext);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const handleCommentLike = async (commentId) => {
    // if (isLiking) return;

    // setIsLiking(true);
    // setIsAnimating(true);

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
        // setIsLiking(false);
        // setIsAnimating(false);
        return;
      }

      // Retrieve the token from local storage
      const token = localStorage.getItem('access_token');

      // Optimistic update
      // const wasLiked = isLiked;
      // setIsLiked(!wasLiked);
      // setLikes(prevLikes =>
      //   wasLiked
      //     ? prevLikes.filter(like => like.user_id !== userData.id)
      //     : [...prevLikes, { user_id: userData.id }]
      // );

      const response = await axios.post(`/api/like-comment`, {
        comment_id: commentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        if(response.data.message == 'Comment liked successfully') {
          const newLike = {
            id: Date.now(), // Generate a temporary ID
            user_id: userData.id,
            comment_id: commentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            type: "comment"
          };
          console.log("liked successfully");
          setComments(comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment, 
                isLiked: true,
                likes: [...(comment.likes || []), response.data.like]
              };
            }
            
            return {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === commentId
                  ? { 
                    ...reply, 
                    isLiked: true,
                    likes: [...(reply.likes || []), response.data.like]
                    }
                  : reply
              )
            };
          }));
          // setComments(
          //   comments.map(comment =>
          //     comment.id === commentId
          //       ? { 
          //           ...comment, 
          //           isLiked: true,
          //           likes: [...(comment.likes || []), response.data.like]
          //         }
          //       : comment.replies.map(reply =>
          //         reply.id === commentId
          //           ? { 
          //               ...reply, 
          //               isLiked: true,
          //               likes: [...(reply.likes || []), response.data.like]
          //             }
          //           : reply
          //       )
          //   ),
          // );
        }
        else{
          console.log("un-liked successfully");
         setComments(comments.map(comment => {
           if (comment.id === commentId) {
             return {
               ...comment,
               isLiked: false,
               likes: comment.likes?.filter(like => like.id !== response.data.like_id)
             };
           }
           
           return {
             ...comment,
             replies: comment.replies.map(reply => 
               reply.id === commentId
                 ? { 
                     ...reply, 
                     isLiked: false,
                     likes: reply.likes?.filter(like => like.id !== response.data.like_id)
                   }
                 : reply
             )
           };
         }));
        }

        // Update with server response
        // setLikes(response.data.likes);
        // setIsLiked(response.data.liked);
        
      } else {
        // Revert changes if server response is not as expected
        // setIsLiked(wasLiked);
        // setLikes(prevLikes =>
        //   wasLiked
        //     ? [...prevLikes, { user_id: userData.id }]
        //     : prevLikes.filter(like => like.user_id !== userData.id)
        // );
      }
    } catch (error) {
      console.error('Error liking post:', error);
      // setIsAnimating(false);
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
      // setTimeout(() => {
        // setIsLiking(false);
        // setIsAnimating(false);
      // }, 800); // Match this with animation duration
    }
  }
  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
      >
        <Modal.Header className="d-flex justify-content-between px-3 py-2">
          <Modal.Title id="contained-modal-title-vcenter" className="d-flex align-items-center hover-bg mx-auto">
            <div className="d-flex align-items-center flex-grow-1">
              <h3 className="modal-title text-dark" id="share-btnLabel">
                {post.user?.name || 'Anonymous'} {' '} Post
              </h3>
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={() => setShowCommentOffcanvas(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375"/>
              <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </Modal.Header>
        <Modal.Body className="mt-0 p-0">
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
                                    className={`btn btn-link text-body p-0 like-button  ${isLiked ? 'liked' : ''}`}
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
                    // onClick={() => setShowCommentOffcanvas(true)}
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
              <hr />
    <div style={{maxHeight: '130px'}} className='overflow-auto' >
      {comments?.map((comment, index) => (
        <>
        <div key={index} className='d-flex gap-2 mb-2'>
          <img src={getProfileImageUrl(comment?.user)} alt='' className="rounded-circle avatar-30 me-2" />
          <div className='d-flex flex-column radius-10 p-3 w-100 me-2 pb-0 comment-card'>

            <div className='d-flex gap-2 justify-content-between'>
              <div className='d-flex gap-0 flex-column'>
                <h6 className="mb-0 suggestion-user-name text-dark" style={{fontSize: '12px', fontWeight: '700'}}>{comment?.user?.name}</h6>
                {comment?.media && typeof comment.media === 'string' && (
                  <div className="mt-2">
                    {JSON.parse(comment.media).map((imageUrl, index) => (
                      <img 
                        key={index}
                        src={baseurl +'/'+ imageUrl}
                        alt="Comment media" 
                        className="mb-2" 
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                )}
                <p className="elipsis-2 mb-0 mt-n1" style={{fontSize: '13px'}}>{comment?.content}</p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
            </div>

            <div className='d-flex gap-2 justify-content-between'>
              <div className='d-flex gap-3'>
              <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}}>{moment(comment?.created_at).fromNow()}</p>
              <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}} onClick={() => handleCommentLike(comment.id)}>{comment?.isLiked ? 'Liked' : 'Like'}</p>
              <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}} onClick={() => handleReply(comment.id, comment.user.id, comment.user.name)}>Reply</p>
              <p 
                className="mb-0 mt-n1 text-gray"
                onClick={() => toggleReplies(comment.id)}
                style={{ fontSize: '12px', fontWeight: '400', textDecoration: 'none' }}
              >
                {showReplies[comment.id] ? 'Hide' : 'Show'} Replies ({comment?.replies?.length || 0})
              </p>
              </div>
              <span style={{fontSize: 12, fontWeight: '400', marginBottom: '8px'}}>{comment?.isLiked ? '❤️' : '♡'} {comment?.likes?.length}</span>
            </div>

          </div>
        </div>
              {showReplies[comment.id] && comment?.replies?.map((reply, replyIndex) => (
                <div key={replyIndex} className='d-flex gap-2 mb-2' style={{ paddingLeft: '30px' }}>
                  <img src={getProfileImageUrl(reply?.user)} alt='' className="rounded-circle avatar-30 me-2" />
                  <div className='d-flex flex-column radius-10 p-3 w-100 me-2 pb-0 comment-card'>
        
                    <div className='d-flex gap-2 justify-content-between'>
                      <div className='d-flex gap-0 flex-column'>
                        <h6 className="mb-0 suggestion-user-name text-dark" style={{fontSize: '12px', fontWeight: '700'}}>{reply?.user?.name}</h6>
                        {reply?.media && typeof reply.media === 'string' && (
                          <div className="mt-2">
                            {JSON.parse(reply.media).map((imageUrl, index) => (
                              <img 
                                key={index}
                                src={imageUrl} 
                                alt="Reply media" 
                                className="mb-2" 
                                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
                              />
                            ))}
                          </div>
                        )}
                        <p className="elipsis-2 mb-0 mt-n1" style={{fontSize: '13px'}}>{reply?.content}</p>
                      </div>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                    </div>
        
                    <div className='d-flex gap-2 justify-content-between'>
                      <div className='d-flex gap-3'>
                      <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}}>{moment(reply?.created_at).fromNow()}</p>
                      <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}} onClick={() => handleCommentLike(reply.id)}>{reply?.isLiked ? 'Liked' : 'Like'}</p>
                      <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}} onClick={() => handleReply(comment.id, reply.user.id, reply.user.name)}>Reply</p>
                      </div>
                      <span style={{fontSize: 12, fontWeight: '400', marginBottom: '8px'}}>{reply?.isLiked ? '❤️' : '♡'} {reply?.likes?.length}</span>
                    </div>
                  </div>
                </div>
              ))}
              </>
      ))}
    </div>
              <Form onSubmit={handleComment}>
                {showReply && (
                  <div className="reply-bar mb-2 p-2 bg-light rounded-1">
                    <span className="text-muted small me-2">Replying to {ReplyTo.userName}</span>
                    <button 
                      type="button" 
                      className="btn-close float-end" 
                      aria-label="Close"
                      onClick={() => {
                        setReplyTo({});
                        setShowReply(false);
                      }}
                    />
                  </div>
                )}
                <div className="leave-comment-area d-flex align-items-center gap-2 pt-3" >
                  <div className="input-wrap w-100 d-flex align-items-center">
                    <input
                      type="text"
                      className="w-100"
                      placeholder={showReply ? `Reply to ${ReplyTo.userName}` : "Write a comment"}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      disabled={isCommentLoading}
                    />
                    <input
                      type="file"
                      id="cameraFile"
                      className="d-none"
                      onChange={handleFileChange}
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      capture="environment"
                    />
                    <input
                      type="file"
                      id="linkFile"
                      className="d-none"
                      onChange={handleFileChange}
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
                      <path d="M17.6753 6.58173V13.3742C17.6753 15.8909 16.1003 17.6659 13.5837 17.6659H6.37533C3.85866 17.6659 2.29199 15.8909 2.29199 13.3742V6.58173C2.29199 4.06506 3.86699 2.29089 6.37533 2.29089H13.5837C16.1003 2.29089 17.6753 4.06506 17.6753 6.58173Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.4541 7.53475H15.463" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1556 11.1357C13.1556 9.39308 11.7435 7.98096 10.0009 7.98096C8.25831 7.98096 6.84619 9.39308 6.84619 11.1357C6.84619 12.8782 8.25831 14.2903 10.0009 14.2903C11.7435 14.2903 13.1556 12.8782 13.1556 11.1357Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span className='cursor-pointer ms-2' onClick={() => document.getElementById("cameraFile").click()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6753 6.58173V13.3742C17.6753 15.8909 16.1003 17.6659 13.5837 17.6659H6.37533C3.85866 17.6659 2.29199 15.8909 2.29199 13.3742V6.58173C2.29199 4.06506 3.86699 2.29089 6.37533 2.29089H13.5837C16.1003 2.29089 17.6753 4.06506 17.6753 6.58173Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
          {/* <Card className="card-block card-stretch card-height mb-2">
            <Card.Body>
              <div className="user-post-data ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="me-2 flex-shrink-0">
                    <img
                      src={avatar}
                      className="user-post-profile avatar-50 rounded-circle"
                      alt=''
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="user-profile-info d-flex justify-content-center flex-column g-0">
                          <h6 className="mb-0 me-2 text-dark fw-bold">Areesha Haider</h6>
                          <p className="mb-0 mt-n1 text-dark" style={{fontSize: 16, fontWeight: '300'}}>Graphic Designer | Social Media Manager | Visual Communication</p>
                          <p className="mb-0 mt-n1 text-gray" style={{fontSize: 14, fontWeight: '400'}}>2 hr</p>
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
                                >
                                  <span className="material-symbols-outlined me-2">edit</span>
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="text-danger d-flex align-items-center"
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
              <div className={`media-grid position-relative mt-3 media-grid-1`}>
                <div className="media-item" >
                  <div className="position-relative w-100 h-100" >
                    <img src={post} alt='' />
                  </div>
                </div>
                <span className={`badge badge-business position-absolute top-left-12`}>Business</span>
              </div>
              <div className="comment-area pt-3">
                <div className="d-flex align-items-center justify-content-between gap-2 w-100 px-4">
                  <div className="like-block d-flex align-items-center">
                    <button
                      className={`btn btn-link text-body p-0 like-button liked`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" fill="#FC2A2A" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <span className="ms-1 post-footer-icon text-gray">1.1K</span>
                  </div>
                  <div className='d-flex align-items-center'>
                    <button
                      className="btn btn-link text-body p-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.50049 10.5H15.5005" stroke="#888888" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.99951 18.4299H10.9995L15.4495 21.39C16.1095 21.83 16.9995 21.3599 16.9995 20.5599V18.4299C19.9995 18.4299 21.9995 16.4299 21.9995 13.4299V7.42993C21.9995 4.42993 19.9995 2.42993 16.9995 2.42993H6.99951C3.99951 2.42993 1.99951 4.42993 1.99951 7.42993V13.4299C1.99951 16.4299 3.99951 18.4299 6.99951 18.4299Z" stroke="#888888" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <span className="ms-1 post-footer-icon text-gray">396</span>
                </div>
                <div className='d-flex align-items-center'>
                  <button
                    className="btn btn-link text-body p-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19.9995 8.00025L20.6359 8.63664L21.2723 8.00025L20.6359 7.36385L19.9995 8.00025ZM14.9995 19.9002C15.4966 19.9002 15.8995 19.4973 15.8995 19.0002C15.8995 18.5032 15.4966 18.1002 14.9995 18.1002L14.9995 19.9002ZM15.6359 13.6366L20.6359 8.63664L19.3631 7.36385L14.3631 12.3638L15.6359 13.6366ZM20.6359 7.36385L15.6359 2.36385L14.3631 3.63664L19.3631 8.63664L20.6359 7.36385ZM19.9995 7.10025L9.49951 7.10024L9.49951 8.90024L19.9995 8.90024L19.9995 7.10025ZM9.49951 19.9002L14.9995 19.9002L14.9995 18.1002L9.49951 18.1002L9.49951 19.9002ZM3.09951 13.5002C3.09951 17.0349 5.96489 19.9002 9.49951 19.9002L9.49951 18.1002C6.959 18.1002 4.89951 16.0408 4.89951 13.5002L3.09951 13.5002ZM9.49951 7.10024C5.96489 7.10024 3.09951 9.96562 3.09951 13.5002L4.89951 13.5002C4.89951 10.9597 6.959 8.90024 9.49951 8.90024L9.49951 7.10024Z" fill="#888888"/>
                    </svg>
                  </button>
                  <span className="ms-1 post-footer-icon text-gray">200</span>
                </div>
              </div>
              <hr />
                <div style={{maxHeight: '130px'}} className='overflow-auto' >
                  {comments?.map((comment, index) => (
                    <div key={index} className='d-flex gap-2 mb-2'>
                      <img src={getProfileImageUrl(comment?.user)} alt='' className="rounded-circle avatar-30 me-2" />
                      <div className='d-flex flex-column radius-10 p-3 w-100 me-2 pb-0' style={{background: '#f9f9f9'}}>

                        <div className='d-flex gap-2 justify-content-between'>
                          <div className='d-flex gap-0 flex-column'>
                            <h6 className="mb-0 suggestion-user-name text-dark" style={{fontSize: '12px', fontWeight: '700'}}>{comment?.user?.name}</h6>
                            <p className="elipsis-2 mb-0 mt-n1" style={{fontSize: '13px'}}>{comment?.content}</p>
                          </div>
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </div>

                        <div className='d-flex gap-2 justify-content-between'>
                          <div className='d-flex gap-3'>
                          <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}}>2 hr</p>
                          <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}}>Like</p>
                          <p className="mb-0 mt-n1 text-gray" style={{fontSize: 12, fontWeight: '400'}}>Reply</p>
                          <button 
                            className="btn btn-link p-0 text-gray"
                            onClick={() => toggleReplies(comment.id)}
                            style={{ fontSize: '12px', fontWeight: '400', textDecoration: 'none' }}
                          >
                            {showReplies[comment.id] ? 'Hide' : 'Show'} Replies ({comment?.replies?.length || 0})
                          </button>
                          </div>
                          <span style={{fontSize: 12, fontWeight: '400', marginBottom: '8px'}}>❤️ 10</span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
                <Form>
                  <div className="leave-comment-area d-flex align-items-center gap-2 pt-2" >
                    <div className="input-wrap w-100 d-flex align-items-center">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Write a comment"
                      />
                      <input
                        type="file"
                        id="cameraFile"
                        className="d-none"
                        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                        capture="environment"
                      />
                      <input
                        type="file"
                        id="linkFile"
                        className="d-none"
                      />
                      <span className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8.02442 13.951H5.06146C2.87959 13.951 1.11084 12.1823 1.11084 10.0004V10.0004C1.11084 7.81856 2.87959 6.0498 5.06146 6.0498H8.02442" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.9506 10H6.04932" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.9751 13.951H14.9381C17.1199 13.951 18.8887 12.1823 18.8887 10.0004V10.0004C18.8887 7.81856 17.1199 6.0498 14.9381 6.0498H11.9751" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span className='cursor-pointer ms-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6753 6.58173V13.3742C17.6753 15.8909 16.1003 17.6659 13.5837 17.6659H6.37533C3.85866 17.6659 2.29199 15.8909 2.29199 13.3742V6.58173C2.29199 4.06506 3.86699 2.29089 6.37533 2.29089H13.5837C16.1003 2.29089 17.6753 4.06506 17.6753 6.58173Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.40137 13.6918L5.6747 12.3476C6.1172 11.8785 6.8547 11.856 7.3247 12.2976C7.33887 12.3118 8.10553 13.091 8.10553 13.091C8.56803 13.5618 9.32387 13.5693 9.7947 13.1076C9.82553 13.0776 11.7397 10.756 11.7397 10.756C12.233 10.1568 13.1189 10.071 13.7189 10.5651C13.7589 10.5985 15.5672 12.4543 15.5672 12.4543" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59423 7.60986C8.59423 8.41736 7.94007 9.07153 7.13257 9.07153C6.32507 9.07153 5.6709 8.41736 5.6709 7.60986C5.6709 6.80236 6.32507 6.14819 7.13257 6.14819C7.94007 6.14903 8.59423 6.80236 8.59423 7.60986Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span className='cursor-pointer ms-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0178 2.12781C14.0201 2.52673 14.3267 3.91603 14.7366 4.36259C15.1464 4.80915 15.7329 4.96098 16.0574 4.96098C17.7821 4.96098 19.1803 6.3592 19.1803 8.08292V13.8336C19.1803 16.1458 17.3048 18.0213 14.9926 18.0213H5.00951C2.69633 18.0213 0.821777 16.1458 0.821777 13.8336V8.08292C0.821777 6.3592 2.22 4.96098 3.94472 4.96098C4.26822 4.96098 4.8547 4.80915 5.26554 4.36259C5.67538 3.91603 5.98103 2.52673 6.9833 2.12781C7.98657 1.72888 12.0155 1.72888 13.0178 2.12781Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.4541 7.53475H15.463" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1556 11.1357C13.1556 9.39308 11.7435 7.98096 10.0009 7.98096C8.25831 7.98096 6.84619 9.39308 6.84619 11.1357C6.84619 12.8782 8.25831 14.2903 10.0009 14.2903C11.7435 14.2903 13.1556 12.8782 13.1556 11.1357Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="icon-wrap comment-btn border-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                      <path d="M1.49906 2.13311L4.71649 7.76363C4.85491 8.00586 4.92412 8.12698 4.92412 8.25977C4.92412 8.39255 4.85491 8.51367 4.71649 8.7559L1.49906 14.3864C0.879904 15.4699 0.570328 16.0117 0.81174 16.2804C1.05315 16.549 1.62481 16.2989 2.76812 15.7987L17.9059 9.17592C18.8037 8.78316 19.2526 8.58677 19.2526 8.25977C19.2526 7.93276 18.8037 7.73637 17.9059 7.34361L2.76812 0.720817C1.62481 0.220619 1.05315 -0.0294802 0.81174 0.239179C0.570328 0.507839 0.879904 1.0496 1.49906 2.13311Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </Form>
              </div>
            </Card.Body>
          </Card> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CommentOffcanvasNew;
