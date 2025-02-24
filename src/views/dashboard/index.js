import React, { useState, useEffect, useContext } from "react";
import axios from '../../utils/axios';
import { UserContext } from '../../context/UserContext';
import {
  Row,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Collapse,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Post from "../../components/Post";
import CreatePost from "../../components/create-post";

//image
import user1 from "../../assets/images/user/1.jpg";
import user01 from "../../assets/images/user/01.jpg";
import user2 from "../../assets/images/user/02.jpg";
import user3 from "../../assets/images/user/03.jpg";
import user4 from "../../assets/images/user/04.jpg";
import user13 from "../../assets/images/user/05.jpg";
import user14 from "../../assets/images/user/06.jpg";
import user15 from "../../assets/images/user/07.jpg";
import user16 from "../../assets/images/user/08.jpg";
import user5 from "../../assets/images/page-img/fun.webp";
import user6 from "../../assets/images/user/13.jpg";
import user7 from "../../assets/images/user/17.jpg";
import user8 from "../../assets/images/user/16.jpg";
import user9 from "../../assets/images/user/09.jpg";
import user10 from "../../assets/images/user/10.jpg";
import user11 from "../../assets/images/user/14.jpg";
import user12 from "../../assets/images/user/15.jpg";
import profileBgImg from "../../assets/images/page-img/profile-bg9.jpg";

import icon1 from "../../assets/images/icon/01.png";
import icon2 from "../../assets/images/icon/02.png";
import icon3 from "../../assets/images/icon/03.png";
import icon4 from "../../assets/images/icon/04.png";
import icon5 from "../../assets/images/icon/05.png";
import icon6 from "../../assets/images/icon/06.png";
import icon7 from "../../assets/images/icon/07.png";
import loader from "../../assets/images/page-img/page-load-loader.gif";
import boyImg from "../../assets/images/page-img/boy.webp";
import busImg from "../../assets/images/page-img/bus.webp";
import img11 from "../../assets/images/page-img/fd.webp";
import mountain from "../../assets/images/page-img/mountain.webp";
import pizza from "../../assets/images/page-img/pizza.webp";
import bootstrapImg from "../../assets/images/icon/bootstrap-5.png";
import adsImg from "../../assets/images/page-img/ads.jpg";
import profile_img_1 from "../../assets/images/page-img/pro(1).jpg";
import profile_img_2 from "../../assets/images/page-img/pro(2).jpg";
import profile_img_3 from "../../assets/images/page-img/pro(3).jpg";
import picture_11 from "../../assets/images/page-img/bussiness(6).jpg";
import picture_12 from "../../assets/images/page-img/crypto(3).jpg";
import picture_13 from "../../assets/images/page-img/gym(4).jpg";

// Story components
import Stories from "../../components/Stories";

// FsLightbox
import ReactFsLightbox from "fslightbox-react";

// Share-offcanvas
import ShareOffcanvasNew from "../../components/ShareOffcanvasNew";

const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

// import img from '../assets/images/user/1.jpg'

const Index = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const [modalShow5, setModalShow5] = useState(false);

  const [loadContent, setLoadContent] = useState(true);

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


  useEffect(() => {
    function handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

        setTimeout(() => {
          setLoadContent(false);
        }, 2000);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // stories
  const stories = [
    {
      id: "yourstory",
      photo: user8,
      name: "Your Story",
      link: "https://ramon.codes",
      preview: [
        {
          storyid: "yourstory-1",
          type: "photo",
          length: 3,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
        {
          storyid: "yourstory-12",
          type: "video",
          length: 0,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
      ],
    },
    {
      id: "ali",
      photo: user1,
      name: "Ali",
      link: "",
      preview: [
        {
          storyid: "ali-1",
          type: "video",
          length: 0,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.mp4",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
        {
          storyid: "ali-2",
          type: "photo",
          length: 3,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },

        {
          storyid: "ali-3",
          type: "photo",
          length: 3,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png",
          link: "https://ramon.codes",
          linkText: "Visit my Portfolio",
          seen: "false",
        },
      ],
    },
    {
      id: "ammy",
      photo: user12,
      name: "Ammy",
      link: "",
      preview: [
        {
          storyid: "ammy-1",
          type: "photo",
          length: 5,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
        {
          storyid: "ammy-2",
          type: "photo",
          length: 3,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg",
          link: "http://ladygaga.com",
          linkText: "false",
          seen: "false",
        },
      ],
    },
    {
      id: "roger-1",
      photo: user3,
      name: "Roger",
      link: "",
      preview: [
        {
          storyid: "roger-1",
          type: "photo",
          length: 5,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
      ],
    },
    {
      id: "justin",
      photo: user11,
      name: "Justin",
      link: "",
      preview: [
        {
          storyid: "justin-1",
          type: "photo",
          length: 10,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
      ],
    },
    {
      id: "sado",
      photo: user3,
      name: "Sado",
      link: "",
      preview: [
        {
          storyid: "sado-1",
          type: "photo",
          length: 10,
          src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg",
          storypreview:
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg",
          link: "",
          linkText: "false",
          seen: "false",
        },
      ],
    },
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
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
          sources={[user5, boyImg, busImg, img11, mountain, pizza]}
          slide={imageController.slide}
        />
        <Container className="custom-conatiner">
          <Row className="gx-4">
            <Col lg={12}>
              <div id="content">
                {/* <Row>
                  <Col sm={12}>
                    <div className="mb-5">
                      <Stories stories={stories} />
                    </div>
                  </Col>
                </Row> */}
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
              </div>
            </Col>

            {/* <Col lg={4}>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title text-capitalize">active users</h4>
                  </div>
                </div>
                <Card.Body className="pt-0">
                  <ul className="list-inline m-0 p-0">
                    <li className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={user01}
                        alt="story-img"
                        className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                      />
                      <div>
                        <h5 className="d-inline-block">Arina Event</h5>
                        <span className="profile-status-online"></span>
                        <small className="text-capitalize d-block">
                          Active
                        </small>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={user2}
                        alt="story-img"
                        className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                      />
                      <div>
                        <h5 className="d-inline-block">Darlene Robertson</h5>
                        <span className="profile-status-online"></span>
                        <small className="text-capitalize d-block">
                          Active
                        </small>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={user3}
                        alt="story-img"
                        className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                      />
                      <div>
                        <h5 className="d-inline-block">Jerome Bell</h5>
                        <span className="profile-status-offline"></span>
                        <small className="text-capitalize d-block">
                          7 hours ago
                        </small>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-3">
                      <img
                        src={user13}
                        alt="story-img"
                        className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                      />
                      <div>
                        <h5 className="d-inline-block">Arlene McCoy</h5>
                        <span className="profile-status-offline"></span>
                        <small className="text-capitalize d-block">
                          4 days ago
                        </small>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              <div className="fixed-suggestion mb-0 mb-lg-4">
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Suggestions for you</h4>
                    </div>
                    <small className="fw-500 text-capitalize">See all</small>
                  </div>
                  <Card.Body className="pt-0">
                    <ul className="list-inline m-0 p-0">
                      <li className="mb-3">
                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={user14}
                              alt="story-img"
                              className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                            />
                            <div>
                              <h5>Annette Black</h5>
                              <div className="d-flex align-items-center justify-content-between gap-2">
                              </div>
                              <small className="text-capitalize">
                                Followed by dribbble + 2 more
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center flex-shrink-0 gap-2">
                            <button className="btn btn-primary-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                add
                              </i>
                            </button>
                            <button className="btn btn-danger-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                close
                              </i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={user15}
                              alt="story-img"
                              className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                            />
                            <div>
                              <div className="d-flex align-items-center justify-content-between gap-2">
                                <div>
                                  <h5>Christopher Plessis</h5>
                                  <small className="text-capitalize">
                                    Followed by dribbble + 2 more
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center flex-shrink-0 gap-2">
                            <button className="btn btn-primary-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                add
                              </i>
                            </button>
                            <button className="btn btn-danger-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                close
                              </i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={user16}
                              alt="story-img"
                              className="avatar-60 avatar-borderd object-cover avatar-rounded img-fluid d-inline-block"
                            />
                            <div>
                              <div className="d-flex align-items-center justify-content-between gap-2">
                                <h5>Ellyse Perry</h5>
                              </div>
                              <small className="text-capitalize">
                                Followed by dribbble + 2 more
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center flex-shrink-0 gap-2">
                            <button className="btn btn-primary-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                add
                              </i>
                            </button>
                            <button className="btn btn-danger-subtle p-1 lh-1">
                              <i className="material-symbols-outlined font-size-14">
                                close
                              </i>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>

                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Latest Activities</h4>
                    </div>
                  </div>
                  <Card.Body className="pt-0">
                    <ul className="list-inline m-0 p-0">
                      <li className="d-flex mb-3 pb-3 border-bottom">
                        <img
                          src={user9}
                          alt="story-img"
                          className="avatar-32 avatar-rounded object-cover img-fluid"
                        />
                        <div className="stories-data ms-3">
                          <h6 className="font-size-14">
                            Esther Howard{" "}
                            <span className="fw-normal text-body">
                              reacted comment in to your
                            </span>{" "}
                            <span className="fw-normal">post.</span>
                          </h6>
                          <small className="text-capitalize">19 min ago</small>
                        </div>
                      </li>
                      <li className="d-flex mb-3 pb-3 border-bottom">
                        <img
                          src={user10}
                          alt="story-img"
                          className="avatar-32 avatar-rounded object-cover img-fluid"
                        />
                        <div className="stories-data ms-3">
                          <h6 className="font-size-14">
                            Monty Carlo{" "}
                            <span className="text-body fw-normal">
                              followed you.
                            </span>
                          </h6>
                          <small className="text-capitalize">7 day ago</small>
                        </div>
                      </li>
                      <li className="d-flex mb-3 pb-3 border-bottom">
                        <img
                          src={user6}
                          alt="story-img"
                          className="avatar-32 avatar-rounded object-cover img-fluid"
                        />
                        <div className="stories-data ms-3">
                          <h6 className="font-size-14">
                            Pete Sariya
                            <span className="text-body fw-normal"> Voted for</span>{" "}
                            Combination of colors from your brand palette
                          </h6>
                          <small className="text-capitalize">1 month ago</small>
                        </div>
                      </li>
                      <li className="d-flex">
                        <img
                          src={user11}
                          alt="story-img"
                          className="avatar-32 avatar-rounded object-cover img-fluid"
                        />
                        <div className="stories-data ms-3">
                          <h6 className="font-size-14">
                            Dima Davydov{" "}
                            <span className="text-body fw-normal">
                              replied to your comment
                            </span>
                          </h6>
                          <small className="text-capitalize">1 month ago</small>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            </Col> */}

          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
