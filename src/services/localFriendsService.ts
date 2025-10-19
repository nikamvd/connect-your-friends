import type { Friend } from '../types/Friend';
import friendsData from '../data/friends.json';

export interface FriendsResponse {
  friends: Friend[];
}

/**
 * Local friends service that loads data from local JSON file
 * This service simulates the same async behavior as the network service
 * but loads data from a local JSON file instead
 */
export const localFriendsService = {
  /**
   * Load friends from local JSON file
   * Returns a promise to maintain consistency with the network service
   */
  async loadFriends(): Promise<Friend[]> {
    // Simulate network delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return the friends data from the imported JSON
    return friendsData.friends;
  },

  /**
   * Search friends by name (first name, last name, or nickname)
   * @param query - The search term
   * @returns Promise<Friend[]> - Filtered friends array
   */
  async searchFriends(query: string): Promise<Friend[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) {
      return friendsData.friends;
    }

    const searchTerm = query.toLowerCase().trim();
    
    return friendsData.friends.filter(friend => 
      friend.firstName.toLowerCase().includes(searchTerm) ||
      friend.lastName.toLowerCase().includes(searchTerm) ||
      friend.nickName.toLowerCase().includes(searchTerm)
    );
  },

  /**
   * Get a specific friend by ID (using first name + last name as unique identifier)
   * @param firstName - Friend's first name
   * @param lastName - Friend's last name
   * @returns Promise<Friend | null> - The friend if found, null otherwise
   */
  async getFriendById(firstName: string, lastName: string): Promise<Friend | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const friend = friendsData.friends.find(f => 
      f.firstName === firstName && f.lastName === lastName
    );
    
    return friend || null;
  },

  /**
   * Get friends grouped by their status (Friends vs Acquaintances)
   * @returns Promise with grouped friends
   */
  async getFriendsGrouped(): Promise<{ friends: Friend[], acquaintances: Friend[] }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const friends = friendsData.friends.filter(f => f.isFriend);
    const acquaintances = friendsData.friends.filter(f => !f.isFriend);
    
    return { friends, acquaintances };
  }
};