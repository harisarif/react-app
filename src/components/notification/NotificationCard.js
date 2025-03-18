import React, { useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRelativeTime } from '../../utils/dateUtils';
import { getProfileImageUrl } from '../../utils/helpers';
import { getNotificationUrl } from '../../utils/notificationHelpers';

const NotificationCard = ({ notification, onMarkAsarchive, onMarkAsRead, onDelete }) => {
    const navigate = useNavigate();

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'post':
                return 'military_tech';
            case 'like':
                return 'favorite_border';
            case 'comment':
                return 'chat_bubble_outline';
            case 'friend_request':
                return 'reply';
            case 'share':
                return 'share';
            case 'job':
                return 'work';
            case 'birthday':
                return 'cake';
            default:
                return 'notifications';
        }
    };

    const getIconClass = (type) => {
        switch (type) {
            case 'post':
                return 'primary';
            case 'like':
                return 'danger';
            case 'comment':
                return 'success';
            case 'friend_request':
                return 'warning';
            case 'follow':
                return 'warning';
            case 'share':
                return 'warning';
            case 'job':
                return 'info';
            case 'birthday':
                return 'danger';
            default:
                return 'primary';
        }
    };

    const openChatSidebar = () => {
        // Open the chat popup modal
        // const chatModal = document.getElementById('chat-popup-modal');
        // if (chatModal) {
        //     chatModal.classList.add('show');
        // }

        // Get the conversation ID from the notification's foreign_id
        const conversationId = notification.foreign_id;
        
        // Find and trigger the handleStartConversation function
        const startConversationEvent = new CustomEvent('startConversation', {
            detail: {
                conversationId: conversationId,
                user: notification.user
            }
        });
        document.dispatchEvent(startConversationEvent);

        // Mark the notification as read
        if (!notification.is_read) {
            onMarkAsRead(notification.id);
        }
    };

    const handleCardClick = (e) => {
        // Don't navigate if clicking on the action buttons or dropdown
        if (e.target.closest('.notification-actions') || e.target.closest('.dropdown')) {
            return;
        }
        const { notif_type, foreign_id } = notification;
        if(notif_type === "message"){
            openChatSidebar();
        }
        else{
            const url = getNotificationUrl(notification);
            if (url !== '#') {
                if (!notification.is_read) {
                    onMarkAsRead(notification.id);
                }
                navigate(url);
            }
        }
    };

    return (
        <Card 
            className={`mb-3 ${!notification.is_read ? 'bg-light' : ''} cursor-pointer`}
            onClick={handleCardClick}
            style={{ overflow: 'visible' }}
        >
            <Card.Body style={{ overflow: 'visible' }}>
                <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="user-img img-fluid">
                            <img 
                                src={getProfileImageUrl(notification.user)} 
                                alt={notification.user?.name || 'User'} 
                                className="rounded-circle avatar-40" 
                            />
                            <Link 
                                        to="#" 
                                        className={`btn btn-icon btn-${getIconClass(notification.notif_type)}-subtle btn-sm me-3 notification-type-btn`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onMarkAsRead(notification.id);
                                        }}
                                    >
                                        <span className="btn-inner">
                                            <i className="material-symbols-outlined font-size-16">
                                                {getNotificationIcon(notification.notif_type)}
                                            </i>
                                        </span>
                                    </Link>
                        </div>
                        <div className="w-100">
                            <div className="d-flex justify-content-between">
                                <div className="ms-3">
                                    <h6>{notification.content}</h6>
                                    <p className="mb-0">{getRelativeTime(notification.created_at)}</p>
                                </div>
                                <div className="d-flex align-items-center notification-actions">
                                    
                                    <div className="card-header-toolbar d-flex align-items-center">
                                        <Dropdown>
                                            <Dropdown.Toggle 
                                                as="span" 
                                                className="material-symbols-outlined"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                more_horiz
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu 
                                                align="end"
                                                popperConfig={{
                                                    strategy: 'fixed',
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [-20, 5]
                                                            }
                                                        }
                                                    ]
                                                }}
                                                style={{
                                                    minWidth: '150px',
                                                    zIndex: 1050
                                                }}
                                            >
                                                <Dropdown.Item 
                                                    onClick={() => onMarkAsRead(notification.id)}
                                                    className='d-flex align-items-center'
                                                >
                                                    <span className="material-symbols-outlined me-2 md-18">
                                                        {notification.is_read ? 'mark_email_unread' : 'mark_email_read'}
                                                    </span>
                                                    {notification.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                                </Dropdown.Item>
                                                <Dropdown.Item 
                                                    onClick={() => onMarkAsarchive(notification.id)}
                                                    className='d-flex align-items-center'
                                                >
                                                    <span className="material-symbols-outlined me-2 md-18">
                                                        {notification.archive ? 'mark_email_unarchive' : 'mark_email_archive'}
                                                    </span>
                                                    {notification.archive ? 'Mark as Unarchive' : 'Mark as Archive'}
                                                </Dropdown.Item>
                                                <Dropdown.Item 
                                                    onClick={() => onDelete(notification.id)}
                                                    className='d-flex align-items-center text-danger'
                                                >
                                                    <span className="material-symbols-outlined me-2 md-18">
                                                        delete
                                                    </span>
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    );
};

NotificationCard.propTypes = {
    notification: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        notif_type: PropTypes.string.isRequired,
        is_read: PropTypes.bool.isRequired,
        created_at: PropTypes.string.isRequired,
        foreign_id: PropTypes.number,
        user: PropTypes.shape({
            name: PropTypes.string,
            avatar_url: PropTypes.string
        })
    }).isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default NotificationCard;
