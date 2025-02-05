export const getNotificationUrl = (notification) => {
    const { notif_type, foreign_id } = notification;
    
    switch (notif_type) {
        case 'post':
        case 'like':
    case 'comment':
            return `/post/${foreign_id}`;
        case 'job':
            return `/job-list-detail/${foreign_id}`;
        case 'friend_request':
            return `/profile/${foreign_id}`;
        case 'share':
            return `/post/${foreign_id}`;
        case 'education':
            return `/education`;
        case 'event':
            return `/event-calender`;
        case 'follow':
            return `/profile/${foreign_id}`;
        default:
            return '#';
    }
};
