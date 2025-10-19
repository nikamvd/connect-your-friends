import { useState } from 'react';
import type { Friend } from './types/Friend';
import { useFriends } from './hooks/useFriends';
import { useMediaQuery } from './hooks/useMediaQuery';
import FriendsList from './components/FriendsList/FriendsList';
import FriendDetails from './components/FriendDetails/FriendDetails';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';

function App() {
  const { friends, loading, error, refetch } = useFriends();
  const [selectedFriend, setSelectedFriend] = useState<Friend | undefined>(undefined);
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Check if we're on mobile (768px breakpoint)
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
    if (isMobile) {
      setShowDetails(true);
    }
  };

  const handleBackToList = () => {
    setShowDetails(false);
    if (isMobile) {
      setSelectedFriend(undefined);
    }
  };

  const toggleListCollapse = () => {
    setIsListCollapsed(!isListCollapsed);
  };

  if (loading) {
    return <LoadingSpinner message="Loading your friends..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* Mobile Layout */}
        {isMobile ? (
          <>
            {!showDetails ? (
              <FriendsList
                friends={friends}
                selectedFriend={selectedFriend}
                onFriendSelect={handleFriendSelect}
                isMobile={true}
              />
            ) : (
              selectedFriend && (
                <FriendDetails
                  friend={selectedFriend}
                  onBack={handleBackToList}
                  isMobile={true}
                />
              )
            )}
          </>
        ) : (
          /* Desktop Layout */
          <>
            <FriendsList
              friends={friends}
              selectedFriend={selectedFriend}
              onFriendSelect={handleFriendSelect}
              isCollapsed={isListCollapsed}
              onToggleCollapse={toggleListCollapse}
              isMobile={false}
            />
            <div className="details-container">
              {selectedFriend ? (
                <FriendDetails
                  friend={selectedFriend}
                  isMobile={false}
                />
              ) : (
                <div className="no-selection">
                  <div className="no-selection-content">
                    <div className="no-selection-icon">👋</div>
                    <h2>Welcome!</h2>
                    <p>Select a friend from the list to view their details</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
