import React, { useState, useEffect } from 'react';
import './Explore.css';
import Post from '../Feed/Post';
import { FaSearch } from 'react-icons/fa';

function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [trendingTweets, setTrendingTweets] = useState([]);

  useEffect(() => {
    // Generate random trending topics
    const topics = [
      { id: 1, name: 'React', category: 'Technology', tweetCount: '125K' },
      { id: 2, name: 'JavaScript', category: 'Programming', tweetCount: '98K' },
      { id: 3, name: 'WebDevelopment', category: 'Technology', tweetCount: '56K' },
      { id: 4, name: 'AI', category: 'Technology', tweetCount: '210K' },
      { id: 5, name: 'SpaceX', category: 'Science', tweetCount: '45K' },
      { id: 6, name: 'ClimateChange', category: 'Environment', tweetCount: '78K' },
      { id: 7, name: 'Crypto', category: 'Finance', tweetCount: '112K' },
      { id: 8, name: 'Olympics', category: 'Sports', tweetCount: '320K' }
    ];
    
    setTrendingTopics(topics);
    
    // Generate random trending tweets
    const userIds = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    const imageIds = Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000));
    
    const tweets = [
      {
        id: '1',
        displayName: 'Tech News',
        username: 'technews',
        verified: true,
        text: 'Breaking: New React 19 features announced! The future of web development looks promising. #React #JavaScript',
        avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`,
        image: `https://picsum.photos/seed/${imageIds[0]}/600/400`,
        likes: 1542,
        retweets: 328,
        comments: 97
      },
      {
        id: '2',
        displayName: 'Science Daily',
        username: 'sciencedaily',
        verified: true,
        text: 'Scientists discover new planet that could potentially support life. Located just 40 light years away. #Space #Astronomy',
        avatar: `https://randomuser.me/api/portraits/women/${userIds[1]}.jpg`,
        image: `https://picsum.photos/seed/${imageIds[1]}/600/400`,
        likes: 2103,
        retweets: 542,
        comments: 128
      },
      {
        id: '3',
        displayName: 'Sports Center',
        username: 'sportscenter',
        verified: true,
        text: 'BREAKING: World record broken in 100m sprint at the Olympics! Incredible performance! #Olympics #WorldRecord',
        avatar: `https://randomuser.me/api/portraits/men/${userIds[2]}.jpg`,
        image: `https://picsum.photos/seed/${imageIds[2]}/600/400`,
        likes: 3254,
        retweets: 1287,
        comments: 432
      },
      {
        id: '4',
        displayName: 'Finance Today',
        username: 'financetoday',
        verified: true,
        text: 'Markets reach all-time high as tech stocks surge. Investors optimistic about AI developments. #Stocks #Finance',
        avatar: `https://randomuser.me/api/portraits/women/${userIds[3]}.jpg`,
        image: '',
        likes: 876,
        retweets: 231,
        comments: 65
      },
      {
        id: '5',
        displayName: 'Climate Watch',
        username: 'climatewatch',
        verified: true,
        text: 'New study shows promising results for carbon capture technology. Could be a game-changer for climate change. #ClimateChange #GreenTech',
        avatar: `https://randomuser.me/api/portraits/men/${userIds[4]}.jpg`,
        image: `https://picsum.photos/seed/${imageIds[4]}/600/400`,
        likes: 1876,
        retweets: 654,
        comments: 213
      }
    ];
    
    setTrendingTweets(tweets);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would search the database
    console.log(`Searching for: ${searchTerm}`);
    // Reset search term
    setSearchTerm('');
  };

  const filteredTweets = searchTerm 
    ? trendingTweets.filter(tweet => 
        tweet.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : trendingTweets;

  return (
    <div className="explore">
      <div className="explore__header">
        <h2>Explore</h2>
        <form onSubmit={handleSearch} className="explore__searchContainer">
          <FaSearch className="explore__searchIcon" />
          <input
            type="text"
            placeholder="Search Twitter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="explore__searchInput"
          />
        </form>
      </div>

      {searchTerm ? (
        <div className="explore__searchResults">
          <h3>Search Results for "{searchTerm}"</h3>
          {filteredTweets.length > 0 ? (
            filteredTweets.map(tweet => (
              <Post
                key={tweet.id}
                displayName={tweet.displayName}
                username={tweet.username}
                verified={tweet.verified}
                text={tweet.text}
                avatar={tweet.avatar}
                image={tweet.image}
              />
            ))
          ) : (
            <div className="explore__noResults">
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="explore__trending">
            <h3>Trends for you</h3>
            <div className="explore__trendingTopics">
              {trendingTopics.map(topic => (
                <div key={topic.id} className="explore__trendingTopic">
                  <div className="explore__trendingCategory">{topic.category} · Trending</div>
                  <div className="explore__trendingName">#{topic.name}</div>
                  <div className="explore__trendingTweets">{topic.tweetCount} Tweets</div>
                </div>
              ))}
            </div>
          </div>

          <div className="explore__trendingTweets">
            <h3>What's happening</h3>
            {trendingTweets.map(tweet => (
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
        </>
      )}
    </div>
  );
}

export default Explore;
