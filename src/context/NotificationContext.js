import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData?.id || !window.Echo) return;

    console.log('Setting up notification listener for user:', userData.id);
    const channel = window.Echo.private(`notifications.${userData.id}`);
    
    channel.listen('.App\\Events\\NewNotification', (data) => {
      console.log('New notification received:', data);
      setNotification(data);
    });

    return () => {
      console.log('Cleaning up notification listener');
      channel.stopListening('.App\\Events\\NewNotification');
    };
  }, [userData?.id]); // Only re-run if user ID changes

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
