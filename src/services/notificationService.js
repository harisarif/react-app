import axios from '../utils/axios';

const API_URL = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:8000';

export const notificationService = {
    getNotifications: async ( page = 1,key="all", isRead = null) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('key', key);
        if (isRead !== null) {
            params.append('is_read', isRead);
        }
        
        const response = await axios.get(`${API_URL}/api/get-notifications?${params.toString()}`);
        return response.data;
    },

    markAsRead: async (notificationId) => {
        const response = await axios.patch(`${API_URL}/api/notifications/${notificationId}/read`);
        return response.data;
    },

    sendtoarchive: async (notificationId) => {
        const response = await axios.patch(`${API_URL}/api/notifications/${notificationId}/sendtoarchive`);
        return response.data;
    },

    deleteNotification: async (notificationId) => {
        const response = await axios.delete(`${API_URL}/api/notifications/${notificationId}`);
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await axios.post(`${API_URL}/api/notifications/mark-all-as-read`);
        return response.data;
    }
};
