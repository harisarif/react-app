import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from './UserContext';
import { notificationService } from '../services/notificationService';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const fetchNotifications = useCallback(async (pageNum = 1, append = false) => {
    if (!userData?.id) return;
    
    try {
      setLoading(true);
      const response = await notificationService.getNotifications(pageNum);
      const { data, current_page, last_page, total_unread } = response;

      setNotifications(prev => append ? [...prev, ...data] : data);
      setHasMore(current_page < last_page);
      setTotalUnread(total_unread);
      setPage(current_page);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchNotifications(page + 1, true);
    }
  }, [page, hasMore, loading, fetchNotifications]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, is_read: !notif.is_read }
            : notif
        )
      );
      setTotalUnread(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      // Update unread count if the deleted notification was unread
      const wasUnread = notifications.find(n => n.id === notificationId)?.is_read === false;
      if (wasUnread) {
        setTotalUnread(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, [notifications]);

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(notification => ({
        ...notification,
        is_read: true
      })));
      setTotalUnread(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (userData?.id) {
      fetchNotifications(1, false);
    }
  }, [userData?.id]);

  // Echo listener
  useEffect(() => {
    if (!userData?.id || !window.Echo) return;

    console.log('Setting up notification listener for user:', userData.id);
    const channel = window.Echo.private(`notifications.${userData.id}`);
    
    channel.listen('.App\\Events\\NewNotification', (data) => {
      console.log('New notification received:', data);
      fetchNotifications(1, false);
    });

    return () => {
      console.log('Cleaning up notification listener');
      channel.stopListening('.App\\Events\\NewNotification');
    };
  }, [userData?.id]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        hasMore,
        totalUnread,
        loadMore,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
