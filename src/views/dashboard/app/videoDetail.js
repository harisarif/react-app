import React, { useState } from 'react';
import { Modal, Button, Form, Nav, Row, Col, Dropdown, Badge, Image } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import NoDataFound from '../../../components/NoDataFound';
import ReactPlayer from 'react-player'
import { Captions } from 'lucide-react';


const Transcript = ({transcript})=>{
  return (
    <>
      {transcript.map((data) => (
        <div key={data.time} className="d-flex flex-row gap-3 align-items-start mb-3 transcriptArea">
          <p className="timeStream text-dark mb-0">
            {data.time}
          </p>
          <p className="transcript text-dark mb-0">
            {data.text}
          </p>
        </div>
      ))}
    </>
  );
} 


const Education = () => {

  const transcript = [
    {
      time: "0:00",
      text: "Let's take a closer look at what drives value for a business, and more specifically, what can create a larger terminal value for a company. Let's dissect each of the components of the formula. Free cash flow is essentially a function of a company's overall business strategy and execution of that strategy, which generates revenue and when taken into account with a cost structure and asset utilization rate, finally derives cash flow."
    },
    {
      time: "0:27",
      text: "So to the extent a company has a better strategy, more revenue, lower costs and better use of assets, it creates more cash flow, which creates more value. Let's look at growth. When we look at growth, we're talking about organic growth that the business can generate itself and ultimately what's sustainable over the long term."
    },
    {
      time: "0:49",
      text: "On the denominator when we look at cost of capital, we're essentially saying, what is the risk? Or how much do you have to be compensated to make this investment? As well as looking at the current capital structure of the company and global macroeconomic factors as well."
    },
    {
      time: "1:05",
      text: "And then on the other side of the denominator, of course,"
    }
  ];

  const Video = [
    {
      url: 'https://www.youtube.com/watch?v=c_nWKu7jDt8&ab_channel=Grammarly',
      title: 'Unlocking the drivers of values',
      thumbnail: '',
      Captions: `Let's take a closer look at what drives value for a business, and more specifically, what can create a larger terminal value for a company. Let's dissect each of the components of the formula. Free cash flow is essentially a function of a company's overall business strategy and execution of that strategy, which generates revenue and when taken into account with a cost structure and asset utilization rate, finally derives cash flow.`,
      script: transcript
    }
  ]

  const tabLinks = [
    { key: "transcript", label: "Transcript", content: <Transcript transcript={transcript}/> },
    { key: "notes", label: "Notes", content: 'Notes: This Content Available Soon!' },
    { key: "summary", label: "Summary", content: 'Summary: This Content Available Soon!' },
    { key: "attachments", label: "Attachments", content: 'Attachments: This Content Available Soon!' },
  ];

  const [activeKey, setActiveKey] = useState(tabLinks[0].key);

  const activeTab = tabLinks.find(tab => tab.key === activeKey);

  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <div className="custom-main-container">
          <div id="content">

            {
              Video.map((video, index) => (
                <>
                  <div key={index} className='player-wrapper mb-3 radius-10 overflow-hidden'>
                    <ReactPlayer
                      className='react-player'
                      url={video.url}
                      width='100%'
                      height='100%'
                      controls={true}
                    />
                  </div>
                  <div className='d-flex flex-column gap-2 videoCaption'>
                    <h4>{video.title}</h4>
                    <p className={'mb-0 text-dark elipsis-3'}>{video.Captions}</p>
                  </div>
                  <Nav
                    justify
                    variant="tabs"
                    className='bg-transparent mt-5 border radius-10 overflow-hidden videoNav'
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
                </>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
