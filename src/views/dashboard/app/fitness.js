import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";


//profile-header
import ProfileHeader from "../../../components/profile-header";

// image
import job_img_6 from "../../../assets/images/page-img/bussiness(1).jpg";
import job_img_7 from "../../../assets/images/page-img/gym(1).jpg";
import job_img_3 from "../../../assets/images/page-img/job-img-3.jpg";
import job_img_4 from "../../../assets/images/page-img/job-img-4.jpg";
import job_img_5 from "../../../assets/images/page-img/job-img-5.jpg";
import gym_img_1 from "../../../assets/images/page-img/gym.jpg";
import gym_img_2 from "../../../assets/images/page-img/gym(1).jpg";
import gym_img_3 from "../../../assets/images/page-img/gym(3).jpg";
import gym_img_4 from "../../../assets/images/page-img/gym(4).jpg";
import gym_img_5 from "../../../assets/images/page-img/gym(9).jpg";

import pro_img_1 from "../../../assets/images/page-img/pro(1).jpg";
import pro_img_2 from "../../../assets/images/page-img/pro(2).jpg";
import pro_img_3 from "../../../assets/images/page-img/pro(3).jpg";

const JobListDetails = () => {
  return (
    <>

  

  <div id="content-page" class="content-inner">
  <div className="container">
  <div className="custom-container-equity">
    <div id="content">
      <div className="row social-post-container">
        <div className="col-sm-12 social-post">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="user-post-data">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="me-3 flex-shrik-0">
                    <img
                      className="border border-2 rounded-circle user-post-profile"
                      src={pro_img_1}
                      alt="user-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-0 d-inline-block">Barb Ackue</h6>
                        <span className="d-inline-block text-primary">
                          <svg
                            className="align-text-bottom"
                            width={17}
                            height={17}
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.8457 0H4.34822C1.73547 0 0.0974121 1.84995 0.0974121 4.46789V11.5321C0.0974121 14.1501 1.72768 16 4.34822 16H11.8449C14.4663 16 16.0974 14.1501 16.0974 11.5321V4.46789C16.0974 1.84995 14.4663 0 11.8457 0Z"
                              fill="currentColor"
                            />
                            <path
                              d="M5.09741 7.99978L7.09797 9.9995L11.0974 6.00006"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="mb-0 d-inline-block text-capitalize fw-medium">
                          Add a New Post
                        </span>
                        <p className="mb-0">1 Hour ago</p>
                      </div>
                      <div className="card-post-toolbar">
                        <div className="dropdown">
                          <span
                            className="dropdown-toggle material-symbols-outlined"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            role="button"
                          >
                            more_horiz
                          </span>
                          <div className="dropdown-menu m-0 p-0">
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  save
                                </span>
                                <div className="data ms-2">
                                  <h6>Save Post</h6>
                                  <p className="mb-0">
                                    Add this to your saved items
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  cancel
                                </span>
                                <div className="data ms-2">
                                  <h6>Hide Post</h6>
                                  <p className="mb-0">
                                    See fewer posts like this.
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  person_remove
                                </span>
                                <div className="data ms-2">
                                  <h6>Unfollow User</h6>
                                  <p className="mb-0">
                                    Stop seeing posts but stay friends.
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  notifications
                                </span>
                                <div className="data ms-2">
                                  <h6>Notifications</h6>
                                  <p className="mb-0">
                                    Turn on notifications for this post
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="m-0">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                  Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                  rhoncus"
                </p>
                <ul className="list-inline m-0 p-0 d-flex flex-wrap gap-1">
                  <li>
                    <a href="javascript:void(0);">#family</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">#happiness</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">#travelling</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">#camping</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">#climbing</a>
                  </li>
                </ul>
              </div>
              <div className="user-post mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <a
                      data-fslightbox="gallery"
                      href="{{URL::asset('/images/gym.jpg')}}"
                      className="rounded"
                    >
                      <img
                        src={gym_img_1}
                        alt="post-image"
                        className="img-fluid rounded w-100 h-100"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="col-md-4 mt-md-0 mt-3">
                    <a
                      data-fslightbox="gallery"
                      href="{{URL::asset('/images/gym(9).jpg')}}"
                      className="rounded"
                    >
                      <img
                        src={gym_img_2}
                        alt="post-image"
                        className="img-fluid rounded w-100 h-100"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="col-md-4 mt-md-0 mt-3">
                    <a
                      data-fslightbox="gallery"
                      href="{{URL::asset('/images/gym(4).jpg')}}"
                      className="rounded"
                    >
                      <img
                        src={gym_img_3}
                        alt="post-image"
                        className="img-fluid rounded w-100 h-100"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <a
                      data-fslightbox="gallery"
                      href="{{URL::asset('/images/gym(1).jpg')}}"
                      className="rounded"
                    >
                      <img
                        src={gym_img_4}
                        alt="post-image"
                        className="img-fluid rounded w-100 h-100"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <div className="post-overlay-box h-100 rounded">
                      <img
                        src={gym_img_5}
                        alt="post-image"
                        className="img-fluid rounded w-100 h-100 object-cover"
                        loading="lazy"
                      />
                      <a
                        data-fslightbox="gallery"
                        href="{{URL::asset('/images/gym(3).jpg')}}"
                        className="rounded font-size-18"
                      >
                        +2
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-meta-likes mt-4">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <ul className="list-inline m-0 p-0 post-user-liked-list">
                    <li>
                      <img
                        src={pro_img_1}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_3}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_2}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_1}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                  </ul>
                  <div className="d-inline-flex align-items-center gap-1">
                    <h6 className="m-0 font-size-14">Aliana Molex</h6>
                    <span
                      className="text-capitalize font-size-14 fw-medium"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#likemodal"
                    >
                      and 208 others liked this
                    </span>
                  </div>
                </div>
              </div>
              <div className="comment-area mt-4 pt-4 border-top">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
                    <div className="like-data">
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="button"
                        >
                          <span className="material-symbols-outlined align-text-top font-size-20">
                            thumb_up
                          </span>
                          <span className="fw-medium">140 Likes</span>
                        </span>
                        <div className="dropdown-menu py-2 shadow">
                          <a
                            className="ms-2 me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Like"
                            data-bs-original-title="Like"
                          >
                            <img
                              src={pro_img_2}
                              className="img-fluid"
                              alt="like"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Love"
                            data-bs-original-title="Love"
                          >
                            <img
                              src="./assets/images/icon/02.png"
                              className="img-fluid"
                              alt="love"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Happy"
                            data-bs-original-title="Happy"
                          >
                            <img
                              src="./assets/images/icon/03.png"
                              className="img-fluid"
                              alt="happy"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="HaHa"
                            data-bs-original-title="HaHa"
                          >
                            <img
                              src="./assets/images/icon/04.png"
                              className="img-fluid"
                              alt="haha"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Think"
                            data-bs-original-title="Think"
                          >
                            <img
                              src="./assets/images/icon/05.png"
                              className="img-fluid"
                              alt="think"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Sad"
                            data-bs-original-title="Sad"
                          >
                            <img
                              src="./assets/images/icon/06.png"
                              className="img-fluid"
                              alt="sad"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            aria-label="Lovely"
                            data-bs-original-title="Lovely"
                          >
                            <img
                              src="./assets/images/icon/07.png"
                              className="img-fluid"
                              alt="lovely"
                              loading="lazy"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 flex-shrink-0">
                    <div
                      className="total-comment-block"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#commentcollapes2"
                      aria-expanded="false"
                      aria-controls="commentcollapes"
                    >
                      <span className="material-symbols-outlined align-text-top font-size-20">
                        comment
                      </span>
                      <span className="fw-medium">20 Comment</span>
                    </div>
                    <div className="share-block d-flex align-items-center feather-icon">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#share-btn"
                        aria-controls="share-btn"
                        className="d-flex align-items-center"
                      >
                        <span className="material-symbols-outlined align-text-top font-size-20">
                          share
                        </span>
                        <span className="ms-1 fw-medium">99 Share</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="collapse mt-4 pt-4 border-top"
                  id="commentcollapes2"
                >
                  <ul className="list-inline m-o p-0 comment-list">
                    <li className="mb-3">
                      <div className="comment-list-block">
                        <div className="d-flex align-items-center gap-3">
                          <div className="comment-list-user-img flex-shrink-0">
                            <img
                              src="{{URL::asset('/images/user/13.jpg')}}"
                              alt="userimg"
                              className="avatar-48 rounded-circle img-fluid"
                              loading="lazy"
                            />
                          </div>
                          <div className="comment-list-user-data">
                            <div className="d-inline-flex align-items-center gap-1 flex-wrap">
                              <h6 className="m-0">Bob Frapples</h6>
                              <span className="d-inline-block text-primary">
                                <svg
                                  className="align-text-bottom"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={17}
                                  height={17}
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.2483 0.216553H4.75081C2.13805 0.216553 0.5 2.0665 0.5 4.68444V11.7487C0.5 14.3666 2.13027 16.2166 4.75081 16.2166H12.2475C14.8689 16.2166 16.5 14.3666 16.5 11.7487V4.68444C16.5 2.0665 14.8689 0.216553 12.2483 0.216553Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M5.5 8.21627L7.50056 10.216L11.5 6.21655"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <spna className="fw-medium small text-capitalize">
                                3 min ago
                              </spna>
                            </div>
                          </div>
                        </div>
                        <div className="comment-list-user-comment">
                          <div className="comment-list-comment">
                            "Just stumbled upon this post and it's giving me all
                            the feels! 🙌"
                          </div>
                          <div className="comment-list-action mt-2">
                            <ul className="list-inline m-0 p-0 d-flex align-items-center gap-2">
                              <li>
                                <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
                                  <div className="like-data">
                                    <div className="dropdown">
                                      <span
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        role="button"
                                      >
                                        <span className="material-symbols-outlined align-text-top font-size-18">
                                          thumb_up
                                        </span>
                                        <span className="fw-medium small">
                                          Likes
                                        </span>
                                      </span>
                                      <div className="dropdown-menu py-2 shadow">
                                        <a
                                          className="ms-2 me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Like"
                                          data-bs-original-title="Like"
                                        >
                                          <img
                                            src="./assets/images/icon/01.png"
                                            className="img-fluid"
                                            alt="like"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Love"
                                          data-bs-original-title="Love"
                                        >
                                          <img
                                            src="./assets/images/icon/02.png"
                                            className="img-fluid"
                                            alt="love"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Happy"
                                          data-bs-original-title="Happy"
                                        >
                                          <img
                                            src="./assets/images/icon/03.png"
                                            className="img-fluid"
                                            alt="happy"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="HaHa"
                                          data-bs-original-title="HaHa"
                                        >
                                          <img
                                            src="./assets/images/icon/04.png"
                                            className="img-fluid"
                                            alt="haha"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Think"
                                          data-bs-original-title="Think"
                                        >
                                          <img
                                            src="./assets/images/icon/05.png"
                                            className="img-fluid"
                                            alt="think"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Sad"
                                          data-bs-original-title="Sad"
                                        >
                                          <img
                                            src="./assets/images/icon/06.png"
                                            className="img-fluid"
                                            alt="sad"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          aria-label="Lovely"
                                          data-bs-original-title="Lovely"
                                        >
                                          <img
                                            src="./assets/images/icon/07.png"
                                            className="img-fluid"
                                            alt="lovely"
                                            loading="lazy"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <span
                                  className="fw-medium small"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#subcomment-collapse2"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                  Reply
                                </span>
                              </li>
                            </ul>
                            <div
                              className="add-comment-form-block collapse mt-3"
                              id="subcomment-collapse2"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <div className="flex-shrink-0">
                                  <img
                                    src="{{URL::asset('/images/user/1.jpg')}}"
                                    alt="userimg"
                                    className="avatar-48 rounded-circle img-fluid"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="add-comment-form">
                                  <form>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Write a Comment..."
                                    />
                                    <button
                                      type="submit"
                                      className="btn btn-primary font-size-12 text-capitalize px-5"
                                    >
                                      post
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="add-comment-form-block">
                    <div className="d-flex align-items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src="{{URL::asset('/images/user/1.jpg')}}"
                          alt="userimg"
                          className="avatar-48 rounded-circle img-fluid"
                          loading="lazy"
                        />
                      </div>
                      <div className="add-comment-form">
                        <form>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write a Comment..."
                          />
                          <button
                            type="submit"
                            className="btn btn-primary font-size-12 text-capitalize px-5"
                          >
                            post
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 social-post">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="user-post-data">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="me-3 flex-shrik-0">
                    <img
                      className="border border-2 rounded-circle user-post-profile"
                      src={pro_img_1}
                      alt="user-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-0 d-inline-block">Bni Cyst</h6>
                        <span className="d-inline-block text-primary">
                          <svg
                            className="align-text-bottom"
                            width={17}
                            height={17}
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.8457 0H4.34822C1.73547 0 0.0974121 1.84995 0.0974121 4.46789V11.5321C0.0974121 14.1501 1.72768 16 4.34822 16H11.8449C14.4663 16 16.0974 14.1501 16.0974 11.5321V4.46789C16.0974 1.84995 14.4663 0 11.8457 0Z"
                              fill="currentColor"
                            />
                            <path
                              d="M5.09741 7.99978L7.09797 9.9995L11.0974 6.00006"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="mb-0 d-inline-block text-capitalize fw-medium">
                          Added New Video in his Timeline
                        </span>
                        <p className="mb-0">8 Hours ago</p>
                      </div>
                      <div className="card-post-toolbar">
                        <div className="dropdown">
                          <span
                            className="dropdown-toggle material-symbols-outlined"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            role="button"
                          >
                            more_horiz
                          </span>
                          <div className="dropdown-menu m-0 p-0">
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  save
                                </span>
                                <div className="data ms-2">
                                  <h6>Save Post</h6>
                                  <p className="mb-0">
                                    Add this to your saved items
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  cancel
                                </span>
                                <div className="data ms-2">
                                  <h6>Hide Post</h6>
                                  <p className="mb-0">
                                    See fewer posts like this.
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  person_remove
                                </span>
                                <div className="data ms-2">
                                  <h6>Unfollow User</h6>
                                  <p className="mb-0">
                                    Stop seeing posts but stay friends.
                                  </p>
                                </div>
                              </div>
                            </a>
                            <a className="dropdown-item p-3" href="#">
                              <div className="d-flex align-items-top">
                                <span className="material-symbols-outlined">
                                  notifications
                                </span>
                                <div className="data ms-2">
                                  <h6>Notifications</h6>
                                  <p className="mb-0">
                                    Turn on notifications for this post
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="m-0">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                  Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                  rhoncus"
                </p>
              </div>
              <div className="user-post mt-4">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/ihSGXbXwJMM"
                    allowFullScreen=""
                  />
                  {"{"}
                  {"{"}--{" "}
                  <iframe
                    width={1236}
                    height={695}
                    src="https://www.youtube.com/embed/1YyAzVmP9xQ"
                    title="Cryptocurrency In 5 Minutes | Cryptocurrency Explained | What Is Cryptocurrency? | Simplilearn"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen=""
                  />{" "}
                  --{"}"}
                  {"}"}
                </div>
              </div>
              <div className="post-meta-likes mt-4">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <ul className="list-inline m-0 p-0 post-user-liked-list">
                    <li>
                      <img
                        src={pro_img_1}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_2}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_3}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                    <li>
                      <img
                        src={pro_img_1}
                        alt="userimg"
                        className="rounded-circle img-fluid userimg"
                        loading="lazy"
                      />
                    </li>
                  </ul>
                  <div className="d-inline-flex align-items-center gap-1">
                    <h6 className="m-0 font-size-14">Aliana Molex</h6>
                    <span
                      className="text-capitalize font-size-14 fw-medium"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#likemodal"
                    >
                      and 208 others liked this
                    </span>
                  </div>
                </div>
              </div>
              <div className="comment-area mt-4 pt-4 border-top">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
                    <div className="like-data">
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="button"
                        >
                          <span className="material-symbols-outlined align-text-top font-size-20">
                            thumb_up
                          </span>
                          <span className="fw-medium">140 Likes</span>
                        </span>
                        <div className="dropdown-menu py-2 shadow">
                          <a
                            className="ms-2 me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Like"
                          >
                            <img
                              src="{{ asset('/images/icon/01.png') }}"
                              className="img-fluid"
                              alt="like"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Love"
                          >
                            <img
                              src="{{ asset('/images/icon/02.png') }}"
                              className="img-fluid"
                              alt="love"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Happy"
                          >
                            <img
                              src="{{ asset('/images/icon/03.png') }}"
                              className="img-fluid"
                              alt="happy"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="HaHa"
                          >
                            <img
                              src="{{ asset('/images/icon/04.png') }}"
                              className="img-fluid"
                              alt="haha"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Think"
                          >
                            <img
                              src="{{ asset('/images/icon/05.png') }}"
                              className="img-fluid"
                              alt="think"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Sad"
                          >
                            <img
                              src="{{ asset('/images/icon/06.png') }}"
                              className="img-fluid"
                              alt="sad"
                              loading="lazy"
                            />
                          </a>
                          <a
                            className="me-2"
                            href="javascript:void(0);"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Lovely"
                          >
                            <img
                              src="{{ asset('/images/icon/07.png') }}"
                              className="img-fluid"
                              alt="lovely"
                              loading="lazy"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 flex-shrink-0">
                    <div
                      className="total-comment-block"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#commentcollapes4"
                      aria-expanded="false"
                      aria-controls="commentcollapes"
                    >
                      <span className="material-symbols-outlined align-text-top font-size-20">
                        comment
                      </span>
                      <span className="fw-medium">20 Comment</span>
                    </div>
                    <div className="share-block d-flex align-items-center feather-icon">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#share-btn2"
                        aria-controls="share-btn"
                        className="d-flex align-items-center"
                      >
                        <span className="material-symbols-outlined align-text-top font-size-20">
                          share
                        </span>
                        <span className="ms-1 fw-medium">99 Share</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="collapse mt-4 pt-4 border-top"
                  id="commentcollapes4"
                >
                  <ul className="list-inline m-o p-0 comment-list">
                    <li className="mb-3">
                      <div className="comment-list-block">
                        <div className="d-flex align-items-center gap-3">
                          <div className="comment-list-user-img flex-shrink-0">
                            <img
                              src="{{ asset('/images/gym(3).jpg') }}"
                              alt="userimg"
                              className="avatar-48 rounded-circle img-fluid"
                              loading="lazy"
                            />
                          </div>
                          <div className="comment-list-user-data">
                            <div className="d-inline-flex align-items-center gap-1 flex-wrap">
                              <h6 className="m-0">Bob Frapples</h6>
                              <span className="d-inline-block text-primary">
                                <svg
                                  className="align-text-bottom"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={17}
                                  height={17}
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.2483 0.216553H4.75081C2.13805 0.216553 0.5 2.0665 0.5 4.68444V11.7487C0.5 14.3666 2.13027 16.2166 4.75081 16.2166H12.2475C14.8689 16.2166 16.5 14.3666 16.5 11.7487V4.68444C16.5 2.0665 14.8689 0.216553 12.2483 0.216553Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M5.5 8.21627L7.50056 10.216L11.5 6.21655"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <spna className="fw-medium small text-capitalize">
                                3 min ago
                              </spna>
                            </div>
                          </div>
                        </div>
                        <div className="comment-list-user-comment">
                          <div className="comment-list-comment">
                            "Just stumbled upon this post and it's giving me all
                            the feels! 🙌"
                          </div>
                          <div className="comment-list-action mt-2">
                            <ul className="list-inline m-0 p-0 d-flex align-items-center gap-2">
                              <li>
                                <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
                                  <div className="like-data">
                                    <div className="dropdown">
                                      <span
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        role="button"
                                      >
                                        <span className="material-symbols-outlined align-text-top font-size-18">
                                          thumb_up
                                        </span>
                                        <span className="fw-medium small">
                                          Likes
                                        </span>
                                      </span>
                                      <div className="dropdown-menu py-2 shadow">
                                        <a
                                          className="ms-2 me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Like"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/01.png') }}"
                                            className="img-fluid"
                                            alt="like"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Love"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/02.png') }}"
                                            className="img-fluid"
                                            alt="love"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Happy"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/03.png') }}"
                                            className="img-fluid"
                                            alt="happy"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="HaHa"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/04.png') }}"
                                            className="img-fluid"
                                            alt="haha"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Think"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/05.png') }}"
                                            className="img-fluid"
                                            alt="think"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Sad"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/06.png') }}"
                                            className="img-fluid"
                                            alt="sad"
                                            loading="lazy"
                                          />
                                        </a>
                                        <a
                                          className="me-2"
                                          href="javascript:void(0);"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Lovely"
                                        >
                                          <img
                                            src="{{ asset('/images/icon/07.png') }}"
                                            className="img-fluid"
                                            alt="lovely"
                                            loading="lazy"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <span
                                  className="fw-medium small"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#subcomment-collapse4"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                  Reply
                                </span>
                              </li>
                            </ul>
                            <div
                              className="add-comment-form-block collapse mt-3"
                              id="subcomment-collapse4"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <div className="flex-shrink-0">
                                  <img
                                    src="{{ asset('/images/user/1.jpg') }}"
                                    alt="userimg"
                                    className="avatar-48 rounded-circle img-fluid"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="add-comment-form">
                                  <form>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Write a Comment..."
                                    />
                                    <button
                                      type="submit"
                                      className="btn btn-primary font-size-12 text-capitalize px-5"
                                    >
                                      post
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="add-comment-form-block">
                    <div className="d-flex align-items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src="{{ asset('/images/user/1.jpg') }}"
                          alt="userimg"
                          className="avatar-48 rounded-circle img-fluid"
                          loading="lazy"
                        />
                      </div>
                      <div className="add-comment-form">
                        <form>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write a Comment..."
                          />
                          <button
                            type="submit"
                            className="btn btn-primary font-size-12 text-capitalize px-5"
                          >
                            post
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* status elements */}
    <div id="load-copy-content" className="d-none">
      <div className="col-sm-12 social-post">
        <div className="card card-block card-stretch card-height">
          <div className="card-body">
            <div className="user-post-data">
              <div className="d-flex align-items-center justify-content-between">
                <div className="me-3 flex-shrik-0">
                  <img
                    className="border border-2 rounded-circle user-post-profile"
                    src="{{ asset('/images/bussiness(5).jpg') }}"
                    alt="user-image"
                    loading="lazy"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-0 d-inline-block">Greta Life</h6>
                      <span className="d-inline-block text-primary">
                        <svg
                          className="align-text-bottom"
                          width={17}
                          height={17}
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.8457 0H4.34822C1.73547 0 0.0974121 1.84995 0.0974121 4.46789V11.5321C0.0974121 14.1501 1.72768 16 4.34822 16H11.8449C14.4663 16 16.0974 14.1501 16.0974 11.5321V4.46789C16.0974 1.84995 14.4663 0 11.8457 0Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5.09741 7.99978L7.09797 9.9995L11.0974 6.00006"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="mb-0">12 Hours ago</p>
                    </div>
                    <div className="card-post-toolbar">
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle material-symbols-outlined"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="button"
                        >
                          more_horiz
                        </span>
                        <div className="dropdown-menu m-0 p-0">
                          <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <span className="material-symbols-outlined">
                                save
                              </span>
                              <div className="data ms-2">
                                <h6>Save Post</h6>
                                <p className="mb-0">
                                  Add this to your saved items
                                </p>
                              </div>
                            </div>
                          </a>
                          <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <span className="material-symbols-outlined">
                                cancel
                              </span>
                              <div className="data ms-2">
                                <h6>Hide Post</h6>
                                <p className="mb-0">
                                  See fewer posts like this.
                                </p>
                              </div>
                            </div>
                          </a>
                          <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <span className="material-symbols-outlined">
                                person_remove
                              </span>
                              <div className="data ms-2">
                                <h6>Unfollow User</h6>
                                <p className="mb-0">
                                  Stop seeing posts but stay friends.
                                </p>
                              </div>
                            </div>
                          </a>
                          <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <span className="material-symbols-outlined">
                                notifications
                              </span>
                              <div className="data ms-2">
                                <h6>Notifications</h6>
                                <p className="mb-0">
                                  Turn on notifications for this post
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-post mt-4">
              <div className="text-center">
                <img
                  src="{{ asset('/images/gym.jpg') }}"
                  alt="ads"
                  className="img-fluid"
                />
                <a
                  href="javascript:void(0);"
                  className="btn btn-primary w-100 rounded-top-0"
                >
                  <span className="d-flex align-items-center justify-content-between gap-1">
                    <span>Shop Now</span>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="scroller-status col-sm-12 text-center">
        <div className="infinite-scroll-request loader-ellips">
          <img
            src="{{ asset('/images/page-img/page-load-loader.gif') }}"
            alt="loader"
            style={{ height: 100 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
  {/* </div> */}
  {/* Like Modal */}
  <div
    className="modal fade likemodal"
    id="likemodal"
    tabIndex={-1}
    aria-labelledby="likemodalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <ul
            className="nav nav-tabs liked-tabs"
            id="liked-tabs"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <span
                className="nav-link active"
                id="reaction-tab-1"
                data-bs-toggle="tab"
                data-bs-target="#reaction-tab-all"
                type="button"
                role="tab"
                aria-controls="reaction-tab-all"
                aria-selected="true"
              >
                <span className="align-middle">All</span>
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span
                className="nav-link"
                id="reaction-tab-2"
                data-bs-toggle="tab"
                data-bs-target="#reaction-tab-like"
                type="button"
                role="tab"
                aria-controls="reaction-tab-like"
                aria-selected="false"
              >
                <img
                  src="{{ asset('/images/icon/01.png') }}"
                  className="img-fluid reaction-img"
                  alt="like"
                  loading="lazy"
                />
                <span className="align-middle">2</span>
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span
                className="nav-link"
                id="reaction-tab-3"
                data-bs-toggle="tab"
                data-bs-target="#reaction-tab-love"
                type="button"
                role="tab"
                aria-controls="reaction-tab-love"
                aria-selected="false"
              >
                <img
                  src="{{ asset('/images/icon/02.png') }}"
                  className="img-fluid reaction-img"
                  alt="love"
                  loading="lazy"
                />
                <span className="align-middle">3</span>
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span
                className="nav-link"
                id="reaction-tab-4"
                data-bs-toggle="tab"
                data-bs-target="#reaction-tab-happy"
                type="button"
                role="tab"
                aria-controls="reaction-tab-happy"
                aria-selected="false"
              >
                <img
                  src="{{ asset('/images/icon/03.png') }}"
                  className="img-fluid reaction-img"
                  alt="happy"
                  loading="lazy"
                />
                <span className="align-middle">3</span>
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span
                className="nav-link"
                id="reaction-tab-5"
                data-bs-toggle="tab"
                data-bs-target="#reaction-tab-haha"
                type="button"
                role="tab"
                aria-controls="reaction-tab-haha"
                aria-selected="false"
              >
                <img
                  src="{{ asset('/images/icon/04.png') }}"
                  className="img-fluid reaction-img"
                  alt="haha"
                  loading="lazy"
                />
                <span className="align-middle">1</span>
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div
            className="tab-content liked-tabs-content"
            id="liked-tabs-content"
          >
            <div
              className="tab-pane fade show active"
              id="reaction-tab-all"
              role="tabpanel"
              aria-labelledby="reaction-tab-1"
              tabIndex={0}
            >
              <ul className="list-inline m-0 p-0">
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/01.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Anna Sthesia</h6>
                        <span>@anna</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/01.png') }}"
                        className="img-fluid reaction-img"
                        alt="like"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/02.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Paul Molive</h6>
                        <span>@paul</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/01.png') }}"
                        className="img-fluid reaction-img"
                        alt="like"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/03.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Anna Mull</h6>
                        <span>@annamull</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/04.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Paige Turner</h6>
                        <span>@paige</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/11.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Bob Frapples</h6>
                        <span>@bob</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/12.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Ira Membrit</h6>
                        <span>@ira</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/13.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Bob Frapples</h6>
                        <span>@bob</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/14.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Greta Life</h6>
                        <span>@greta</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src=" {{ asset('/images/user/15.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Pete Sariya</h6>
                        <span>@pete</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/04.png') }}"
                        className="img-fluid reaction-img"
                        alt="haha"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="reaction-tab-like"
              role="tabpanel"
              aria-labelledby="reaction-tab-2"
              tabIndex={0}
            >
              <ul className="list-inline m-0 p-0">
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/01.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Anna Sthesia</h6>
                        <span>@anna</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/01.png') }}"
                        className="img-fluid reaction-img"
                        alt="like"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/02.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Paul Molive</h6>
                        <span>@paul</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/01.png') }}"
                        className="img-fluid reaction-img"
                        alt="like"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="reaction-tab-love"
              role="tabpanel"
              aria-labelledby="reaction-tab-3"
              tabIndex={0}
            >
              <ul className="list-inline m-0 p-0">
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/03.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Anna Mull</h6>
                        <span>@annamull</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/04.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Paige Turner</h6>
                        <span>@paige</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/11.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Bob Frapples</h6>
                        <span>@bob</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/02.png') }}"
                        className="img-fluid reaction-img"
                        alt="love"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="reaction-tab-happy"
              role="tabpanel"
              aria-labelledby="reaction-tab-4"
              tabIndex={0}
            >
              <ul className="list-inline m-0 p-0">
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/12.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Ira Membrit</h6>
                        <span>@ira</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/13.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Bob Frapples</h6>
                        <span>@bob</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/14.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Greta Life</h6>
                        <span>@greta</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/03.png') }}"
                        className="img-fluid reaction-img"
                        alt="happy"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="reaction-tab-haha"
              role="tabpanel"
              aria-labelledby="reaction-tab-5"
              tabIndex={0}
            >
              <ul className="list-inline m-0 p-0">
                <li>
                  <div className="reaction-user-container d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-shrnik-0">
                      <div className="reaction-user-image flex-shrnik-0">
                        <img
                          className="border border-2 rounded-circle avatar-50"
                          src="{{ asset('/images/user/15.jpg') }}"
                          alt="user"
                          loading="lazy"
                        />
                      </div>
                      <div className="reaction-user-meta">
                        <h6 className="mb-0">Pete Sariya</h6>
                        <span>@pete</span>
                      </div>
                    </div>
                    <div className="reaction flex-shrnik-0">
                      <img
                        src="{{ asset('/images/icon/04.png') }}"
                        className="img-fluid reaction-img"
                        alt="haha"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</>

  );
};

export default JobListDetails;
