export interface Friend {
  firstName: string;
  lastName: string;
  nickName: string;
  dateOfBirth: string;
  profilePictureUrl: string;
  isFriend: boolean;
  majorsWon: number;
}

export interface FriendsData {
  friends: Friend[];
}

export interface GroupedFriends {
  friends: Friend[];
  acquaintances: Friend[];
}