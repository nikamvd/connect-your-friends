import { useState, useEffect } from 'react';
import type { Friend } from '../types/Friend';
// For local data:
import { localFriendsService } from '../services/localFriendsService';

// For network data: Uncomment the line below
//import { fetchFriends } from '../services/friendsService';

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFriends = async () => {
    try {
      setLoading(true);
      
      // For network data: uncomment the line below
      // const friendsData = await fetchFriends();
      const friendsData = await localFriendsService.loadFriends();
      setFriends(friendsData);
      setError(null);
    } catch (err) {
      setError('Failed to load friends. Please try again later.');
      console.error('Error loading friends:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return { friends, loading, error, refetch: loadFriends };
};