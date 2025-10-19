# Connect Your Friends - React App

A responsive React application for managing friends and acquaintances with component-based architecture, built with TypeScript and Vite.

## Features

- 📱 **Responsive Design**: Optimized for both mobile and desktop
- 🔍 **Search Functionality**: Search friends by name or nickname
- 👥 **Friend Groups**: Automatically categorizes friends and acquaintances
- 🎨 **.NET MAUI Theme**: Purple color scheme matching Microsoft's design language
- 🔧 **TypeScript**: Full type safety throughout the application
- ⚡ **Fast Development**: Powered by Vite with hot module replacement

## Configuration

The app uses a centralized configuration system located in `src/config/app.config.ts`:

### API Configuration

You can customize the API base URL through environment variables:

1. Copy `.env.example` to `.env.local`
2. Set your custom API base URL:
   ```
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

### Data Sources

The app supports two data loading modes:

- **Network Mode**: Loads data from remote API (default: Azure Blob Storage)
- **Local Mode**: Loads data from local JSON file

To switch between modes, update the import in `src/hooks/useFriends.ts`:

```typescript
// For network data:
import { fetchFriends } from '../services/friendsService';

// For local data:
import { localFriendsService } from '../services/localFriendsService';
```

## Quick Start

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FriendDetails/   # Friend profile view
│   ├── FriendsList/     # Friends listing with groups
│   ├── SearchBar/       # Search functionality
│   └── ...
├── config/              # App configuration
├── data/                # Local JSON data files
├── hooks/               # Custom React hooks
├── services/            # API and data services
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Architecture

This application follows React best practices:

- **Component-Based Architecture**: Modular, reusable components
- **Custom Hooks**: Business logic separated from UI components
- **TypeScript**: Full type safety and intellisense
- **Responsive Design**: Mobile-first CSS with breakpoints
- **Service Layer**: Abstracted data fetching with error handling

## Development

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
