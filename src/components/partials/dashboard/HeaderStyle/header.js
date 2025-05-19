import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../../../context/UserContext';
import { NotificationContext } from '../../../../context/NotificationContext';
import axios from '../../../../utils/axios';
import '../../../../../src/utils/echo';  // Import Echo configuration
import { Nav, Form, Card, Container, Image, Dropdown, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProfileImageUrl } from '../../../../utils/helpers';
import { getRelativeTime } from '../../../../utils/dateUtils';
import { getNotificationUrl } from '../../../../utils/notificationHelpers';
import moment from 'moment';
import './header.css';
import SearchBar from '../SearchBar/SearchBar';
import { LuPanelsTopLeft } from "react-icons/lu";


import SettingOffCanvas from "../../../setting/SettingOffCanvas";
import RightSidebar from "../SidebarStyle/rightsidebar";

//image
import user1 from "../../../../assets/images/user/1.jpg";
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";
import user5 from "../../../../assets/images/user/01.jpg";
import user13 from "../../../../assets/images/user/07.jpg";

import shop1 from "../../../../assets/images/store/06.jpg";
import shop2 from "../../../../assets/images/store/02.jpg";
import shop3 from "../../../../assets/images/store/01.jpg";
import equity from "../../../../assets/images/Equity_Circle.png";
import equityLight from "../../../../assets/images/Equity-light.png";
// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

