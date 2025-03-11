import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../context/UserContext';
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
                <div className="nav-top-child">
                    <li className={`${location.pathname === '/' ? 'active' : ''} nav-item nav-second-li nav-common-class`}>
                        <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
                                <GrHomeRounded size={'1.5rem'} />
                            </OverlayTrigger>
                            <span className="item-name">Home</span>
                        </Link>
                    </li>

                    {userData && (

                        <li className={`${location.pathname === '/profile' ? 'active' : ''} nav-item nav-third-li nav-common-class`}>
                            <Link className={`${location.pathname === '/profile' ? 'active' : ''} nav-link `} aria-current="page" to="/profile"
                                onClick={() => setActive("profile")}>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Profiles</Tooltip>}>
                                    {location.pathname === '/profile' ? <FaUser size={'1.5rem'} /> : <FaRegUser size={'1.5rem'} />}
                                </OverlayTrigger>
                                <span className="item-name">Profiles</span>
                            </Link>
                        </li>
                    )}
                </div>

                <Accordion.Item as="li" eventKey="utilities-error" bsPrefix="nav-item" className='nav-fourth-li nav-common-class'>
                    <div className="feed-parent-div">
                        <CustomToggle
                            className="feed-parent-div"
                            eventKey="utilities-error"
                            active={activeMenu === 'utilities-error' ? true : false}
                            onClick={(activeKey) => setActiveMenu(activeKey)}
                            to="/home"
                        >
                            {/* <OverlayTrigger  placement="right" overlay={<Tooltip>Feeds</Tooltip>}>
                            {location.pathname === '/home' ? <MdOutlineTurnedIn size={'1.5rem'} /> : <MdOutlineTurnedInNot size={'1.5rem'} />}
                        </OverlayTrigger> */}
                            {/* <img src={feedSvg} alt="User Icon" /> */}
                            <svg width="21" height="22" stroke="none" fill="none"  className="feeds-svg" viewBox="0 0 21 22"   xmlns="http://www.w3.org/2000/svg">
