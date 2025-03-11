import React, { useEffect } from "react";
// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";
import equity from "../../../../assets/images/Equity_Circle.png";
import equityLight from "../../../../assets/images/Equity-light.png";

// Redux Selector / Action
import { useSelector } from "react-redux";

//components
import Verticalnav from "./verticalnav";
import Scrollbar from "smooth-scrollbar";

import { Link } from "react-router-dom";

import { RiCloseFill } from "react-icons/ri";



const Sidebar = () => {
  const sidebarType = useSelector(SettingSelector.sidebar_type); // array
  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);
  const appName = useSelector(SettingSelector.app_name);



  useEffect(() => {

    function toggleSidebarMini() {
      const element = document.getElementById("first-tour");
      if (window.matchMedia("(max-width: 1200px)").matches) {
        element.classList.remove("sidebar-mini");  // Add class if screen is ≤ 700px

      } else {
        element.classList.remove("sidebar-mini"); // Remove class if screen is > 700px
      }
    }

    // Run on page load
    toggleSidebarMini();

    // Listen for screen size changes
    // window.addEventListener("resize", toggleSidebarMini);

    // Scrollbar.init(document.querySelector(".data-scrollbar"));

    // window.addEventListener("resize", () => {
    //   const tabs = document.querySelectorAll(".nav");
    //   const sidebarResponsive = document.querySelector(
    //     '[data-sidebar="responsive"]'
    //   );
    //   if (window.innerWidth < 1025) {

    //     if (sidebarResponsive !== null) {
    //       if (!sidebarResponsive.classList.contains("sidebar-mini")) {
    //         sidebarResponsive.classList.add("sidebar-mini", "on-resize");
    //       }
    //     }
    //   } else {
    //     if (sidebarResponsive !== null) {
    //       if (
    //         sidebarResponsive.classList.contains("sidebar-mini") &&
    //         sidebarResponsive.classList.contains("on-resize")
    //       ) {
    //         sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
    //       }
    //     }
    //   }
    // });
  });

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("active");
  };

  return (
    <>
      <aside
        className={`${sidebarType.join(
          " "
        )} navs-rounded sidebar sidebar-default sidebar-base navs-rounded-all`}
        id="first-tour"
        data-toggle="main-sidebar"
        data-sidebar="responsive"
      >
        {/* <div className="sidebar-header d-flex align-items-center justify-content-start position-relative">
          <Link
            to="/"
            className="d-flex align-items-center gap-2 iq-header-logo"
          >
            <img src={equity} class="brand-logo" alt="#" />
          </Link>
          <div
            className="sidebar-toggle"
            data-toggle="sidebar"
            data-active="true"
            onClick={minisidebar}
          >
            <span className="menu-btn d-inline-block is-active">
              <i className="right-icon material-symbols-outlined icon-rtl">
                chevron_left
              </i>
            </span>
          </div>
        </div> */}
        <div className="sidebar-logo">
          <Link
            to="/"
            className="d-flex align-items-center gap-2 iq-header-logo"
          >
       <img src={equity} class="brand-logo light-logo" alt="#" />
                       <img src={equityLight} class="brand-logo dark-logo" alt="#" />
          </Link>
          <span onClick={minisidebar}>
            <RiCloseFill size={24} color={'#000'} />
          </span>
        </div>
        <div className="sidebar-body pt-0 data-scrollbar">
          <div className="sidebar-list">
            <Verticalnav />
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </aside>
    </>
  );
};

export default Sidebar;



