import React, { useContext, useEffect, useState, useCallback } from "react";
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
import NoDataFound from '../../../components/NoDataFound';

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

const UserFeeds = () => {
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

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadContent, setLoadContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (pageNumber) => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts?page=${pageNumber}&category=2`);
      console.log('Fetched posts:', response.data);
      
      if (pageNumber === 1) {
        setPosts(response.data.data);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data.data]);
      }
      
      setHasMore(response.data.has_more);
      setLoadContent(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoadContent(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHasMore(false);
    setIsLoading(false);
    fetchPosts(1);
  }, []);

  // Function to check if user has scrolled near the end
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      if (hasMore && !isLoading) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchPosts(nextPage);
          return nextPage;
        });
      }
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
    document.body.classList.add("profile-page");
    return () => {
      document.body.classList.remove("profile-page");
    };
  });

  const handleNewPost = () => {
    setHasMore(false);
    setIsLoading(false);
    fetchPosts(1);
  };

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

        <Container>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col lg={12}>
              
            {(userData && userData?.roles === "admin" &&
                <Row>
                  <Col sm={12}>
                    <CreatePost 
                      className="card-block card-stretch card-height"
                      setPosts={setPosts} posts={posts}
                    />
                  </Col>
                </Row>
                  )}

              <Row className="special-post-container">
                {loadContent ? (
                  <div className="col-sm-12 text-center">
                    <img src={loader} alt="loader" style={{ height: "100px" }} />
                  </div>
                ) : posts.length === 0 ? (
                  <Col sm={12}>
                    <NoDataFound 
                      message="No mindset posts available. Share your thoughts to get started!"
                      containerClassName="text-center py-5"
                    />
                  </Col>
                ) : (
                  posts.map((post) => (
                    <Col sm={12} key={post.id} className="special-post">
                      <Post post={post} setPosts={setPosts} posts={posts} />
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </div>
  </>);
};

export default UserFeeds;
