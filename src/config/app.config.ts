/**
 * Application Configuration
 * Centralized configuration for API endpoints, timeouts, and other app-level settings
 */

export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    endpoints: {
      friends: string;
    };
  };
  app: {
    name: string;
    version: string;
  };
}

/**
 * Default configuration for the application
 * In a real-world app, these values could be overridden by environment variables
 */
export const appConfig: AppConfig = {
  api: {
    baseUrl: 'https://your-custom-api.com',
    timeout: 10000, // 10 seconds
    endpoints: {
      friends: '/golf/friends.json',
    },
  },
  app: {
    name: 'Connect Your Friends',
    version: '1.0.0',
  },
};

/**
 * Get the full API URL for a specific endpoint
 * @param endpoint - The endpoint key from the config
 * @returns Complete URL for the API call
 */
export const getApiUrl = (endpoint: keyof typeof appConfig.api.endpoints): string => {
  return `${appConfig.api.baseUrl}${appConfig.api.endpoints[endpoint]}`;
};

/**
 * Environment-based configuration override
 * This allows for different configurations in development, staging, and production
 */
export const getEnvironmentConfig = (): AppConfig => {
  // In a real app, you might read from process.env or import.meta.env
  const env = import.meta.env.MODE || 'development';
  
  switch (env) {
    case 'development':
      return {
        ...appConfig,
        api: {
          ...appConfig.api,
          baseUrl: import.meta.env.VITE_API_BASE_URL || appConfig.api.baseUrl,
        },
      };
    
    case 'staging':
      return {
        ...appConfig,
        api: {
          ...appConfig.api,
          baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.example.com',
        },
      };
    
    case 'production':
      return {
        ...appConfig,
        api: {
          ...appConfig.api,
          baseUrl: import.meta.env.VITE_API_BASE_URL || appConfig.api.baseUrl,
        },
      };
    
    default:
      return appConfig;
  }
};

// Export the active configuration
export const config = getEnvironmentConfig();