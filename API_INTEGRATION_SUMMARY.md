# API Integration Summary - User Management

## Overview
Successfully integrated the backend API (`http://localhost:3031/api/users`) with the frontend user management system to enable dynamic user creation, updates, and deletions with persistent database storage.

## Changes Made

### 1. AdminContext.jsx - API Integration
**File:** [contexts/AdminContext.jsx](contexts/AdminContext.jsx)

#### User CRUD Operations Updated to Use API:
- **`addUser()`**: Now makes POST request to `http://localhost:3031/api/users`
  - Sends user data with fields: first_name, last_name, email, phone, password, title, address, biography, linkedin_url, github_url, role, is_instructor, profile_image_url, skills
  - Fallback to local state if API fails

- **`updateUser()`**: Now makes PUT request to `http://localhost:3031/api/users/{id}`
  - Updates user information in the database
  - Fallback to local state if API fails

- **`deleteUser()`**: Now makes DELETE request to `http://localhost:3031/api/users/{id}`
  - Removes user from database
  - Fallback to local state if API fails

### 2. Main Users Page - Enhanced Modal Form
**File:** [app/admin/users/page.jsx](app/admin/users/page.jsx)

#### New Form Fields Added:
- **Profile Image URL**: For user avatar/profile pictures
- **Biography**: Textarea for user professional background
- **LinkedIn URL**: Social media profile
- **GitHub URL**: Developer portfolio link
- **Password**: For new user creation (optional on edit)

#### Updated Form Data Structure:
```javascript
{
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  role: 'USER',           // Changed from role_id
  status: 'active',
  is_instructor: false,
  title: '',
  address: '',
  biography: '',
  linkedin_url: '',
  github_url: '',
  profile_image_url: '',
  password: '',
  skills: []
}
```

#### Role Selection Updated:
- Changed from numeric role_id (1,2,3,4) to string-based roles
- Options: `USER` or `INSTRUCTOR`
- Syncs with backend API role field

#### Form Submission:
- Made async with error handling
- Displays toast notifications on success/failure
- Closes modal on successful submission

### 3. Add User Page - Enhanced Form
**File:** [app/admin/users/add/page.jsx](app/admin/users/add/page.jsx)

#### Changes:
- Updated form data structure to match new fields
- Added input fields for: LinkedIn URL, GitHub URL, Profile Image URL, Biography
- Changed role selection from role_id dropdown to USER/INSTRUCTOR radio buttons
- Updated password field handling
- Made handleSubmit async for API calls
- Removed Twitter field (kept only LinkedIn and GitHub)
- Removed Status field from role section

#### Social Links Section:
```jsx
- LinkedIn URL input
- GitHub URL input
```

### 4. Edit User Page - Enhanced Form
**File:** [app/admin/users/edit/[id]/page.jsx](app/admin/users/edit/[id]/page.jsx)

#### Changes:
- Mirrored changes from add user page
- Updated field references from social_links object to individual fields
- Made handleSubmit async for API calls
- Updated role selection method
- Profile image field name corrected to `profile_image_url`

## API Payload Format

### POST Request (Create User)
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "title": "Senior Developer",
  "address": "123 Cyber Street, Tech City",
  "biography": "Experienced professional...",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "role": "INSTRUCTOR",
  "is_instructor": true,
  "profile_image_url": "https://example.com/image.jpg",
  "skills": ["JavaScript", "React"]
}
```

### PUT Request (Update User)
Same structure as POST, but without password field (password is not updated unless explicitly set)

## Database Persistence
- All user data is now saved to the database at `http://localhost:3031`
- Users created/updated through the admin panel are persisted
- Data persists across server restarts
- Fallback mechanism ensures frontend continues to work even if backend is temporarily unavailable

## Field Mappings

| Frontend Field | API Field | Type | Notes |
|---|---|---|---|
| first_name | first_name | String | Required |
| last_name | last_name | String | Required |
| email | email | String | Required, valid email |
| phone | phone | String | |
| title | title | String | Job title/position |
| address | address | String | Location information |
| biography | biography | String | Professional background |
| linkedin_url | linkedin_url | String | Social profile URL |
| github_url | github_url | String | Developer profile URL |
| profile_image_url | profile_image_url | String | Avatar URL |
| role | role | String | "USER" or "INSTRUCTOR" |
| is_instructor | is_instructor | Boolean | Can create courses |
| password | password | String | Only for new users |
| skills | skills | Array | List of user skills |

## Error Handling
- Try-catch blocks wrap all API calls
- Toast notifications inform users of success/failure
- Console errors logged for debugging
- Graceful fallback to local state if API unavailable

## Testing the Integration

### Create a New User:
1. Navigate to Admin > Users
2. Click "Add New User"
3. Fill in the form with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: +1234567890
   - Password: TestPass@123
   - Biography: Test biography
   - LinkedIn/GitHub URLs (optional)
   - Role: USER or INSTRUCTOR
4. Click "Create User"
5. User is saved to database and appears in the users list

### Edit a User:
1. Click Edit (pencil icon) on any user
2. Modify fields as needed
3. Click "Update User"
4. Changes are saved to database

### Delete a User:
1. Click Delete (trash icon) on any user
2. Confirm deletion
3. User is removed from database

## API Endpoint Details

- **Base URL**: `http://localhost:3031/api/users`
- **Create**: `POST /api/users`
- **Read**: `GET /api/users` or `GET /api/users/{id}`
- **Update**: `PUT /api/users/{id}`
- **Delete**: `DELETE /api/users/{id}`

## Notes
- Backend API must be running at `http://localhost:3031`
- All data is now persistent in the database
- Previous mock data structure has been replaced with actual API calls
- Frontend gracefully handles API failures with fallback to local state
