import React, { useState } from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';

function Feed() {
  // Generate random user and image IDs
  const userIds = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ];

  const imageIds = [
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)
  ];

  const [posts, setPosts] = useState([
    {
      id: '1',
      displayName: 'John Doe',
      username: 'johndoe',
      verified: true,
      text: 'Just launched my new website!',
      avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`,
      image: `https://picsum.photos/seed/${imageIds[0]}/600/400`
    },
    {
      id: '2',
      displayName: 'Jane Smith',
      username: 'janesmith',
      verified: false,
      text: 'React is awesome!',
      avatar: `https://randomuser.me/api/portraits/women/${userIds[1]}.jpg`,
      image: ''
    },
    {
      id: '3',
      displayName: 'Bob Johnson',
      username: 'bobjohnson',
      verified: true,
      text: 'Working on a new project. Stay tuned!',
      avatar: `https://randomuser.me/api/portraits/men/${userIds[2]}.jpg`,
      image: `https://picsum.photos/seed/${imageIds[2]}/600/400`
    }
  ]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox addPost={addPost} />

      {posts.map(post => (
        <Post
          key={post.id}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Feed;
