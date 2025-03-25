import { useState, useEffect, memo, Fragment } from 'react'

//react-bootstrap
import { Offcanvas, Row, Col } from 'react-bootstrap'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'
import { Link } from "react-router-dom";
// Section Components
// Style Setting Section Components
import ThemeScheme from './sections/theme-scheme'
import ColorCustomizer from './sections/color-customizer'
import MenuStyle from './sections/menu-style'
import MenuActiveStyle from './sections/menu-active-style'
import Direction from './sections/direction'


const SettingOffCanvas = memo((props) => {

    const [show, setShow] = useState(false);

    // Define selectors
    const themeScheme = useSelector(SettingSelector.theme_scheme)
    const themeSchemeDirection = useSelector(SettingSelector.theme_scheme_direction)
    const themeColor = useSelector(SettingSelector.theme_color)
    const sidebarType = useSelector(SettingSelector.sidebar_type)
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)

    useEffect(() => {
        const onClick = (e) => {
            if (show) {
                if (e.target.closest('.live-customizer') == null && e.target.closest('#settingbutton') == null) {
                    setShow(false)
                }
            }
        };
        document.body.addEventListener("click", onClick);

        return () => {
            document.body.removeEventListener("click", onClick);
        };
    })
    return (
        <Fragment>
            {/* <div className="btn btn-fixed-end btn-danger btn-icon btn-setting" onClick={(e) => { e.stopPropagation(); setShow(true) }} >
                <span className="icon material-symbols-outlined animated-rotate text-white">
                    settings
                </span>
            </div> */}
            {/* <div className="d-flex align-items-center iq-sub-card border-0">
                <span className="material-symbols-outlined">
                    settings
                </span>
                <div className="ms-3">
                    <Link
                        to="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow(true) }}
                        className="mb-0 h6"
                    >
                        App Settings
                    </Link>
                </div>
            </div> */}
            <Link
                to="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow(true) }}
                className="d-flex justify-content-between align-items-center gap-3 text-dark py-2 px-3 profile-link"
            >
                <div className="d-flex align-items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 5.625V14.375C17 17.875 16.125 18.75 12.625 18.75H7.375C3.875 18.75 3 17.875 3 14.375V5.625C3 2.125 3.875 1.25 7.375 1.25H12.625C16.125 1.25 17 2.125 17 5.625Z" stroke="#1E1E1E" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.75 4.3125H8.25" stroke="#1E1E1E" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0004 16.2125C10.7495 16.2125 11.3567 15.6053 11.3567 14.8562C11.3567 14.1072 10.7495 13.5 10.0004 13.5C9.25138 13.5 8.64417 14.1072 8.64417 14.8562C8.64417 15.6053 9.25138 16.2125 10.0004 16.2125Z" stroke="#1E1E1E" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    App Settings
                </div>
                <span className="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </Link>
            {/* <div className="btn btn-fixed-end btn-danger btn-icon btn-setting" onClick={(e) => {e.stopPropagation();setShow(true)}} >
            <span className="icon material-symbols-outlined animated-rotate text-white">
                settings
            </span>
            </div> */}

            <Offcanvas show={show} onHide={() => setShow(false)} placement={`${themeSchemeDirection === "rtl" ? 'start' : 'end'}`} backdrop={false} scroll={true} className="live-customizer">
                <Offcanvas.Header closeButton className="pb-0">
                    <div className="d-flex align-items-center">
                        <h4 className="offcanvas-title" id="live-customizer-label">Setting Panel</h4>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="text-center mb-4">
                                    <h5 className="d-inline-block">Style Setting</h5>
                                </div>
                                <div>
                                    <ThemeScheme themeScheme={themeScheme}></ThemeScheme>
                                    {/* {props.name === true ? '' :
                                        <Fragment>
                                            <hr className="hr-horizontal" />
                                            <MenuStyle sidebarType={sidebarType}></MenuStyle>
                                            <hr className="hr-horizontal" />
                                            <MenuActiveStyle sidebarMenuStyle={sidebarMenuStyle}></MenuActiveStyle>
                                        </Fragment>
                                    }
                                    <hr className="hr-horizontal" />
                                    <ColorCustomizer themeColor={themeColor}></ColorCustomizer> */}
                                    <hr className="hr-horizontal" />
                                    <Direction themeSchemeDirection={themeSchemeDirection}></Direction>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    )
})

SettingOffCanvas.displayName = 'SettingOffCanvas'
export default SettingOffCanvas
