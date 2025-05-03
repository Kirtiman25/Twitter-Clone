import React, { useState } from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import TwitterLogo from '../Logo/TwitterLogo';
import { FaHome, FaHashtag, FaBell, FaEnvelope,
         FaBookmark, FaList, FaUser, FaEllipsisH } from 'react-icons/fa';

function Sidebar({ onNavigation }) {
  const [activeOption, setActiveOption] = useState('Home');

  const handleOptionClick = (text) => {
    setActiveOption(text);

    switch (text) {
      case 'Home':
        onNavigation('feed');
        break;
      case 'Explore':
        onNavigation('explore');
        break;
      case 'Notifications':
        onNavigation('notifications');
        break;
      case 'Messages':
        onNavigation('messages');
        break;
      case 'Bookmarks':
        onNavigation('bookmarks');
        break;
      case 'Lists':
        onNavigation('lists');
        break;
      case 'Profile':
        onNavigation('profile');
        break;
      default:
        // For other options like More
        console.log(`${text} clicked - functionality not implemented yet`);
        break;
    }
  };

  return (
    <div className="sidebar">
      {/* Twitter icon */}
      <div className="sidebar__twitterIcon">
        <TwitterLogo />
      </div>

      {/* Sidebar Options */}
      <SidebarOption
        active={activeOption === 'Home'}
        Icon={FaHome}
        text="Home"
        onClick={() => handleOptionClick('Home')}
      />
      <SidebarOption
        active={activeOption === 'Explore'}
        Icon={FaHashtag}
        text="Explore"
        onClick={() => handleOptionClick('Explore')}
      />
      <SidebarOption
        active={activeOption === 'Notifications'}
        Icon={FaBell}
        text="Notifications"
        onClick={() => handleOptionClick('Notifications')}
      />
      <SidebarOption
        active={activeOption === 'Messages'}
        Icon={FaEnvelope}
        text="Messages"
        onClick={() => handleOptionClick('Messages')}
      />
      <SidebarOption
        active={activeOption === 'Bookmarks'}
        Icon={FaBookmark}
        text="Bookmarks"
        onClick={() => handleOptionClick('Bookmarks')}
      />
      <SidebarOption
        active={activeOption === 'Lists'}
        Icon={FaList}
        text="Lists"
        onClick={() => handleOptionClick('Lists')}
      />
      <SidebarOption
        active={activeOption === 'Profile'}
        Icon={FaUser}
        text="Profile"
        onClick={() => handleOptionClick('Profile')}
      />
      <SidebarOption
        active={activeOption === 'More'}
        Icon={FaEllipsisH}
        text="More"
        onClick={() => handleOptionClick('More')}
      />

      {/* Tweet Button */}
      <button className="sidebar__tweet">Tweet</button>
    </div>
  );
}

export default Sidebar;
