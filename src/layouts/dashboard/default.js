import React from "react";

//header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//sidebar


//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";

import Suggession from "../../views/dashboard/app/Suggession";

//settingoffCanvas

import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="position-relative">
          <Header />
          <Outlet />
          <Suggession />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Default;
