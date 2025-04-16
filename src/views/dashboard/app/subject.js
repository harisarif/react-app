import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Badge, Image } from "react-bootstrap";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';

const Education = () => {

  const [search, setSearch] = useState('');

  const sampleCategory = [
    { img: 'Concept_152-02.png', caption: 'Commercial Gym', seat: '1', duration: '17-5-2005 - 29-7-2025' },
    { img: 'education-6-app.png', caption: 'CrossFit Boxes', seat: '5', duration: '25-5-2005 - 25-7-2025' },
    { img: 'HD_M148_010.jpg', caption: 'Powerlifting Gyms', seat: '3', duration: '28-5-2005 - 11-7-2025' },
    { img: 'sport_1.jpg', caption: 'Bodybuilding Gyms', seat: '1', duration: '19-5-2005 - 25-9-2025' },
    { img: 'THG_M294_09.jpg', caption: 'Home Gyms', seat: '2', duration: '25-5-2005 - 25-7-2025' },
    { img: 'TV_M186_06.jpg', caption: 'Combat Gyms', seat: '3', duration: '25-5-2005 - 25-7-2025' },
    { img: 'VNU_M551_11.jpg', caption: 'Sports Performance', seat: '3', duration: '25-5-2005 - 25-7-2025' },
    { img: 'gym.png', caption: 'Fitness Clubs', seat: '4', duration: '25-5-2005 - 25-7-2025' },
  ]


  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <div className="custom-main-container">
          <div id="content">
            <Card className='create-education-card'>
              <Card.Body className='d-flex justify-content-center align-items-center w-100'>
                <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Education</h2>
              </Card.Body>
            </Card>

            <Row className="g-3 mb-3">
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Search by caption..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-100 radius-8"
                />
              </Col>
              {sampleCategory.filter(sub =>sub.caption.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                sampleCategory
                  .filter(sub => sub.caption.toLowerCase().includes(search.toLowerCase()))
                  .map((sub, id) => {
                    return (
                      <Col key={id} md={4} sm={6}>
                        <Link to="/subjectDetail">
                          <Card className="education-subject-card border">
                            <Card.Body className='img-div'>
                              <Image src={`./Sample/gym/${sub.img}`} className='w-100 transition-transform duration-300 hover:scale-110' alt={sub.caption} />
                              <div className='caption'>{sub.caption}</div>
                            </Card.Body>
                            <Card.Body className='d-flex flex-column caption-area'>
                                <h4 className='text-dark'>Avaiable Seats: {sub.seat}</h4>
                                <p className='text-dark mb-0'>
                                  Duration: {sub.duration}
                                </p>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                      );
                  })
              ) : (
                <NoDataFound
                  message="No Content Available!"
                  containerClassName="text-center py-5 col-12"
                />
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
