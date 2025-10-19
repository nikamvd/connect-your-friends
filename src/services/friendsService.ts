import axios from 'axios';
import type { Friend, FriendsData } from '../types/Friend';
import { getApiUrl, config } from '../config/app.config';

// Get the complete API URL from configuration
const API_URL = getApiUrl('friends');

// Create axios instance with default configuration from app config
const apiClient = axios.create({
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchFriends = async (): Promise<Friend[]> => {
  try {
    const response = await apiClient.get<FriendsData>(API_URL);
    return response.data.friends;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific errors
      if (error.response) {
        // Server responded with error status
        throw new Error(`Failed to fetch friends: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Failed to fetch friends: Network error or timeout');
      } else {
        // Something else happened
        throw new Error(`Failed to fetch friends: ${error.message}`);
      }
    } else {
      // Non-axios error
      console.error('Error fetching friends:', error);
      throw new Error('Failed to fetch friends: Unknown error');
    }
  }
};