import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../context/UserContext';
import { NotificationContext } from '../../../../context/NotificationContext';
//router
import { Link, useLocation, useNavigate } from 'react-router-dom'

//react-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'

import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { BsSuitcaseLg } from "react-icons/bs";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdOutlineTurnedInNot } from "react-icons/md";
import { MdOutlineTurnedIn } from "react-icons/md";
import feedSvg from "../../../../assets/images/svg/feeds.svg";
import { getNotificationUrl } from '../../../../utils/notificationHelpers';

import { RxDashboard } from "react-icons/rx";
import { LuBookOpenText } from "react-icons/lu";

function CustomToggle({ children, eventKey, onClick, to }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));
    const isCurrentEventKey = activeEventKey === eventKey;
    const location = useLocation();
    const navigate = useNavigate();
    

    return (
        <div
            aria-expanded={isCurrentEventKey ? 'true' : 'false'}
            className={`nav-link ${location.pathname === to ? 'active' : ''}`}
            role="button"
            onClick={(e) => {
                if (e.target.closest('.right-icon')) {
                    // If clicking the chevron icon, only toggle the dropdown
                    decoratedOnClick(isCurrentEventKey);
                } else {
                    // If clicking elsewhere, navigate to the link
                    navigate(to);
                }
            }}
        >
            {children}
        </div>
    );
}