<path d="M0 2.75C0 2.02065 0.237053 1.32118 0.65901 0.805456C1.08097 0.289731 1.65326 0 2.25 0H18.75C19.3467 0 19.919 0.289731 20.341 0.805456C20.7629 1.32118 21 2.02065 21 2.75V8.25C21 8.97935 20.7629 9.67882 20.341 10.1945C19.919 10.7103 19.3467 11 18.75 11H2.25C1.65326 11 1.08097 10.7103 0.65901 10.1945C0.237053 9.67882 0 8.97935 0 8.25V2.75ZM2.25 1.83333C2.05109 1.83333 1.86032 1.92991 1.71967 2.10182C1.57902 2.27373 1.5 2.50688 1.5 2.75V8.25C1.5 8.49312 1.57902 8.72627 1.71967 8.89818C1.86032 9.07009 2.05109 9.16667 2.25 9.16667H18.75C18.9489 9.16667 19.1397 9.07009 19.2803 8.89818C19.421 8.72627 19.5 8.49312 19.5 8.25V2.75C19.5 2.50688 19.421 2.27373 19.2803 2.10182C19.1397 1.92991 18.9489 1.83333 18.75 1.83333H2.25ZM0 17.4167C0 16.6873 0.237053 15.9878 0.65901 15.4721C1.08097 14.9564 1.65326 14.6667 2.25 14.6667H6.75C7.34674 14.6667 7.91903 14.9564 8.34099 15.4721C8.76295 15.9878 9 16.6873 9 17.4167V19.25C9 19.9793 8.76295 20.6788 8.34099 21.1945C7.91903 21.7103 7.34674 22 6.75 22H2.25C1.65326 22 1.08097 21.7103 0.65901 21.1945C0.237053 20.6788 0 19.9793 0 19.25V17.4167ZM2.25 16.5C2.05109 16.5 1.86032 16.5966 1.71967 16.7685C1.57902 16.9404 1.5 17.1736 1.5 17.4167V19.25C1.5 19.4931 1.57902 19.7263 1.71967 19.8982C1.86032 20.0701 2.05109 20.1667 2.25 20.1667H6.75C6.94891 20.1667 7.13968 20.0701 7.28033 19.8982C7.42098 19.7263 7.5 19.4931 7.5 19.25V17.4167C7.5 17.1736 7.42098 16.9404 7.28033 16.7685C7.13968 16.5966 6.94891 16.5 6.75 16.5H2.25ZM14.25 14.6667C13.6533 14.6667 13.081 14.9564 12.659 15.4721C12.2371 15.9878 12 16.6873 12 17.4167V19.25C12 19.9793 12.2371 20.6788 12.659 21.1945C13.081 21.7103 13.6533 22 14.25 22H18.75C19.3467 22 19.919 21.7103 20.341 21.1945C20.7629 20.6788 21 19.9793 21 19.25V17.4167C21 16.6873 20.7629 15.9878 20.341 15.4721C19.919 14.9564 19.3467 14.6667 18.75 14.6667H14.25ZM13.5 17.4167C13.5 17.1736 13.579 16.9404 13.7197 16.7685C13.8603 16.5966 14.0511 16.5 14.25 16.5H18.75C18.9489 16.5 19.1397 16.5966 19.2803 16.7685C19.421 16.9404 19.5 17.1736 19.5 17.4167V19.25C19.5 19.4931 19.421 19.7263 19.2803 19.8982C19.1397 20.0701 18.9489 20.1667 18.75 20.1667H14.25C14.0511 20.1667 13.8603 20.0701 13.7197 19.8982C13.579 19.7263 13.5 19.4931 13.5 19.25V17.4167Z" fill="none" stroke="none"/>
</svg>

                            <span className="item-name">Feeds</span>
                            <i className="right-icon material-symbols-outlined" style={{ color: 'black' }}>chevron_right</i>
                        </CustomToggle>
                    </div>
                    <Accordion.Collapse eventKey="utilities-error" className={location.pathname == "/fitness" || location.pathname == "/business" || location.pathname == "/crypto" || location.pathname == "/mindset" ? "show" : ""}>
                        <ul className="sub-nav feed-sub-menu">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/business' ? 'active' : ''} nav-link feed-sub-item`} to="/business">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Business Management</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item">Business </span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/fitness' ? 'active' : ''} nav-link feed-sub-item`} to="/fitness">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Fitness</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item">Fitness</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/crypto' ? 'active' : ''} nav-link feed-sub-item`} to="/crypto">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>crypto</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item" style={{ marginleft: '50px !important' }}>crypto</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/mindset' ? 'active' : ''} nav-link feed-sub-item`} to="/mindset">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Mindset</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item">Mindset</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <div className="nav-bottom-childs">
                    <li className={`${location.pathname === '/education' ? 'active' : ''} nav-item nav-fifth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/education' ? 'active' : ''} nav-link `} aria-current="page" to="/education">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Education</Tooltip>}>
                                {location.pathname === '/education' ? <IoSchool size={'1.5rem'} /> : <MdOutlineSchool size={'1.5rem'} />}
                            </OverlayTrigger>
                            <span className="item-name">Education</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/job-list' ? 'active' : ''} nav-item nav-sixth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/job-list' ? 'active' : ''} nav-link `} aria-current="page" to="/job-list">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Job List</Tooltip>}>
                                {location.pathname === '/job-list' ? <BsSuitcaseLgFill size={'1.5rem'} /> : <BsSuitcaseLg size={'1.5rem'} />}
                            </OverlayTrigger>
                            <span className="item-name">Job List</span>
                        </Link>
                    </li>
                    {userData && userData?.permissions[0]?.can_create_jobs == 1 && (
                        <li className={`${location.pathname === '/job-applications' ? 'active' : ''} nav-item nav-seventh-li nav-common-class`}>
                            <Link className={`${location.pathname === '/job-applications' ? 'active' : ''} nav-link `} aria-current="page" to="/job-applications">
                                <OverlayTrigger placement="right" overlay={<Tooltip>Job Applications</Tooltip>}>
                                    <i className="icon material-symbols-outlined">
                                        app_registration
                                    </i>
                                </OverlayTrigger>
                                <span className="item-name">Job Applications</span>
                            </Link>
                        </li>
                    )}
                    <li className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-item nav-eigth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-link `} aria-current="page" to="/event-calender">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Events Calender</Tooltip>}>
                                {location.pathname === '/event-calender' ? <BsFillCalendar2WeekFill size={'1.5rem'} /> : <BsCalendarWeek size={'1.5rem'} />}
                            </OverlayTrigger>
                            <span className="item-name">Events Calender</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/notification' ? 'active' : ''} nav-item nav-ninth-li nav-common-class`}>
                        <Link className={`${location.pathname === '/notification' ? 'active' : ''} nav-link `} aria-current="page" to="/notification">
                            <OverlayTrigger placement="right" overlay={<Tooltip>Notifications</Tooltip>}>
                                {location.pathname === '/notification' ? <MdNotificationsActive size={'1.5rem'} /> : <MdOutlineNotificationsActive size={'1.5rem'} />}
                            </OverlayTrigger>
                            <span className="item-name">Notifications</span>
                        </Link>
                    </li>

                    {userData && userData?.permissions[0]?.can_manage_users == 1 && (
                        <li className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-item nav-tenth-li nav-common-class`}>
                            <Link className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-link `} aria-current="page" to="/manage-users">
                                <OverlayTrigger placement="right" overlay={<Tooltip>Manage Users</Tooltip>}>
                                    {location.pathname === '/manage-users' ? <HiMiniUserGroup size={'1.5rem'} /> : <HiOutlineUserGroup size={'1.5rem'} />}
                                </OverlayTrigger>
                                <span className="item-name">Manage Users</span>
                            </Link>
                        </li>
                    )}
                </div>
            </Accordion>
        </React.Fragment >
    )
})

export default VerticalNav
