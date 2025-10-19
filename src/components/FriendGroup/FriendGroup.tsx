import React from 'react';
import type { Friend } from '../../types/Friend';
import FriendListItem from '../FriendListItem/FriendListItem';
import { getFriendId } from '../../utils/friendsUtils';
import './FriendGroup.css';

interface FriendGroupProps {
  title: string;
  friends: Friend[];
  selectedFriendId?: string;
  onFriendSelect: (friend: Friend) => void;
}

const FriendGroup: React.FC<FriendGroupProps> = ({
  title,
  friends,
  selectedFriendId,
  onFriendSelect
}) => {
  if (friends.length === 0) {
    return null;
  }

  return (
    <div className="friend-group">
      <div className="group-header">
        <h3 className="group-title">{title}</h3>
        <span className="group-count">({friends.length})</span>
      </div>
      <div className="group-content">
        {friends.map((friend) => {
          const friendId = getFriendId(friend);
          return (
            <FriendListItem
              key={friendId}
              friend={friend}
              isSelected={selectedFriendId === friendId}
              onClick={() => onFriendSelect(friend)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendGroup;