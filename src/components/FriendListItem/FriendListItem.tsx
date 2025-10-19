import React from 'react';
import type { Friend } from '../../types/Friend';
import { getFullName } from '../../utils/friendsUtils';
import './FriendListItem.css';

interface FriendListItemProps {
  friend: Friend;
  isSelected?: boolean;
  onClick: () => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({
  friend,
  isSelected = false,
  onClick
}) => {
  return (
    <div 
      className={`friend-list-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="friend-avatar">
        <img 
          src={friend.profilePictureUrl} 
          alt={getFullName(friend)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/60x60/cccccc/666666?text=?';
          }}
        />
      </div>
      <div className="friend-info">
        <div className="friend-name">{getFullName(friend)}</div>
        <div className="friend-nickname">{friend.nickName}</div>
      </div>
    </div>
  );
};

export default FriendListItem;