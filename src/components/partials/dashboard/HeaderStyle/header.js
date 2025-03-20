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
                          {/* <img src={bussinessSvg} alt="User Icon" /> */}
                          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.6711 14.0625C24.5838 14.0625 24.5001 14.1037 24.4385 14.1769C24.3768 14.2502 24.3421 14.3495 24.3421 14.4531V23.8281C24.3421 23.9317 24.3074 24.0311 24.2458 24.1043C24.1841 24.1776 24.1004 24.2188 24.0132 24.2188H0.986842C0.8996 24.2188 0.815931 24.1776 0.754241 24.1043C0.692552 24.0311 0.657895 23.9317 0.657895 23.8281V14.4531C0.657895 14.3495 0.623238 14.2502 0.561548 14.1769C0.499859 14.1037 0.41619 14.0625 0.328947 14.0625C0.241705 14.0625 0.158036 14.1037 0.0963465 14.1769C0.0346569 14.2502 0 14.3495 0 14.4531L0 23.8281C0 24.4742 0.442763 25 0.986842 25H24.0132C24.5572 25 25 24.4742 25 23.8281V14.4531C25 14.3495 24.9653 14.2502 24.9037 14.1769C24.842 14.1037 24.7583 14.0625 24.6711 14.0625ZM16.7763 3.90625C16.8636 3.90625 16.9472 3.86509 17.0089 3.79184C17.0706 3.71858 17.1053 3.61923 17.1053 3.51562V1.17188C17.1053 0.525781 16.6625 0 16.1184 0H8.88158C8.3375 0 7.89474 0.525781 7.89474 1.17188V3.51562C7.89474 3.61923 7.92939 3.71858 7.99108 3.79184C8.05277 3.86509 8.13644 3.90625 8.22368 3.90625C8.31093 3.90625 8.3946 3.86509 8.45629 3.79184C8.51797 3.71858 8.55263 3.61923 8.55263 3.51562V1.17188C8.55263 1.06827 8.58729 0.968918 8.64898 0.895661C8.71067 0.822405 8.79434 0.78125 8.88158 0.78125H16.1184C16.2057 0.78125 16.2893 0.822405 16.351 0.895661C16.4127 0.968918 16.4474 1.06827 16.4474 1.17188V3.51562C16.4474 3.61923 16.482 3.71858 16.5437 3.79184C16.6054 3.86509 16.6891 3.90625 16.7763 3.90625Z" fill="#896AFF" />
                            <path d="M24.0132 5.46875H0.986842C0.442763 5.46875 0 5.99453 0 6.64062V10.5141C0 12.6844 6.22105 15.5922 12.5822 15.5922C18.8605 15.5922 25 12.6844 25 10.5141V6.64062C25 5.99453 24.5572 5.46875 24.0132 5.46875ZM24.3421 10.5141C24.3421 11.8922 18.7783 14.8109 12.5822 14.8109C6.29934 14.8109 0.657895 11.893 0.657895 10.5141V6.64062C0.657895 6.53702 0.692552 6.43767 0.754241 6.36441C0.815931 6.29115 0.8996 6.25 0.986842 6.25H24.0132C24.1004 6.25 24.1841 6.29115 24.2458 6.36441C24.3074 6.43767 24.3421 6.53702 24.3421 6.64062V10.5141ZM12.5822 17.9688C13.2026 17.9688 13.8474 17.9383 14.4993 17.8781C14.5424 17.8741 14.5844 17.86 14.6229 17.8367C14.6614 17.8134 14.6956 17.7813 14.7236 17.7422C14.7517 17.7032 14.773 17.658 14.7863 17.6092C14.7996 17.5604 14.8047 17.509 14.8013 17.4578C14.7988 17.4063 14.7875 17.3559 14.7682 17.3097C14.7488 17.2635 14.7218 17.2224 14.6887 17.1889C14.6557 17.1554 14.6172 17.1302 14.5758 17.1148C14.5343 17.0994 14.4906 17.0941 14.4474 17.0992C13.1224 17.2219 11.8757 17.2164 10.5533 17.0836C10.4679 17.0781 10.3841 17.1124 10.3196 17.1791C10.2551 17.2458 10.215 17.3396 10.2079 17.4408C10.2007 17.542 10.2269 17.6425 10.2811 17.7211C10.3353 17.7997 10.4131 17.8501 10.498 17.8617C11.2059 17.9328 11.9072 17.9688 12.5822 17.9688Z" fill="#896AFF" />
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


                          {/* <img src={cryptoSvg} alt="User Icon" /> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" className="fitness-svg" fill="none">
                            <path d="M8.66203 4.6265C8.73881 4.47711 8.86 4.3536 9.00988 4.27198C9.15975 4.19036 9.3314 4.15441 9.50255 4.16878C9.6737 4.18315 9.83646 4.24718 9.96972 4.35257C10.103 4.45796 10.2006 4.59984 10.2499 4.75982L12.1999 11.0799L13.807 7.95941C13.8782 7.82103 13.9877 7.70465 14.1231 7.62332C14.2585 7.54198 14.4145 7.4989 14.5736 7.4989C14.7328 7.4989 14.8888 7.54198 15.0242 7.62332C15.1596 7.70465 15.269 7.82103 15.3402 7.95941L16.8156 10.832H21.9992C22.7709 9.28525 23.1624 7.58539 23.1429 5.86645C23.1092 2.63196 20.4397 0 17.1922 0C14.616 0 12.9065 1.53835 12.0001 2.65592C11.0958 1.53679 9.38417 0 6.80792 0C3.56042 0 0.890959 2.63196 0.857209 5.86645C0.843332 6.98338 1.00465 8.09584 1.3356 9.16551H6.32739L8.66203 4.6265Z" fill="" />
                            <path d="M15.5191 12.0381L14.5714 10.1957L12.7666 13.7046C12.6954 13.843 12.586 13.9593 12.4506 14.0406C12.3152 14.1219 12.1591 14.165 12 14.165C11.9761 14.165 11.9514 14.1639 11.9261 14.1618C11.7545 14.148 11.5912 14.0843 11.4574 13.9789C11.3237 13.8736 11.2256 13.7315 11.1761 13.5713L9.22607 7.25125L7.61893 10.3717C7.54808 10.5093 7.43939 10.6252 7.30493 10.7065C7.17046 10.7877 7.01547 10.8312 6.85714 10.832H2.00089C2.50089 11.8489 3.16643 12.8498 3.9975 13.8348C5.00304 15.0263 6.82607 16.9313 11.0363 19.7096C11.3202 19.8987 11.6563 20 12.0005 20C12.3447 20 12.6809 19.8987 12.9648 19.7096C17.175 16.9313 18.998 15.0263 20.0036 13.8348C20.3657 13.4063 20.7054 12.9603 21.0214 12.4985H16.2857C16.1266 12.4985 15.9706 12.4555 15.8352 12.3742C15.6998 12.2928 15.5903 12.1765 15.5191 12.0381ZM23.1429 10.832H21.9991C21.7142 11.4093 21.3874 11.9662 21.0214 12.4985H23.1429C23.3702 12.4985 23.5882 12.4107 23.7489 12.2545C23.9097 12.0982 24 11.8863 24 11.6653C24 11.4443 23.9097 11.2324 23.7489 11.0761C23.5882 10.9198 23.3702 10.832 23.1429 10.832ZM0.857143 9.16559C0.629814 9.16559 0.411797 9.25338 0.251051 9.40964C0.0903058 9.5659 0 9.77783 0 9.99882C0 10.2198 0.0903058 10.4317 0.251051 10.588C0.411797 10.7443 0.629814 10.832 0.857143 10.832H2.00089C1.73578 10.2938 1.51335 9.73673 1.33554 9.16559H0.857143Z" fill="" />
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
                          {/* <span class="material-symbols-outlined">
                            currency_bitcoin
                          </span> */}
                          {/* <img src={fitnessSvg} alt="User Icon" /> */}
                          <svg width="20" height="20" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5 14.3331C18.5 14.8636 18.6975 15.3723 19.0492 15.7473C19.4008 16.1224 19.8777 16.3331 20.375 16.3331C20.8723 16.3331 21.3492 16.1224 21.7008 15.7473C22.0525 15.3723 22.25 14.8636 22.25 14.3331C22.25 13.8027 22.0525 13.294 21.7008 12.9189C21.3492 12.5438 20.8723 12.3331 20.375 12.3331C19.8777 12.3331 19.4008 12.5438 19.0492 12.9189C18.6975 13.294 18.5 13.8027 18.5 14.3331Z" stroke="#282828" stroke-width="1.1" stroke-linecap="round"  stroke-linejoin="round" />
                            <path d="M12.25 22.3333H18.5C22.035 22.3333 23.8038 22.3333 24.9013 21.1613C26 19.9907 26 18.104 26 14.3333V13C26 9.22933 26 7.34267 24.9013 6.172C24.1 5.316 22.9412 5.08533 21 5.02267M21 5.02267C20.2813 5 19.455 5 18.5 5H11M21 5.02267C21 3.76 21 3.12667 20.8038 2.62933C20.5504 1.98905 20.0728 1.47955 19.4725 1.20933C19.0062 1 18.4137 1 17.2287 1H11C6.28625 1 3.93 1.00133 2.465 2.56267C1 4.124 1 5.30533 1 10.3333M2.40625 23V15M4.75 15V13M4.75 25V23M2.40625 19H7.09375M7.09375 19C7.87 19 8.5 19.672 8.5 20.5V21.5C8.5 22.328 7.87 23 7.09375 23H1M7.09375 19C7.87 19 8.5 18.328 8.5 17.5V16.5C8.5 15.672 7.87 15 7.09375 15H1" fill="none"  stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
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

                          {/* <img src={mindsetSvg} alt="User Icon" /> */}
                          <svg width="20" height="20" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M8.14264 24.625H13.8569M9.0955 28H12.9041"   stroke-width="1.3" fill="none" stroke-linecap="round" />
                            <path d="M4.44286 16.768L6.02143 18.172C6.46429 18.5649 6.71429 19.1143 6.71429 19.6881C6.71429 20.5507 7.45429 21.25 8.36714 21.25H13.6329C14.5457 21.25 15.2857 20.5507 15.2857 19.6881C15.2857 19.1143 15.5371 18.5649 15.9786 18.172L17.5557 16.768C19.7586 14.7957 20.9871 12.2023 20.9986 9.5077L21 9.3943C21 4.78945 16.5229 1 11 1C5.47714 1 1 4.78945 1 9.3943V9.5077C1.01286 12.2023 2.24286 14.7943 4.44286 16.768Z"   fill="none" stroke-width="1.3" />
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

              {/* <Dropdown as="li" className="nav-item">
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
              </Dropdown> */}

              {/* <Dropdown
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
              </Dropdown> */}

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


      <div className="nav-for-mobile shadow">
        <ul className="iq-nav-menu list-unstyled h-100">
          <li className={`${location.pathname === '/business' ? 'active' : ''} nav-item`}>
            <Link
              className={`nav-link menu-arrow justify-content-start h-100 p-0 px-2  mx-1`}
              to="/business"
              onClick={() => setActive("business")}
            >
                 <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.6711 14.0625C24.5838 14.0625 24.5001 14.1037 24.4385 14.1769C24.3768 14.2502 24.3421 14.3495 24.3421 14.4531V23.8281C24.3421 23.9317 24.3074 24.0311 24.2458 24.1043C24.1841 24.1776 24.1004 24.2188 24.0132 24.2188H0.986842C0.8996 24.2188 0.815931 24.1776 0.754241 24.1043C0.692552 24.0311 0.657895 23.9317 0.657895 23.8281V14.4531C0.657895 14.3495 0.623238 14.2502 0.561548 14.1769C0.499859 14.1037 0.41619 14.0625 0.328947 14.0625C0.241705 14.0625 0.158036 14.1037 0.0963465 14.1769C0.0346569 14.2502 0 14.3495 0 14.4531L0 23.8281C0 24.4742 0.442763 25 0.986842 25H24.0132C24.5572 25 25 24.4742 25 23.8281V14.4531C25 14.3495 24.9653 14.2502 24.9037 14.1769C24.842 14.1037 24.7583 14.0625 24.6711 14.0625ZM16.7763 3.90625C16.8636 3.90625 16.9472 3.86509 17.0089 3.79184C17.0706 3.71858 17.1053 3.61923 17.1053 3.51562V1.17188C17.1053 0.525781 16.6625 0 16.1184 0H8.88158C8.3375 0 7.89474 0.525781 7.89474 1.17188V3.51562C7.89474 3.61923 7.92939 3.71858 7.99108 3.79184C8.05277 3.86509 8.13644 3.90625 8.22368 3.90625C8.31093 3.90625 8.3946 3.86509 8.45629 3.79184C8.51797 3.71858 8.55263 3.61923 8.55263 3.51562V1.17188C8.55263 1.06827 8.58729 0.968918 8.64898 0.895661C8.71067 0.822405 8.79434 0.78125 8.88158 0.78125H16.1184C16.2057 0.78125 16.2893 0.822405 16.351 0.895661C16.4127 0.968918 16.4474 1.06827 16.4474 1.17188V3.51562C16.4474 3.61923 16.482 3.71858 16.5437 3.79184C16.6054 3.86509 16.6891 3.90625 16.7763 3.90625Z" fill="#896AFF" />
                            <path d="M24.0132 5.46875H0.986842C0.442763 5.46875 0 5.99453 0 6.64062V10.5141C0 12.6844 6.22105 15.5922 12.5822 15.5922C18.8605 15.5922 25 12.6844 25 10.5141V6.64062C25 5.99453 24.5572 5.46875 24.0132 5.46875ZM24.3421 10.5141C24.3421 11.8922 18.7783 14.8109 12.5822 14.8109C6.29934 14.8109 0.657895 11.893 0.657895 10.5141V6.64062C0.657895 6.53702 0.692552 6.43767 0.754241 6.36441C0.815931 6.29115 0.8996 6.25 0.986842 6.25H24.0132C24.1004 6.25 24.1841 6.29115 24.2458 6.36441C24.3074 6.43767 24.3421 6.53702 24.3421 6.64062V10.5141ZM12.5822 17.9688C13.2026 17.9688 13.8474 17.9383 14.4993 17.8781C14.5424 17.8741 14.5844 17.86 14.6229 17.8367C14.6614 17.8134 14.6956 17.7813 14.7236 17.7422C14.7517 17.7032 14.773 17.658 14.7863 17.6092C14.7996 17.5604 14.8047 17.509 14.8013 17.4578C14.7988 17.4063 14.7875 17.3559 14.7682 17.3097C14.7488 17.2635 14.7218 17.2224 14.6887 17.1889C14.6557 17.1554 14.6172 17.1302 14.5758 17.1148C14.5343 17.0994 14.4906 17.0941 14.4474 17.0992C13.1224 17.2219 11.8757 17.2164 10.5533 17.0836C10.4679 17.0781 10.3841 17.1124 10.3196 17.1791C10.2551 17.2458 10.215 17.3396 10.2079 17.4408C10.2007 17.542 10.2269 17.6425 10.2811 17.7211C10.3353 17.7997 10.4131 17.8501 10.498 17.8617C11.2059 17.9328 11.9072 17.9688 12.5822 17.9688Z" fill="#896AFF" />
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 20" className="fitness-svg" fill="none">
                            <path d="M8.66203 4.6265C8.73881 4.47711 8.86 4.3536 9.00988 4.27198C9.15975 4.19036 9.3314 4.15441 9.50255 4.16878C9.6737 4.18315 9.83646 4.24718 9.96972 4.35257C10.103 4.45796 10.2006 4.59984 10.2499 4.75982L12.1999 11.0799L13.807 7.95941C13.8782 7.82103 13.9877 7.70465 14.1231 7.62332C14.2585 7.54198 14.4145 7.4989 14.5736 7.4989C14.7328 7.4989 14.8888 7.54198 15.0242 7.62332C15.1596 7.70465 15.269 7.82103 15.3402 7.95941L16.8156 10.832H21.9992C22.7709 9.28525 23.1624 7.58539 23.1429 5.86645C23.1092 2.63196 20.4397 0 17.1922 0C14.616 0 12.9065 1.53835 12.0001 2.65592C11.0958 1.53679 9.38417 0 6.80792 0C3.56042 0 0.890959 2.63196 0.857209 5.86645C0.843332 6.98338 1.00465 8.09584 1.3356 9.16551H6.32739L8.66203 4.6265Z" fill="" />
                            <path d="M15.5191 12.0381L14.5714 10.1957L12.7666 13.7046C12.6954 13.843 12.586 13.9593 12.4506 14.0406C12.3152 14.1219 12.1591 14.165 12 14.165C11.9761 14.165 11.9514 14.1639 11.9261 14.1618C11.7545 14.148 11.5912 14.0843 11.4574 13.9789C11.3237 13.8736 11.2256 13.7315 11.1761 13.5713L9.22607 7.25125L7.61893 10.3717C7.54808 10.5093 7.43939 10.6252 7.30493 10.7065C7.17046 10.7877 7.01547 10.8312 6.85714 10.832H2.00089C2.50089 11.8489 3.16643 12.8498 3.9975 13.8348C5.00304 15.0263 6.82607 16.9313 11.0363 19.7096C11.3202 19.8987 11.6563 20 12.0005 20C12.3447 20 12.6809 19.8987 12.9648 19.7096C17.175 16.9313 18.998 15.0263 20.0036 13.8348C20.3657 13.4063 20.7054 12.9603 21.0214 12.4985H16.2857C16.1266 12.4985 15.9706 12.4555 15.8352 12.3742C15.6998 12.2928 15.5903 12.1765 15.5191 12.0381ZM23.1429 10.832H21.9991C21.7142 11.4093 21.3874 11.9662 21.0214 12.4985H23.1429C23.3702 12.4985 23.5882 12.4107 23.7489 12.2545C23.9097 12.0982 24 11.8863 24 11.6653C24 11.4443 23.9097 11.2324 23.7489 11.0761C23.5882 10.9198 23.3702 10.832 23.1429 10.832ZM0.857143 9.16559C0.629814 9.16559 0.411797 9.25338 0.251051 9.40964C0.0903058 9.5659 0 9.77783 0 9.99882C0 10.2198 0.0903058 10.4317 0.251051 10.588C0.411797 10.7443 0.629814 10.832 0.857143 10.832H2.00089C1.73578 10.2938 1.51335 9.73673 1.33554 9.16559H0.857143Z" fill="" />
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
                            <path d="M18.5 14.3331C18.5 14.8636 18.6975 15.3723 19.0492 15.7473C19.4008 16.1224 19.8777 16.3331 20.375 16.3331C20.8723 16.3331 21.3492 16.1224 21.7008 15.7473C22.0525 15.3723 22.25 14.8636 22.25 14.3331C22.25 13.8027 22.0525 13.294 21.7008 12.9189C21.3492 12.5438 20.8723 12.3331 20.375 12.3331C19.8777 12.3331 19.4008 12.5438 19.0492 12.9189C18.6975 13.294 18.5 13.8027 18.5 14.3331Z" stroke="#282828" stroke-width="1.1" stroke-linecap="round"  stroke-linejoin="round" />
                            <path d="M12.25 22.3333H18.5C22.035 22.3333 23.8038 22.3333 24.9013 21.1613C26 19.9907 26 18.104 26 14.3333V13C26 9.22933 26 7.34267 24.9013 6.172C24.1 5.316 22.9412 5.08533 21 5.02267M21 5.02267C20.2813 5 19.455 5 18.5 5H11M21 5.02267C21 3.76 21 3.12667 20.8038 2.62933C20.5504 1.98905 20.0728 1.47955 19.4725 1.20933C19.0062 1 18.4137 1 17.2287 1H11C6.28625 1 3.93 1.00133 2.465 2.56267C1 4.124 1 5.30533 1 10.3333M2.40625 23V15M4.75 15V13M4.75 25V23M2.40625 19H7.09375M7.09375 19C7.87 19 8.5 19.672 8.5 20.5V21.5C8.5 22.328 7.87 23 7.09375 23H1M7.09375 19C7.87 19 8.5 18.328 8.5 17.5V16.5C8.5 15.672 7.87 15 7.09375 15H1" fill="none"  stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
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
                            <path opacity="0.5" d="M8.14264 24.625H13.8569M9.0955 28H12.9041"   stroke-width="1.3" fill="none" stroke-linecap="round" />
                            <path d="M4.44286 16.768L6.02143 18.172C6.46429 18.5649 6.71429 19.1143 6.71429 19.6881C6.71429 20.5507 7.45429 21.25 8.36714 21.25H13.6329C14.5457 21.25 15.2857 20.5507 15.2857 19.6881C15.2857 19.1143 15.5371 18.5649 15.9786 18.172L17.5557 16.768C19.7586 14.7957 20.9871 12.2023 20.9986 9.5077L21 9.3943C21 4.78945 16.5229 1 11 1C5.47714 1 1 4.78945 1 9.3943V9.5077C1.01286 12.2023 2.24286 14.7943 4.44286 16.768Z"   fill="none" stroke-width="1.3" />
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