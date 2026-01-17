# User API Integration Guide

## ✅ Integration Status

**Good News!** The user creation API is **already fully integrated** into your CyberWhisper application. You can create users dynamically through the admin panel.

## 🔧 How It Works

### API Endpoint Configuration

The application uses the following API endpoint to create users:

```
POST http://localhost:3031/api/users
Content-Type: application/json
```

### Environment Variables

The API URL is configured in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3031
NEXT_PUBLIC_API_BASE_URL=http://localhost:3031/api
```

## 📋 How to Create Users Dynamically

### Method 1: Using the Admin Panel (UI)

1. **Navigate to Users Page**
   - Go to `http://localhost:3000/admin/users`

2. **Click "Add New User" Button**
   - This opens a modal form

3. **Fill in User Details**
   - **Required Fields:**
     - First Name
     - Last Name
     - Email
   - **Optional Fields:**
     - Phone
     - Password (defaults to `TempPass@123` if not provided)
     - Title/Position
     - Address
     - Biography
     - LinkedIn URL
     - GitHub URL
     - Profile Image (drag & drop or click to upload)
     - Role (USER, INSTRUCTOR, ADMIN)
     - Status (active/inactive)
     - Mark as Instructor (checkbox)
     - Skills (array)

4. **Click "Create" Button**
   - The form data is sent to the API
   - User is created in the database
   - User list is automatically refreshed

### Method 2: Using cURL (Direct API Call)

You can also create users directly using the API:

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

## 🔍 Code Implementation

### AdminContext.jsx

The `addUser` function in `contexts/AdminContext.jsx` handles user creation:

```javascript
const addUser = async (user) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone || '',
            password: user.password || 'TempPass@123',
            title: user.title || '',
            address: user.address || '',
            biography: user.biography || '',
            linkedin_url: user.linkedin_url || '',
            github_url: user.github_url || '',
            role: user.role === 'INSTRUCTOR' || user.is_instructor ? 'INSTRUCTOR' : 'USER',
            is_instructor: user.is_instructor || false,
            profile_image_url: user.profile_image_url || '',
            skills: user.skills || []
        };

        console.log('Creating user with payload:', payload);

        const response = await fetch(`${apiUrl}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include',
            mode: 'cors'
        });

        console.log('Create user response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error(`Failed to create user: ${response.status} - ${errorText}`);
        }

        const newUser = await response.json();
        console.log('User created successfully:', newUser);
        
        // Refresh user list from API
        await fetchUsers();
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw error;
    }
};
```

### User Management Page

The user management page (`app/admin/users/page.jsx`) provides:

- ✅ User creation form with validation
- ✅ Image upload functionality
- ✅ Role and status management
- ✅ Instructor designation
- ✅ Real-time form validation
- ✅ Success/error toast notifications
- ✅ Automatic list refresh after creation

## 🎯 Features

### 1. **Form Validation**
- Email format validation
- Required field checking
- Real-time error messages

### 2. **Image Upload**
- Drag & drop support
- File size validation (max 5MB)
- Image preview
- Upload to Cloudinary
- Endpoint: `http://localhost:3031/api/users/upload-profile`

### 3. **Role Management**
- USER (Student)
- INSTRUCTOR
- ADMIN

### 4. **Instructor Toggle**
- Checkbox to mark user as instructor
- Automatically sets role to INSTRUCTOR when checked

### 5. **Error Handling**
- Network error handling
- Server error messages
- User-friendly error notifications
- Console logging for debugging

## 🧪 Testing the Integration

### Step 1: Ensure Backend is Running

Check if your backend is running on port 3031:

```powershell
netstat -ano | findstr "3031"
```

You should see:
```
TCP    127.0.0.1:3031    0.0.0.0:0    LISTENING    [PID]
```

### Step 2: Open Browser DevTools

1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Keep it open while testing

### Step 3: Create a Test User

1. Navigate to `http://localhost:3000/admin/users`
2. Click "Add New User"
3. Fill in the form:
   ```
   First Name: Test
   Last Name: User
   Email: test.user@example.com
   Phone: +1234567890
   Password: Test@123
   Title: Test Engineer
   Role: INSTRUCTOR
   Mark as Instructor: ✓
   ```
4. Click "Create"

### Step 4: Check Console Logs

You should see logs like:

```
Creating user with payload: { first_name: "Test", ... }
Create user response status: 201
User created successfully: { id: X, ... }
Fetching users from API...
Users fetched successfully: N users
```

### Step 5: Verify in Database

The user should now appear in:
- The users table in your admin panel
- Your database
- The API response when fetching users

## 🐛 Debugging

### Common Issues

#### Issue 1: "Failed to create user: 400 - Bad Request"
**Solution:**
- Check the payload in console
- Verify all required fields are filled
- Check email format

#### Issue 2: "Failed to create user: 500 - Internal Server Error"
**Solution:**
- Check backend logs
- Verify database connection
- Restart backend server

#### Issue 3: Image upload fails
**Solution:**
- Check file size (max 5MB)
- Verify file is an image
- Check Cloudinary configuration in backend

### Debug Mode

Enable debug mode in `.env.local`:
```env
NEXT_PUBLIC_DEBUG_MODE=true
```

This will show detailed console logs for all API operations.

## 📊 API Response Format

### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "INSTRUCTOR",
    "is_instructor": true,
    "status": "active",
    "profile_image_url": "https://...",
    "created_at": "2026-01-16T12:00:00Z"
  }
}
```

### Error Response (4xx/5xx)

```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🔄 CRUD Operations

The integration supports all CRUD operations:

### Create User
```javascript
await addUser(userData);
```

### Read Users
```javascript
// Fetches all users from API
await fetchUsers();

// Get specific user
await getUserById(userId);
```

### Update User
```javascript
await updateUser(userId, updatedData);
```

### Delete User
```javascript
await deleteUser(userId);
```

## 📝 Data Flow

```
User fills form → Validation → API Request → Backend Processing → Database Insert → Response → UI Update → List Refresh
```

## 🎨 UI Features

- **Modern Design**: Gradient buttons, rounded corners, smooth transitions
- **Responsive**: Works on all screen sizes
- **Drag & Drop**: Image upload with drag & drop
- **Real-time Validation**: Instant feedback on form errors
- **Toast Notifications**: Success/error messages
- **Loading States**: Skeleton loaders and spinners
- **Search & Filter**: Find users by name, email, role, status
- **Pagination**: Handle large user lists

## 🚀 Next Steps

1. **Test the Integration**
   - Create a few test users through the UI
   - Verify they appear in the database

2. **Customize as Needed**
   - Add more fields to the form
   - Modify validation rules
   - Adjust role options

3. **Monitor Performance**
   - Check API response times
   - Monitor database queries
   - Optimize as needed

## 📚 Related Files

- `contexts/AdminContext.jsx` - API integration logic
- `app/admin/users/page.jsx` - User management UI
- `.env.local` - Environment configuration
- `API_CREATE_USER_DEBUG_GUIDE.md` - Detailed debugging guide

## ✅ Summary

Your application is **fully configured** to create users dynamically through the API. The integration includes:

- ✅ Complete CRUD operations
- ✅ Form validation
- ✅ Image upload
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Automatic list refresh
- ✅ Debug logging
- ✅ Responsive design

**You're ready to start creating users!** 🎉
