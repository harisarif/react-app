import axios from '../utils/axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const notificationService = {
    getNotifications: async (page = 1, isRead = null) => {
        const params = new URLSearchParams();
        params.append('page', page);
        if (isRead !== null) {
            params.append('is_read', isRead);
        }
        
        const response = await axios.get(`${API_URL}/get-notifications?${params.toString()}`);
        return response.data;
    },

    markAsRead: async (notificationId) => {
        const response = await axios.patch(`${API_URL}/notifications/${notificationId}/read`);
        return response.data;
    },

    deleteNotification: async (notificationId) => {
        const response = await axios.delete(`${API_URL}/notifications/${notificationId}`);
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await axios.post(`${API_URL}/notifications/mark-all-as-read`);
        return response.data;
    }
};
