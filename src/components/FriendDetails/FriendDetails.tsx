import React from 'react';
import type { Friend } from '../../types/Friend';
import { getFullName, calculateAge, generateFriendDescription } from '../../utils/friendsUtils';
import './FriendDetails.css';

interface FriendDetailsProps {
  friend: Friend;
  onBack?: () => void;
  isMobile?: boolean;
}

const FriendDetails: React.FC<FriendDetailsProps> = ({
  friend,
  onBack,
  isMobile = false
}) => {
  const fullName = getFullName(friend);
  const age = calculateAge(friend.dateOfBirth);
  const description = generateFriendDescription(friend);

  return (
    <div className={`friend-details ${isMobile ? 'mobile' : 'desktop'}`}>
      {isMobile && (
        <div className="details-header">
          <button 
            className="back-button"
            onClick={onBack}
            aria-label="Go back to friends list"
          >
            ← Back
          </button>
          <h2 className="details-title">Friend Details</h2>
        </div>
      )}
      
      <div className="details-content">
        <div className="profile-section">
          <div className="profile-image-container">
            <img 
              src={friend.profilePictureUrl} 
              alt={fullName}
              className="profile-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/150x150/cccccc/666666?text=?';
              }}
            />
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{fullName}</h1>
            <p className="profile-nickname">"{friend.nickName}"</p>
            <p className="profile-age">{age} years old</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Majors Won:</span>
                <span className="stat-value">{friend.majorsWon}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Status:</span>
                <span className={`stat-value ${friend.isFriend ? 'friend' : 'acquaintance'}`}>
                  {friend.isFriend ? 'Friend' : 'Acquaintance'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="description-section">
          <h3 className="description-title">About {friend.firstName}</h3>
          <p className="description-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;