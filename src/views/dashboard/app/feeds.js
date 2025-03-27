import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "../../../utils/axios";
import { UserContext } from "../../../context/UserContext";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Nav,
  Tab,
  OverlayTrigger,
  Tooltip,
  Collapse,
  Form
} from "react-bootstrap";
import EventSlider from '../../../components/event-slider';
import Card from "../../../components/Card";
import Post from "../../../components/Post";
import CreatePost from "../../../components/create-post";
// import ShareOffcanvas from "../../../components/share-offcanvas";
import ReactFsLightbox from "fslightbox-react";
import NoDataFound from '../../../components/NoDataFound';
import styled from 'styled-components';
import Swal from 'sweetalert2';
// images
import img1 from "../../../assets/images/page-img/fun.webp";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";
import loader from "../../../assets/images/page-img/page-load-loader.gif";
import img51 from "../../../assets/images/page-img/51.jpg";
import img52 from "../../../assets/images/page-img/52.jpg";
import img53 from "../../../assets/images/page-img/53.jpg";
import img54 from "../../../assets/images/page-img/54.jpg";
import img55 from "../../../assets/images/page-img/55.jpg";
import img56 from "../../../assets/images/page-img/56.jpg";
import img57 from "../../../assets/images/page-img/57.jpg";
import img58 from "../../../assets/images/page-img/58.jpg";
import img59 from "../../../assets/images/page-img/59.jpg";
import img60 from "../../../assets/images/page-img/60.jpg";
import img61 from "../../../assets/images/page-img/61.jpg";
import img62 from "../../../assets/images/page-img/62.jpg";
import img64 from "../../../assets/images/page-img/64.jpg";
import img65 from "../../../assets/images/page-img/65.jpg";
import img63 from "../../../assets/images/page-img/63.jpg";

import mountain from "../../../assets/images/page-img/mountain.webp";
import pizza from "../../../assets/images/page-img/pizza.webp";
import busImg from "../../../assets/images/page-img/bus.webp";
import boyImg from "../../../assets/images/page-img/boy.webp";
import img11 from "../../../assets/images/page-img/fd.webp";
import business1 from "../../../assets/images/page-img/bussiness-1.jpg";
import business2 from "../../../assets/images/page-img/bussiness(2).jpg";

import avatar from '../../../assets/images/d0d79bd9c491d22b6f3398fcaedf2780.jpg'
import post from '../../../assets/images/5d194d4ca634b1e6191d5e4e9181e582.png'

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

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

