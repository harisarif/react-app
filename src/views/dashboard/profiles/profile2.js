import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ReactFsLightbox from "fslightbox-react";
import CreatePost from "../../../components/create-post";
import CreatePostNew from "../../../components/create-post-new";

import imgp1 from "../../../assets/images/user/15.jpg";
import imgp2 from "../../../assets/images/user/05.jpg";
import imgp3 from "../../../assets/images/user/06.jpg";
import imgp4 from "../../../assets/images/user/07.jpg";
import imgp5 from "../../../assets/images/user/08.jpg";
import imgp11 from "../../../assets/images/user/15.jpg";
import imgp12 from "../../../assets/images/user/05.jpg";
import imgp13 from "../../../assets/images/user/06.jpg";
import imgp14 from "../../../assets/images/user/07.jpg";
import imgp25 from "../../../assets/images/user/1.jpg";
import imgp26 from "../../../assets/images/user/02.jpg";
import imgp27 from "../../../assets/images/user/05.jpg";
import imgp28 from "../../../assets/images/user/06.jpg";
import imgp29 from "../../../assets/images/user/07.jpg";
import imgp30 from "../../../assets/images/user/08.jpg";
import imgp31 from "../../../assets/images/user/02.jpg";
import imgp36 from "../../../assets/images/user/02.jpg";
import imgp42 from "../../../assets/images/user/02.jpg";
import imgp43 from "../../../assets/images/user/02.jpg";
import imgp44 from "../../../assets/images/user/02.jpg";
import imgp45 from "../../../assets/images/user/02.jpg";
import imgp46 from "../../../assets/images/user/02.jpg";
import imgp47 from "../../../assets/images/page-img/52.jpg";
import imgp48 from "../../../assets/images/page-img/53.jpg";
import imgp49 from "../../../assets/images/page-img/54.jpg";
import imgp50 from "../../../assets/images/page-img/55.jpg";
import ProfileHeader from "../../../components/profile-header";
import bg3 from "../../../assets/images/page-img/profile-bg3.jpg";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const Profile2 = () => {

  useEffect(() => {
    document.body.classList.add("profile-2");
    return () => {
      document.body.classList.remove("profile-2");
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
  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={[g1, g2, g3, g4, g5, g6, g7, g8, g9, imgp47, imgp48, imgp49, imgp50]}
        slide={imageController.slide}
      />
      {/* <ProfileHeader title="Profile 2" img={bg3} /> */}

      <div className="position-relative">
        <ProfileHeader title="Profile 2" img={bg3} />
      </div>

      {/* <div className="profile-2"> */}
      <div id="content-page" className="content-inner">
        <Container className="custom-conatiner">
          <Row>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg="2">
                      <div className="item1 ms-1">
                        <img
                          loading="lazy"
                          src={imgp1}
                          className="img-fluid rounded profile-image object-cover"
                          alt="profile-img"
                        />
                      </div>
                    </Col>
                    <Col lg="10">
                      <div className="d-flex justify-content-between">
                        <div className="item2 ">
                          <h4 className="">Mathilda Gvarliani</h4>
                          <span>60 630 followers</span>
                        </div>
                        <div className="item4 ms-1">
                          <div className="d-flex justify-content-between align-items-center ms-1 flex-wrap gap-2 gap-md-3">
                            <div className="d-flex align-items-center">
                              <span className="material-symbols-outlined writ-icon md-18">
                                send
                              </span>
                              <h6 className="ms-1">Write a message</h6>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm d-flex align-items-center"
                            >
                              <span className="material-symbols-outlined  md-16">
                                add
                              </span>
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg="5">
                          <div className="item5 mt-3">
                            <div className="d-flex align-items-center mb-1">
                              <span className="material-symbols-outlined  md-18">
                                business_center
                              </span>
                              <Link to="#" className="link-primary h6 ms-2">
                                Model at next model management
                              </Link>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <span className="material-symbols-outlined md-18">
                                import_contacts
                              </span>
                              <span className="ms-2">
                                Studies public relations at{" "}
                                <Link to="#" className="link-primary h6">
                                  Cacus University
                                </Link>
                              </span>
                            </div>
                            <div className="d-flex align-items-center mb-5 mb-lg-1">
                              <span className="material-symbols-outlined md-18">
                                bookmark_border
                              </span>
                              <span className="ms-2">
                                <Link to="#" className="link-primary h6">
                                  Born on October 9, 2000
                                </Link>
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col lg="3">
                          <div className="item6 position-relative mb-5 mb-lg-0">
                            <div className="vr h-100 d-inline-block position-absolute start-0 d-lg-block d-none"></div>
                            <div className="vr h-100 d-inline-block position-absolute end-0 d-lg-block d-none"></div>
                            <div className="ms-2">
                              <h6 className="mb-2">
                                People Mathilda follows
                              </h6>
                            </div>
                            <div className="iq-media-group ms-2">
                              <Link to="#" className="iq-media">
                                <img
                                  loading="lazy"
                                  className="img-fluid avatar-30 rounded-circle"
                                  src={imgp2}
                                  alt=""
                                />
                              </Link>{" "}
                              <Link to="#" className="iq-media">
                                <img
                                  loading="lazy"
                                  className="img-fluid avatar-30 rounded-circle"
                                  src={imgp3}
                                  alt=""
                                />
                              </Link>{" "}
                              <Link to="#" className="iq-media">
                                <img
                                  loading="lazy"
                                  className="img-fluid avatar-30 rounded-circle"
                                  src={imgp4}
                                  alt=""
                                />
                              </Link>{" "}
                              <Link to="#" className="iq-media">
                                <img
                                  loading="lazy"
                                  className="img-fluid avatar-30 rounded-circle"
                                  src={imgp5}
                                  alt=""
                                />
                              </Link>
                            </div>
                          </div>
                        </Col>
                        <Col lg="4">
                          <div className="item7 ms-2">
                            <div className="d-flex justify-content-between mb-2 flex-wrap">
                              <h6>Mathilda's Interests</h6>
                              <Link to="#">See all</Link>
                            </div>
                            <div className="d-flex ">
                              <Button
                                size="sm"
                                variant="outline-secondary rounded-pill"
                              >
                                Fashion
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-secondary rounded-pill ms-1"
                              >
                                CS
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-secondary rounded-pill ms-1"
                              >
                                Cats
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-secondary rounded-pill ms-1"
                              >
                                Politics
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="card-header-3">
                <Card.Body>
                  <div className="mb-2 text-center">
                    <img
                      loading="lazy"
                      src={imgp11}
                      className="img-fluid rounded profile-image"
                      alt="profile-img"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="ms-1">
                      <h5 className="">Mathilda Gvarliani</h5>
                      <span>60 630 followers</span>
                    </div>
                    <div></div>
                    <div className="item4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                          <svg
                            width="18px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            ></path>
                          </svg>
                          <span>Write a message</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ms-2"
                        >
                          <i className="ri-add-line"></i>Follow
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div className="item5 ms-1">
                      <div className="d-flex flex-column justify-content-between flex-wrap">
                        <div>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            width="18px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                            ></path>
                          </svg>
                          <Link to="#" className="link-primary">
                            Model at next model management
                          </Link>
                        </div>
                        <div>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            width="18px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                          <span>
                            Studies public relations at{" "}
                            <Link to="#" className="link-primary ">
                              Cacucasus University
                            </Link>
                          </span>
                        </div>
                        <div>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            width="18px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            ></path>
                          </svg>
                          <span>Born on October 9, 2000</span>
                        </div>
                      </div>
                    </div>
                    <div className="item6 border-light border-end border-start">
                      <div className="ms-2">
                        <span>People Mathilda follows</span>
                      </div>
                      <div className="iq-media-group ms-1">
                        <Link to="#" className="iq-media">
                          <img
                            loading="lazy"
                            className="img-fluid avatar-40 rounded-circle card-text-1"
                            src={imgp12}
                            alt=""
                          />
                        </Link>
                        <Link to="#" className="iq-media">
                          <img
                            loading="lazy"
                            className="img-fluid avatar-40 rounded-circle card-text-1"
                            src={imgp13}
                            alt=""
                          />
                        </Link>
                        <Link to="#" className="iq-media">
                          <img
                            loading="lazy"
                            className="img-fluid avatar-40 rounded-circle card-text-1"
                            src={imgp13}
                            alt=""
                          />
                        </Link>
                        <Link to="#" className="iq-media">
                          <img
                            loading="lazy"
                            className="img-fluid avatar-40 rounded-circle card-text-1"
                            src={imgp14}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="item7 ms-2">
                      <div className="d-flex justify-content-between mb-2 flex-wrap">
                        <span>Mathilda's Interests</span>
                        <Link to="#">See all</Link>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-1"
                        >
                          Fashion
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-1"
                        >
                          CS
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-1"
                        >
                          Cats
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-1"
                        >
                          Politics
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card>
                <Card.Header className="border-bottom">
                  <div className="header-title">
                    <h4 className="card-title">Bio</h4>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="m-0">
                      <Link to="#"> Know More </Link>
                    </p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-column justify-content-between">
                    <h6 className="mb-1">Mathilda Mariam Gvarliani - Georgian</h6>
                    <h6 className="mb-1">@lookmodelsmanagement</h6>
                    <h6 className="mb-1">@nextmodels</h6>
                    <h6 className="mb-1">@munichmodels</h6>
                    <h6 className="mb-1">@elite_copenenhagen</h6>
                    <h6>been unpredictable since childhood</h6>
                  </div>
                  <hr />
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center mb-1">
                      <span className="material-symbols-outlined  md-18 me-2">
                        business_center
                      </span>
                      <Link to="#" className="link-primary">Model at next model management</Link>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="material-symbols-outlined md-18 me-2">
                        import_contacts
                      </span>
                      <span>Studies public relations at <Link to="#" className="link-primary ">Cacucasus University</Link></span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="material-symbols-outlined md-18 me-2">
                        bookmark_border
                      </span>
                      <span>Born on October 9, 2000</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined  md-18 me-2">
                        hide_source
                      </span>
                      <span>Lives in <Link to="#" className="link-primary ">Tbilisi, Georgia</Link></span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="fixed-suggestion mb-0 mb-lg-4">
                <Card>
                  <Card.Header className=" align-items-center border-bottom">
                    <div className="header-title">
                      <h4 className="card-title">Photos</h4>
                    </div>
                    <Link to="#" style={{ color: "inherit" }}>See all photos</Link>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2 grid-cols-3">
                      {/* <Link onClick={() => imageOnSlide(1)} to="#">
                      <img
                        loading="lazy"
                        src={g1}
                        alt="gallary"
                        className="img-fluid"
                      />
                    </Link> */}
                      <Link onClick={() => imageOnSlide(2)} to="#">
                        <img
                          loading="lazy"
                          src={g2}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(3)} to="#">
                        <img
                          loading="lazy"
                          src={g3}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(4)} to="#">
                        <img
                          loading="lazy"
                          src={g4}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(5)} to="#">
                        <img
                          loading="lazy"
                          src={g5}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(6)} to="#">
                        <img
                          loading="lazy"
                          src={g6}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(7)} to="#">
                        <img
                          loading="lazy"
                          src={g7}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(8)} to="#">
                        <img
                          loading="lazy"
                          src={g8}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(9)} to="#">
                        <img
                          loading="lazy"
                          src={g9}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                      <Link onClick={() => imageOnSlide(6)} to="#">
                        <img
                          loading="lazy"
                          src={g7}
                          alt="gallary"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header className="align-items-center border-bottom">
                    <div className="header-title">
                      <h4 className="card-title">Videos</h4>
                    </div>
                    <Link to="#" style={{ color: "inherit" }}>See all videos</Link>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Link to="#" className="ratio ">
                        <iframe
                          title="myFrame"
                          className="rounded embed-responsive-item"
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          allowFullScreen
                        ></iframe>
                      </Link>
                      <Link to="#" className="ratio">
                        <iframe
                          title="myFrame"
                          className="rounded embed-responsive-item"
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          allowFullScreen
                        ></iframe>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col lg="8">
              {/* <CreatePost /> */}
              <CreatePostNew />
              <div className="card card-2">
                <Card.Body>
                  <ul className="post-comments p-0 m-0">
                    <li className="">
                      <div className="d-flex justify-content-between">
                        <div className="user-img">
                          <img
                            loading="lazy"
                            src={imgp25}
                            alt="userimg"
                            className="avatar-60 me-3 rounded-circle img-fluid"
                          />
                        </div>
                        <div className="w-100">
                          <form className="post-text mt-2">
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write something here..."
                              style={{ border: "none" }}
                            />
                          </form>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <div className="">Add:</div>
                            <div className="">
                              <svg
                                fill="none"
                                width="18px"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                            <div className="">
                              <svg
                                fill="none"
                                width="18px"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                            <div className="">
                              <svg
                                fill="none"
                                width="18px"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                ></path>
                              </svg>
                            </div>
                            <button className="btn btn-primary btn-sm">
                              Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </div>
              <Card>
                <Card.Body>
                  <ul className="post-comments p-0 m-0">
                    <li className="mb-2">
                      <div className="d-flex justify-content-between">
                        <div className="user-img me-3">
                          <img
                            loading="lazy"
                            src={imgp26}
                            alt="userimg"
                            className="avatar-60 rounded-circle img-fluid"
                          />
                        </div>
                        <div className="w-100 text-margin">
                          <h5>Mathilda Gvarliana</h5>
                          <small className=" d-flex align-items-center ">
                            {" "}
                            <i className="material-symbols-outlined md-14 me-1">
                              schedule
                            </i>{" "}
                            March 14, 23:00
                          </small>
                          <p>
                            Hi, I am flying to Los Angeles to attend #VSFS2020
                            castings. I hope it will happen and my dream comes
                            true. Wish me luck.{" "}
                          </p>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  favorite_border
                                </span>
                                <span className="card-text-1 ms-1">
                                  Love it
                                </span>
                              </div>
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  comment
                                </span>
                                <span className="card-text-1 ms-1">
                                  Comment
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined md-18">
                                  share
                                </span>
                                <span className="card-text-1 ms-1">
                                  Share
                                </span>
                              </div>
                            </div>
                            <span className="card-text-2">
                              5.2k people love it
                            </span>

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="card-text-1 me-1">
                                5.2k people love it
                              </span>
                              <div className="iq-media-group ms-2">
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp27}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp28}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp29}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp30}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <form
                            className="d-flex align-items-center mt-3"
                            action="#"
                          >
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write your comment"
                            />
                            <div className="comment-attagement d-flex align-items-center me-5 pe-2">
                              <span className="material-symbols-outlined md-18 me-1">
                                comment
                              </span>
                              <h6 className="card-text-1">Comment</h6>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="post-comments p-0 m-0">
                    <li className="mb-2">
                      <div className="d-flex justify-content-between">
                        <div className="user-img me-3">
                          <img
                            loading="lazy"
                            src={imgp31}
                            alt="userimg"
                            className="avatar-60  rounded-circle img-fluid"
                          />
                        </div>
                        <div className="w-100 text-margin">
                          <h5>Mathilda Gvarliana</h5>
                          <small className=" d-flex align-items-center ">
                            {" "}
                            <i className="material-symbols-outlined md-14 me-1">
                              schedule
                            </i>{" "}
                            March 14, 23:00
                          </small>
                          <div className="mt-2 mb-2 ratio">
                            <iframe
                              title="myFrame"
                              className="rounded embed-responsive-item"
                              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <p>Dolce Spring Summer 2020 - Women's Show</p>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  favorite_border
                                </span>
                                <span className="card-text-1 ms-1">
                                  Love it
                                </span>
                              </div>
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  comment
                                </span>
                                <span className="card-text-1 ms-1">
                                  Comment
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined md-18">
                                  share
                                </span>
                                <span className="card-text-1 ms-1">
                                  Share
                                </span>
                              </div>
                            </div>
                            <span className="card-text-2">
                              5.2k people love it
                            </span>

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="card-text-1 me-1">
                                5.2k people love it
                              </span>
                              <div className="iq-media-group ms-2">
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp27}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp28}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp29}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp30}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <form
                            className="d-flex align-items-center mt-3"
                            action="#"
                          >
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write your comment"
                            />
                            <div className="comment-attagement d-flex align-items-center me-5 pe-2">
                              <span className="material-symbols-outlined md-18 me-1">
                                comment
                              </span>
                              <h6 className="card-text-1">Comment</h6>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="post-comments p-0 m-0">
                    <li className="mb-2">
                      <div className="d-sm-flex justify-content-between">
                        <div className="user-img me-3">
                          <img
                            loading="lazy"
                            src={imgp36}
                            alt="userimg"
                            className="avatar-60 rounded-circle img-fluid"
                          />
                        </div>
                        <div className="w-100 text-margin mt-sm-0 mt-2">
                          <h5>Mathilda Gvarliana</h5>
                          <small className=" d-flex align-items-center ">
                            {" "}
                            <i className="material-symbols-outlined md-14 me-1">
                              schedule
                            </i>{" "}
                            March 14, 23:00
                          </small>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry.{" "}
                          </p>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  favorite_border
                                </span>
                                <span className="card-text-1 ms-1">
                                  Love it
                                </span>
                              </div>
                              <div className="d-flex align-items-center me-3">
                                <span className="material-symbols-outlined md-18">
                                  comment
                                </span>
                                <span className="card-text-1 ms-1">
                                  Comment
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined md-18">
                                  share
                                </span>
                                <span className="card-text-1 ms-1">
                                  Share
                                </span>
                              </div>
                            </div>
                            <span className="card-text-2">
                              5.2k people love it
                            </span>

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="card-text-1 me-1">
                                5.2k people love it
                              </span>
                              <div className="iq-media-group ms-2">
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp27}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp28}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp29}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp30}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            <p>Hide 203 comments</p>
                          </div>
                          <ul className="post-comments p-2  card rounded">
                            <li className="mb-2">
                              <div className="d-sm-flex justify-content-between">
                                <div className="user-img me-3">
                                  <img
                                    src={imgp45}
                                    alt="userimg"
                                    className="avatar-60  rounded-circle img-fluid"
                                  />
                                </div>
                                <div className="w-100 text-margin mt-sm-0 mt-2">
                                  <div className="">
                                    <h5 className="mb-0 d-inline-block me-1">
                                      Emma Labelle
                                    </h5>{" "}
                                    <h6 className=" mb-0 d-inline-block">
                                      2 weeks ago
                                    </h6>
                                  </div>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry.{" "}
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          favorite_border
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Love it
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          comment
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Comment
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <span className="material-symbols-outlined md-18">
                                          share
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Share
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <ul className="post-comments p-2 m-0 card rounded ">
                            <li className="mb-2">
                              <div className="d-sm-flex justify-content-between">
                                <div className="user-img me-3">
                                  <img
                                    loading="lazy"
                                    src={imgp42}
                                    alt="userimg"
                                    className="avatar-60 rounded-circle img-fluid"
                                  />
                                </div>
                                <div className="w-100 text-margin mt-sm-0 mt-2">
                                  <div className="">
                                    <h5 className="mb-0 d-inline-block me-1">
                                      Emma Labelle
                                    </h5>{" "}
                                    <small className=" mb-0 d-inline-block">
                                      2 weeks ago
                                    </small>
                                  </div>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard
                                    dummy text ever since the 1500s
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          favorite_border
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Love it
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          comment
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Comment
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <span className="material-symbols-outlined md-18">
                                          share
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Share
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <ul className="post-comments p-0 mt-4">
                                    <li className="mb-2">
                                      <div className="d-sm-flex justify-content-between">
                                        <div className="user-img me-3">
                                          <img
                                            loading="lazy"
                                            src={imgp43}
                                            alt="userimg"
                                            className="avatar-60 rounded-circle img-fluid object-cover"
                                          />
                                        </div>
                                        <div className="w-100 text-margin mt-sm-0 mt-2">
                                          <div className="">
                                            <h5 className="mb-0 d-inline-block me-1">
                                              Emma Labelle
                                            </h5>{" "}
                                            <h6 className=" mb-0 d-inline-block">
                                              2 weeks ago
                                            </h6>
                                          </div>
                                          <p>
                                            Lorem Ipsum is simply dummy text
                                            of the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industry's standard dummy text
                                            ever since the 1500s.
                                          </p>
                                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div className="d-flex justify-content-around align-items-center">
                                              <div className="d-flex align-items-center me-3">
                                                <span className="material-symbols-outlined md-18">
                                                  favorite_border
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Love it
                                                </span>
                                              </div>
                                              <div className="d-flex align-items-center me-3">
                                                <span className="material-symbols-outlined md-18">
                                                  comment
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Comment
                                                </span>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <span className="material-symbols-outlined md-18">
                                                  share
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Share
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <ul className="post-comments p-0 mt-4">
                                    <li className="mb-2">
                                      <div className="d-sm-flex justify-content-between">
                                        <div className="user-img me-3">
                                          <img
                                            loading="lazy"
                                            src={imgp44}
                                            alt="userimg"
                                            className="avatar-60 rounded-circle img-fluid object-cover"
                                          />
                                        </div>
                                        <div className="w-100 text-margin mt-sm-0 mt-2">
                                          <div className="">
                                            <h5 className="mb-0 d-inline-block me-1">
                                              Emma Labelle
                                            </h5>{" "}
                                            <h6 className=" mb-0 d-inline-block">
                                              2 weeks ago
                                            </h6>
                                          </div>
                                          <p>
                                            Lorem Ipsum is simply dummy text
                                            of the printing and typesetting
                                            industry.{" "}
                                          </p>
                                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div className="d-flex justify-content-around align-items-center">
                                              <div className="d-flex align-items-center me-3">
                                                <span className="material-symbols-outlined md-18">
                                                  favorite_border
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Love it
                                                </span>
                                              </div>
                                              <div className="d-flex align-items-center me-3">
                                                <span className="material-symbols-outlined md-18">
                                                  comment
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Comment
                                                </span>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <span className="material-symbols-outlined md-18">
                                                  share
                                                </span>
                                                <span className="card-text-1 ms-1">
                                                  Share
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <form
                                            className="d-flex align-items-center mt-3"
                                            action="#"
                                          >
                                            <input
                                              type="text"
                                              className="form-control rounded"
                                              placeholder="Write your comment"
                                            />
                                            <div className="comment-attagement d-flex align-items-center me-5 pe-2">
                                              <span className="material-symbols-outlined md-18 me-1">
                                                comment
                                              </span>
                                              <h6 className="card-text-1 ">
                                                Comment
                                              </h6>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <ul className="post-comments p-2 mt-4">
                            <li className="mb-2">
                              <div className="d-sm-flex justify-content-between">
                                <div className="user-img me-3">
                                  <img
                                    loading="lazy"
                                    src={imgp45}
                                    alt="userimg"
                                    className="avatar-60 rounded-circle img-fluid "
                                  />
                                </div>
                                <div className="w-100 text-margin mt-sm-0 mt-2">
                                  <div className="">
                                    <h5 className="mb-0 d-inline-block me-1">
                                      Emma Labelle
                                    </h5>{" "}
                                    <span className=" mb-0 d-inline-block">
                                      2 weeks ago
                                    </span>
                                  </div>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry.
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex justify-content-around align-items-center">
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          favorite_border
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Love it
                                        </span>
                                      </div>{" "}
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18 me-1">
                                          comment
                                        </span>
                                        <span className="card-text-1">
                                          Comment
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <form
                              className="d-flex align-items-center mt-3"
                              action="#"
                            >
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Write your comment"
                              />
                              <div className="comment-attagement d-flex align-items-center me-5 pe-2">
                                <span className="material-symbols-outlined md-18 me-1">
                                  comment
                                </span>
                                <h6 className="card-text-1 me-2">Comment</h6>
                              </div>
                            </form>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="post-comments p-0 m-0">
                    <li className="mb-2">
                      <div className="d-flex justify-content-between">
                        <div className="user-img me-3">
                          <img
                            loading="lazy"
                            src={imgp46}
                            alt="userimg"
                            className="avatar-60  rounded-circle img-fluid"
                          />
                        </div>
                        <div className="w-100 text-margin">
                          <h4>Mathilda Gvarliana</h4>
                          <p className="mb-4">June 30, 12: 26</p>
                          <div className="d-grid gap-2 grid-cols-2 mb-2">
                            <Link to="#" onClick={() => imageOnSlide(10)}>
                              <img
                                loading="lazy"
                                src={imgp47}
                                className="img-fluid bg-soft-info rounded  image-size"
                                alt="profile-img"
                              />
                            </Link>
                            <Link to="#" onClick={() => imageOnSlide(11)}>
                              <img
                                loading="lazy"
                                src={imgp48}
                                className="img-fluid bg-soft-info rounded  image-size"
                                alt="profile-img"
                              />
                            </Link>
                            <Link to="#" onClick={() => imageOnSlide(12)}>
                              <img
                                loading="lazy"
                                src={imgp49}
                                className="img-fluid bg-soft-info rounded  image-size"
                                alt="profile-img"
                              />
                            </Link>
                            <Link to="#" onClick={() => imageOnSlide(13)}>
                              <img
                                loading="lazy"
                                src={imgp50}
                                className="img-fluid bg-soft-info rounded  image-size"
                                alt="profile-img"
                              />
                            </Link>
                          </div>
                          <span className="">
                            Photoshoot for Buyers Magazine - 2019
                          </span>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center me-3">
                                  <span className="material-symbols-outlined md-18">
                                    favorite_border
                                  </span>
                                  <span className="card-text-1 ms-1">
                                    Love it
                                  </span>
                                </div>
                                <div className="d-flex align-items-center me-3">
                                  <span className="material-symbols-outlined md-18">
                                    comment
                                  </span>
                                  <span className="card-text-1 ms-1">
                                    Comment
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <span className="material-symbols-outlined md-18">
                                    share
                                  </span>
                                  <span className="card-text-1 ms-1">
                                    Share
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="card-text-2">
                              5.2k people love it
                            </span>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="card-text-1 me-1">
                                5.2k people love it
                              </span>
                              <div className="iq-media-group ms-2">
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle "
                                    src={imgp27}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp28}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp29}
                                    alt=""
                                  />
                                </Link>{" "}
                                <Link to="#" className="iq-media ">
                                  <img
                                    loading="lazy"
                                    className="img-fluid avatar-30 rounded-circle"
                                    src={imgp30}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <form
                            className="d-flex align-items-center mt-3"
                            action="#"
                          >
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write your comment"
                            />
                            <div className="comment-attagement d-flex align-items-center me-5 pe-2">
                              <span className="material-symbols-outlined md-18 me-1">
                                comment
                              </span>
                              <h6 className="card-text-1">Comment</h6>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* </div> */}
    </>
  );
};
export default Profile2;
