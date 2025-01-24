import React, { useContext, useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { UserContext } from "../../../context/UserContext";
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
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import Post from "../../../components/Post";
import CreatePost from "../../../components/create-post";
import CustomToggle from "../../../components/dropdowns";
// import ShareOffcanvas from "../../../components/share-offcanvas";
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
import { getProfileImageUrl } from '../../../utils/helpers';

import crypto1 from "../../../assets/images/page-img/crypto(1).jpg";
import crypto2 from "../../../assets/images/page-img/crypto(2).jpg";
import crypto3 from "../../../assets/images/page-img/crypto(3).jpg";
import crypto4 from "../../../assets/images/page-img/crypto(4).jpg";
import crypto5 from "../../../assets/images/page-img/crypto(6).jpg";
import business1 from "../../../assets/images/page-img/bussiness-1.jpg";
import business2 from "../../../assets/images/page-img/bussiness(2).jpg";
import business3 from "../../../assets/images/page-img/bussiness(3).jpg";
import business4 from "../../../assets/images/page-img/bussiness(4).jpg";
import business5 from "../../../assets/images/page-img/bussiness(5).jpg";
import fitness1 from "../../../assets/images/page-img/gym(1).jpg";
import fitness2 from "../../../assets/images/page-img/gym(2).jpg";
import fitness3 from "../../../assets/images/page-img/gym(3).jpg";
import fitness4 from "../../../assets/images/page-img/gym(4).jpg";
import fitness5 from "../../../assets/images/page-img/gym(9).jpg";
import pro1 from "../../../assets/images/page-img/pro(1).jpg";
import pro2 from "../../../assets/images/page-img/pro(2).jpg";
import pro3 from "../../../assets/images/page-img/pro(3).jpg";



import coin from "../../../assets/images/gamipress/coin.svg";
import credit from "../../../assets/images/gamipress/credit.svg";
import gems from "../../../assets/images/gamipress/gems.svg";
import ShareOffcanvasNew from "../../../components/ShareOffcanvasNew";
// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const UserProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
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

  const [loadContent, setLoadContent] = useState(true);
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

  const [profileData, setProfileData] = useState(null);
const [userStats, setUserStats] = useState(null);

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      console.log('Fetching profile data...');
      const token = localStorage.getItem('access_token');
      console.log('Token:', token); 
      
      const [profileRes, statsRes] = await Promise.all([
        axios.get('/api/user-profile'),
        axios.get('/api/user-stats')
      ]);
      
      console.log('Profile Response:', profileRes.data);
      console.log('Stats Response:', statsRes.data);
      
      setProfileData(profileRes.data);
      setUserStats(statsRes.data);
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };
  
  if (localStorage.getItem('access_token')) {
    fetchProfileData();
  }
}, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/user_posts');
        console.log('Fetched posts:', response.data.data); // Log the response
        setPosts(response.data.data);
        setLoadContent(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoadContent(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div id="content-page" className="content-inner">
        <FsLightbox
          toggler={imageController.toggler}
          sources={[
            business2,
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
            business1,
          ]}
          slide={imageController.slide}
        />
        <Container className="position-relative p-0">
          <div
            className="header-cover-img"
            style={{
              backgroundImage: `url(${business1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Container>
        <Container>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Col sm={12}>
                <Card className="profile-box">
                  <Card.Body>
                    <Row className="align-items-center item-header-content">
                      <Col lg={4} className="profile-left">
                        <ul className="d-flex align-items-center justify-content-center gap-3 list-inline p-0 m-0 mb-3 flex-wrap">
                          <li className="d-flex align-items-center gap-1">
                            <img
                              src={coin}
                              className="img-fluid avatar-24"
                              alt="coin"
                              loading="lazy"
                            />
                            <h6 className="font-size-14 fw-semibold">6765 Coins</h6>
                          </li>
                          <li className="d-flex align-items-center gap-1">
                            <img
                              src={credit}
                              className="img-fluid avatar-24"
                              alt="credit"
                              loading="lazy"
                            />
                            <h6 className="font-size-14 fw-semibold">
                              7180 Credits
                            </h6>
                          </li>
                          <li className="d-flex align-items-center gap-1">
                            <img
                              src={gems}
                              className="img-fluid avatar-24"
                              alt="coin"
                              loading="lazy"
                            />
                            <h6 className="font-size-14 fw-semibold">100 Gems</h6>
                          </li>
                        </ul>
                        <div className="social-links">
                          <ul className="social-data-block d-flex align-items-center justify-content-center list-inline p-0 m-0">
                            <li className="text-center pe-3">
                              <Link to="#">
                                <img
                                  src={img3}
                                  className="img-fluid rounded"
                                  alt="facebook"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                            <li className="text-center pe-3">
                              <Link to="#">
                                <img
                                  src={img4}
                                  className="img-fluid rounded"
                                  alt="Twitter"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                            <li className="text-center pe-3">
                              <Link to="#">
                                <img
                                  src={img5}
                                  className="img-fluid rounded"
                                  alt="Instagram"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                            <li className="text-center pe-3">
                              <Link to="#">
                                <img
                                  src={img6}
                                  className="img-fluid rounded"
                                  alt="Google plus"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                            <li className="text-center pe-3">
                              <Link to="#">
                                <img
                                  src={img7}
                                  className="img-fluid rounded"
                                  alt="You tube"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                            <li className="text-center md-pe-3 pe-0">
                              <Link to="#">
                                <img
                                  src={img8}
                                  className="img-fluid rounded"
                                  alt="linkedin"
                                  loading="lazy"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col lg={4} className="text-center profile-center">
<div className="header-avatar position-relative d-inline-block">
  <img
    src={getProfileImageUrl(userData)}
    alt="user"
    className="avatar-150 border border-4 border-white rounded-3"
  />
</div>
<h5 className="d-flex align-items-center justify-content-center gap-1 mb-2">
  {userData?.first_name} {userData?.last_name}
</h5>
                        {/* <h5 className="d-flex align-items-center justify-content-center gap-1 mb-2">
                          Marvin McKinney{" "}
                          <span className="badge  bg-primary rounded-pill material-symbols-outlined font-size-14 p-0 custom-done">
                            done
                          </span>
                        </h5> */}
                        <ul className="d-flex align-items-center justify-content-center gap-3 list-inline p-0 m-0">
                          <li className="d-flex align-items-center gap-1">
                            <h6 className="material-symbols-outlined font-size-14">
                              location_on
                            </h6>
                            <span className="font-size-14 text-uppercase fw-500">
                              lyON
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-1">
                            <h6 className="material-symbols-outlined font-size-14">
                              globe_asia
                            </h6>
                            <Link
                              to="https://smartinvestmentoff.com/"
                              className="font-size-14 fw-500 text-body"
                            >
                              smartinvestmentoff.com/
                            </Link>
                          </li>
                        </ul>
                      </Col>
                      <Col lg={4} className="profile-right">
                       <ul className="user-meta list-inline p-0 d-flex align-items-center justify-content-center">
                         <li>
                           <h5>{userStats?.posts_count || 0}</h5>Posts
                         </li>
                         <li>
                           <h5>{userStats?.comments_count || 0}</h5>Comments
                         </li>
                         <li>
                           <h5>{userStats?.likes_count || 0}</h5>Likes
                         </li>
                       </ul>
                      </Col>
                    </Row>

                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body className="p-0">
                    <div className="user-tabing item-list-tabs">
                      <Nav
                        as="ul"
                        variant="pills"
                        className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 rounded"
                      >
                        <Nav.Item as="li" className=" col-12 col-sm-3">
                          <Nav.Link
                            href="#pills-timeline-tab"
                            eventKey="first"
                            role="button"
                            className=" d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                          >
                            <span className="icon rounded-3">
                              <span className="material-symbols-outlined">
                                calendar_month
                              </span>
                            </span>
                            <p className="mb-0 mt-0 mt-md-3">Timeline</p>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-12 col-sm-3">
                          <Nav.Link
                            href="#pills-about-tab"
                            eventKey="second"
                            role="button"
                            className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                          >
                            <span className="icon rounded-3">
                              <span className="material-symbols-outlined">
                                person
                              </span>
                            </span>{" "}
                            <p className="mb-0 mt-0 mt-md-3">About</p>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className=" col-12 col-sm-3 ">
                          <Nav.Link
                            href="#pills-friends-tab"
                            eventKey="third"
                            role="button"
                            className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                          >
                            <span className="icon rounded-3">
                              <span className="material-symbols-outlined">
                                group
                              </span>
                            </span>
                            <p className="mb-0 mt-0 mt-md-3">Friends</p>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-12 col-sm-3">
                          <Nav.Link
                            href="#pills-photos-tab"
                            eventKey="forth"
                            role="button"
                            className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                          >
                            <span className="icon rounded-3">
                              <span className="material-symbols-outlined">
                                image
                              </span>
                            </span>
                            <p className="mb-0 mt-0 mt-md-3">Photos</p>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Card.Body className=" p-0">
                      <Row>
                        <Col lg={4}>
                          <Card>
                            <Card.Body>
                              <Link to="#" className="d-inline-flex align-items-center">
                                <span className="badge badge-pill bg-primary font-weight-normal me-1  material-symbols-outlined md-14 custom-grade">
                                  grade
                                </span>{" "}
                                <span>27 Items for you</span>
                              </Link>
                            </Card.Body>
                          </Card>
                          <Card>
                            <div className="card-header d-flex justify-content-between border-bottom">
                              <div className="header-title">
                                <h4 className="card-title">Life Event</h4>
                              </div>
                              <div className="card-header-toolbar d-flex align-items-center">
                                <p className="m-0">
                                  <Link to="#"> Create </Link>
                                </p>
                              </div>
                            </div>
                            <Card.Body>
                              <Row>
                                <Col sm={12} className="d-none">
                                  <div className="event-post position-relative">
                                    <Link to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto1}
                                        alt="gallary1"
                                        className="img-fluid rounded"
                                      />
                                    </Link>
                                    <div className="job-icon-position">
                                      <div className="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                        local_mall
                                      </div>
                                    </div>
                                    <div className="card-body text-center p-2">
                                      <h5>Started New Job at Apple</h5>
                                      <p>January 24, 2019</p>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={12}>
                                  <div className="event-post position-relative">
                                    <Link to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto4}
                                        alt="gallary1"
                                        className="img-fluid rounded"
                                      />
                                    </Link>
                                    <div className="job-icon-position">
                                      <div className="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                        local_mall
                                      </div>
                                    </div>
                                    <div className="card-body text-center p-2">
                                      <h5>Freelance Photographer</h5>
                                      <p className="mb-0">January 24, 2019</p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                          <div className="fixed-suggestion mb-0 mb-lg-4">
                            <Card>
                              <div className="card-header d-flex justify-content-between border-bottom">
                                <div className="header-title">
                                  <h4 className="card-title">Photos</h4>
                                </div>
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <p className="m-0">
                                    <Link to="#">Add Photo </Link>
                                  </p>
                                </div>
                              </div>
                              <Card.Body>
                                <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                                  <li>
                                    <Link onClick={() => imageOnSlide(1)} to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto2}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(2)} to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto3}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(3)} to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto4}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(4)} to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto5}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(5)} to="#">
                                      <img
                                        loading="lazy"
                                        src={crypto1}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  {/* <li>
                                    <Link onClick={() => imageOnSlide(6)} to="#">
                                      <img
                                        loading="lazy"
                                        src={g6}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(7)} to="#">
                                      <img
                                        loading="lazy"
                                        src={g7}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(8)} to="#">
                                      <img
                                        loading="lazy"
                                        src={g8}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => imageOnSlide(9)} to="#">
                                      <img
                                        loading="lazy"
                                        src={g9}
                                        alt="gallary"
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </li> */}
                                </ul>
                              </Card.Body>
                            </Card>
                            <Card>
                              <div className="card-header d-flex justify-content-between border-bottom">
                                <div className="header-title">
                                  <h4 className="card-title">Friends</h4>
                                </div>
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <p className="m-0">
                                    <Link to="javacsript:void();">Add New </Link>
                                  </p>
                                </div>
                              </div>
                              <Card.Body>
                                <div className="row row-cols-xl-3 row-cols-md-2 row-cols-2 friend-cards-holder">
                                  {/* <div className="col mt-2 text-center">
                                    <Link to="#"><img src={user05} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Anna Rexia</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={user06} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Tara Zona</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={user07} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Polly Tech</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={user08} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Bill Emia</h6>
                                  </div> */}
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={fitness1} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Moe Fugga</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={fitness2} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Hal Appeno </h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={fitness3} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Zack Lee</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={fitness4} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Terry Aki</h6>
                                  </div>
                                  <div className="col mt-2 text-center">
                                    <Link to="#"><img src={fitness5} alt="gallary-image" loading="lazy" className="img-fluid" /></Link>
                                    <h6 className="mt-2 text-center">Greta Life</h6>
                                  </div>
                                </div>

                              </Card.Body>
                            </Card>
                          </div>
                        </Col>
                        <Col lg={8}>
                        {userData && Object.keys(userData).length > 0 ? (
  <Row>
    <Col sm={12}>
      <CreatePost className="card-block card-stretch card-height" />
    </Col>
  </Row>
) : null}

                
                <Row className="special-post-container">
                {posts.map((post) => (
  <Col sm={12} key={post.id} className="special-post">
    <Post post={post} />
  </Col>
))}
{loadContent && (
  <div className="col-sm-12 text-center">
    <img src={loader} alt="loader" style={{ height: "100px" }} />
  </div>
)}

                </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="about1"
                    >
                      <Row>
                        <Col md={4}>
                          <Card>
                            <Card.Body>
                              <Nav
                                variant="pills"
                                className=" basic-info-items list-inline d-block p-0 m-0"
                              >
                                <Nav.Item>
                                  <Nav.Link to="#" eventKey="about1">
                                    Contact and Basic Info
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link to="#" eventKey="about2">
                                    Hobbies and Interests
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link to="#" eventKey="about3">
                                    Family and Relationship
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link to="#" eventKey="about4">
                                    Work and Education
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link to="#" eventKey="about5">
                                    Places You've Lived
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={8} className=" ps-4">
                          <Card>
                            <Card.Body>
                              <Tab.Content>
                                <Tab.Pane eventKey="about1">
                                  <h4>Personal Info</h4>
                                  <hr />
                                  <div className="table-responsive">
                                    <table className="table profile-table">
                                      <tbody>
                                        {profileData?.about && Object.entries(profileData.about).map(([key, value]) => (
                                          value && (
                                            <tr key={key}>
                                              <td><h6>{key.replace('_', ' ').toUpperCase()}:</h6></td>
                                              <td><p className="mb-0">{value}</p></td>
                                            </tr>
                                          )
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <h4 className="mt-2">
                                    Websites and Social Links
                                  </h4>
                                  <hr />
                                  <div className="table-responsive">
                                    <table className="table profile-table">
                                      <tbody>
                                        {linkData.map((item, index) => {
                                          return (
                                            <tr key={index}>
                                              <td><h6>{item.title}</h6></td>
                                              <td><p className="mb-0">{item.data}</p></td>
                                            </tr>
                                          )
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about2">
                                  <h4 className="mt-2">Hobbies and Interests</h4>
                                  <hr />
                                  <h6 className="mb-1">Hobbies:</h6>
                                  <p>
                                    Hi, I’m Bni, I’m 26 and I work as a Web
                                    Designer for the iqonicdesign.I like to ride
                                    the bike to work, swimming, and working out. I
                                    also like reading design magazines, go to
                                    museums, and binge watching a good tv show
                                    while it’s raining outside.
                                  </p>
                                  <h6 className="mt-2 mb-1">
                                    Favourite TV Shows:
                                  </h6>
                                  <p>
                                    Breaking Good, RedDevil, People of Interest,
                                    The Running Dead, Found, American Guy.
                                  </p>
                                  <h6 className="mt-2 mb-1">Favourite Movies:</h6>
                                  <p>
                                    Idiocratic, The Scarred Wizard and the Fire
                                    Crown, Crime Squad, Ferrum Man.
                                  </p>
                                  <h6 className="mt-2 mb-1">Favourite Games:</h6>
                                  <p>
                                    The First of Us, Assassin’s Squad, Dark
                                    Assylum, NMAK16, Last Cause 4, Grand Snatch
                                    Auto.
                                  </p>
                                  <h6 className="mt-2 mb-1">
                                    Favourite Music Bands / Artists:
                                  </h6>
                                  <p>
                                    Iron Maid, DC/AC, Megablow, The Ill, Kung
                                    Fighters, System of a Revenge.
                                  </p>
                                  <h6 className="mt-2 mb-1">Favourite Books:</h6>
                                  <p>
                                    The Crime of the Century, Egiptian Mythology
                                    101, The Scarred Wizard, Lord of the Wings,
                                    Amongst Gods, The Oracle, A Tale of Air and
                                    Water.
                                  </p>
                                  <h6 className="mt-2 mb-1">
                                    Favourite Writers:
                                  </h6>
                                  <p>
                                    Martin T. Georgeston, Jhonathan R. Token,
                                    Ivana Rowle, Alexandria Platt, Marcus Roth.
                                  </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about3">
                                  <h4 className="mb-3">Relationship</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="media-support-info ms-3">
                                        <h6>Add Your Relationship Status</h6>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mt-3 mb-3">Family Members</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="media-support-info ms-3">
                                        <h6>Add Family Members</h6>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user01}
                                          alt="story1"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Paul Molive</h6>
                                            <p className="mb-0">Brothe</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link to="#" className="d-flex align-items-center">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex justify-content-between mb-4  align-items-center">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user02}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className=" ms-3">
                                            <h6>Anna Mull</h6>
                                            <p className="mb-0">Sister</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link to="#" className="d-flex align-items-center">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user03}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Paige Turner</h6>
                                            <p className="mb-0">Cousin</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link to="#" className="d-flex align-items-center">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about4">
                                  <h4 className="mb-3">Work</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex justify-content-between mb-4  align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Work Place</h6>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user01}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Themeforest</h6>
                                            <p className="mb-0">Web Designer</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user02}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>iqonicdesign</h6>
                                            <p className="mb-0">Web Developer</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user03}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>W3school</h6>
                                            <p className="mb-0">Designer</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mb-3">Professional Skills</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Professional Skills</h6>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mt-3 mb-3">College</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add College</h6>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user01}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>Lorem ipsum</h6>
                                            <p className="mb-0">USA</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about5">
                                  <h4 className="mb-3">
                                    Current City and Hometown
                                  </h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user01}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>Georgia</h6>
                                            <p className="mb-0">Georgia State</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <img
                                          loading="lazy"
                                          src={user02}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>Atlanta</h6>
                                            <p className="mb-0">Atlanta City</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              to="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mt-3 mb-3">
                                    Other Places Lived
                                  </h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Place</h6>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                              </Tab.Content>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="all-friends"
                    >
                      <Card>
                        <Card.Body>
                          <h2>Friends</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              as="ul"
                              className=" d-flex align-items-center justify-content-left item-list-tabs  p-0 mb-4"
                            >
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-all-friends"
                                  eventKey="all-friends"
                                >
                                  All Friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-recently-add"
                                  eventKey="recently-add"
                                >
                                  Recently Added
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-closefriends"
                                  eventKey="closefriends"
                                >
                                  {" "}
                                  Close friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link to="#pill-home" eventKey="home-town">
                                  {" "}
                                  Home/Town
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-following"
                                  eventKey="following"
                                >
                                  Following
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="all-friends">
                                <Card.Body className="p-0">
                                  <Row>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Petey Cruiser</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Anna Sthesia</h5>
                                              <p className="mb-0">50 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paul Molive</h5>
                                              <p className="mb-0">10 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Gail Forcewind</h5>
                                              <p className="mb-0">20 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paige Turner</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>b Frapples</h5>
                                              <p className="mb-0">6 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user13}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Walter Melon</h5>
                                              <p className="mb-0">30 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user14}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barb Ackue</h5>
                                              <p className="mb-0">14 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Buck Kinnear</h5>
                                              <p className="mb-0">16 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Ira Membrit</h5>
                                              <p className="mb-0">22 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Shonda Leer</h5>
                                              <p className="mb-0">10 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>ock Lee</h5>
                                              <p className="mb-0">18 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Maya Didas</h5>
                                              <p className="mb-0">40 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Rick O'Shea</h5>
                                              <p className="mb-0">50 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Pete Sariya</h5>
                                              <p className="mb-0">5 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Monty Carlo</h5>
                                              <p className="mb-0">2 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Sal Monella</h5>
                                              <p className="mb-0">0 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Sue Vaneer</h5>
                                              <p className="mb-0">25 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cliff Hanger</h5>
                                              <p className="mb-0">18 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barb Dwyer</h5>
                                              <p className="mb-0">23 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Terry Aki</h5>
                                              <p className="mb-0">8 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user13}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cory Ander</h5>
                                              <p className="mb-0">7 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user14}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Robin Banks</h5>
                                              <p className="mb-0">14 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Jimmy Changa</h5>
                                              <p className="mb-0">10 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barry Wine</h5>
                                              <p className="mb-0">18 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Poppa Cherry</h5>
                                              <p className="mb-0">16 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Zack Lee</h5>
                                              <p className="mb-0">33 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Don Stairs</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Peter Pants</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Hal Appeno </h5>
                                              <p className="mb-0">13 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Row>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="recently-add">
                                <div className="card-body p-0">
                                  <div className="row">
                                    {/* <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Otto Matic</h5>
                                              <p className="mb-0">4 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    {/* <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Moe Fugga</h5>
                                              <p className="mb-0">16 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    {/* <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tom Foolery</h5>
                                              <p className="mb-0">14 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    {/* <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bud Wiser</h5>
                                              <p className="mb-0">16 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">10 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Holly Graham</h5>
                                              <p className="mb-0">8 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tara Zona</h5>
                                              <p className="mb-0">5 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barry Cade</h5>
                                              <p className="mb-0">20 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="closefriends">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bud Wiser</h5>
                                              <p className="mb-0">32 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Otto Matic</h5>
                                              <p className="mb-0">9 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Peter Pants</h5>
                                              <p className="mb-0">2 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Zack Lee</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barry Wine</h5>
                                              <p className="mb-0">36 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Robin Banks</h5>
                                              <p className="mb-0">22 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cory Ander</h5>
                                              <p className="mb-0">18 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Moe Fugga</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">30 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Hal Appeno</h5>
                                              <p className="mb-0">25 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="home-town">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paul Molive</h5>
                                              <p className="mb-0">14 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paige Turner</h5>
                                              <p className="mb-0">8 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barb Ackue</h5>
                                              <p className="mb-0">23 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Ira Membrit</h5>
                                              <p className="mb-0">16 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Maya Didas</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="following">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Maya Didas</h5>
                                              <p className="mb-0">20 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Monty Carlo</h5>
                                              <p className="mb-0">3 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cliff Hanger</h5>
                                              <p className="mb-0">20 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>b Ackue</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bob Frapples</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Anna Mull</h5>
                                              <p className="mb-0">6 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>ry Wine</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Don Stairs</h5>
                                              <p className="mb-0">12 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Peter Pants</h5>
                                              <p className="mb-0">8 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">18 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tara Zona</h5>
                                              <p className="mb-0">30 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user05}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Arty Ficial</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bill Emia</h5>
                                              <p className="mb-0">25 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bill Yerds</h5>
                                              <p className="mb-0">9 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Matt Innae</h5>
                                              <p className="mb-0">19 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle as="span" className="btn btn-secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">
                                                  done
                                                </i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">
                                                  Get Notification
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Close Friend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfollow
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Unfriend
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                  Block
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="p1">
                      <Card>
                        <Card.Body>
                          <h2>Photos</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              as="ul"
                              className=" d-flex align-items-center justify-content-left item-list-tabs p-0 mb-4"
                            >
                              <li>
                                <Nav.Link eventKey="p1" href="#pill-photosofyou">
                                  Photos of You
                                </Nav.Link>
                              </li>
                              <li>
                                <Nav.Link eventKey="p2" href="#pill-your-photos">
                                  Your Photos
                                </Nav.Link>
                              </li>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="p1">
                                <Card.Body className="p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(16)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(17)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(18)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(19)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(20)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(21)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(22)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(23)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(24)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img59}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(25)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img60}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(26)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img61}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(27)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img62}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(28)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img63}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(29)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img64}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(30)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img65}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(31)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(32)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(33)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(34)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(35)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(36)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(37)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(38)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="p2">
                                <div className="card-body p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13 ">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(39)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(40)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(41)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(42)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(43)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(44)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(45)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(46)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(47)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img59}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(48)}
                                          to="#"
                                        >
                                          <img
                                            loading="lazy"
                                            src={img60}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            to="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  {/* <div className="col-sm-12 text-center">
                    <img
                      loading="lazy"
                      src={loader}
                      alt="loader"
                      style={{ height: "100px" }}
                    />
                  </div> */}
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserProfile;
