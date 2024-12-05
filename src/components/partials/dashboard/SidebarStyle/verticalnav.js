import React, { useState, useContext } from 'react'

//router
import { Link, useLocation } from 'react-router-dom'

//react-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'



function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = React.memo(() => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    //location
    window.scrollTo(0, 0);
    let location = useLocation();
    // console.log(document);


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
                                Home
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Home</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/profile' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/profile' ? 'active' : ''} nav-link `} aria-current="page" to="/profile">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Profiles</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                            Person
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Profiles</span>
                    </Link>
                </li>
                
                <Accordion.Item as="li" eventKey="utilities-error" bsPrefix="nav-item">
                    <CustomToggle eventKey="utilities-error" active={activeMenu === 'utilities-error' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Feeds</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                                turned_in_not
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Feeds</span>
                        <i className="right-icon material-symbols-outlined">chevron_right</i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="utilities-error">
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/errors/error404' ? 'active' : ''} nav-link`} to="/errors/error404">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Error 404</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Error 404</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/errors/error500' ? 'active' : ''} nav-link`} to="/errors/error500">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Error 500</Tooltip>}>
                                        <i className="sidenav-mini-icon"> E  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Error 500</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/extra-pages/pages-maintenance' ? 'active' : ''} nav-link`} to="/extra-pages/pages-maintenance">
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Maintenance</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M  </i>
                                    </OverlayTrigger>
                                    <i className="icon material-symbols-outlined filled">fiber_manual_record</i>
                                    <span className="item-name">Maintenance</span>
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
            </Accordion>
        </React.Fragment >
    )
})

export default VerticalNav
