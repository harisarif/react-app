import React, { useContext, useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useParams } from 'react-router-dom';
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
  Button,
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
import { getProfileImageUrl, getBackgroundProfileImageUrl } from '../../../utils/helpers';

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

import gallery1 from "../../../assets/images/gallery/1.jpg";
import gallery2 from "../../../assets/images/gallery/2.jpg";
import gallery3 from "../../../assets/images/gallery/3.jpg";
import gallery4 from "../../../assets/images/gallery/4.jpg";
import gallery5 from "../../../assets/images/gallery/5.jpg";
import gallery6 from "../../../assets/images/gallery/6.jpg";
import gallery7 from "../../../assets/images/gallery/7.jpg";
import gallery8 from "../../../assets/images/gallery/8.jpg";
import gallery9 from "../../../assets/images/gallery/9.jpg";
import gallery10 from "../../../assets/images/gallery/10.jpg";

import profileEvent from '../../../assets/images/ProfileEvent.jpg'



// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;


const Timeline = ({ userData, posts, loadContent, id }) => {
  return (
    <>
      {userData && !id && Object.keys(userData).length > 0 && (
        <CreatePost className="card-block card-stretch card-height" />
      )}
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
    </>
  );
};

const About = ({ profileData, linkData }) => {

  const BasicInfo = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <h4 className='text-dark'>Personal Info</h4>
            <hr />
            <div className="table-responsive">
              <table className="table profile-table aboutProfileCard">
                <tbody>
                  {profileData?.about && Object.entries(profileData.about).map(([key, value]) => (
                    value && (
                      <tr key={key} className='p-0'>
                        <td className='px-0'><h6 className='text-dark'>{key.replace('_', ' ').toUpperCase()}:</h6></td>
                        <td className='px-0'><p className="mb-0 text-end">{value}</p></td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
        <Card className='radius-12 border'>
          <Card.Body>
            <h4 className='text-dark'>
              Websites and Social Links
            </h4>
            <hr />
            <div className="table-responsive">
              <table className="table profile-table aboutProfileCard">
                <tbody>
                  {linkData.map((item, index) => {
                    return (
                      <tr key={index} className='p-0'>
                        <td className='px-0'><h6 className='text-dark'>{item.title}</h6></td>
                        <td className='px-0'><p className="mb-0 text-end">{item.data}</p></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const Hobies = () => {
    return (
      <>
        <Card className='radius-12 border'>
          <Card.Body>
            <h4 className="text-dark">Hobbies and Interests</h4>
            <hr />
            <h6 className="mb-1 text-dark">Hobbies:</h6>
            <p className='line-height-1-5'>
              Hi, I’m Bni, I’m 26 and I work as a Web
              Designer for the iqonicdesign.I like to ride
              the bike to work, swimming, and working out. I
              also like reading design magazines, go to
              museums, and binge watching a good tv show
              while it’s raining outside.
            </p>
            <h6 className="mt-2 mb-1 text-dark">
              Favourite TV Shows:
            </h6>
            <p className='line-height-1-5'>
              Breaking Good, RedDevil, People of Interest,
              The Running Dead, Found, American Guy.
            </p>
            <h6 className="mt-2 mb-1 text-dark">Favourite Movies:</h6>
            <p className='line-height-1-5'>
              Idiocratic, The Scarred Wizard and the Fire
              Crown, Crime Squad, Ferrum Man.
            </p>
            <h6 className="mt-2 mb-1 text-dark">Favourite Games:</h6>
            <p className='line-height-1-5'>
              The First of Us, Assassin’s Squad, Dark
              Assylum, NMAK16, Last Cause 4, Grand Snatch
              Auto.
            </p>
            <h6 className="mt-2 mb-1 text-dark">
              Favourite Music Bands / Artists:
            </h6>
            <p className='line-height-1-5'>
              Iron Maid, DC/AC, Megablow, The Ill, Kung
              Fighters, System of a Revenge.
            </p>
            <h6 className="mt-2 mb-1 text-dark">Favourite Books:</h6>
            <p className='line-height-1-5'>
              The Crime of the Century, Egiptian Mythology
              101, The Scarred Wizard, Lord of the Wings,
              Amongst Gods, The Oracle, A Tale of Air and
              Water.
            </p>
            <h6 className="mt-2 mb-1 text-dark">
              Favourite Writers:
            </h6>
            <p className='line-height-1-5'>
              Martin T. Georgeston, Jhonathan R. Token,
              Ivana Rowle, Alexandria Platt, Marcus Roth.
            </p>
          </Card.Body>
        </Card>
      </>
    );
  }

  const Family = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">Family Members</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add Family Members</Link>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div><div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">Relationship</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add your relationship status</Link>
            </div>
            {false && (
              <>
                <hr />
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div><div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }

  const Work = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">Professional Skills</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add Professional Skills</Link>
            </div>
            {false && (
              <>
                <hr />
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div><div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      <img
                        loading="lazy"
                        src={user01}
                        alt="story1"
                        className="rounded-circle avatar-50"
                      />
                      <div className="d-flex flex-column gap-0">
                        <h6 className='text-dark mb-0'>Paul Molive</h6>
                        <p className="mb-0">Brother</p>
                      </div>
                    </div>
                    <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
                  </div>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">Work</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add Work Places</Link>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div><div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">College</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add College</Link>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const Place = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4 className="text-dark">Other Places Lived</h4>
              <Link to='#' className='border-0 color-purpule'>+ Add Places</Link>
            </div>
          </Card.Body>
        </Card>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-start gap-3 align-items-center">
                  <img
                    loading="lazy"
                    src={user01}
                    alt="story1"
                    className="rounded-circle avatar-50"
                  />
                  <div className="d-flex flex-column gap-0">
                    <h6 className='text-dark mb-0'>Paul Molive</h6>
                    <p className="mb-0">Brother</p>
                  </div>
                </div>
                <Button variant='secondary' className='text-center px-3 py-1 bg-white text-dark border radius-8'>Edit</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const tabs = [
    { key: 'ContactandBasicInfo', label: 'Contact and Basic Info', content: <BasicInfo /> },
    { key: 'HobbiesandInterests', label: 'Hobbies and Interests', content: <Hobies /> },
    { key: 'FamilyandRelationship', label: 'Family and Relationship', content: <Family /> },
    { key: 'WorkandEducation', label: 'Work and Education', content: <Work /> },
    { key: `PlacesYouLived`, label: `Places You've Lived`, content: <Place /> },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  return (
    <>
      <Row className='g-3'>
        <Col md={12}>
          <Card className='radius-12 border nav-sticky-100 '>
            <Card.Body>
              <Nav
                variant="pills"
                className="flex-column m-0 gap-2"
                activeKey={activeKey}
                onSelect={(selectedKey) => setActiveKey(selectedKey)}
              >
                {tabs.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key} className='AboutProfileTab'>{tab.label}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          {tabs.find(tab => tab.key === activeKey)?.content}
        </Col >
      </Row >
    </>
  );
}

const Friends = () => {

  const friends = [
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
  ]

  const friend2 = [
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
  ]

  const friend3 = [
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
  ]

  const friend4 = [
    { img: user01, name: 'Paul Molive', friends: '15 Friends' },
    { img: user01, name: 'Umar', friends: '15 Friends' },
    { img: user01, name: 'Haseeb', friends: '15 Friends' },
    { img: user01, name: 'Hassan', friends: '15 Friends' },
  ]

  const AllFriends = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {friends.map((friend, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center">
                    <img
                      loading="lazy"
                      src={friend.img}
                      alt="story1"
                      className="rounded-circle avatar-50"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className='text-dark mb-0'>{friend.name}</h6>
                      <p className="mb-0">{friend.friends}</p>
                    </div>
                  </div>
                  <Button variant='secondary' className='text-center px-3 py-1 btn-gray-2 text-dark border radius-8'>Friend</Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const RecentlyAdded = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {friend4.map((friend, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center">
                    <img
                      loading="lazy"
                      src={friend.img}
                      alt="story1"
                      className="rounded-circle avatar-50"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className='text-dark mb-0'>{friend.name}</h6>
                      <p className="mb-0">{friend.friends}</p>
                    </div>
                  </div>
                  <Button variant='secondary' className='text-center px-3 py-1 btn-gray-2 text-dark border radius-8'>Friend</Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const CloseFriends = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {friend2.map((friend, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center">
                    <img
                      loading="lazy"
                      src={friend.img}
                      alt="story1"
                      className="rounded-circle avatar-50"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className='text-dark mb-0'>{friend.name}</h6>
                      <p className="mb-0">{friend.friends}</p>
                    </div>
                  </div>
                  <Button variant='secondary' className='text-center px-3 py-1 btn-gray-2 text-dark border radius-8'>Friend</Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const Home = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {friend4.map((friend, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center">
                    <img
                      loading="lazy"
                      src={friend.img}
                      alt="story1"
                      className="rounded-circle avatar-50"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className='text-dark mb-0'>{friend.name}</h6>
                      <p className="mb-0">{friend.friends}</p>
                    </div>
                  </div>
                  <Button variant='secondary' className='text-center px-3 py-1 btn-gray-2 text-dark border radius-8'>Friend</Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const Following = () => {
    return (
      <>
        <Card className='radius-12 border mb-3'>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {friends.map((friend, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center">
                    <img
                      loading="lazy"
                      src={friend.img}
                      alt="story1"
                      className="rounded-circle avatar-50"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className='text-dark mb-0'>{friend.name}</h6>
                      <p className="mb-0">{friend.friends}</p>
                    </div>
                  </div>
                  <Button variant='secondary' className='text-center px-3 py-1 btn-gray-2 text-dark border radius-8'>Friend</Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }

  const tabs = [
    { key: 'allfriends', label: 'All Friends', content: <AllFriends /> },
    { key: 'recentlyadded', label: 'Recently Added', content: <RecentlyAdded /> },
    { key: 'closefriends', label: 'Close Friends', content: <CloseFriends /> },
    { key: 'home', label: 'Home/Town', content: <Home /> },
    { key: `following`, label: `Following`, content: <Following /> },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  return (
    <>
      <Row className='g-3'>
        <Col md={12}>
          <Card className='radius-12 border nav-sticky-100 friend-select-list'>
            <Card.Body>
              <Nav
                variant="pills"
                className="flex-column m-0 gap-2"
                activeKey={activeKey}
                onSelect={(selectedKey) => setActiveKey(selectedKey)}
              >
                {tabs.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key} className='AboutProfileTab'>{tab.label}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          {tabs.find(tab => tab.key === activeKey)?.content}
        </Col >
      </Row >
    </>
  );
}

const Photos = () => {

  const photosArray = [
    { image: gallery1, alt: 'Gallery Image' },
    { image: gallery2, alt: 'Gallery Image' },
    { image: gallery3, alt: 'Gallery Image' },
    { image: gallery4, alt: 'Gallery Image' },
    { image: gallery5, alt: 'Gallery Image' },
    { image: gallery6, alt: 'Gallery Image' },
    { image: gallery7, alt: 'Gallery Image' },
    { image: gallery8, alt: 'Gallery Image' },
    { image: gallery9, alt: 'Gallery Image' },
    { image: gallery10, alt: 'Gallery Image' },
  ]

  const photosArray2 = [
    { image: gallery1, alt: 'Gallery Image' },
    { image: gallery6, alt: 'Gallery Image' },
    { image: gallery7, alt: 'Gallery Image' },
    { image: gallery8, alt: 'Gallery Image' },
    { image: gallery9, alt: 'Gallery Image' },
    { image: gallery10, alt: 'Gallery Image' },
  ]

  const PhotosOfYou = () => {
    return (
      <>
        <Row className="g-3">
          {photosArray.map((photo, index) => {
            return (
              <Col md={4} key={index}>
                <div className="w-100 border radius-12 p-0 profile-gallery-image">
                  <img src={photo.image} alt={photo.alt} className='w-100 radius-8 object-fit-cover' />
                </div>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }

  const YourPhotos = () => {
    return (
      <>
        <Row className="g-3">
          {photosArray2.map((photo, index) => {
            return (
              <Col md={4} key={index}>
                <div className="w-100 border radius-12 p-0 profile-gallery-image">
                  <img src={photo.image} alt={photo.alt} className='w-100 radius-8 object-fit-cover' />
                </div>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }

  const tabs = [
    { key: 'photos', label: 'Photo of You', content: <PhotosOfYou /> },
    { key: 'yourphotos', label: 'Your Photos', content: <YourPhotos /> },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  return (
    <>
      <Card className='radius-12 border mb-3'>
        <Card.Body>
          <h4 className='text-dark'>Photos</h4>
          <hr />
          <Nav
            variant="pills"
            className="flex-row m-0 gap-4 mt-n2 mb-3"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          {tabs.find(tab => tab.key === activeKey)?.content}
        </Card.Body>
      </Card>
    </>
  );
}

const LifeEvents = () => {
  return (
    <>
      <Card className='create-education-card'>
        <Card.Body className='d-flex justify-content-between align-items-center w-100'>
          <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Event Calendar</h2>
          <Button className='py-0 btn-purpule' variant="primary" style={{ fontWeight: '400' }}>
            Add New Event
          </Button>
        </Card.Body>
      </Card>
      <Card className="border radius-12">
        <Card.Body>
          <div className="media-grid position-relative">
            <div className="media-item">
              <img
                src={profileEvent}
                alt="Media 1"
                className="w-100"
                style={{aspectRatio: '16/9'}}
              />
            </div>
            <span className="bg-white text-dark px-3 py-1 rounded-pill position-absolute" style={{ top: "12px", left: "12px" }}>
              Public
            </span>
          </div>
          <div className="d-flex flex-column gap-2 mt-3">
            <span className="bg-gray-2 text-dark px-3 py-0 rounded-pill" style={{maxWidth: 'fit-content'}}>
              Confidance
            </span>
            <h4 className='m-0 text-dark'>Tech Innovation Meetup</h4>
            <p className='mb-2 text-dark'>Exploring the Future of AI and Blockchain</p>
            <div className="d-flex justify-content-start gap-2 align-items-center">
              <Button variant="primary" className='btn-purpule py-2 px-3 radius-8'>
                View Details
              </Button>
              <Button variant="danger" className='btn-red py-2 px-3 radius-8'>
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

const UserProfile = () => {
  const { id } = useParams();
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

        if (id) {
          const [profileRes, statsRes] = await Promise.all([
            axios.get(`/api/user-profile/${id}`),
            axios.get(`/api/user-stats/${id}`)
          ]);
          console.log('Profile Response:', profileRes.data);
          console.log('Stats Response:', statsRes.data);

          setProfileData(profileRes.data);
          setUserStats(statsRes.data);
        }
        else {
          const [profileRes, statsRes] = await Promise.all([
            axios.get('/api/user-profile'),
            axios.get('/api/user-stats')
          ]);
          console.log('Profile Response:', profileRes.data);
          console.log('Stats Response:', statsRes.data);

          setProfileData(profileRes.data);
          setUserStats(statsRes.data);
        }


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
        if (id) {
          const response = await axios.get(`/api/user_posts/${id}`);
          console.log('Fetched posts:', response.data.data); // Log the response
          setPosts(response.data.data);
          setLoadContent(false);
        }
        else {
          const response = await axios.get('/api/user_posts');
          console.log('Fetched posts:', response.data.data); // Log the response
          setPosts(response.data.data);
          setLoadContent(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoadContent(false);
      }
    };
    fetchPosts();
  }, []);

  const tabs = [
    { key: 'timeline', label: 'TimeLine', content: <Timeline userData={userData} posts={posts} loadContent={loadContent} id={id} /> },
    { key: 'about', label: 'About', content: <About profileData={profileData} linkData={linkData} /> },
    { key: 'friends', label: 'Friends', content: <Friends /> },
    { key: 'photos', label: 'Photos', content: <Photos imageOnSlide={imageOnSlide} /> },
    { key: 'lifeevents', label: 'Life Events', content: <LifeEvents /> },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  return (
    <>
      <style>{`
        .suggestions-div {
          display: none;
        }
      `}</style>
      <div id="content-page" className="content-inner m-0">
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

        <Card className='border radius-12 profile-main-card'>
          <img src={getBackgroundProfileImageUrl(userData)} class="card-img-top" alt="..." />
          <Card.Body className='px-4'>
            <div className="d-flex justify-content-start align-items-start gap-2">
              <img
                src={getProfileImageUrl(profileData?.user)}
                alt="user"
                className="avatar-80 border border-4 border-white rounded-circle flex-shrink-0"
              />
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column gap-1">
                  <h2 className='text-dark'>{profileData?.user?.name}</h2>
                  <h4 className='text-dark'>admin@gmail.com</h4>
                </div>
                <div className="profile-content">
                  <h4 className='text-dark fw-bold'>14</h4><p className='fw-light'>Posts</p>{'  |  '}
                  <h4 className='text-dark fw-bold'>12</h4><p className='fw-light'>Comments</p>{'  |  '}
                  <h4 className='text-dark fw-bold'>6</h4><p className='fw-light'>Likes</p>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Body className='profile-div-footer border-top'>
            <Nav
              variant="pills"
              className="flex-row m-0 gap-4"
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              {tabs.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Body>
        </Card>

        <div className='custom-container'>
          {tabs.find(tab => tab.key === activeKey)?.content}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
