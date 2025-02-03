import React, { useEffect, useContext } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import NotificationCard from '../../../components/notification/NotificationCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import NoDataFound from '../../../components/NoDataFound'
import { NotificationContext } from '../../../context/NotificationContext'

const Notification = () => {
   const {
      notifications,
      loading,
      hasMore,
      loadMore,
      markAsRead,
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
      <div id='content-page' className='content-inner'>
         <Container>
            <Row>
               <Col sm="12" className="d-flex justify-content-between align-items-center mb-3">
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
   )
}

export default Notification