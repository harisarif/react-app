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
                          {/* <img src={bussinessSvg} alt="User Icon" /> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" className="bussiness-svg">
                            <path d="M10 0C8.37923 0 6.82485 0.608436 5.67879 1.69146C4.53274 2.77448 3.88889 4.24337 3.88889 5.775C3.88889 7.30662 4.53274 8.77552 5.67879 9.85854C6.82485 10.9416 8.37923 11.55 10 11.55C11.6208 11.55 13.1752 10.9416 14.3212 9.85854C15.4673 8.77552 16.1111 7.30662 16.1111 5.775C16.1111 4.24337 15.4673 2.77448 14.3212 1.69146C13.1752 0.608436 11.6208 0 10 0ZM5.55556 12.6C4.08213 12.6 2.66905 13.1531 1.62718 14.1377C0.585316 15.1223 0 16.4576 0 17.85V21H20V17.85C20 16.4576 19.4147 15.1223 18.3728 14.1377C17.3309 13.1531 15.9179 12.6 14.4444 12.6H12.9089L10 18.0978L7.09111 12.6H5.55556Z" fill="" />
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 20" className="fitness-svg" fill="none">
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" className="crypto-svg" fill="none">
                            <path d="M20.0521 2.75H4.9479C4.39536 2.75 3.86546 2.96071 3.47476 3.33579C3.08406 3.71086 2.86456 4.21957 2.86456 4.75V19.25C2.86456 19.7804 3.08406 20.2891 3.47476 20.6642C3.86546 21.0393 4.39536 21.25 4.9479 21.25H20.0521C20.6046 21.25 21.1345 21.0393 21.5252 20.6642C21.9159 20.2891 22.1354 19.7804 22.1354 19.25V4.75C22.1354 4.21957 21.9159 3.71086 21.5252 3.33579C21.1345 2.96071 20.6046 2.75 20.0521 2.75Z" stroke="#6c757d" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                            <path d="M8.01562 21.25L10.8391 15.5735L11.5568 17.1155L13.3667 12.3015L14.275 13.454L15.5849 10.6725L16.1724 11.3875L22.1354 4.566" stroke="#6c757d" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.43333 7.041H6.53906" stroke="#6c757d" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.43335 7.041V9.464H9.0995C9.80627 9.464 10.3792 8.921 10.3792 8.2525C10.3792 7.584 9.80627 7.0415 9.0995 7.041H7.43335Z" stroke="#6c757d" stroke-width="1.3" stroke-linejoin="round" />
                            <path d="M7.43335 9.464V12.0465H9.20939C9.96252 12.0465 10.5735 11.468 10.5729 10.7555C10.5729 10.0425 9.96252 9.4645 9.20887 9.464H7.43335Z" stroke="#6c757d" stroke-width="1.3" stroke-linejoin="round" />
                            <path d="M7.43333 12.045H6.53906M7.43125 12.061V12.8555M8.87865 12.061V12.8555M7.43125 6.166V6.961M8.87865 6.166V6.961" stroke="#6c757d" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mindset-svg" viewBox="0 0 22 21" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7366 0.000122699C13.6579 -0.00709914 14.5447 0.304738 15.202 0.867033C15.8593 1.42933 16.2332 2.19602 16.2415 2.99845C16.2498 3.80087 15.8918 4.57331 15.2462 5.14581C14.6007 5.71832 13.7204 6.04401 12.7992 6.05123L12.5467 6.70979C13.1438 7.02516 13.662 7.44184 14.0706 7.93508C14.4792 8.42833 14.7697 8.98807 14.925 9.58105H16.4523C16.7183 9.05016 17.186 8.61524 17.7769 8.34943C18.3678 8.08361 19.0457 8.00311 19.6967 8.12145C20.3477 8.2398 20.9321 8.54977 21.3515 8.99926C21.771 9.44874 22 10.0103 22 10.5896C22 11.1688 21.771 11.7304 21.3515 12.1799C20.9321 12.6294 20.3477 12.9393 19.6967 13.0577C19.0457 13.176 18.3678 13.0955 17.7769 12.8297C17.186 12.5639 16.7183 12.129 16.4523 11.5981H14.9239C14.7311 12.3337 14.3307 13.0159 13.759 13.5828L14.5742 14.2928C15.1933 14.0812 15.8771 14.0618 16.5108 14.2377C17.1444 14.4136 17.6891 14.7742 18.0534 15.2589C18.4177 15.7435 18.5793 16.3226 18.511 16.8988C18.4427 17.475 18.1487 18.0131 17.6785 18.4227C17.2082 18.8323 16.5904 19.0884 15.9288 19.1479C15.2673 19.2073 14.6024 19.0666 14.046 18.7493C13.4896 18.432 13.0756 17.9575 12.8736 17.4057C12.6717 16.8538 12.694 16.2581 12.9369 15.7189L11.8555 14.7769C11.2177 15.0091 10.5332 15.1284 9.84194 15.1279C9.04633 15.1279 8.2613 14.9692 7.54702 14.664L6.53851 15.7189C6.92445 16.3484 7.04251 17.0765 6.87181 17.7744C6.70111 18.4724 6.25265 19.0954 5.60567 19.5332C4.95869 19.9711 4.15484 20.1956 3.33616 20.1672C2.51749 20.1388 1.73669 19.8593 1.13174 19.378C0.526783 18.8967 0.13662 18.2447 0.0301908 17.5371C-0.0762386 16.8295 0.107917 16.1119 0.550115 15.5112C0.992314 14.9104 1.66409 14.4651 2.44674 14.254C3.22939 14.0428 4.07252 14.0795 4.82716 14.3574L5.74652 13.3953C5.02258 12.5961 4.62968 11.6075 4.63148 10.5896C4.63148 9.8483 4.83527 9.1494 5.19653 8.53118L4.19149 7.80101C3.59686 8.06053 2.91777 8.13379 2.26842 8.00845C1.61907 7.88312 1.03908 7.56684 0.625998 7.11281C0.212913 6.65878 -0.00806605 6.0947 0.000225095 5.51544C0.00851624 4.93618 0.245572 4.37708 0.671523 3.93216C1.09747 3.48724 1.68634 3.18366 2.33907 3.07246C2.9918 2.96127 3.66859 3.04924 4.2556 3.3216C4.84262 3.59395 5.30405 4.03407 5.56229 4.56792C5.82053 5.10178 5.85983 5.69681 5.67357 6.25294L6.68093 6.9831C7.72696 6.28491 9.03888 5.95966 10.3502 6.07342L10.6027 5.41385C10.0312 5.0267 9.61294 4.49372 9.40627 3.88939C9.1996 3.28507 9.21487 2.6396 9.44996 2.0432C9.68505 1.44681 10.1282 0.929292 10.7175 0.562986C11.3067 0.19668 12.0127 -0.000109683 12.7366 0.000122699ZM3.4736 16.1364C3.16651 16.1364 2.872 16.2427 2.65486 16.4318C2.43772 16.6209 2.31572 16.8775 2.31572 17.1449C2.31572 17.4124 2.43772 17.6689 2.65486 17.8581C2.872 18.0472 3.16651 18.1535 3.4736 18.1535C3.78069 18.1535 4.0752 18.0472 4.29235 17.8581C4.50949 17.6689 4.63148 17.4124 4.63148 17.1449C4.63148 16.8775 4.50949 16.6209 4.29235 16.4318C4.0752 16.2427 3.78069 16.1364 3.4736 16.1364ZM15.6313 16.1364C15.4778 16.1364 15.3305 16.1895 15.222 16.2841C15.1134 16.3787 15.0524 16.5069 15.0524 16.6407C15.0524 16.7744 15.1134 16.9027 15.222 16.9972C15.3305 17.0918 15.4778 17.1449 15.6313 17.1449C15.7849 17.1449 15.9321 17.0918 16.0407 16.9972C16.1493 16.9027 16.2103 16.7744 16.2103 16.6407C16.2103 16.5069 16.1493 16.3787 16.0407 16.2841C15.9321 16.1895 15.7849 16.1364 15.6313 16.1364ZM9.84194 8.06827C9.07422 8.06827 8.33794 8.3339 7.79508 8.80674C7.25222 9.27957 6.94724 9.92088 6.94724 10.5896C6.94724 11.2583 7.25222 11.8996 7.79508 12.3724C8.33794 12.8452 9.07422 13.1109 9.84194 13.1109C10.6097 13.1109 11.3459 12.8452 11.8888 12.3724C12.4317 11.8996 12.7366 11.2583 12.7366 10.5896C12.7366 9.92088 12.4317 9.27957 11.8888 8.80674C11.3459 8.3339 10.6097 8.06827 9.84194 8.06827ZM19.105 10.0853C18.9514 10.0853 18.8042 10.1384 18.6956 10.233C18.587 10.3276 18.526 10.4558 18.526 10.5896C18.526 10.7233 18.587 10.8516 18.6956 10.9461C18.8042 11.0407 18.9514 11.0938 19.105 11.0938C19.2585 11.0938 19.4058 11.0407 19.5143 10.9461C19.6229 10.8516 19.6839 10.7233 19.6839 10.5896C19.6839 10.4558 19.6229 10.3276 19.5143 10.233C19.4058 10.1384 19.2585 10.0853 19.105 10.0853ZM2.89466 5.04271C2.74112 5.04271 2.59386 5.09584 2.48529 5.19041C2.37672 5.28498 2.31572 5.41324 2.31572 5.54697C2.31572 5.68071 2.37672 5.80897 2.48529 5.90354C2.59386 5.9981 2.74112 6.05123 2.89466 6.05123C3.04821 6.05123 3.19546 5.9981 3.30404 5.90354C3.41261 5.80897 3.4736 5.68071 3.4736 5.54697C3.4736 5.41324 3.41261 5.28498 3.30404 5.19041C3.19546 5.09584 3.04821 5.04271 2.89466 5.04271ZM12.7366 2.01716C12.4295 2.01716 12.135 2.12341 11.9179 2.31255C11.7007 2.50168 11.5788 2.7582 11.5788 3.02568C11.5788 3.29315 11.7007 3.54967 11.9179 3.73881C12.135 3.92794 12.4295 4.0342 12.7366 4.0342C13.0437 4.0342 13.3382 3.92794 13.5554 3.73881C13.7725 3.54967 13.8945 3.29315 13.8945 3.02568C13.8945 2.7582 13.7725 2.50168 13.5554 2.31255C13.3382 2.12341 13.0437 2.01716 12.7366 2.01716Z" fill="" />
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
                <span class="material-symbols-outlined me-2">
                  trending_up
                </span>
                <span className="nav-text">Business</span>
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
                <span class="material-symbols-outlined me-2">
                  exercise
                </span>
                <span className="nav-text">Fitness</span>
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

    </>
  );
};


export default Header;