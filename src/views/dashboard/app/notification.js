import React, { useEffect, useContext } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import NotificationCard from '../../../components/notification/NotificationCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import NoDataFound from '../../../components/NoDataFound'
import { NotificationContext } from '../../../context/NotificationContext'
import Nav from 'react-bootstrap/Nav';
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
const Notification = () => {
   const {
      notifications,
      loading,
      key,
      setKey,
      hasMore,
      loadMore,
      markAsRead,
      markAsarchive,
      markAllAsRead,
      deleteNotification
   } = useContext(NotificationContext);

   useEffect(() => {
      document.body.classList.add('notification')
      return () => {
         document.body.classList.remove("notification");
      };
   }, []);

   const handleMarkAllAsRead = () => {
      if (window.confirm('Are you sure you want to mark all notifications as read?')) {
         markAllAsRead();
      }
   };


   return (
      <>
         <div className="notification-page">
            <div className="d-flex justify-content-between align-items-center mb-3"> 
            <h4 className="card-title mb-0">Notifications</h4>
            {notifications.length > 0 && (
                        <Button
                           variant="outline-primary"
                           onClick={handleMarkAllAsRead}
                           className="ms-2"
                        >
                           Mark All as Read
                        </Button>
                     )}
            </div>
      
            <Tabs
               id="controlled-tabs"
               activeKey={key}
               onSelect={(k) => setKey(k)}
               className="mb-3"
            >
               <Tab eventKey="all"  title="All" onClick={() => setKey('all')}>
                  <div id='content-page' className='content-inner w-100'>
                     <Container className="custom-conatiner">
                        <Row>
                           <Col sm="12" >
                          
                           </Col>
                           <Col sm="12">
                              {loading ? (
                                 <LoadingSpinner />
                              ) : notifications.length === 0 ? (
                                 <NoDataFound
                                    message="You don't have any notifications yet."
                                    containerClassName="text-center py-5"
                                 />
                              ) : (
                                 <>
                                    {notifications.map(notification => (
                                       <NotificationCard
                                          key={notification.id}
                                          notification={notification}
                                          onMarkAsRead={markAsRead}
                                          onMarkAsarchive={markAsarchive}
                                          onDelete={deleteNotification}
                                       />
                                    ))}

                                    {hasMore && (
                                       <div className="text-center mt-3 mb-5">
                                          <Button
                                             variant="primary"
                                             onClick={loadMore}
                                             className="load-more-btn"
                                          >
                                             Load More
                                          </Button>
                                       </div>
                                    )}
                                 </>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </div>
               </Tab>
               <Tab eventKey="following" title="Following" onClick={() => setKey('following')}>
               <div id='content-page' className='content-inner w-100'>
                     <Container className="custom-conatiner">
                        <Row>
                           <Col sm="12" >
                          
                           </Col>
                           <Col sm="12">
                              {loading ? (
                                 <LoadingSpinner />
                              ) : notifications.length === 0 ? (
                                 <NoDataFound
                                    message="You don't have any notifications yet."
                                    containerClassName="text-center py-5"
                                 />
                              ) : (
                                 <>
                                    {notifications.map(notification => (
                                       <NotificationCard
                                          key={notification.id}
                                          notification={notification}
                                          onMarkAsRead={markAsRead}
                                          onDelete={deleteNotification}
                                       />
                                    ))}

                                    {hasMore && (
                                       <div className="text-center mt-3 mb-5">
                                          <Button
                                             variant="primary"
                                             onClick={loadMore}
                                             className="load-more-btn"
                                          >
                                             Load More
                                          </Button>
                                       </div>
                                    )}
                                 </>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </div>
               </Tab>
               <Tab eventKey="archive" title="Archive" onClick={() => setKey('archive')}>
               <div id='content-page' className='content-inner w-100'>
                     <Container className="custom-conatiner">
                        <Row>
                           <Col sm="12" >
                          
                           </Col>
                           <Col sm="12">
                              {loading ? (
                                 <LoadingSpinner />
                              ) : notifications.length === 0 ? (
                                 <NoDataFound
                                    message="You don't have any notifications yet."
                                    containerClassName="text-center py-5"
                                 />
                              ) : (
                                 <>
                                    {notifications.map(notification => (
                                       <NotificationCard
                                          key={notification.id}
                                          notification={notification}
                                          onMarkAsRead={markAsRead}
                                          onDelete={deleteNotification}
                                       />
                                    ))}

                                    {hasMore && (
                                       <div className="text-center mt-3 mb-5">
                                          <Button
                                             variant="primary"
                                             onClick={loadMore}
                                             className="load-more-btn"
                                          >
                                             Load More
                                          </Button>
                                       </div>
                                    )}
                                 </>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </div>
               </Tab>
            </Tabs>
            
         </div>


        
      </>
   )
}

export default Notification