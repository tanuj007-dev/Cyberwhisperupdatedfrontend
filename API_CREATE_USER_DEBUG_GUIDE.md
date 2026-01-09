# API User Creation Debugging Guide

## Current Status
✅ Enhanced error logging and debugging added to all API operations
✅ Better error messages with detailed feedback
✅ Console logging for troubleshooting

## What Changed

### 1. AdminContext.jsx - Enhanced Logging

#### fetchUsers()
```javascript
console.log('Fetching users from API...');
console.log('Fetch users response status:', response.status);
console.log('Users fetched successfully:', usersList.length, 'users');
```

#### addUser()
```javascript
console.log('Creating user with payload:', payload);
console.log('Create user response status:', response.status);
console.log('User created successfully:', newUser);
// Error logging
console.error('Error response from server:', errorText);
```

#### updateUser() & deleteUser()
Similar enhanced logging with request/response details

### 2. Users Page - Better Error Handling

```javascript
const handleSubmit = async () => {
    try {
        // ... code ...
    } catch (error) {
        const errorMessage = error?.message || 'Error saving user';
        showToast(errorMessage, 'error');
        console.error('Submit error:', error);
    }
};
```

## How to Debug User Creation Issues

### Step 1: Open Browser DevTools
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Keep Console open while testing

### Step 2: Try Creating a User
1. Go to `http://localhost:3000/admin/users`
2. Click "Add New User" button
3. Fill in the form with test data:
   ```
   First Name: John
   Last Name: Doe
   Email: john@example.com
   Phone: +1234567890
   Password: TestPass@123
   Title: Senior Developer
   Biography: Test user
   LinkedIn: https://linkedin.com/in/johndoe
   GitHub: https://github.com/johndoe
   Profile Image: https://example.com/image.jpg
   Mark as Instructor: ✓
   ```
4. Click "Create User"

### Step 3: Check Console Logs

You should see logs like:
```
Creating user with payload: {
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  ...
}

Create user response status: 201  (or 200)

User created successfully: {
  id: 1,
  first_name: "John",
  ...
}

Users fetched successfully: 2 users
```

### Step 4: Common Errors & Solutions

#### Error: "Failed to create user: 400 - Bad Request"
**Cause**: Invalid data format or missing required fields
**Solution**: 
- Check the payload in console
- Verify all required fields are filled
- Check field data types (email format, etc.)
- Verify backend API documentation

#### Error: "Failed to create user: 401 - Unauthorized"
**Cause**: Authentication/token issue
**Solution**:
- Backend might require authentication headers
- Add auth token if needed

#### Error: "Failed to create user: 422 - Unprocessable Entity"
**Cause**: Validation error on backend
**Solution**:
- Check validation rules on backend
- Email might already exist
- Fields might not meet requirements

#### Error: "Failed to create user: 500 - Internal Server Error"
**Cause**: Server error
**Solution**:
- Check backend logs for detailed error
- Restart backend server
- Verify database connection

### Step 5: Check Network Tab

1. Open DevTools → **Network** tab
2. Create a user
3. Look for the API request:
   - **URL**: `http://localhost:3031/api/users`
   - **Method**: POST
   - **Status**: Should be 200, 201, or similar success code (2xx)
   - **Response**: Should contain the new user data

### Step 6: Verify Backend API

Test the API directly with cURL:

```bash
curl --location 'http://localhost:3031/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "first_name": "John23",
  "last_name": "Doe",
  "email": "john23.doe@example.com",
  "phone": "+1234464890",
  "password": "SecurePass123!",
  "title": "Senior Security Engineer",
  "address": "123 Cyber Street, Tech City",
  "biography": "Experienced cybersecurity professional with 10+ years in the field",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "role": "INSTRUCTOR",
  "is_instructor": true,
  "profile_image_url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767788923/cyberwhisper/users/profiles/ime2evfm62sb23xri2ee.jpg",
  "skills": []
}'
```

If this works in cURL but fails in the UI, it's a frontend issue.
If this fails in cURL too, it's a backend issue.

## What Data is Sent to API

When you create a user via the modal form, this exact payload is sent:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "TestPass@123",
  "title": "Senior Developer",
  "address": "",
  "biography": "Test user",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "role": "INSTRUCTOR",
  "is_instructor": true,
  "profile_image_url": "https://example.com/image.jpg",
  "skills": []
}
```

## API Endpoint Details

### Create User
- **URL**: `http://localhost:3031/api/users`
- **Method**: POST
- **Content-Type**: application/json
- **Expected Response Status**: 200 or 201
- **Response Body**: User object with ID

### Get All Users
- **URL**: `http://localhost:3031/api/users?page=1&limit=1000`
- **Method**: GET
- **Expected Response Status**: 200
- **Response Body**: Array of users or paginated object

### Get User by ID
- **URL**: `http://localhost:3031/api/users/{id}`
- **Method**: GET
- **Expected Response Status**: 200
- **Response Body**: User object

### Update User
- **URL**: `http://localhost:3031/api/users/{id}/update`
- **Method**: PUT
- **Content-Type**: application/json
- **Expected Response Status**: 200
- **Response Body**: Updated user object

### Delete User
- **URL**: `http://localhost:3031/api/users/{id}`
- **Method**: DELETE
- **Expected Response Status**: 200 or 204
- **Response Body**: Confirmation or empty

## Verifying Backend is Running

Check if backend is listening on port 3031:

```powershell
netstat -ano | findstr "3031"
```

If you see output like:
```
TCP    127.0.0.1:3031    0.0.0.0:0    LISTENING    12345
```

The backend is running ✅

## Next Steps if Still Having Issues

1. **Check browser console** - Copy any error messages
2. **Check backend logs** - Look for error details
3. **Verify payload** - Match backend API schema
4. **Check CORS** - Ensure backend allows cross-origin requests
5. **Verify authentication** - If required, add auth headers

## Quick Test

To quickly verify everything is working:

1. Start frontend: `npm run dev` (running at port 3000)
2. Start backend: (running at port 3031)
3. Go to `http://localhost:3000/admin/users`
4. Check console for "Fetching users from API..." log
5. Try creating a user
6. Watch the console logs to see the request/response
