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
// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

// Redux Selector / Action
import { useSelector, useDispatch } from "react-redux";
import SearchModal from "../../../search-modal";

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
    if (notifications) {
      fetchData();
    }
  }, [notifications]);

  const fetchData = async () => {
    try {
      const [ unread] = await Promise.all([
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
    if (sidebarMini.classList.contains('sidebar-mini')) {
      sidebarMini.classList.remove('sidebar-mini')
    }
    else {
      sidebarMini.classList.add('sidebar-mini')
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

  useEffect(() => {
    const sideBarIconFixed = document.getElementById('first-tour');
    const observer = new MutationObserver(() => {
      if (sideBarIconFixed.classList.contains('sidebar-mini')) {
        document.getElementById("sidebar-toggle-icon").style.left = "0px";
        document.getElementById("sidebar-toggle-icon").style.transition = "left 0.1s ease-in-out";
      } else {
        document.getElementById("sidebar-toggle-icon").style.left = "220px";
        document.getElementById("sidebar-toggle-icon").style.transition = "left 0.3s ease-in-out";
      }
    });
    observer.observe(sideBarIconFixed, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* <div className="position-relative"> */}
      <div className="iq-top-navbar border-bottom">
        <Navbar
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0 shadow-small"
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
                <img src={equity} class="brand-logo" alt="#" />
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
                          <span class="material-symbols-outlined me-2">
                            store
                          </span>
                          <span className="nav-text">Business</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/fitness' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/fitness"
                          onClick={() => setActive("fitness")}
                        >
                          <span class="material-symbols-outlined me-2">
                            exercise
                          </span>
                          <span className="nav-text">Fitness</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/crypto' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/crypto"
                          onClick={() => setActive("crypto")}
                        >
                          <span class="material-symbols-outlined">
                            currency_bitcoin
                          </span>
                          <span className="nav-text">Crypto</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === '/mindset' ? 'active' : ''} nav-item`}>
                        <Link
                          className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                          to="/mindset"
                          onClick={() => setActive("mindset")}
                        >
                          <span class="material-symbols-outlined">
                            self_improvement
                          </span>
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

            <ul className="navbar-nav navbar-list">
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

              {/* <Dropdown className="nav-item group-icon" as="li">
                <Dropdown.Toggle as="a" bsPrefix=" "
                  to="#"
                  className="dropdown-toggle d-flex align-items-center"
                  id="group-drop"
                >
                  <span className="material-symbols-outlined ">group</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`sub-drop sub-drop-large `}
                  aria-labelledby="group-drop"
                  data-bs-popper="static"
                >
                  <div className="card shadow m-0">
                    <div className="card-header d-flex justify-content-between px-0 pb-4 mx-5 border-bottom">
                      <div className="header-title">
                        <h5 className="fw-semibold">Friend Request</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="item-header-scroll">
                        <div className="iq-friend-request">
                          <div className="iq-sub-card-big d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-40 rounded-pill"
                                src={user5}
                                alt=""
                                loading="lazy"
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">Jaques Amole</h6>
                                <p className="mb-0">40 friends</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                to="#"
                                className="me-2 rounded bg-primary-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  add
                                </span>
                              </Link>
                              <Link
                                to="#"
                                className="me-3 rounded bg-danger-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  close
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="iq-friend-request">
                          <div className="iq-sub-card-big d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-40 rounded-pill"
                                src={user2}
                                alt=""
                                loading="lazy"
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">Lucy Tania</h6>
                                <p className="mb-0">12 friends</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                to="#"
                                className="me-2 rounded bg-primary-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  add
                                </span>
                              </Link>
                              <Link
                                to="#"
                                className="me-3 rounded bg-danger-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  close
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="iq-friend-request">
                          <div className="iq-sub-card-big d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-40 rounded-pill"
                                src={user3}
                                alt=""
                                loading="lazy"
                              />
                              <div className=" ms-3">
                                <h6 className="mb-0 ">Manny Petty</h6>
                                <p className="mb-0">3 friends</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                to="#"
                                className="me-2 rounded bg-primary-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  add
                                </span>
                              </Link>
                              <Link
                                to="#"
                                className="me-3 rounded bg-danger-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  close
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="iq-friend-request">
                          <div className="iq-sub-card-big d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-40 rounded-pill"
                                src={user4}
                                alt=""
                                loading="lazy"
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">Marsha Mello</h6>
                                <p className="mb-0">15 friends</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                to="#"
                                className="me-2 rounded bg-primary-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  add
                                </span>
                              </Link>
                              <Link
                                to="#"
                                className="me-3 rounded bg-danger-subtle border-0 d-inline-block px-1"
                              >
                                <span className="material-symbols-outlined font-size-18 align-text-bottom">
                                  close
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary fw-500 mt-4"
                        >
                          View More Request
                        </button>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}

              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle as="a"
                  to="#"
                  className=" d-flex align-items-center header-message-icon"
                  id="mail-drop"
                  onClick={() => {
                      document.getElementById("rightSidebar").classList.toggle("right-sidebar");
                      // document.body.classList.toggle("right-sidebar-close");
                  }}
                >
                  <i className="material-symbols-outlined">chat</i>
                  {unreadCount > 0 && (
                  <span className="position-absolute      badge rounded-pill bg-danger chat-notification-bar">
                    {unreadCount}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
                  <span className="mobile-text d-none ms-3">Message</span>
                </Dropdown.Toggle>
              </Dropdown>

              <Dropdown
                as="li"
                className="nav-item"
                show={showNotifications}
                onToggle={(isOpen) => setShowNotifications(isOpen)}
              >
                <Dropdown.Toggle
                  as="a"
                  bsPrefix=" "
                  className="nav-link d-flex align-items-center"
                  id="notification-drop"
                >
                  <span className="material-symbols-outlined position-relative">
                    notifications
                    {totalUnread > 0 && (
                      <span className="bg-danger text-white notification-count">
                        {totalUnread}
                      </span>
                    )}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop">
                  <Card className="shadow-none m-0">
                    <Card.Header className="d-flex justify-content-between bg-primary">
                      <div className="header-title bg-primary">
                        <h5 className="mb-0 text-white">
                          All Notifications
                          {totalUnread > 0 && ` (${totalUnread} new)`}
                        </h5>
                      </div>
                      {/* {totalUnread > 0 && (
                        // <button
                        //   className="btn btn-link text-white p-0 border-0"
                        //   onClick={handleMarkAllAsRead}
                        // >
                        //   Mark all as read
                        // </button>
                      )} */}
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="notification-list">
                        {notifications.length === 0 ? (
                          <div className="text-center p-3">
                            <p className="mb-0">No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`d-flex align-items-center iq-sub-card ${!notification.is_read ? 'bg-light' : ''}`}
                              onClick={() => handleNotificationItemClick(notification)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="me-3">
                                <img
                                  src={getProfileImageUrl(notification.user)}
                                  alt={notification.user?.name || 'User'}
                                  className="rounded-circle avatar-40"
                                />
                              </div>
                              <div className="flex-grow-1">
                                <div className={`notification-text ${!notification.is_read ? 'fw-bold' : ''}`}>
                                  {notification.content}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <small className="text-muted">
                                    {getRelativeTime(notification.created_at)}
                                  </small>
                                  <button
                                    className="btn btn-link text-danger p-0 border-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteNotification(e, notification.id);
                                    }}
                                  >
                                    <span className="material-symbols-outlined">delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <div className="text-center p-3">
                          <Link to="/notification" className="btn btn-primary w-100" onClick={() => setShowNotifications(false)}>
                            View All Notifications
                          </Link>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
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
              <Dropdown as="li" className="nav-item user-dropdown">
                <Dropdown.Toggle as="a"
                  to="#"
                  className="d-flex align-items-center"
                  id="drop-down-arrow"
                >
                  <Image
                    src={getProfileImageUrl(userData)}

                    className="img-fluid rounded-circle avatar-48 border border-2 me-3"
                    alt="user"
                    loading="lazy"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`sub-drop caption-menu `}
                >
                  <Card className="shadow-none m-0">
                    {userData && (
                      <Card.Header>
                        <div className="header-title">
                          <h5 className="mb-0 ">{userData?.name}</h5>
                        </div>
                      </Card.Header>
                    )}
                    <Card.Body className="p-0 ">
                      {userData && (
                        <div className="d-flex align-items-center iq-sub-card">
                          <span className="material-symbols-outlined">
                            line_style
                          </span>
                          <div className="ms-3">
                            <Link
                              to="/profile"
                              className="mb-0 h6"
                            >
                              My Profile
                            </Link>
                          </div>
                        </div>
                      )}
                      {/* <div className="d-flex align-items-center iq-sub-card border-0">
                        <span className="material-symbols-outlined">
                          line_style
                        </span>
                        <div className="ms-3">
                          <Link
                            to="/dashboard/app/profile"
                            className="mb-0 h6"
                          >
                            My Profile
                          </Link>
                        </div>
                      </div> */}
                      {userData && (
                        <div className="d-flex align-items-center iq-sub-card">
                          <span className="material-symbols-outlined">
                            edit_note
                          </span>
                          <div className="ms-3">
                            <Link to="/dashboard/app/user-profile-edit" className="mb-0 h6">
                              Edit Profile
                            </Link>
                          </div>
                        </div>
                      )}
                      {/* <div className="d-flex align-items-center iq-sub-card border-0">
                        <span className="material-symbols-outlined">
                          edit_note
                        </span>
                        <div className="ms-3">
                          <Link to="/dashboard/app/user-profile-edit" className="mb-0 h6">
                            Edit Profile
                          </Link>
                        </div>
                      </div> */}
                      {userData && (
                        <div className="d-flex align-items-center iq-sub-card border-0">
                          <span className="material-symbols-outlined">
                            manage_accounts
                          </span>
                          <div className="ms-3">
                            <Link
                              to="/dashboard/app/user-account-setting"
                              className="mb-0 h6"
                            >
                              Account settings
                            </Link>
                          </div>
                        </div>
                      )}
                      {userData && (
                        <div className="d-flex align-items-center iq-sub-card border-0">
                          <span className="material-symbols-outlined">
                            lock
                          </span>
                          <div className="ms-3">
                            <Link
                              to="/dashboard/app/user-privacy-setting"
                              className="mb-0 h6"
                            >
                              Privacy Settings
                            </Link>
                          </div>
                        </div>
                      )}

                      <SettingOffCanvas />


                      {!userData && (
                        <div className="d-flex align-items-center iq-sub-card">
                          <span className="material-symbols-outlined">
                            login
                          </span>
                          <div className="ms-3">
                            <Link to="/auth/sign-in" className="mb-0 h6">
                              Sign in
                            </Link>
                          </div>
                        </div>
                      )}

                      {userData && (
                        <div className="d-flex align-items-center iq-sub-card">
                          <span className="material-symbols-outlined">
                            logout
                          </span>
                          <div className="ms-3">
                            <Link onClick={handleLogout} className="mb-0 h6">
                              Sign out
                            </Link>
                          </div>
                        </div>
                      )}

                      <div className=" iq-sub-card">
                        <h5>Chat Settings</h5>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <i className="material-symbols-outlined text-success md-14">
                          circle
                        </i>
                        <div className="ms-3">Online</div>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <i className="material-symbols-outlined text-warning md-14">
                          circle
                        </i>
                        <div className="ms-3">Away</div>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <i className="material-symbols-outlined text-danger md-14">
                          circle
                        </i>
                        <div className="ms-3">Disconnected</div>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <i className="material-symbols-outlined text-gray md-14">
                          circle
                        </i>
                        <div className="ms-3">Invisible</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </Container>
          {/* </Navbar> */}
        </Navbar>
      </div >


      <div
        className="offcanvas offcanvas-end shadow-none iq-product-menu-responsive d-xl-block nav-for-mobile"
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
                <span class="material-symbols-outlined me-2">
                  trending_up
                </span>
                <span className="nav-text">Business Management</span>
              </Link>
            </li>
            <li className={`${location.pathname === '/fitness' ? 'active' : ''} nav-item`}>
              <Link
                className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                to="/fitness"
                onClick={() => setActive("fitness")}
              >
                <span class="material-symbols-outlined me-2">
                  exercise
                </span>
                <span className="nav-text">Fitness</span>
              </Link>
            </li>
            <li className={`${location.pathname === '/crypto' ? 'active' : ''} nav-item`}>
              <Link
                className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                to="/crypto"
                onClick={() => setActive("crypto")}
              >
                <span class="material-symbols-outlined">
                  currency_bitcoin
                </span>
                <span className="nav-text">Crypto</span>
              </Link>
            </li>
            <li className={`${location.pathname === '/mindset' ? 'active' : ''} nav-item`}>
              <Link
                className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2 mx-1`}
                to="/mindset"
                onClick={() => setActive("mindset")}
              >
                <span class="material-symbols-outlined">
                  self_improvement
                </span>
                <span className="nav-text">Mindset</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>






      {/* </div> */}

      {/* <div
        className={`modal-backdrop fade ${show ? "show" : "d-none"}`}
        onClick={handleClose}
      ></div> */}


    </>
  );
};











export default Header;
