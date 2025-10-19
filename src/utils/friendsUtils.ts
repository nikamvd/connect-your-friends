import type { Friend, GroupedFriends } from '../types/Friend';

export const calculateAge = (dateOfBirth: string): number => {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const getFullName = (friend: Friend): string => {
  return `${friend.firstName} ${friend.lastName}`;
};

export const getFriendId = (friend: Friend): string => {
  return `${friend.firstName}-${friend.lastName}`;
};

export const filterFriends = (friends: Friend[], searchTerm: string): Friend[] => {
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  return friends.filter(friend => 
    friend.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
    friend.lastName.toLowerCase().includes(lowercaseSearchTerm)
  );
};

export const groupFriends = (friends: Friend[]): GroupedFriends => {
  return friends.reduce((groups: GroupedFriends, friend: Friend) => {
    if (friend.isFriend) {
      groups.friends.push(friend);
    } else {
      groups.acquaintances.push(friend);
    }
    return groups;
  }, { friends: [], acquaintances: [] });
};

export const generateFriendDescription = (friend: Friend): string => {
  const descriptions = [
    `${getFullName(friend)} is an amazing golf enthusiast who brings incredible energy to every game.`,
    `Known as "${friend.nickName}", this talented individual has ${friend.majorsWon} major wins under their belt.`,
    `A passionate golfer who never fails to inspire others with their dedication and skill on the course.`,
    `${friend.firstName} is always ready for a challenging round and makes every golf session memorable.`,
    `With ${friend.majorsWon} majors won, ${friend.nickName} is truly a force to be reckoned with in golf.`
  ];
  
  // Use firstName length to pick a consistent description for each friend
  return descriptions[friend.firstName.length % descriptions.length];
};