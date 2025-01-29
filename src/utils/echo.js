import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from './axios';

window.Pusher = Pusher;

console.log('Initializing Echo with:', {
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER
});

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
    encrypted: true,
    withCredentials: true,
    auth: {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    },
    authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                }, {
                    withCredentials: true
                })
                .then(response => {
                    console.log('Channel authorized:', channel.name);
                    callback(null, response.data);
                })
                .catch(error => {
                    console.error('Channel authorization failed:', error);
                    callback(error);
                });
            }
        };
    }
});
