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
                            <img src={feedSvg} alt="User Icon" />
                            <span className="item-name">Feeds</span>
                            <i className="right-icon material-symbols-outlined" style={{ color: 'black' }}>chevron_right</i>
                        </CustomToggle>
                    </div>
                    <Accordion.Collapse eventKey="utilities-error" className={location.pathname == "/fitness" || location.pathname == "/business" || location.pathname == "/crypto" || location.pathname == "/mindset" ? "show" : ""}>
                        <ul className="sub-nav feed-sub-menu">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/business' ? 'active' : ''} nav-link`} to="/business">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Business Management</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item">Business </span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/fitness' ? 'active' : ''} nav-link`} to="/fitness">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Fitness</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item">Fitness</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/crypto' ? 'active' : ''} nav-link`} to="/crypto">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>crypto</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    {/* <i className="icon material-symbols-outlined filled">fiber_manual_record</i> */}
                                    <span className="item-name feed-sub-menu-item" style={{ marginleft: '50px !important' }}>crypto</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/mindset' ? 'active' : ''} nav-link`} to="/mindset">
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
