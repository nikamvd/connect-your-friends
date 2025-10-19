import React, { useState } from 'react';
import type { Friend } from '../../types/Friend';
import SearchBar from '../SearchBar/SearchBar';
import FriendGroup from '../FriendGroup/FriendGroup';
import { filterFriends, groupFriends, getFriendId } from '../../utils/friendsUtils';
import './FriendsList.css';

interface FriendsListProps {
  friends: Friend[];
  selectedFriend?: Friend;
  onFriendSelect: (friend: Friend) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
}

const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  selectedFriend,
  onFriendSelect,
  isCollapsed = false,
  onToggleCollapse,
  isMobile = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = filterFriends(friends, searchTerm);
  const groupedFriends = groupFriends(filteredFriends);
  
  const selectedFriendId = selectedFriend ? getFriendId(selectedFriend) : undefined;

  return (
    <div className={`friends-list ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="friends-list-header">
        <h2 className="friends-list-title">Meet Your Friends Here</h2>
        {!isMobile && onToggleCollapse && (
          <button 
            className="collapse-button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand friends list' : 'Collapse friends list'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}
      </div>
      
      {!isCollapsed && (
        <>
          <div className="search-section">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by first or last name..."
            />
          </div>

          <div className="friends-content">
            {filteredFriends.length === 0 ? (
              <div className="no-results">
                {searchTerm ? 'No friends found matching your search.' : 'No friends available.'}
              </div>
            ) : (
              <>
                <FriendGroup
                  title="Friends"
                  friends={groupedFriends.friends}
                  selectedFriendId={selectedFriendId}
                  onFriendSelect={onFriendSelect}
                />
                <FriendGroup
                  title="Acquaintances"
                  friends={groupedFriends.acquaintances}
                  selectedFriendId={selectedFriendId}
                  onFriendSelect={onFriendSelect}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FriendsList;