const UserFeeds = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);

  const [open_replay, setopen_replay] = useState(false)
  const [open_replay1, setopen_replay1] = useState(false)
  const [open_replay2, setopen_replay2] = useState(false)
  const [open_replay3, setopen_replay3] = useState(false)

  const [posts, setPosts] = useState([]);
  const [admins, setAdmins] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadContent, setLoadContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async (pageNumber) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts?page=${pageNumber}`);
      console.log('Fetched posts:', response.data);

      if (pageNumber === 1) {
        setPosts(response.data.data);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data.data]);
      }

      setHasMore(response.data.has_more);
      setLoadContent(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoadContent(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHasMore(false);
    setIsLoading(false);
    fetchPosts(1);
  }, []);

  useEffect(() => {
    axios.get(`/api/get-admins?search=${searchQuery}`)
      .then(response => {
        setAdmins(response.data.users);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchQuery]);

  // Function to check if user has scrolled near the end
  const handleScroll = useCallback(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledToBottom = window.scrollY >= scrollableHeight;

    if (scrolledToBottom && hasMore && !isLoading) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchPosts(nextPage);
        return nextPage;
      });
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    const handleScrollDebounced = debounce(handleScroll, 200); // Debounce the scroll event

    window.addEventListener('scroll', handleScrollDebounced);
    return () => window.removeEventListener('scroll', handleScrollDebounced);
  }, [handleScroll]);

  // Debounce function
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }

  useEffect(() => {
    document.body.classList.add("profile-page");
    return () => {
      document.body.classList.remove("profile-page");
    };
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleNewPost = () => {
    setHasMore(false);
    setIsLoading(false);
    fetchPosts(1);
  };
  const [userCanCreatePostCategories, setUserCanCreatePostCategories] = useState([]);
  useEffect(() => {
    const canCreatePostCategory = userData?.permissions[0]?.can_create_post_category;
    if (canCreatePostCategory) {
      try {
        let arr = JSON.parse(canCreatePostCategory);
        setUserCanCreatePostCategories(arr);
        console.log(userCanCreatePostCategories);
      } catch (error) {
        console.error('Error parsing can_create_post_category:', error);
        setUserCanCreatePostCategories([]); // Set to an empty array on error
      }
    } else {
      setUserCanCreatePostCategories([]); // Set to an empty array if undefined
    }
  }, [userData]);


  const handleFollow = async (userId) => {
    if (!userData) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need to be logged in to follow users',
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
      const response = await axios.post(`/api/follow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.data.status == 'success') {
          console.log("follow")
          setHasMore(false);
          setIsLoading(false);
          fetchPosts(1);

        setAdmins(admins.map(a =>{
          if(a.id == userId){
          return {
            ...a,
            is_following: !a.is_following
          };
        }
        return a; // Return unchanged admin if id doesn't match
        }));

        // Show success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to follow/unfollow user',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <>
      <div id="content-page" className="content-inner">
        <FsLightbox
          toggler={imageController.toggler}
          sources={[
            business2,
            g1,
            g2,
            g3,
            g4,
            g5,
            g6,
            g7,
            g8,
            g9,
            img1,
            boyImg,
            busImg,
            img11,
            mountain,
            pizza,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
            img61,
            img62,
            img63,
            img64,
            img65,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
            business1,
          ]}
          slide={imageController.slide}
        />

        <Container className="custom-conatiner">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                {userData && userCanCreatePostCategories?.some(category => [1, 2, 3, 4, 5].includes(category)) && (
                  <Row  >
                    <Col sm={12} className="">
                      <CreatePost
                        setPosts={setPosts}
                        posts={posts}
                        userCanCreatePostCategories={userCanCreatePostCategories}
                      />
                    </Col>
                    <EventSlider/>

                  </Row>
                )}
                <Row className="special-post-container">
                  <Col lg={12} className="d-flex align-items-center gap-2 mt-n3 mb-2">
                    <hr className='flex-grow-1' />
                    <div className='flex-shrink-0 text-dark' style={{fontSize: 14}}>
                      <span className='text-gray me-1'>Sort: </span>
                      New
                    </div>
                  </Col>
                  <Col lg={12} className="special-post">
                    <Card className="card-block card-stretch card-height">
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
                        <div className="mt-2">
                          <div className="text-dark elipsis-4" style={{fontSize: '14px', lineHeight: '1.5'}}>
                            📢 The Future is Decentralized! 🚀 Are you ready to explore the world of 
                            cryptocurrencies and blockchain technology? Here’s why crypto is shaping 
                            the future of finance: 🌐 Borderless Transactions: Transfer funds globally 
                            in minutes. 🔒 Enhanced Security: Built on blockchain for transparency and 
                            security. 📈 Investment Opportunities: Bitcoin, Ethereum, and other 
                            cryptocurrencies offer potential for significant returns.
                          </div>
                        </div>
                        <div className={`media-grid position-relative media-grid-1`}>
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
                          <Form>
                            <div className="leave-comment-area d-flex align-items-center gap-2 pt-3" >
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
                    </Card>
                  </Col>

                  <Col lg={12} >
                    {loadContent ? (
                      <div className="text-center">
                        <img src={loader} alt="loader" style={{ height: "100px" }} />
                      </div>
                    ) : posts.length === 0 ? (
                      <NoDataFound
                        message="No posts available in your feed."
                        containerClassName="text-center py-5"
                      />
                    ) : (
                      posts.map((post) => (
                        <div key={post.id} className="special-post"> 
                          <Post post={post} setPosts={setPosts} posts={posts} handleFollow={handleFollow} categories={categories} />
                        </div>
                      ))
                    )}
                  </Col>
                </Row>
            </Tab.Container>
        </Container>
      </div>
    </>);
};

export default UserFeeds;
