import React, { useState, useEffect } from 'react';
import './Widgets.css';
import { FaSearch, FaEllipsisH } from 'react-icons/fa';

function Widgets() {
  // Generate random user IDs for the "Who to follow" section
  const [followUsers, setFollowUsers] = useState([]);

  useEffect(() => {
    // Generate random user IDs when component mounts
    const userIds = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ];

    setFollowUsers([
      {
        id: 1,
        name: 'React Official',
        username: 'reactjs',
        avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`
      },
      {
        id: 2,
        name: 'JavaScript',
        username: 'javascript',
        avatar: `https://randomuser.me/api/portraits/women/${userIds[1]}.jpg`
      }
    ]);
  }, []);
  return (
    <div className="widgets">
      <div className="widgets__input">
        <FaSearch className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <div className="widgets__trend">
          <div className="widgets__trendHeader">
            <span>Trending in Technology</span>
            <FaEllipsisH className="widgets__trendMore" />
          </div>
          <div className="widgets__trendName">
            <strong>#ReactJS</strong>
          </div>
          <div className="widgets__trendTweets">
            <span>10.5K Tweets</span>
          </div>
        </div>

        <div className="widgets__trend">
          <div className="widgets__trendHeader">
            <span>Trending in Web Development</span>
            <FaEllipsisH className="widgets__trendMore" />
          </div>
          <div className="widgets__trendName">
            <strong>#JavaScript</strong>
          </div>
          <div className="widgets__trendTweets">
            <span>25.2K Tweets</span>
          </div>
        </div>

        <div className="widgets__trend">
          <div className="widgets__trendHeader">
            <span>Trending in Programming</span>
            <FaEllipsisH className="widgets__trendMore" />
          </div>
          <div className="widgets__trendName">
            <strong>#MERN</strong>
          </div>
          <div className="widgets__trendTweets">
            <span>5.7K Tweets</span>
          </div>
        </div>

        <button className="widgets__showMore">Show more</button>
      </div>

      <div className="widgets__widgetContainer">
        <h2>Who to follow</h2>

        {followUsers.map(user => (
          <div className="widgets__followUser" key={user.id}>
            <img src={user.avatar} alt={user.name} />
            <div className="widgets__followUserInfo">
              <div className="widgets__followUserName">
                <strong>{user.name}</strong>
                <span>@{user.username}</span>
              </div>
              <button>Follow</button>
            </div>
          </div>
        ))}

        <button className="widgets__showMore">Show more</button>
      </div>
    </div>
  );
}

export default Widgets;
