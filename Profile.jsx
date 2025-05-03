import React, { useState } from 'react';
import './Profile.css';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaLink, FaUserEdit } from 'react-icons/fa';
import Post from '../Feed/Post';

function Profile() {
  const [activeTab, setActiveTab] = useState('tweets');

  // Generate random IDs for images
  const randomId = Math.floor(Math.random() * 1000);
  const randomCoverId = Math.floor(Math.random() * 1000);

  // Mock user data
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Software Developer | React Enthusiast | Coffee Lover',
    location: 'New York, USA',
    website: 'https://johndoe.com',
    joinDate: 'January 2020',
    following: 235,
    followers: 587,
    coverPhoto: `https://picsum.photos/seed/${randomCoverId}/1500/500`,
    profilePhoto: `https://randomuser.me/api/portraits/men/${randomId % 100}.jpg`,
    verified: true
  };

  // Generate random tweet image IDs
  const tweetImageIds = [
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)
  ];

  // Mock tweets
  const tweets = [
    {
      id: '1',
      displayName: user.name,
      username: user.username,
      verified: user.verified,
      text: 'Just launched my new website!',
      avatar: user.profilePhoto,
      image: `https://picsum.photos/seed/${tweetImageIds[0]}/600/400`
    },
    {
      id: '2',
      displayName: user.name,
      username: user.username,
      verified: user.verified,
      text: 'React is awesome!',
      avatar: user.profilePhoto,
      image: '' // No image for this tweet
    },
    {
      id: '3',
      displayName: user.name,
      username: user.username,
      verified: user.verified,
      text: 'Working on a new project. Stay tuned!',
      avatar: user.profilePhoto,
      image: `https://picsum.photos/seed/${tweetImageIds[2]}/600/400`
    }
  ];

  return (
    <div className="profile">
      {/* Profile Header */}
      <div className="profile__header">
        <div className="profile__headerTop">
          <FaArrowLeft className="profile__backButton" />
          <div className="profile__headerInfo">
            <h2>{user.name}</h2>
            <span className="profile__tweetCount">{tweets.length} Tweets</span>
          </div>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="profile__banner">
        <img src={user.coverPhoto} alt="Cover" className="profile__coverPhoto" />
        <div className="profile__userInfo">
          <div className="profile__userPhotoContainer">
            <img src={user.profilePhoto} alt="Profile" className="profile__userPhoto" />
            <button className="profile__editButton">
              <FaUserEdit />
              <span>Edit profile</span>
            </button>
          </div>
          <div className="profile__userDetails">
            <h2 className="profile__userName">{user.name}</h2>
            <span className="profile__userHandle">@{user.username}</span>
            <p className="profile__userBio">{user.bio}</p>
            <div className="profile__userMeta">
              {user.location && (
                <div className="profile__userMetaItem">
                  <FaMapMarkerAlt />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="profile__userMetaItem">
                  <FaLink />
                  <a href={user.website} target="_blank" rel="noopener noreferrer">
                    {user.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </div>
              )}
              <div className="profile__userMetaItem">
                <FaCalendarAlt />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
            <div className="profile__userStats">
              <div className="profile__userStat">
                <span className="profile__userStatNumber">{user.following}</span>
                <span className="profile__userStatLabel">Following</span>
              </div>
              <div className="profile__userStat">
                <span className="profile__userStatNumber">{user.followers}</span>
                <span className="profile__userStatLabel">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="profile__tabs">
        <div
          className={`profile__tab ${activeTab === 'tweets' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('tweets')}
        >
          Tweets
        </div>
        <div
          className={`profile__tab ${activeTab === 'replies' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('replies')}
        >
          Tweets & Replies
        </div>
        <div
          className={`profile__tab ${activeTab === 'media' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </div>
        <div
          className={`profile__tab ${activeTab === 'likes' ? 'profile__tab--active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile__content">
        {activeTab === 'tweets' && (
          <div className="profile__tweets">
            {tweets.map(tweet => (
              <Post
                key={tweet.id}
                displayName={tweet.displayName}
                username={tweet.username}
                verified={tweet.verified}
                text={tweet.text}
                avatar={tweet.avatar}
                image={tweet.image}
              />
            ))}
          </div>
        )}
        {activeTab === 'replies' && (
          <div className="profile__emptyState">
            <h3>No replies yet</h3>
            <p>When you reply to a Tweet, it'll show up here.</p>
          </div>
        )}
        {activeTab === 'media' && (
          <div className="profile__emptyState">
            <h3>No media Tweets</h3>
            <p>When you post Tweets with photos or videos, they'll show up here.</p>
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="profile__emptyState">
            <h3>No likes yet</h3>
            <p>Tap the heart on any Tweet to show it some love. When you do, it'll show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
