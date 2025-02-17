import React, { useState, useContext } from 'react'
import { UserContext } from '../../../../context/UserContext';
//router
import { Link, useLocation, useNavigate } from 'react-router-dom'

//react-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'



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
    //location
    window.scrollTo(0, 0);
    let location = useLocation();
    // console.log(document);

// let headerNav = document.querySelector('.iq-nav-menu').querySelectorAll('.nav-item');
// headerNav.forEach(item =>{
//     item.addEventListener('click', function(){
    
//     })
// })
    return (
        <React.Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Main</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            home
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Home</span>
                    </Link>
                </li>
                
                {userData && (

                <li className={`${location.pathname === '/profile' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/profile' ? 'active' : ''} nav-link `} aria-current="page" to="/profile"
                          onClick={() => setActive("profile")}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Profiles</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            Person
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Profiles</span>
                    </Link>
                </li>
)}
                
                {/* <li className={`${location.pathname === '/feeds' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/feeds' ? 'active' : ''} nav-link `} aria-current="page" to="/feeds"
                          onClick={() => setActive("feeds")}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Feeds</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            turned_in_not
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Feeds</span>
                    </Link>
                </li> */}
                <Accordion.Item as="li" eventKey="utilities-error" bsPrefix="nav-item">
                    <CustomToggle 
                        eventKey="utilities-error" 
                        active={activeMenu === 'utilities-error' ? true : false} 
                        onClick={(activeKey) => setActiveMenu(activeKey)}
                        to="/home"
                    >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Feeds</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                                turned_in_not
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Feeds</span>
                        <i className="right-icon material-symbols-outlined">chevron_right</i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="utilities-error" className={location.pathname == "/fitness" || location.pathname == "/business" || location.pathname == "/crypto" || location.pathname == "/mindset" ? "show" : ""}>
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/business' ? 'active' : ''} nav-link`} to="/business">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Business Management</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Business Management</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/fitness' ? 'active' : ''} nav-link`} to="/fitness">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Fitness</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Fitness</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/crypto' ? 'active' : ''} nav-link`} to="/crypto">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>crypto</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">crypto</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/mindset' ? 'active' : ''} nav-link`} to="/mindset">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Mindset</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Mindset</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <li className={`${location.pathname === '/education' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/education' ? 'active' : ''} nav-link `} aria-current="page" to="/education">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Education</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            School
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Education</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/job-list' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/job-list' ? 'active' : ''} nav-link `} aria-current="page" to="/job-list">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Job List</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            Work
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Job List</span>
                    </Link>
                </li>
                {userData &&  userData?.permissions[0]?.can_create_jobs == 1 && (
                <li className={`${location.pathname === '/job-applications' ? 'active' : ''} nav-item `}>
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
                <li className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/event-calender' ? 'active' : ''} nav-link `} aria-current="page" to="/event-calender">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Events Calender</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            Today
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Events Calender</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/notification' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/notification' ? 'active' : ''} nav-link `} aria-current="page" to="/notification">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Notifications</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            notifications_active
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Notifications</span>
                    </Link>
                </li>
                {userData &&  userData?.permissions[0]?.can_manage_users == 1 && (
                <li className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/manage-users' ? 'active' : ''} nav-link `} aria-current="page" to="/manage-users">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Manage Users</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            people
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Manage Users</span>
                    </Link>
                </li>
                )}
            </Accordion>
        </React.Fragment >
    )
})

export default VerticalNav
