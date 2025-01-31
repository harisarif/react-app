import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from './UserContext';
import axios from '../utils/axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const { userData } = useContext(UserContext);

  const fetchNotifications = useCallback(async () => {
    if (!userData?.id) return;
    
    try {
      const response = await axios.get('/api/notifications');
      console.log('Fetched notifications:', response.data);
      setNotifications(response.data.notifications);
      setTotalUnread(response.data.total_unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [userData?.id]); // Only recreate if user ID changes

  // Initial fetch
  useEffect(() => {
    if (userData?.id) {
      fetchNotifications();
    }
  }, [userData?.id]); // Remove fetchNotifications from deps

  // Echo listener
  useEffect(() => {
    if (!userData?.id || !window.Echo) return;

    console.log('Setting up notification listener for user:', userData.id);
    const channel = window.Echo.private(`notifications.${userData.id}`);
    
    channel.listen('.App\\Events\\NewNotification', (data) => {
      console.log('New notification received:', data);
      setNotification(data);
      fetchNotifications();
    });

    return () => {
      console.log('Cleaning up notification listener');
      channel.stopListening('.App\\Events\\NewNotification');
    };
  }, [userData?.id]); // Remove fetchNotifications from deps

  return (
    <NotificationContext.Provider 
      value={{ 
        notification, 
        setNotification,
        notifications,
        setNotifications,
        totalUnread,
        setTotalUnread,
        fetchNotifications 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
