import React, { useState, useEffect } from 'react';
import './Notifications.css';
import { FaHeart, FaRetweet, FaUser, FaComment, FaBell } from 'react-icons/fa';

function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Generate random user IDs for notifications
    const userIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    
    // Generate random notifications
    const notificationTypes = ['like', 'retweet', 'follow', 'mention', 'reply'];
    const notificationData = [];
    
    for (let i = 0; i < 10; i++) {
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const timeAgo = Math.floor(Math.random() * 24) + 1;
      
      notificationData.push({
        id: i + 1,
        type,
        user: {
          id: i,
          name: `User ${i + 1}`,
          username: `user${i + 1}`,
          avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${userIds[i]}.jpg`
        },
        timeAgo: `${timeAgo}h`,
        tweetText: type === 'mention' || type === 'reply' ? 
          `Hey @user, check out this new feature! #TwitterClone` : null
      });
    }
    
    setNotifications(notificationData);
  }, []);

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => 
        (activeTab === 'mentions' && (notification.type === 'mention' || notification.type === 'reply'))
      );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <FaHeart className="notifications__icon notifications__icon--like" />;
      case 'retweet':
        return <FaRetweet className="notifications__icon notifications__icon--retweet" />;
      case 'follow':
        return <FaUser className="notifications__icon notifications__icon--follow" />;
      case 'mention':
        return <FaBell className="notifications__icon notifications__icon--mention" />;
      case 'reply':
        return <FaComment className="notifications__icon notifications__icon--reply" />;
      default:
        return <FaBell className="notifications__icon" />;
    }
  };

  const getNotificationText = (notification) => {
    const { type, user } = notification;
    
    switch (type) {
      case 'like':
        return <span><strong>{user.name}</strong> liked your Tweet</span>;
      case 'retweet':
        return <span><strong>{user.name}</strong> retweeted your Tweet</span>;
      case 'follow':
        return <span><strong>{user.name}</strong> followed you</span>;
      case 'mention':
        return <span><strong>{user.name}</strong> mentioned you in a Tweet</span>;
      case 'reply':
        return <span><strong>{user.name}</strong> replied to your Tweet</span>;
      default:
        return <span><strong>{user.name}</strong> interacted with you</span>;
    }
  };

  return (
    <div className="notifications">
      <div className="notifications__header">
        <h2>Notifications</h2>
        <div className="notifications__tabs">
          <div 
            className={`notifications__tab ${activeTab === 'all' ? 'notifications__tab--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </div>
          <div 
            className={`notifications__tab ${activeTab === 'mentions' ? 'notifications__tab--active' : ''}`}
            onClick={() => setActiveTab('mentions')}
          >
            Mentions
          </div>
        </div>
      </div>

      <div className="notifications__content">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div key={notification.id} className="notification">
              <div className="notification__icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification__content">
                <img 
                  src={notification.user.avatar} 
                  alt={notification.user.name} 
                  className="notification__avatar" 
                />
                <div className="notification__info">
                  <div className="notification__text">
                    {getNotificationText(notification)}
                  </div>
                  {notification.tweetText && (
                    <div className="notification__tweetText">
                      {notification.tweetText}
                    </div>
                  )}
                  <div className="notification__time">
                    {notification.timeAgo}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="notifications__empty">
            <div className="notifications__emptyIcon">
              <FaBell />
            </div>
            <h3>Nothing to see here — yet</h3>
            <p>
              When someone mentions you, you'll find it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
