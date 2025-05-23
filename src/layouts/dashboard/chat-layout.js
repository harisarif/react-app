import React from 'react'

// react-bootstrap
import { Container, Tab } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'


// import ChatRouter from '../../router/chat-router'

const ChatLayout = () => {
  return (
    <>
      <main className="main-content">
        <Container fluid className="content-inner p-0" id="page_layout">
          {/* <ChatRouter /> */}
          <Tab.Container>

            <Outlet />
          </Tab.Container>
        </Container>
      </main>
    </>
  )
}

export default ChatLayout