const VerticalNav = React.memo(() => {
    const {
        notifications,
        totalUnread,
        markAsRead, 
        deleteNotification,
        setNotifications,
        setTotalUnread
      } = useContext(NotificationContext);
    const { userData, setUserData } = useContext(UserContext);
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    window.scrollTo(0, 0);
    let location = useLocation();
    const [show, setShow] = useState(false);
    return (
        <React.Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
                <li className="nav-item static-item nav-first-li nav-common-class">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Main</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/' ? 'active' : ''} nav-item nav-second-li nav-common-class`}>
                        <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
                            {/* <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
                                <GrHomeRounded size={'1.5rem'} />
                            </OverlayTrigger> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 15V12.5" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.39148 2.34992L2.61648 6.97492C1.96648 7.49158 1.54981 8.58325 1.69148 9.39992L2.79981 16.0332C2.99981 17.2166 4.13315 18.1749 5.33315 18.1749H14.6665C15.8581 18.1749 16.9998 17.2082 17.1998 16.0332L18.3081 9.39992C18.4415 8.58325 18.0248 7.49158 17.3831 6.97492L11.6081 2.35825C10.7165 1.64158 9.27481 1.64158 8.39148 2.34992Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="item-name elipsis-1">Home</span>
                        </Link>
                    </li>

                    {/* {userData && (

                        <li className={`${location.pathname === '/profile' ? 'active' : ''} nav-item nav-third-li nav-common-class`}>
                            <Link className={`${location.pathname === '/profile' ? 'active' : ''} nav-link `} aria-current="page" to="/profile"
                                onClick={() => setActive("profile")}>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Profiles</Tooltip>}>
                                    {location.pathname === '/profile' ? <FaUser size={'1.5rem'} /> : <FaRegUser size={'1.5rem'} />}
                                </OverlayTrigger>
                                <span className="item-name elipsis-1">Profiles</span>
                            </Link>
                        </li>
                    )} */}

                    <li className={`${location.pathname === '/home' || location.pathname === '/business' || location.pathname === '/crypto' || location.pathname === '/fitness' || location.pathname === '/mindset' ? 'active' : ''} nav-item nav-seventh-li nav-common-class`}>
                        <Link className={`${location.pathname === '/home' || location.pathname === '/business' || location.pathname === '/crypto' || location.pathname === '/fitness' || location.pathname === '/mindset' ? 'active' : ''} nav-link `} aria-current="page" to="/home">
                            <RxDashboard />
                            <span className="item-name elipsis-1">Feeds</span>
                        </Link>
                    </li>


                    <li className={`${location.pathname === '/education' ? 'active' : ''} nav-item nav-fifth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/education' ? 'active' : ''} nav-link `} aria-current="page" to="/education">
                            {/* <LuBookOpenText /> */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3333 13.95V3.89168C18.3333 2.89168 17.5166 2.15001 16.525 2.23335H16.475C14.725 2.38335 12.0666 3.27502 10.5833 4.20835L10.4416 4.30001C10.2 4.45001 9.79996 4.45001 9.55829 4.30001L9.34996 4.17502C7.86663 3.25002 5.21663 2.36668 3.46663 2.22501C2.47496 2.14168 1.66663 2.89168 1.66663 3.88335V13.95C1.66663 14.75 2.31663 15.5 3.11663 15.6L3.35829 15.6333C5.16663 15.875 7.95829 16.7917 9.55829 17.6667L9.59163 17.6833C9.81663 17.8083 10.175 17.8083 10.3916 17.6833C11.9916 16.8 14.7916 15.875 16.6083 15.6333L16.8833 15.6C17.6833 15.5 18.3333 14.75 18.3333 13.95Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 4.57501V17.075" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.45837 7.07501H4.58337" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.08337 9.57501H4.58337" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                            <span className="item-name elipsis-1">Education</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/job-list' ? 'active' : ''} nav-item nav-sixth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/job-list' ? 'active' : ''} nav-link `} aria-current="page" to="/job-list">
                            {/* <OverlayTrigger placement="right" overlay={<Tooltip>Job List</Tooltip>}>
                                {location.pathname === '/job-list' ? <BsSuitcaseLgFill size={'1.5rem'} /> : <BsSuitcaseLg size={'1.5rem'} />}
                            </OverlayTrigger> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 5.83329V14.1666C17.5 16.6666 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6666 2.5 14.1666V5.83329C2.5 3.33329 3.75 1.66663 6.66667 1.66663H13.3333C16.25 1.66663 17.5 3.33329 17.5 5.83329Z" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.0833 3.75V5.41667C12.0833 6.33333 12.8333 7.08333 13.7499 7.08333H15.4166" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66675 10.8334H10.0001" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66675 14.1666H13.3334" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="item-name elipsis-1">Job List</span>
                        </Link>
                    </li>
                    {userData && userData?.permissions[0]?.can_create_jobs == 1 && (
                        <li className={`${location.pathname === '/job-applications' ? 'active' : ''} nav-item nav-seventh-li nav-common-class`}>
                            <Link className={`${location.pathname === '/job-applications' ? 'active' : ''} nav-link `} aria-current="page" to="/job-applications">
                                {/* <OverlayTrigger placement="right" overlay={<Tooltip>Job Applications</Tooltip>}>
                                    <i className="icon material-symbols-outlined">
                                        app_registration
                                    </i>
                                </OverlayTrigger> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M6.66675 1.66663V4.16663" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.3333 1.66663V4.16663" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.5 7.08329V14.1666C17.5 16.6666 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6666 2.5 14.1666V7.08329C2.5 4.58329 3.75 2.91663 6.66667 2.91663H13.3333C16.25 2.91663 17.5 4.58329 17.5 7.08329Z" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.66675 9.16663H13.3334" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.66675 13.3334H10.0001" stroke="#1E1E1E" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="item-name elipsis-1">Job Applications</span>
                            </Link>
                        </li>
                    )}
                    <li className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-item nav-eigth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-link `} aria-current="page" to="/event-calender">
                            {/* <OverlayTrigger placement="right" overlay={<Tooltip>Events Calender</Tooltip>}>
                                {location.pathname === '/event-calender' ? <BsFillCalendar2WeekFill size={'1.5rem'} /> : <BsCalendarWeek size={'1.5rem'} />}
                            </OverlayTrigger> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M18.275 5.6333L15.4667 16.9083C15.2667 17.75 14.5167 18.3333 13.65 18.3333H2.70003C1.44169 18.3333 0.541706 17.0999 0.916706 15.8916L4.42503 4.625C4.6667 3.84167 5.39171 3.29993 6.20838 3.29993H16.4584C17.25 3.29993 17.9084 3.78326 18.1834 4.44993C18.3417 4.80826 18.375 5.21663 18.275 5.6333Z" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10"/>
                            <path d="M13.3333 18.3333H17.3166C18.3916 18.3333 19.2332 17.425 19.1582 16.35L18.3333 5" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.06665 5.31663L8.93332 1.71667" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.6499 5.32501L14.4332 1.70837" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.41675 10H13.0834" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.58325 13.3334H12.2499" stroke="#1E1E1E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="item-name elipsis-1">Events Calender</span>
                        </Link>
                        {/* {totalUnread > 0 && (
                            <div className="total-ntf-counter">{totalUnread}</div>
                        )} */}
                        
                    </li>
                    {/* <li className={`${location.pathname === '/notification' ? 'active' : ''} nav-item nav-ninth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/notification' ? 'active' : ''} nav-link `} aria-current="page" to="/notification">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Notifications</Tooltip>}>
                                {location.pathname === '/notification' ? <MdNotificationsActive size={'1.5rem'} /> : <MdOutlineNotificationsActive size={'1.5rem'} />}
                            </OverlayTrigger>
                            <span className="item-name elipsis-1">Notifications</span>
                        </Link>
                    </li> */}

                    {userData && userData?.permissions[0]?.can_manage_users == 1 && (
                        <li className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-item nav-tenth-li nav-common-class`}>
                            <Link className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-link `} aria-current="page" to="/manage-users">
                                {/* <OverlayTrigger placement="right" overlay={<Tooltip>Manage Users</Tooltip>}>
                                    {location.pathname === '/manage-users' ? <HiMiniUserGroup size={'1.5rem'} /> : <HiOutlineUserGroup size={'1.5rem'} />}
                                </OverlayTrigger> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clip-path="url(#clip0_186_1149)">
                                    <path d="M4.16675 5.83333C4.16675 6.71739 4.51794 7.56524 5.14306 8.19036C5.76818 8.81548 6.61603 9.16667 7.50008 9.16667C8.38414 9.16667 9.23198 8.81548 9.8571 8.19036C10.4822 7.56524 10.8334 6.71739 10.8334 5.83333C10.8334 4.94928 10.4822 4.10143 9.8571 3.47631C9.23198 2.85119 8.38414 2.5 7.50008 2.5C6.61603 2.5 5.76818 2.85119 5.14306 3.47631C4.51794 4.10143 4.16675 4.94928 4.16675 5.83333Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.5 17.5V15.8333C2.5 14.9493 2.85119 14.1014 3.47631 13.4763C4.10143 12.8512 4.94928 12.5 5.83333 12.5H9.16667C10.0507 12.5 10.8986 12.8512 11.5237 13.4763C12.1488 14.1014 12.5 14.9493 12.5 15.8333V17.5" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M13.3333 2.60901C14.0503 2.79259 14.6858 3.20959 15.1396 3.79427C15.5935 4.37894 15.8398 5.09803 15.8398 5.83818C15.8398 6.57832 15.5935 7.29741 15.1396 7.88208C14.6858 8.46676 14.0503 8.88376 13.3333 9.06734" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.5 17.5004V15.8337C17.4958 15.098 17.2483 14.3844 16.7961 13.804C16.3439 13.2237 15.7124 12.8093 15 12.6254" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_186_1149">
                                    <rect width="20" height="20" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <span className="item-name elipsis-1">Manage Users</span>
                            </Link>
                        </li>
                    )}
            </Accordion>
        </React.Fragment >
    )
})

export default VerticalNav
