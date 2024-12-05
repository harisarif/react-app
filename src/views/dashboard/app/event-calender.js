import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Nav,
  Tab,
  OverlayTrigger,
  Tooltip,
  Collapse,
} from "react-bootstrap";
import Card from "../../../components/Card";
import CreatePost from "../../../components/create-post";
import CustomToggle from "../../../components/dropdowns";
// import ShareOffcanvas from "../../../components/share-offcanvas";
import { Link } from "react-router-dom";
import ReactFsLightbox from "fslightbox-react";
import Doteddropdown from "../../../components/custom/Doted_dropdown";

// images
import img1 from "../../../assets/images/page-img/fun.webp";
// import img2 from "../../../assets/images/user/11.png";
import img3 from "../../../assets/images/icon/08.png";
import img4 from "../../../assets/images/icon/09.png";
import img5 from "../../../assets/images/icon/10.png";
import img6 from "../../../assets/images/icon/11.png";
import img7 from "../../../assets/images/icon/12.png";
import img8 from "../../../assets/images/icon/13.png";
import img9 from "../../../assets/images/page-img/07.jpg";
import img10 from "../../../assets/images/page-img/06.jpg";
import user1 from "../../../assets/images/user/1.jpg";
import user05 from "../../../assets/images/user/05.jpg";
import user01 from "../../../assets/images/user/01.jpg";
import user02 from "../../../assets/images/user/02.jpg";
import user03 from "../../../assets/images/user/03.jpg";
import user06 from "../../../assets/images/user/06.jpg";
import user07 from "../../../assets/images/user/07.jpg";
import user08 from "../../../assets/images/user/08.jpg";
import user09 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import user13 from "../../../assets/images/user/13.jpg";
import user14 from "../../../assets/images/user/14.jpg";
import user15 from "../../../assets/images/user/15.jpg";
import user16 from "../../../assets/images/user/16.jpg";
import user17 from "../../../assets/images/user/17.jpg";
import user18 from "../../../assets/images/user/18.jpg";
import user19 from "../../../assets/images/user/19.jpg";
import img04 from "../../../assets/images/user/04.jpg";
// import p1 from "../../../assets/images/page-img/p1.jpg";
// import p3 from "../../../assets/images/page-img/p3.jpg";
import icon1 from "../../../assets/images/icon/01.png";
import icon2 from "../../../assets/images/icon/02.png";
import icon3 from "../../../assets/images/icon/03.png";
import icon4 from "../../../assets/images/icon/04.png";
import icon5 from "../../../assets/images/icon/05.png";
import icon6 from "../../../assets/images/icon/06.png";
import icon7 from "../../../assets/images/icon/07.png";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";
import loader from "../../../assets/images/page-img/page-load-loader.gif";
import img51 from "../../../assets/images/page-img/51.jpg";
import img52 from "../../../assets/images/page-img/52.jpg";
import img53 from "../../../assets/images/page-img/53.jpg";
import img54 from "../../../assets/images/page-img/54.jpg";
import img55 from "../../../assets/images/page-img/55.jpg";
import img56 from "../../../assets/images/page-img/56.jpg";
import img57 from "../../../assets/images/page-img/57.jpg";
import img58 from "../../../assets/images/page-img/58.jpg";
import img59 from "../../../assets/images/page-img/59.jpg";
import img60 from "../../../assets/images/page-img/60.jpg";
import img61 from "../../../assets/images/page-img/61.jpg";
import img62 from "../../../assets/images/page-img/62.jpg";
import img64 from "../../../assets/images/page-img/64.jpg";
import img65 from "../../../assets/images/page-img/65.jpg";
import img63 from "../../../assets/images/page-img/63.jpg";
import pageBgImg from "../../../assets/images/page-img/profile-bg1.jpg";

