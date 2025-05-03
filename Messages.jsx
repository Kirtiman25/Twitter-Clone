import React, { useState, useEffect } from 'react';
import './Messages.css';
import { FaSearch, FaEnvelope, FaCog, FaRegPaperPlane } from 'react-icons/fa';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Generate random user IDs for conversations
    const userIds = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    
    // Generate random conversations
    const mockConversations = [
      {
        id: 1,
        user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[0]}.jpg`,
          verified: true
        },
        lastMessage: {
          text: 'Hey, how are you doing?',
          timestamp: '2h',
          isRead: true,
          sender: 'them'
        },
        messages: [
          {
            id: 1,
            text: 'Hi there!',
            timestamp: '2d',
            sender: 'them'
          },
          {
            id: 2,
            text: 'Hello! How are you?',
            timestamp: '2d',
            sender: 'me'
          },
          {
            id: 3,
            text: 'I\'m doing great, thanks for asking!',
            timestamp: '1d',
            sender: 'them'
          },
          {
            id: 4,
            text: 'Hey, how are you doing?',
            timestamp: '2h',
            sender: 'them'
          }
        ]
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Jane Smith',
          username: 'janesmith',
          avatar: `https://randomuser.me/api/portraits/women/${userIds[1]}.jpg`,
          verified: false
        },
        lastMessage: {
          text: 'Did you see the latest React update?',
          timestamp: '1d',
          isRead: false,
          sender: 'them'
        },
        messages: [
          {
            id: 1,
            text: 'Have you been working with React lately?',
            timestamp: '3d',
            sender: 'them'
          },
          {
            id: 2,
            text: 'Yes, I\'m building a Twitter clone!',
            timestamp: '3d',
            sender: 'me'
          },
          {
            id: 3,
            text: 'That sounds awesome!',
            timestamp: '2d',
            sender: 'them'
          },
          {
            id: 4,
            text: 'Did you see the latest React update?',
            timestamp: '1d',
            sender: 'them'
          }
        ]
      },
      {
        id: 3,
        user: {
          id: 3,
          name: 'Tech News',
          username: 'technews',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[2]}.jpg`,
          verified: true
        },
        lastMessage: {
          text: 'Breaking: New AI model released!',
          timestamp: '3d',
          isRead: true,
          sender: 'them'
        },
        messages: [
          {
            id: 1,
            text: 'Hello! We have some exciting tech news for you.',
            timestamp: '5d',
            sender: 'them'
          },
          {
            id: 2,
            text: 'What\'s the news?',
            timestamp: '5d',
            sender: 'me'
          },
          {
            id: 3,
            text: 'Breaking: New AI model released!',
            timestamp: '3d',
            sender: 'them'
          }
        ]
      },
      {
        id: 4,
        user: {
          id: 4,
          name: 'React Community',
          username: 'reactjs',
          avatar: `https://randomuser.me/api/portraits/women/${userIds[3]}.jpg`,
          verified: true
        },
        lastMessage: {
          text: 'Join our next meetup on Thursday!',
          timestamp: '5d',
          isRead: true,
          sender: 'them'
        },
        messages: [
          {
            id: 1,
            text: 'Hello React developers!',
            timestamp: '1w',
            sender: 'them'
          },
          {
            id: 2,
            text: 'We\'re organizing a virtual meetup.',
            timestamp: '1w',
            sender: 'them'
          },
          {
            id: 3,
            text: 'Sounds interesting!',
            timestamp: '6d',
            sender: 'me'
          },
          {
            id: 4,
            text: 'Join our next meetup on Thursday!',
            timestamp: '5d',
            sender: 'them'
          }
        ]
      },
      {
        id: 5,
        user: {
          id: 5,
          name: 'Web Dev Tips',
          username: 'webdevtips',
          avatar: `https://randomuser.me/api/portraits/men/${userIds[4]}.jpg`,
          verified: false
        },
        lastMessage: {
          text: 'Check out our new CSS tutorial!',
          timestamp: '1w',
          isRead: true,
          sender: 'them'
        },
        messages: [
          {
            id: 1,
            text: 'We just published a new tutorial.',
            timestamp: '1w',
            sender: 'them'
          },
          {
            id: 2,
            text: 'Check out our new CSS tutorial!',
            timestamp: '1w',
            sender: 'them'
          }
        ]
      }
    ];
    
    setConversations(mockConversations);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === selectedConversation.id) {
        const newMessageObj = {
          id: conversation.messages.length + 1,
          text: newMessage,
          timestamp: 'Just now',
          sender: 'me'
        };
        
        return {
          ...conversation,
          lastMessage: {
            text: newMessage,
            timestamp: 'Just now',
            isRead: true,
            sender: 'me'
          },
          messages: [...conversation.messages, newMessageObj]
        };
      }
      return conversation;
    });
    
    setConversations(updatedConversations);
    setNewMessage('');
    
    // Update the selected conversation
    const updatedSelectedConversation = updatedConversations.find(
      conversation => conversation.id === selectedConversation.id
    );
    setSelectedConversation(updatedSelectedConversation);
  };

  const filteredConversations = searchTerm
    ? conversations.filter(conversation => 
        conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  return (
    <div className="messages">
      <div className="messages__header">
        <h2>Messages</h2>
        <div className="messages__headerIcons">
          <FaCog className="messages__headerIcon" />
          <FaEnvelope className="messages__headerIcon" />
        </div>
      </div>
      
      <div className="messages__searchContainer">
        <FaSearch className="messages__searchIcon" />
        <input
          type="text"
          placeholder="Search Direct Messages"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="messages__searchInput"
        />
      </div>
      
      <div className="messages__container">
        <div className="messages__sidebar">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className={`messages__conversation ${selectedConversation?.id === conversation.id ? 'messages__conversation--active' : ''} ${!conversation.lastMessage.isRead && conversation.lastMessage.sender === 'them' ? 'messages__conversation--unread' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <img
                  src={conversation.user.avatar}
                  alt={conversation.user.name}
                  className="messages__avatar"
                />
                <div className="messages__conversationInfo">
                  <div className="messages__conversationHeader">
                    <span className="messages__conversationName">
                      {conversation.user.name}
                      {conversation.user.verified && <span className="messages__verified">✓</span>}
                    </span>
                    <span className="messages__conversationTime">{conversation.lastMessage.timestamp}</span>
                  </div>
                  <div className="messages__conversationUsername">@{conversation.user.username}</div>
                  <div className="messages__conversationLastMessage">
                    {conversation.lastMessage.sender === 'me' && 'You: '}
                    {conversation.lastMessage.text}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="messages__noResults">
              <p>No conversations found</p>
            </div>
          )}
        </div>
        
        <div className="messages__content">
          {selectedConversation ? (
            <>
              <div className="messages__contentHeader">
                <div className="messages__contentHeaderInfo">
                  <img
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.name}
                    className="messages__contentAvatar"
                  />
                  <div>
                    <div className="messages__contentName">
                      {selectedConversation.user.name}
                      {selectedConversation.user.verified && <span className="messages__verified">✓</span>}
                    </div>
                    <div className="messages__contentUsername">@{selectedConversation.user.username}</div>
                  </div>
                </div>
              </div>
              
              <div className="messages__chatContainer">
                <div className="messages__chat">
                  {selectedConversation.messages.map(message => (
                    <div
                      key={message.id}
                      className={`messages__message ${message.sender === 'me' ? 'messages__message--sent' : 'messages__message--received'}`}
                    >
                      {message.sender === 'them' && (
                        <img
                          src={selectedConversation.user.avatar}
                          alt={selectedConversation.user.name}
                          className="messages__messageAvatar"
                        />
                      )}
                      <div className="messages__messageContent">
                        <div className="messages__messageText">{message.text}</div>
                        <div className="messages__messageTime">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <form className="messages__inputContainer" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Start a new message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="messages__input"
                  />
                  <button
                    type="submit"
                    className="messages__sendButton"
                    disabled={!newMessage.trim()}
                  >
                    <FaRegPaperPlane />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="messages__welcome">
              <div className="messages__welcomeIcon">
                <FaEnvelope />
              </div>
              <h3>Select a message</h3>
              <p>Choose from your existing conversations or start a new one</p>
              <button className="messages__newMessageButton">
                New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
