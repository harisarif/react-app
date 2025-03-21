import React from 'react'
import {Container, Row, Col, Card, Toast, ToastContainer} from 'react-bootstrap'

const UiNotifications = () => {
    return (
        <>
            <div id='content-page' className='content-inner'>
            <Container className="custom-conatiner">
                <Row>
                    <Col sm="12">
                        <Card className="position-relative inner-page-bg bg-primary" style={{height: "150px"}}>
                            <div className="inner-page-title">
                                <h3 className="text-white">Notification Page</h3>
                                <p className="text-white">lorem ipsum</p>
                            </div>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Notifications</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className='pt-0'>
                            <p>Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button.</p>
                                <Toast className="fade show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                           <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                              <rect width="100%" height="100%" fill="#007aff"></rect>
                           </svg>
                           <strong className="me-auto">Bootstrap</strong>
                           <small>11 mins ago</small>
                           <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                           </button>
                        </div>
                                    <Toast.Body>
                                        Hello, world! This is a toast message.
                                    </Toast.Body>
                                </Toast>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Stacking</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className='pt-0'>
                                <p>When you have multiple toasts, we default to vertically stacking them in a readable manner.</p>
                                    <Toast className="fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                                     <div className="toast-header">
                                         <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                         <rect width="100%" height="100%" fill="#007aff"></rect>
                                        </svg>
                                           <strong className="me-auto">Bootstrap</strong>
                                            <small className="text-muted">just now</small>
                                     <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                           
                                       </button>
                                    </div>
                                        <div className="toast-body">
                                            See? Just like this.
                                        </div>
                                    </Toast>
                                    <Toast className="fade show" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div className="toast-header">
                                        <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                            <rect width="100%" height="100%" fill="#007aff"></rect>
                                        </svg>
                                            <strong className="me-auto">Bootstrap</strong>
                                            <small className="text-muted">2 seconds ago</small>
                                    <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                           
                                   </button>
                                    </div>
                                        <div className="toast-body">
                                            Heads up, toasts will stack automatically
                                        </div>      
                                    </Toast>
                                
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Notifications horizontally and/or vertically </h4>
                                </div>
                            </Card.Header>
                            <div className="card-body pt-0">
                     <p>You can also get fancy with flexbox utilities to align toasts horizontally and/or vertically.</p>
                     <div className="p-3 bg-dark">
                        
                        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                           <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                 <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                    <rect width="100%" height="100%" fill="#007aff"></rect>
                                 </svg>
                                 <strong className="me-auto">Bootstrap</strong>
                                 <small>11 mins ago</small>
                                 <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                                 
                                 </button>
                              </div>
                              <div className="toast-body">
                                 Hello, world! This is a toast message.
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card>
                            <Card.Header className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Notifications</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className='pt-0'>
                                <p>Toasts are slightly translucent, too, so they blend over whatever they might appear over. For browsers that support the <code>backdrop-filter</code> CSS property, we’ll also attempt to blur the elements under a toast.</p>
                                    <div className='p-3 bg-dark'>
                                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                           <div className="toast-header">
                              <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                 <rect width="100%" height="100%" fill="#007aff"></rect>
                              </svg>
                              <strong className="me-auto">Bootstrap</strong>
                              <small>11 mins ago</small>
                              <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                              </button>
                           </div>
                           <div className="toast-body">
                              Hello, world! This is a toast message.
                           </div>
                        </div>
                        </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Stacking Placement</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className='pt-0'>
                            <p>Place toasts with custom CSS as you need them. 
                                The top right is often used for notifications, as is the top middle.
                                 If you’re only ever going to show one toast at a time, 
                                 put the positioning styles right on the <code>.toast</code>.</p>
                                 <div className="bg-dark p-3">
                        <div aria-live="polite" aria-atomic="true" style={{ position: "relative", minHeight: "200px" }}>
                           <div className="toast fade show" style={{ position: "absolute", top: 0, right: 0 }}>
                              <div className="toast-header">
                                 <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                    <rect width="100%" height="100%" fill="#007aff"></rect>
                                 </svg>
                                 <strong className="me-auto">Bootstrap</strong>
                                 <small>11 mins ago</small>
                                 <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                                 </button>
                              </div>
                              <div className="toast-body">
                                 Hello, world! This is a toast message.
                              </div>
                           </div>
                        </div>
                     </div>
                                <p className="mt-3">For systems that generate more notifications, consider using a wrapping element so they can easily stack.</p>
                                <div className="bg-dark p-3 mt-3">
                        <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: '200px' }}>
                           
                           <div style={{ position: 'absolute', top: 0, right: 0 }}>
                           
                              <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                                 <div className="toast-header">
                                    <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                       <rect width="100%" height="100%" fill="#007aff"></rect>
                                    </svg>
                                    <strong className="me-auto">Bootstrap</strong>
                                    <small className="text-muted">just now</small>
                                    <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                                    </button>
                                 </div>
                                 <div className="toast-body">
                                    See? Just like this.
                                 </div>
                              </div>
                              <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                                 <div className="toast-header">
                                    <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                       <rect width="100%" height="100%" fill="#007aff"></rect>
                                    </svg>
                                    <strong className="me-auto">Bootstrap</strong>
                                    <small className="text-muted">2 seconds ago</small>
                                    <button type="button" className="ms-2 mb-1 btn-close" data-dismiss="toast" aria-label="Close">
                                    
                                    </button>
                                 </div>
                                 <div className="toast-body">
                                    Heads up, toasts will stack automatically
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Notifications</h4>
                                </div>
                            </Card.Header>
                            <div className="card-body pt-0">
                     <p>Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button.</p>
                     <div className="toast fade show bg-primary text-white border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-primary text-white">
                           <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                              <rect width="100%" height="100%" fill="#fff"></rect>
                           </svg>
                           <strong className="me-auto text-white">Bootstrap</strong>
                           <small>11 mins ago</small>
                           <button type="button" className="ms-2 mb-1 btn-close btn-close-white text-white" data-dismiss="toast" aria-label="Close">
                           </button>
                        </div>
                        <div className="toast-body">
                           Hello, world! This is a toast message.
                        </div>
                     </div>
                     <div className="toast fade show bg-success text-white border-0 mt-3" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-success text-white">
                           <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                              <rect width="100%" height="100%" fill="#fff"></rect>
                           </svg>
                           <strong className="me-auto text-white">Bootstrap</strong>
                           <small>11 mins ago</small>
                           <button type="button" className="ms-2 mb-1 btn-close btn-close-white text-white" data-dismiss="toast" aria-label="Close">
                           </button>
                        </div>
                        <div className="toast-body">
                           Hello, world! This is a toast message.
                        </div>
                     </div>
                  </div>
                        </Card>
                    </Col>
                </Row>
                </Container>
                </div>
        </>
    )
}

export default UiNotifications