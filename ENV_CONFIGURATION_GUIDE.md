# Environment Configuration Guide

## Overview
The application uses environment variables for configuration. Both `.env.local` (for development) and `.env.example` (for reference) have been created.

## Files Created

### `.env.local` - Development Configuration
This file is used during development and contains your actual configuration values.
- **Never commit this file to version control** (it's in .gitignore)
- Contains sensitive information and local settings

### `.env.example` - Template/Reference
This file shows all available environment variables with examples.
- Safe to commit to version control
- Provides documentation for team members
- Shows all configurable options

## Configuration Variables

### API Configuration

#### `NEXT_PUBLIC_API_URL`
- **Default**: `http://localhost:3031`
- **Description**: Base URL of your backend API server
- **Usage**: Used for all API requests
- **Example**: `NEXT_PUBLIC_API_URL=http://localhost:3031`

#### `NEXT_PUBLIC_API_BASE_URL`
- **Default**: `http://localhost:3031/api`
- **Description**: Full API base path
- **Usage**: Alternative way to configure API endpoints
- **Example**: `NEXT_PUBLIC_API_BASE_URL=http://localhost:3031/api`

### Frontend Configuration

#### `NEXT_PUBLIC_APP_NAME`
- **Default**: `CyberWhisper`
- **Description**: Application name displayed in the UI
- **Usage**: Branding and page titles

#### `NEXT_PUBLIC_APP_URL`
- **Default**: `http://localhost:3000`
- **Description**: Frontend application URL
- **Usage**: For generating links and redirects
- **Example**: `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### Feature Flags

#### `NEXT_PUBLIC_ENABLE_MOCK_DATA`
- **Default**: `false`
- **Description**: Use mock data instead of API calls
- **Options**: `true` or `false`
- **Usage**: Set to `true` to develop without backend API

#### `NEXT_PUBLIC_DEBUG_MODE`
- **Default**: `true`
- **Description**: Enable console logging for debugging
- **Options**: `true` or `false`
- **Usage**: Helps diagnose API issues

### Performance Configuration

#### `NEXT_PUBLIC_API_TIMEOUT`
- **Default**: `5000` (milliseconds)
- **Description**: API request timeout duration
- **Usage**: Prevents hanging requests

#### `NEXT_PUBLIC_USERS_PER_PAGE`
- **Default**: `10`
- **Description**: Users displayed per page in pagination
- **Usage**: Controls pagination in user list

#### `NEXT_PUBLIC_BLOGS_PER_PAGE`
- **Default**: `10`
- **Description**: Blogs displayed per page in pagination
- **Usage**: Controls pagination in blog list

#### `NEXT_PUBLIC_MAX_USERS_FETCH`
- **Default**: `1000`
- **Description**: Maximum users to fetch in a single API call
- **Usage**: Limits data transfer for large datasets

## How Environment Variables are Used

### In AdminContext.jsx
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
const response = await fetch(`${apiUrl}/api/users`);
```

### In Components
```javascript
const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
if (debugMode) {
    console.log('Debug information...');
}
```

## Setting Up Your Environment

### Step 1: Copy the Example File (First Time)
```bash
cp .env.example .env.local
```

### Step 2: Edit `.env.local`
Open `.env.local` and update values for your environment:

**For Local Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3031
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG_MODE=true
```

**For Production:**
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_URL=https://app.example.com
NEXT_PUBLIC_DEBUG_MODE=false
```

### Step 3: Restart Development Server
```bash
npm run dev
```

Changes to `.env.local` require server restart to take effect.

## Environment-Specific Configurations

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3031
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Staging
```env
NEXT_PUBLIC_API_URL=https://api-staging.example.com
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_API_TIMEOUT=10000
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_API_TIMEOUT=10000
```

## Accessing Environment Variables in Code

### Server-Side (Node.js only)
```javascript
const secret = process.env.DB_PASSWORD; // Not exposed to browser
```

### Client-Side (React Components)
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Exposed to browser
```

**Important**: Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser!

## Troubleshooting

### Issue: Environment variables not updating
**Solution**: Restart the development server
```bash
npm run dev
```

### Issue: API URL not being used
**Solution**: Check that:
1. Variable name starts with `NEXT_PUBLIC_`
2. Variable is in `.env.local` (not `.env.example`)
3. Server has been restarted

### Issue: API requests still going to hardcoded URL
**Solution**: Make sure the code uses environment variable:
```javascript
// ✅ Correct
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
fetch(`${apiUrl}/api/users`);

// ❌ Wrong
fetch('http://localhost:3031/api/users');
```

## Current Configuration

Your current `.env.local` is set up for:
- **Backend API**: `http://localhost:3031`
- **Frontend App**: `http://localhost:3000`
- **Debug Mode**: Enabled (shows console logs)
- **Mock Data**: Disabled (uses actual API)

## What's Next

When you want to deploy:
1. Create `.env.production` with production URLs
2. Set `NEXT_PUBLIC_DEBUG_MODE=false`
3. Update `NEXT_PUBLIC_API_URL` to production API endpoint
4. Build and deploy: `npm run build && npm start`

## Security Notes

⚠️ **Important Security Tips:**
- Never commit `.env.local` to version control
- Never put secrets in `NEXT_PUBLIC_*` variables (they're visible in browser)
- For sensitive data (API keys, passwords), use server-side only variables
- Rotate secrets regularly
- Keep `.env.example` updated as new variables are added
