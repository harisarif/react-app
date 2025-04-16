import React, { useState } from 'react';
import { Modal, Button, Form, Nav, Row, Col, Dropdown, Badge, Image } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';

const Dashboard = () => {
  return (
    <>
      <Card className="bg-transparent border radius-8 subjectContentDashboard">
        <Card.Body className="bg-transparent">
          <p className={`card-content elipsis-4 text-dark`}>The gym is a place to strengthen both body and mind.Consistent workouts build discipline, confidence, and
            endurance. Every drop of sweat brings you one step
            closer to your goals.</p>
          <Button variant="danger" className="btn btn-red d-flex justify-content-center mx-auto mt-3">Reset My Trial</Button>
        </Card.Body>
      </Card>
      <Card className={`border radius-8 subjectContentDashboard`}>
        <Card.Body className={`d-flex flex-column gap-2`}>
          <h5 className='text-dark'>Daily Goals</h5>
          <div className="d-flex align-items-center justify-content-between">
            <Form.Check className="form-check d-flex gap-2 m-0">
              <Form.Check.Input
                type="checkbox"
                className="form-check-input"
              />
              <p className='text-dark elipsis-1'>The gym is a place to strengthen</p>
            </Form.Check>
          </div>
        </Card.Body>
      </Card>
      <Card className={`border-0 radius-8 bg-transparent subjectContentDashboard`}>
        <Card.Body className={`d-flex flex-column gap-2`}>
          <h5 className='text-dark'>Daily Goals</h5>
          <p className={'elipsis-4 text-dark'}>The gym is a place to strengthen both body and mind.Consistent workouts build discipline, confidence, and
            endurance. Every drop of sweat brings you one step
            closer to your goals.</p>
        </Card.Body>
      </Card>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <hr className="flex-grow-1" />
        <span className="mx-3" style={{ fontSize: '12px' }}>Introduction</span>
        <hr className="flex-grow-1" />
      </div>
      <Card className={'subjectContent border subjectContentDashboard'}>
        <Card.Body className={`d-flex flex-column gap-2`}>
          <h5 className='text-dark'>Course Introduction</h5>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <Link to={'/videoDetail'}>
              <Badge bg="success">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                Video
              </Badge>
            </Link>
            <Badge bg="success">
              1 min
            </Badge>
          </div>
        </Card.Body>
      </Card>
      <Card className={'subjectContent border subjectContentDashboard'}>
        <Card.Body className={`d-flex flex-column gap-2`}>
          <h5 className='text-dark'>Course Detail</h5>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <Link to={'#'}>
              <Badge bg="success">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                Reading
              </Badge>
            </Link>
            <Badge bg="success">
              5 min
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

const Education = () => {

  const tabLinks = [
    { key: "dashboard", label: "Dashboard", content: <Dashboard /> },
    { key: "grade", label: "Grade", content: "This is a longer tab content." },
    { key: "form", label: "Form", content: "Here's some content for Link tab." },
    { key: "resource", label: "Resource", content: "This is disabled" },
    { key: "updates", label: "Updates", content: "Test tab is working fine." }
  ];

  const [activeKey, setActiveKey] = useState(tabLinks[0].key);

  const activeTab = tabLinks.find(tab => tab.key === activeKey);

  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <div className="custom-main-container">
          <div id="content">
            <Nav
              justify
              variant="tabs"
              className='bg-transparent'
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              {tabLinks.map((tab, idx) => (
                <Nav.Item key={idx}>
                  <Nav.Link
                    eventKey={tab.key}
                    href={tab.href || "#"}
                    disabled={tab.disabled}
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <div className="mt-4">
              {activeTab?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