import mountain from "../../../assets/images/page-img/mountain.webp";
import pizza from "../../../assets/images/page-img/pizza.webp";
import busImg from "../../../assets/images/page-img/bus.webp";
import boyImg from "../../../assets/images/page-img/boy.webp";
import img11 from "../../../assets/images/page-img/fd.webp";
import label from "../../../assets/images/label.png";


import coin from "../../../assets/images/gamipress/coin.svg";
import credit from "../../../assets/images/gamipress/credit.svg";
import gems from "../../../assets/images/gamipress/gems.svg";
import ShareOffcanvasNew from "../../../components/ShareOffcanvasNew";
// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const EventCalender = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);

  const [open_replay, setopen_replay] = useState(false)
  const [open_replay1, setopen_replay1] = useState(false)
  const [open_replay2, setopen_replay2] = useState(false)
  const [open_replay3, setopen_replay3] = useState(false)
  useEffect(() => {
    document.body.classList.add("profile-page");
    return () => {
      document.body.classList.remove("profile-page");
    };
  });

  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }

  const aboutData = [
    {
      title: 'About Me:', data: 'Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56'
    },
    {
      title: "Email:",
      data: "Bnijohn@gmail.com",
    },
    {
      title: "Mobile:",
      data: "(001) 4544 565 456",
    },
    {
      title: "Address:",
      data: "United States of America",
    },
    {
      title: "Social Link:",
      data: "www.bootstrap.com",
    },
    {
      title: "Birth Date:",
      data: "24 January",
    },
    {
      title: "Birth Year:",
      data: "1994",
    },
    {
      title: "Birthplace:",
      data: "Austin, Texas, USA",
    },
    {
      title: "Lives in:",
      data: "San Francisco, California, USA",
    },
    {
      title: "Gender:",
      data: "Female",
    },
    {
      title: "Interested in:",
      data: "Designing",
    },
    {
      title: "Language:",
      data: "English, French",
    },
    {
      title: "Joined:",
      data: "April 31st, 2014",
    },
    {
      title: "Status:",
      data: "Married",
    },
    {
      title: "Phone Number:",
      data: "(044) 555 - 4369 - 8957",
    },
    {
      title: "Political Incline:",
      data: "Democrat",
    },
  ]

  const linkData = [
    {
      title: "Website:",
      data: "www.bootstrap.com",
    },
    {
      title: "Social Link:",
      data: "www.bootstrap.com",
    },
  ]

  return (
    <>
      <div id="content-page" className="content-inner">
        <FsLightbox
          toggler={imageController.toggler}
          sources={[
            g1,
            g2,
            g3,
            g4,
            g5,
            g6,
            g7,
            g8,
            g9,
            img1,
            boyImg,
            busImg,
            img11,
            mountain,
            pizza,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
            img61,
            img62,
            img63,
            img64,
            img65,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
          ]}
          slide={imageController.slide}
        />
       <div className="container mt-5">
        <Row>
          <Col xs={4}>
           <div className=" col-12 ">
  <div className="card cardhover">
    <div className="card-body label-card">
      <div>
        {/* <img
          src={label}
          className="avatar avatar-50 job-icon mb-3 d-inline-block label-img"
          loading="lazy"
          alt="img"
        /> */}
        <h6 class="price"><span class="regular-price text-dark pr-2 label-span"></span>34 April</h6>
      </div>
      <h5 className="">Gmail</h5>
      <small>Built by HubSpot</small>
      <div className="mt-2">
        <p className="mb-0">
          Bring HubSpot for Gmail.
        </p>
      </div>
      {/* <span className="text-warning d-block line-height mt-0">
        <span className="text-warning d-flex align-items-center mt-2">
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
          <small className="text-dark me-1">400</small>
        </span>
        <small className="mt-2">
          <span>
            <span>10,000</span>+ installs
          </span>
        </small>
      </span> */}
    </div>
  </div>
</div>
          </Col>
          <Col xs={4}>
           <div className=" col-12 ">
  <div className="card cardhover">
    <div className="card-body label-card">
      <div>
        {/* <img
          src={label}
          className="avatar avatar-50 job-icon mb-3 d-inline-block label-img"
          loading="lazy"
          alt="img"
        /> */}
        <h6 class="price"><span class="regular-price text-dark pr-2 label-span"></span>34 April</h6>
      </div>
      <h5 className="">Gmail</h5>
      <small>Built by HubSpot</small>
      <div className="mt-2">
        <p className="mb-0">
          Bring HubSpot for Gmail.
        </p>
      </div>
      {/* <span className="text-warning d-block line-height mt-0">
        <span className="text-warning d-flex align-items-center mt-2">
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
          <small className="text-dark me-1">400</small>
        </span>
        <small className="mt-2">
          <span>
            <span>10,000</span>+ installs
          </span>
        </small>
      </span> */}
    </div>
  </div>
</div>
          </Col>
          <Col xs={4}>
           <div className=" col-12 ">
  <div className="card cardhover">
    <div className="card-body label-card">
      <div>
        {/* <img
          src={label}
          className="avatar avatar-50 job-icon mb-3 d-inline-block label-img"
          loading="lazy"
          alt="img"
        /> */}
        <h6 class="price"><span class="regular-price text-dark pr-2 label-span"></span>34 April</h6>
      </div>
      <h5 className="">Gmail</h5>
      <small>Built by HubSpot</small>
      <div className="mt-2">
        <p className="mb-0">
          Bring HubSpot for Gmail.
        </p>
      </div>
      {/* <span className="text-warning d-block line-height mt-0">
        <span className="text-warning d-flex align-items-center mt-2">
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
          <small className="text-dark me-1">400</small>
        </span>
        <small className="mt-2">
          <span>
            <span>10,000</span>+ installs
          </span>
        </small>
      </span> */}
    </div>
  </div>
</div>
          </Col>
          <Col xs={4}>
           <div className=" col-12 ">
  <div className="card cardhover">
    <div className="card-body label-card">
      <div>
        {/* <img
          src={label}
          className="avatar avatar-50 job-icon mb-3 d-inline-block label-img"
          loading="lazy"
          alt="img"
        /> */}
        <h6 class="price"><span class="regular-price text-dark pr-2 label-span"></span>34 April</h6>
      </div>
      <h5 className="">Gmail</h5>
      <small>Built by HubSpot</small>
      <div className="mt-2">
        <p className="mb-0">
          Bring HubSpot for Gmail.
        </p>
      </div>
      {/* <span className="text-warning d-block line-height mt-0">
        <span className="text-warning d-flex align-items-center mt-2">
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
          <small className="text-dark me-1">400</small>
        </span>
        <small className="mt-2">
          <span>
            <span>10,000</span>+ installs
          </span>
        </small>
      </span> */}
    </div>
  </div>
</div>
          </Col>
          <Col xs={4}>
           <div className=" col-12 ">
  <div className="card cardhover">
    <div className="card-body label-card">
      <div>
        {/* <img
          src={label}
          className="avatar avatar-50 job-icon mb-3 d-inline-block label-img"
          loading="lazy"
          alt="img"
        /> */}
        <h6 class="price"><span class="regular-price text-dark pr-2 label-span"></span>34 April</h6>
      </div>
      <h5 className="">Gmail</h5>
      <small>Built by HubSpot</small>
      <div className="mt-2">
        <p className="mb-0">
          Bring HubSpot for Gmail.
        </p>
      </div>
      {/* <span className="text-warning d-block line-height mt-0">
        <span className="text-warning d-flex align-items-center mt-2">
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 me-1">star</i>
          <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
          <small className="text-dark me-1">400</small>
        </span>
        <small className="mt-2">
          <span>
            <span>10,000</span>+ installs
          </span>
        </small>
      </span> */}
    </div>
  </div>
</div>
          </Col>
        
        </Row>
        </div>


       </div>
    </>
  );
};

export default EventCalender;
