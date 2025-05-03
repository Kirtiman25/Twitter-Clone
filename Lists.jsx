import React, { useState, useEffect } from 'react';
import './Lists.css';
import { FaPlus, FaSearch, FaEllipsisH, FaLock, FaUserFriends } from 'react-icons/fa';

function Lists() {
  const [activeTab, setActiveTab] = useState('owned');
  const [lists, setLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [newListPrivate, setNewListPrivate] = useState(false);

  useEffect(() => {
    // Generate random user IDs for lists
    const userIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    const imageIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000));
    
    // Generate random lists
    const ownedLists = [
      {
        id: 1,
        name: 'Tech News',
        description: 'Latest news and updates from the tech world',
        memberCount: 45,
        isPrivate: false,
        owner: {
          id: 1,
          name: 'Your Name',
          username: 'yourname',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[0]}/800/200`
      },
      {
        id: 2,
        name: 'Web Development',
        description: 'Resources and tips for web developers',
        memberCount: 32,
        isPrivate: false,
        owner: {
          id: 1,
          name: 'Your Name',
          username: 'yourname',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[1]}/800/200`
      },
      {
        id: 3,
        name: 'Design Inspiration',
        description: 'UI/UX design inspiration and resources',
        memberCount: 28,
        isPrivate: true,
        owner: {
          id: 1,
          name: 'Your Name',
          username: 'yourname',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[2]}/800/200`
      }
    ];
    
    const subscribedLists = [
      {
        id: 4,
        name: 'JavaScript Developers',
        description: 'Community of JavaScript developers',
        memberCount: 1245,
        isPrivate: false,
        owner: {
          id: 2,
          name: 'JS Community',
          username: 'jscommunity',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[1]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[3]}/800/200`
      },
      {
        id: 5,
        name: 'React Enthusiasts',
        description: 'Everything about React and React Native',
        memberCount: 876,
        isPrivate: false,
        owner: {
          id: 3,
          name: 'React Official',
          username: 'reactjs',
          avatar: `https://randomuser.me/api/portraits/women/${userIds[2]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[4]}/800/200`
      },
      {
        id: 6,
        name: 'UX/UI Designers',
        description: 'Community of UX/UI designers',
        memberCount: 543,
        isPrivate: false,
        owner: {
          id: 4,
          name: 'Design Hub',
          username: 'designhub',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[3]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[5]}/800/200`
      },
      {
        id: 7,
        name: 'Tech Startups',
        description: 'News and updates from tech startups',
        memberCount: 321,
        isPrivate: false,
        owner: {
          id: 5,
          name: 'Startup Daily',
          username: 'startupdaily',
          avatar: `https://randomuser.me/api/portraits/women/${userIds[4]}.jpg`
        },
        banner: `https://picsum.photos/seed/${imageIds[6]}/800/200`
      }
    ];
    
    setLists({
      owned: ownedLists,
      subscribed: subscribedLists
    });
  }, []);

  const handleCreateList = (e) => {
    e.preventDefault();
    
    if (!newListName.trim()) return;
    
    const newList = {
      id: Date.now(),
      name: newListName,
      description: newListDescription,
      memberCount: 0,
      isPrivate: newListPrivate,
      owner: {
        id: 1,
        name: 'Your Name',
        username: 'yourname',
        avatar: `https://randomuser.me/api/portraits/men/1.jpg`
      },
      banner: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/200`
    };
    
    setLists({
      ...lists,
      owned: [...lists.owned, newList]
    });
    
    // Reset form
    setNewListName('');
    setNewListDescription('');
    setNewListPrivate(false);
    setShowCreateList(false);
  };

  const filteredLists = searchTerm
    ? (activeTab === 'owned' ? lists.owned : lists.subscribed).filter(list => 
        list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : (activeTab === 'owned' ? lists.owned : lists.subscribed);

  return (
    <div className="lists">
      <div className="lists__header">
        <h2>Lists</h2>
        <div className="lists__headerIcons">
          <div 
            className="lists__createButton"
            onClick={() => setShowCreateList(true)}
          >
            <FaPlus />
          </div>
          <FaEllipsisH className="lists__headerIcon" />
        </div>
      </div>
      
      <div className="lists__tabs">
        <div 
          className={`lists__tab ${activeTab === 'owned' ? 'lists__tab--active' : ''}`}
          onClick={() => setActiveTab('owned')}
        >
          Owned
        </div>
        <div 
          className={`lists__tab ${activeTab === 'subscribed' ? 'lists__tab--active' : ''}`}
          onClick={() => setActiveTab('subscribed')}
        >
          Subscribed
        </div>
      </div>
      
      <div className="lists__searchContainer">
        <FaSearch className="lists__searchIcon" />
        <input
          type="text"
          placeholder="Search Lists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lists__searchInput"
        />
      </div>
      
      {showCreateList ? (
        <div className="lists__createContainer">
          <h3>Create a new list</h3>
          <form onSubmit={handleCreateList}>
            <div className="lists__formGroup">
              <label>Name</label>
              <input
                type="text"
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                maxLength={25}
                required
              />
              <div className="lists__charCount">{newListName.length}/25</div>
            </div>
            
            <div className="lists__formGroup">
              <label>Description</label>
              <textarea
                placeholder="List description"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                maxLength={100}
              />
              <div className="lists__charCount">{newListDescription.length}/100</div>
            </div>
            
            <div className="lists__formGroup lists__formCheckbox">
              <input
                type="checkbox"
                id="private"
                checked={newListPrivate}
                onChange={(e) => setNewListPrivate(e.target.checked)}
              />
              <label htmlFor="private">Make private</label>
            </div>
            
            <div className="lists__formButtons">
              <button 
                type="button" 
                className="lists__cancelButton"
                onClick={() => setShowCreateList(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="lists__submitButton"
                disabled={!newListName.trim()}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="lists__content">
          {filteredLists && filteredLists.length > 0 ? (
            <div className="lists__grid">
              {filteredLists.map(list => (
                <div key={list.id} className="lists__item">
                  <div className="lists__itemBanner" style={{ backgroundImage: `url(${list.banner})` }}>
                    {list.isPrivate && (
                      <div className="lists__itemPrivate">
                        <FaLock />
                      </div>
                    )}
                  </div>
                  <div className="lists__itemContent">
                    <div className="lists__itemHeader">
                      <h3>{list.name}</h3>
                      <FaEllipsisH className="lists__itemOptions" />
                    </div>
                    <div className="lists__itemDescription">{list.description}</div>
                    <div className="lists__itemFooter">
                      <div className="lists__itemOwner">
                        <img src={list.owner.avatar} alt={list.owner.name} />
                        <span>{list.owner.name}</span>
                      </div>
                      <div className="lists__itemMembers">
                        <FaUserFriends />
                        <span>{list.memberCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lists__empty">
              {activeTab === 'owned' ? (
                <>
                  <h3>You haven't created any Lists yet</h3>
                  <p>When you do, they'll show up here.</p>
                  <button 
                    className="lists__createListButton"
                    onClick={() => setShowCreateList(true)}
                  >
                    Create a List
                  </button>
                </>
              ) : (
                <>
                  <h3>You haven't subscribed to any Lists yet</h3>
                  <p>When you do, they'll show up here.</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Lists;
