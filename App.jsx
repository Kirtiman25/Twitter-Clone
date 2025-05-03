import React, { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Feed from './components/Feed/Feed'
import Widgets from './components/Widgets/Widgets'
import Profile from './components/Profile/Profile'
import Explore from './components/Explore/Explore'
import Notifications from './components/Notifications/Notifications'
import Bookmarks from './components/Bookmarks/Bookmarks'
import Messages from './components/Messages/Messages'
import Lists from './components/Lists/Lists'

// Temporarily comment out Auth components until we fix the issues
// import Auth from './components/Auth/Auth'
// import { AuthProvider, useAuth } from './context/AuthContext'

function App() {
  const [activeComponent, setActiveComponent] = useState('feed');

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'feed':
        return <Feed />;
      case 'explore':
        return <Explore />;
      case 'notifications':
        return <Notifications />;
      case 'messages':
        return <Messages />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'lists':
        return <Lists />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="app">
      <Sidebar onNavigation={handleNavigation} />
      {renderActiveComponent()}
      <Widgets />
    </div>
  );
}

export default App