// Redux Selector / Action
import { useSelector, useDispatch } from "react-redux";
import SearchModal from "../../../search-modal";
import bussinessSvg from "../../../../assets/images/svg/bussiness.svg";
import cryptoSvg from "../../../../assets/images/svg/crypto.svg";
import fitnessSvg from "../../../../assets/images/svg/fitness.svg";
import mindsetSvg from "../../../../assets/images/svg/mindset.svg";
const Header = () => {

  const [unreadCount, setUnreadCount] = useState(0);
  const [conversationUnreadCounts, setConversationUnreadCounts] = useState({});
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  const { userData } = useContext(UserContext);
  const {
    notifications,
    totalUnread,
    markAsRead,
    deleteNotification,
    setNotifications,
    setTotalUnread
  } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const appName = useSelector(SettingSelector.app_name);
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  useEffect(() => {
    const sidebar = document.getElementById("rightSidebar");
    if (sidebar) {
      sidebar.classList.add("right-sidebar");
    }
  }, []);

  useEffect(() => {
    if (notifications) {
      fetchData();
    }
  }, [notifications]);

  const fetchData = async () => {
    try {
      const [unread] = await Promise.all([
        axios.get('/api/messages/unread-count')
      ]);
      setUnreadCount(unread.data.total_count);
      setConversationUnreadCounts(unread.data.conversation_counts || {});

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleMarkAllAsRead = async () => {
    try {
      // Update all unread notifications in the UI immediately
      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        is_read: true
      }));
      setNotifications(updatedNotifications);
      setTotalUnread(0);

      // Call the API to mark all as read
      await axios.post('/api/notifications/mark-all-as-read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert the UI changes if the API call fails
      const unreadCount = notifications.filter(n => !n.is_read).length;
      setTotalUnread(unreadCount);
      setNotifications(notifications);
    }
  };

  const handleNotificationAction = async (actionFn, ...args) => {
    try {
      await actionFn(...args);
    } catch (error) {
      console.error('Error performing notification action:', error);
    }
  };

  const handleNotificationItemClick = async (notification) => {
    if (!notification.is_read) {
      await handleNotificationAction(markAsRead, notification.id);
    }
    const url = getNotificationUrl(notification);
    if (url !== '#') {
      navigate(url);
      setShowNotifications(false);
    }
  };



  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation(); // Prevent triggering the parent click
    await handleNotificationAction(deleteNotification, notificationId);
  };

  const minisidebar = () => {
    const sidebarMini = document.getElementsByTagName("ASIDE")[0];
    if (sidebarMini.classList.contains('active')) {
      sidebarMini.classList.remove('active')
    }
    else {
      sidebarMini.classList.add('active')
    }
  };

  const dropdownContent = document.querySelectorAll(".sub-drop");
  if (dropdownContent) {
    dropdownContent.forEach((element) => {
      setTimeout(() => {
        element.style = "";
      }, 100);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/auth/sign-in';
  }

  // useEffect(() => {
  //   const sideBarIconFixed = document.getElementById('first-tour');
  // const observer = new MutationObserver(() => {
  //   if (sideBarIconFixed.classList.contains('sidebar-mini')) {
  //     document.getElementById("sidebar-toggle-icon").style.left = "0px";
  //     document.getElementById("sidebar-toggle-icon").style.transition = "left 0.1s ease-in-out";
  //   } else {
  //     document.getElementById("sidebar-toggle-icon").style.left = "220px";
  //     document.getElementById("sidebar-toggle-icon").style.transition = "left 0.3s ease-in-out";
  //   }
  // });
  // observer.observe(sideBarIconFixed, { attributes: true });
  // return () => observer.disconnect();
  // }, []);

  return (
    <>
      {/* <div className="position-relative"> */}
      <div className="iq-top-navbar border-bottom">
        <Navbar
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
        >
          {/* <Navbar className="iq-navbar p-lg-0" sticky="top"> */}
          <Container fluid className="navbar-inner">
            <Link
              className=""
              id="sidebar-toggle-icon"
              data-toggle="sidebar"
              data-active="true"
              onClick={minisidebar}
              to="#"
            >
              <div className="icon material-symbols-outlined iq-burger-menu">
                {" "}
                menu{" "}
              </div>
            </Link>
            <div className="d-flex align-items-center pb-2 pb-lg-0 header-logo">
              <Link
                to="/home"
                className="d-flex align-items-center iq-header-logo navbar-brand d-block"
              >
                <img src={equity} class="brand-logo light-logo" alt="#" />
                <img src={equityLight} class="brand-logo dark-logo" alt="#" />

              </Link>

            </div>

            <div className="d-flex align-items-center header-link  bussiness-crypto-main-web-wrapper">
              <div className="d-flex align-items-center justify-content-between product-offcanvas h-100">
                <div
                  className="offcanvas offcanvas-end shadow-none iq-product-menu-responsive d-xl-block"
                  tabIndex="-1"
                  id="offcanvasBottomNav">
                  <div className="offcanvas-body h-100">
                    <ul className="iq-nav-menu list-unstyled h-100">
                      <li className={`${location.pathname === '/business' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2  mx-1`}
                          to="/business"
                          onClick={() => setActive("business")}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.66685 18.3333H13.3335C16.6835 18.3333 17.2835 16.9917 17.4585 15.3583L18.0835 8.69167C18.3085 6.65833 17.7252 5 14.1668 5H5.83351C2.27518 5 1.69185 6.65833 1.91685 8.69167L2.54185 15.3583C2.71685 16.9917 3.31685 18.3333 6.66685 18.3333Z" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6.66675 4.99996V4.33329C6.66675 2.85829 6.66675 1.66663 9.33341 1.66663H10.6667C13.3334 1.66663 13.3334 2.85829 13.3334 4.33329V4.99996" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.6666 10.8333V11.6667C11.6666 11.675 11.6666 11.675 11.6666 11.6833C11.6666 12.5917 11.6583 13.3333 9.99992 13.3333C8.34992 13.3333 8.33325 12.6 8.33325 11.6917V10.8333C8.33325 10 8.33325 10 9.16659 10H10.8333C11.6666 10 11.6666 10 11.6666 10.8333Z" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.0417 9.16663C16.1167 10.5666 13.9167 11.4 11.6667 11.6833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.18335 9.39124C4.05835 10.6746 6.17502 11.4496 8.33335 11.6912" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>


                          <span className="nav-text">Business</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/fitness' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/fitness"
                          onClick={() => setActive("fitness")}
                        >


                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.47493 18.3333H12.4749C16.6416 18.3333 18.3083 16.6666 18.3083 12.5V7.49996C18.3083 3.33329 16.6416 1.66663 12.4749 1.66663H7.47493C3.30827 1.66663 1.6416 3.33329 1.6416 7.49996V12.5C1.6416 16.6666 3.30827 18.3333 7.47493 18.3333Z" stroke="#6709F5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.6416 10.5835L6.6416 10.5668C7.2666 10.5668 7.9666 11.0418 8.19993 11.6251L9.14993 14.0251C9.3666 14.5668 9.70827 14.5668 9.92493 14.0251L11.8333 9.18346C12.0166 8.7168 12.3583 8.70013 12.5916 9.1418L13.4583 10.7835C13.7166 11.2751 14.3833 11.6751 14.9333 11.6751H18.3166" stroke="#6709F5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                          <span className="nav-text">Fitness</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/crypto' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/crypto"
                          onClick={() => setActive("crypto")}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M1.66675 7.08337H10.8334" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 13.75H6.66667" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.75 13.75H12.0833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.3334 9.44164V13.4249C18.3334 16.3499 17.5917 17.0833 14.6334 17.0833H5.36675C2.40841 17.0833 1.66675 16.3499 1.66675 13.4249V6.57497C1.66675 3.64997 2.40841 2.91663 5.36675 2.91663H11.0667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1667 2.70801H16.7751C17.3501 2.70801 17.8167 3.23301 17.8167 3.74967C17.8167 4.32467 17.3501 4.79134 16.7751 4.79134H14.1667V2.70801Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1667 4.79138H17.1417C17.8001 4.79138 18.3334 5.25805 18.3334 5.83305C18.3334 6.40805 17.8001 6.87472 17.1417 6.87472H14.1667V4.79138Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.6335 6.87476V7.91642" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.6335 1.66638V2.70805" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.1585 2.70801H13.3335" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.1585 6.87476H13.3335" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>



                          <span className="nav-text">Crypto</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/mindset' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/mindset"
                          onClick={() => setActive("mindset")}
                        >

                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_186_1058)">
                              <path d="M12.9167 10.8334C12.1431 10.8334 11.4013 11.1407 10.8543 11.6876C10.3073 12.2346 10 12.9765 10 13.75V14.5834C10 15.3569 10.3073 16.0988 10.8543 16.6458C11.4013 17.1928 12.1431 17.5 12.9167 17.5C13.6902 17.5 14.4321 17.1928 14.9791 16.6458C15.526 16.0988 15.8333 15.3569 15.8333 14.5834V13.0834" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M7.08341 10.8334C7.85696 10.8334 8.59883 11.1407 9.14581 11.6876C9.69279 12.2346 10.0001 12.9765 10.0001 13.75V14.5834C10.0001 15.3569 9.69279 16.0988 9.14581 16.6458C8.59883 17.1928 7.85696 17.5 7.08341 17.5C6.30987 17.5 5.568 17.1928 5.02102 16.6458C4.47404 16.0988 4.16675 15.3569 4.16675 14.5834V13.0834" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M14.5834 13.3333C15.357 13.3333 16.0988 13.026 16.6458 12.4791C17.1928 11.9321 17.5001 11.1902 17.5001 10.4167C17.5001 9.64312 17.1928 8.90125 16.6458 8.35427C16.0988 7.80729 15.357 7.5 14.5834 7.5H14.1667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M15.8333 7.75V5.41667C15.8333 4.64312 15.526 3.90125 14.9791 3.35427C14.4321 2.80729 13.6902 2.5 12.9167 2.5C12.1431 2.5 11.4013 2.80729 10.8543 3.35427C10.3073 3.90125 10 4.64312 10 5.41667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M5.41667 13.3333C4.64312 13.3333 3.90125 13.026 3.35427 12.4791C2.80729 11.9321 2.5 11.1902 2.5 10.4167C2.5 9.64312 2.80729 8.90125 3.35427 8.35427C3.90125 7.80729 4.64312 7.5 5.41667 7.5H5.83333" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M4.16675 7.75V5.41667C4.16675 4.64312 4.47404 3.90125 5.02102 3.35427C5.568 2.80729 6.30987 2.5 7.08341 2.5C7.85696 2.5 8.59883 2.80729 9.14581 3.35427C9.69279 3.90125 10.0001 4.64312 10.0001 5.41667V13.75" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_186_1058">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>


                          <span className="nav-text">Mindset</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <Dropdown bsPrefix=" "
                className="iq-search-bar device-search position-relative d-none d-lg-block"
              >
                <Dropdown.Toggle as="form" bsPrefix=" "
                  action="#"
                  className="searchbox open-modal-search"
                >
                  <Link className="search-link" to="#">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7.82491" cy="7.82495" r="6.74142" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                      <path d="M12.5137 12.8638L15.1567 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Link>
                  <Form.Control
                    type="text"
                    className="text search-input form-control bg-light-subtle"
                    placeholder="Search for people or groups..."
                  />
                  <Link
                    className="d-lg-none d-flex d-none d-lg-block"
                    to="/"
                  >
                    <span className="material-symbols-outlined">search12</span>
                  </Link>
                </Dropdown.Toggle>
                <SearchModal />
              </Dropdown> */}
            </div>

            <ul className="navbar-nav navbar-list d-flex align-items-center gap-2">
              {/* <Dropdown as="li" className="nav-items">
                <Dropdown.Toggle bsPrefix=" " as="a"
                  to="#"
                  className=" d-flex align-items-center"
                  id="mail-drop"
                >
                  <span className="material-symbols-outlined position-relative">
                    shopping_bag
                    <span className="bg-primary text-white shopping-badge">
                      3
                    </span>
                  </span>
                  <span className="mobile-text d-none ms-3">
                    Shopping Cart
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`sub-drop header-notification `}
                  data-bs-popper="static"
                >
                  <Card className="shadow m-0">
                    <Card.Header className="px-0 pb-4 mx-5 border-bottom">
                      <div className="header-title">
                        <h5 className="fw-semibold">Shopping Cart</h5>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-0 rounded-0">
                      <div className="item-header-scroll">
                        <Link to="#" className="text-body">
                          <div className="thread d-flex justify-content-between rounded-0">
                            <div>
                              <img
                                className="avatar-45 rounded align-top"
                                src={shop1}
                                alt=""
                                loading="lazy"
                              />{" "}
                              <div className="ms-3 d-inline-block">
                                <h6 className="font-size-14">Casual Shoe</h6>
                                <span className="font-size-14 fw-semibold">
                                  $75.00
                                </span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </div>
                        </Link>
                        <Link to="#" className="text-body">
                          <div className="thread d-flex justify-content-between rounded-0">
                            <div>
                              <img
                                className="avatar-45 rounded align-top"
                                src={shop2}
                                alt=""
                                loading="lazy"
                              />{" "}
                              <div className="ms-3 d-inline-block">
                                <h6 className="font-size-14">
                                  Harsh Reality book
                                </h6>
                                <span className="font-size-14 fw-semibold">
                                  $25.00
                                </span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </div>
                        </Link>
                        <Link to="#" className="text-body">
                          <div className="thread d-flex justify-content-between rounded-0">
                            <div>
                              <img
                                className="avatar-45 rounded align-top"
                                src={shop3}
                                alt=""
                                loading="lazy"
                              />{" "}
                              <div className="ms-3 d-inline-block">
                                <h6 className="font-size-14">
                                  The Raze night book
                                </h6>
                                <span className="font-size-14 fw-semibold">
                                  $15.00
                                </span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="m-5 mt-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="font-size-14 fw-bolder">
                            Subtotal:
                          </h6>
                          <span className="font-size-14 fw-semibold text-primary">
                            $115.00
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary fw-500 w-100"
                        >
                          View All Products
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown> */}

              <RightSidebar />

              <Dropdown as="li" className="nav-item d-lg-none">
                <Dropdown.Toggle
                  as="form"
                  bsPrefix=" "
                  className="searchbo open-modal-search"
                >
                  <Link className="d-lg-none d-flex text-body" to="#">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7.82491" cy="7.82495" r="6.74142" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                      <path d="M12.5137 12.8638L15.1567 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Link>
                  <Form.Control
                    type="text"
                    className="text search-input form-control bg-soft-primary  d-none d-lg-block"
                    placeholder="Search here..."
                  />

                </Dropdown.Toggle>
                <SearchModal />
              </Dropdown>

              <Nav.Item className="nav-item d-none d-lg-none">
                <Link
                  to="#"
                  className="dropdown-toggle d-flex align-items-center"
                  id="mail-drop-1"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-symbols-outlined">mail</i>
                  <span className="mobile-text  ms-3">Message</span>
                </Link>
              </Nav.Item>

              <Nav.Item className="nav-item">
                <SearchBar page="headerSearch" />
              </Nav.Item>

              <Nav.Item className="nav-item ms-1">
                <button className='btn btn-bell'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path d="M8.01516 1.84003C5.04405 1.84003 2.62946 4.25462 2.62946 7.22573V9.81984C2.62946 10.3674 2.39608 11.2022 2.11782 11.6689L1.08556 13.3834C0.448254 14.4426 0.888086 15.6184 2.05499 16.0134C5.92372 17.306 10.0976 17.306 13.9664 16.0134C15.0525 15.6543 15.5282 14.3708 14.9358 13.3834L13.9035 11.6689C13.6342 11.2022 13.4009 10.3674 13.4009 9.81984V7.22573C13.4009 4.26359 10.9773 1.84003 8.01516 1.84003Z" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                    <path d="M9.67567 2.10091C9.39741 2.02012 9.11017 1.95729 8.81396 1.92138C7.95225 1.81367 7.12644 1.8765 6.35449 2.10091C6.6148 1.43667 7.26109 0.96991 8.01508 0.96991C8.76908 0.96991 9.41536 1.43667 9.67567 2.10091Z" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.708 16.337C10.708 17.8181 9.49618 19.0299 8.01512 19.0299C7.27907 19.0299 6.59688 18.7247 6.11217 18.24C5.62745 17.7553 5.32227 17.0731 5.32227 16.337" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" />
                  </svg>
                </button>
              </Nav.Item>

              <Dropdown as="li" className="nav-item user-dropdown">
                <Dropdown.Toggle as="a"
                  to="#"
                  className="d-flex align-items-center"
                  id="drop-down-arrow"
                >
                  <Image
                    src={getProfileImageUrl(userData)}

                    className="img-fluid rounded-circle avatar-48 border border-2"
                    alt="user"
                    loading="lazy"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`sub-drop caption-menu profile-dropdown`}
                >
                  <Card className="shadow-none m-0">
                    {userData && (
                      <Card.Header className="p-3 border-bottom">
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center overflow-hidden gap-3" style={{ width: '300px' }}>
                              <img src="https://lh3.googleusercontent.com/a/ACg8ocLPGKVqEKPajazLWMrOyxndomwsMjPicTy_-SXnHzcRy3PdJ-U=s96-c" alt="Mubashar Ahmad" className="rounded-circle avatar-40" />
                              <div className="d-flex flex-column gap-0">
                                <h6 className="mb-0 suggestion-user-name text-dark" style={{ fontSize: '16px' }}>Mubashar Ahmad</h6>
                                <p className="mb-0 suggestion-user-email text-dark mt-n1" style={{ fontSize: '13px' }}>mubashardev0204@gmail.com</p>
                              </div>
                            </div>
                          </div>
                          <Link
                            to="/profile"
                            className="border rounded-5 w-100 py-0 text-center text-dark mb-2"
                          >
                            View Profile
                          </Link>
                        </div>
                      </Card.Header>
                    )}
                    <Card.Body className="p-0 border-bottom">
                      {userData && (
                        <Link
                          to="/dashboard/app/user-profile-edit"
                          className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 9.99996C12.3012 9.99996 14.1667 8.13448 14.1667 5.83329C14.1667 3.53211 12.3012 1.66663 10 1.66663C7.69885 1.66663 5.83337 3.53211 5.83337 5.83329C5.83337 8.13448 7.69885 9.99996 10 9.99996Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16.0085 13.1167L13.0585 16.0667C12.9418 16.1834 12.8335 16.4 12.8085 16.5584L12.6502 17.6833C12.5919 18.0917 12.8752 18.375 13.2835 18.3167L14.4085 18.1583C14.5668 18.1333 14.7919 18.025 14.9002 17.9084L17.8502 14.9584C18.3585 14.45 18.6002 13.8583 17.8502 13.1083C17.1085 12.3667 16.5169 12.6083 16.0085 13.1167Z" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M15.5836 13.5416C15.8336 14.4416 16.5336 15.1416 17.4336 15.3916" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M2.8418 18.3333C2.8418 15.1083 6.05015 12.5 10.0002 12.5C10.8668 12.5 11.7001 12.625 12.4751 12.8583" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Edit Profile
                          </div>
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </Link>
                      )}

                      {userData && (
                        <Link
                          to="/dashboard/app/user-account-setting"
                          className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M1.66663 10.7332V9.26657C1.66663 8.39991 2.37496 7.68324 3.24996 7.68324C4.75829 7.68324 5.37496 6.61657 4.61663 5.30824C4.18329 4.55824 4.44163 3.58324 5.19996 3.14991L6.64163 2.32491C7.29996 1.93324 8.14996 2.16657 8.54163 2.82491L8.63329 2.98324C9.38329 4.29157 10.6166 4.29157 11.375 2.98324L11.4666 2.82491C11.8583 2.16657 12.7083 1.93324 13.3666 2.32491L14.8083 3.14991C15.5666 3.58324 15.825 4.55824 15.3916 5.30824C14.6333 6.61657 15.25 7.68324 16.7583 7.68324C17.625 7.68324 18.3416 8.39157 18.3416 9.26657V10.7332C18.3416 11.5999 17.6333 12.3166 16.7583 12.3166C15.25 12.3166 14.6333 13.3832 15.3916 14.6916C15.825 15.4499 15.5666 16.4166 14.8083 16.8499L13.3666 17.6749C12.7083 18.0666 11.8583 17.8332 11.4666 17.1749L11.375 17.0166C10.625 15.7082 9.39163 15.7082 8.63329 17.0166L8.54163 17.1749C8.14996 17.8332 7.29996 18.0666 6.64163 17.6749L5.19996 16.8499C4.44163 16.4166 4.18329 15.4416 4.61663 14.6916C5.37496 13.3832 4.75829 12.3166 3.24996 12.3166C2.37496 12.3166 1.66663 11.5999 1.66663 10.7332Z" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Account settings
                          </div>
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </Link>
                      )}

                      <SettingOffCanvas />

                      {userData && (
                        <Link
                          to="#"
                          className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_186_6876)">
                                <path d="M7.08329 15.8333H6.66663C3.33329 15.8333 1.66663 15 1.66663 10.8333V6.66663C1.66663 3.33329 3.33329 1.66663 6.66663 1.66663H13.3333C16.6666 1.66663 18.3333 3.33329 18.3333 6.66663V10.8333C18.3333 14.1666 16.6666 15.8333 13.3333 15.8333H12.9166C12.6583 15.8333 12.4083 15.9583 12.25 16.1666L11 17.8333C10.45 18.5666 9.54996 18.5666 8.99996 17.8333L7.74996 16.1666C7.61663 15.9833 7.30829 15.8333 7.08329 15.8333Z" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.83337 6.66663H14.1667M5.83337 10.8333H10.8334" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </g>
                              <defs>
                                <clipPath id="clip0_186_6876">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            Chat Settings
                          </div>
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </Link>
                      )}

                      {userData && (
                        <Link
                          to="/dashboard/app/user-privacy-setting"
                          className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_186_6883)">
                                <path d="M5 8.33329V6.66663C5 3.90829 5.83333 1.66663 10 1.66663C14.1667 1.66663 15 3.90829 15 6.66663V8.33329M10 15.4166C10.5525 15.4166 11.0824 15.1971 11.4731 14.8064C11.8638 14.4157 12.0833 13.8858 12.0833 13.3333C12.0833 12.7808 11.8638 12.2509 11.4731 11.8602C11.0824 11.4695 10.5525 11.25 10 11.25C9.44747 11.25 8.91756 11.4695 8.52686 11.8602C8.13616 12.2509 7.91667 12.7808 7.91667 13.3333C7.91667 13.8858 8.13616 14.4157 8.52686 14.8064C8.91756 15.1971 9.44747 15.4166 10 15.4166Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.1666 18.3334H5.83329C2.49996 18.3334 1.66663 17.5 1.66663 14.1667V12.5C1.66663 9.16671 2.49996 8.33337 5.83329 8.33337H14.1666C17.5 8.33337 18.3333 9.16671 18.3333 12.5V14.1667C18.3333 17.5 17.5 18.3334 14.1666 18.3334Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </g>
                              <defs>
                                <clipPath id="clip0_186_6883">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            Privacy Settings
                          </div>
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </Link>
                      )}

                      {userData && userData?.permissions[0]?.can_manage_users == 1 && (
                        <Link
                          to="https://equity-crm.techtrack.online"
                          target="_blank"
                          className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <LuPanelsTopLeft />
                            Equity CRM Dashboard
                          </div>
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </Link>
                      )}

                    </Card.Body>
                    <Card.Footer>

                      {!userData && (
                        <Link
                          to="/auth/sign-in"
                          className="d-flex align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <span className="material-symbols-outlined">
                            login
                          </span>
                          Sign in
                        </Link>
                      )}

                      {userData && (
                        <Link
                          onClick={handleLogout}
                          className="d-flex align-items-center gap-3 text-dark py-2 px-3 profile-link"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_186_6891)">
                              <path d="M18.3333 1.66663L9.16663 10.8333" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M18.3333 1.66663L12.5 18.3333L9.16663 10.8333L1.66663 7.49996L18.3333 1.66663Z" stroke="#FC2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_186_6891">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          Sign out
                        </Link>
                      )}
                    </Card.Footer>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </Container>
          {/* </Navbar> */}
        </Navbar>
      </div >


      <div className="nav-for-mobile shadow">
        <ul className="iq-nav-menu list-unstyled h-100">
          <li className={`${location.pathname === '/business' ? 'active' : ''} nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2  mx-1`}
              to="/business"
              onClick={() => setActive("business")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.66685 18.3333H13.3335C16.6835 18.3333 17.2835 16.9917 17.4585 15.3583L18.0835 8.69167C18.3085 6.65833 17.7252 5 14.1668 5H5.83351C2.27518 5 1.69185 6.65833 1.91685 8.69167L2.54185 15.3583C2.71685 16.9917 3.31685 18.3333 6.66685 18.3333Z" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.66675 4.99996V4.33329C6.66675 2.85829 6.66675 1.66663 9.33341 1.66663H10.6667C13.3334 1.66663 13.3334 2.85829 13.3334 4.33329V4.99996" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.6666 10.8333V11.6667C11.6666 11.675 11.6666 11.675 11.6666 11.6833C11.6666 12.5917 11.6583 13.3333 9.99992 13.3333C8.34992 13.3333 8.33325 12.6 8.33325 11.6917V10.8333C8.33325 10 8.33325 10 9.16659 10H10.8333C11.6666 10 11.6666 10 11.6666 10.8333Z" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.0417 9.16663C16.1167 10.5666 13.9167 11.4 11.6667 11.6833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.18335 9.39124C4.05835 10.6746 6.17502 11.4496 8.33335 11.6912" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="nav-text">Business</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/crypto' ? 'active' : ''} nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
              to="/crypto"
              onClick={() => setActive("crypto")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1.66675 7.08337H10.8334" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 13.75H6.66667" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.75 13.75H12.0833" stroke="#888888" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.3334 9.44164V13.4249C18.3334 16.3499 17.5917 17.0833 14.6334 17.0833H5.36675C2.40841 17.0833 1.66675 16.3499 1.66675 13.4249V6.57497C1.66675 3.64997 2.40841 2.91663 5.36675 2.91663H11.0667" stroke="#888888" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.1667 2.70801H16.7751C17.3501 2.70801 17.8167 3.23301 17.8167 3.74967C17.8167 4.32467 17.3501 4.79134 16.7751 4.79134H14.1667V2.70801Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.1667 4.79138H17.1417C17.8001 4.79138 18.3334 5.25805 18.3334 5.83305C18.3334 6.40805 17.8001 6.87472 17.1417 6.87472H14.1667V4.79138Z" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.6335 6.87476V7.91642" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.6335 1.66638V2.70805" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.1585 2.70801H13.3335" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.1585 6.87476H13.3335" stroke="#888888" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="nav-text">Crypto</span>
            </Link>
          </li>
          <li className={`nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
              to="#"
            >
              <span class="material-symbols-outlined">
                add_box
              </span>
              <span className="nav-text">Post</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/fitness' ? 'active' : ''} nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
              to="/fitness"
              onClick={() => setActive("fitness")}
            >
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 14.3331C18.5 14.8636 18.6975 15.3723 19.0492 15.7473C19.4008 16.1224 19.8777 16.3331 20.375 16.3331C20.8723 16.3331 21.3492 16.1224 21.7008 15.7473C22.0525 15.3723 22.25 14.8636 22.25 14.3331C22.25 13.8027 22.0525 13.294 21.7008 12.9189C21.3492 12.5438 20.8723 12.3331 20.375 12.3331C19.8777 12.3331 19.4008 12.5438 19.0492 12.9189C18.6975 13.294 18.5 13.8027 18.5 14.3331Z" stroke="#282828" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.25 22.3333H18.5C22.035 22.3333 23.8038 22.3333 24.9013 21.1613C26 19.9907 26 18.104 26 14.3333V13C26 9.22933 26 7.34267 24.9013 6.172C24.1 5.316 22.9412 5.08533 21 5.02267M21 5.02267C20.2813 5 19.455 5 18.5 5H11M21 5.02267C21 3.76 21 3.12667 20.8038 2.62933C20.5504 1.98905 20.0728 1.47955 19.4725 1.20933C19.0062 1 18.4137 1 17.2287 1H11C6.28625 1 3.93 1.00133 2.465 2.56267C1 4.124 1 5.30533 1 10.3333M2.40625 23V15M4.75 15V13M4.75 25V23M2.40625 19H7.09375M7.09375 19C7.87 19 8.5 19.672 8.5 20.5V21.5C8.5 22.328 7.87 23 7.09375 23H1M7.09375 19C7.87 19 8.5 18.328 8.5 17.5V16.5C8.5 15.672 7.87 15 7.09375 15H1" fill="none" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="nav-text">Fitness</span>
            </Link>
          </li>

          <li className={`${location.pathname === '/mindset' ? 'active' : ''} nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
              to="/mindset"
              onClick={() => setActive("mindset")}
            >
              <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M8.14264 24.625H13.8569M9.0955 28H12.9041" stroke-width="1.3" fill="none" stroke-linecap="round" />
                <path d="M4.44286 16.768L6.02143 18.172C6.46429 18.5649 6.71429 19.1143 6.71429 19.6881C6.71429 20.5507 7.45429 21.25 8.36714 21.25H13.6329C14.5457 21.25 15.2857 20.5507 15.2857 19.6881C15.2857 19.1143 15.5371 18.5649 15.9786 18.172L17.5557 16.768C19.7586 14.7957 20.9871 12.2023 20.9986 9.5077L21 9.3943C21 4.78945 16.5229 1 11 1C5.47714 1 1 4.78945 1 9.3943V9.5077C1.01286 12.2023 2.24286 14.7943 4.44286 16.768Z" fill="none" stroke-width="1.3" />
              </svg>
              <span className="nav-text">Mindset</span>
            </Link>
          </li>
        </ul>
      </div>

    </>
  );
};


export default Header;