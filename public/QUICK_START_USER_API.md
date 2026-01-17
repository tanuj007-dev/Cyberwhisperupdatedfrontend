# 🚀 Quick Start: Create Users via API

## ✅ Status: FULLY INTEGRATED

Your application is **already configured** to create users dynamically through the API!

## 🎯 Quick Access

### Admin Panel (Recommended)
```
http://localhost:3000/admin/users
```
Click "Add New User" → Fill form → Click "Create"

### Direct API Call (cURL)
```bash
curl --location 'http://localhost:3031/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "title": "Senior Engineer",
  "address": "123 Street, City",
  "biography": "Professional bio here",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "role": "INSTRUCTOR",
  "is_instructor": true,
  "profile_image_url": "https://example.com/image.jpg",
  "skills": []
}'
```

### Test Script
```bash
node test_user_creation.js
```

## 📋 Required Fields

- ✅ `first_name` - User's first name
- ✅ `last_name` - User's last name
- ✅ `email` - Valid email address

## 🔧 Optional Fields

- `phone` - Phone number
- `password` - Password (defaults to `TempPass@123`)
- `title` - Job title/position
- `address` - Physical address
- `biography` - User bio
- `linkedin_url` - LinkedIn profile URL
- `github_url` - GitHub profile URL
- `role` - USER, INSTRUCTOR, or ADMIN
- `is_instructor` - Boolean (true/false)
- `profile_image_url` - Profile image URL
- `skills` - Array of skills

## 🎨 Features

✅ Form validation  
✅ Image upload (drag & drop)  
✅ Role management  
✅ Instructor toggle  
✅ Real-time error messages  
✅ Success notifications  
✅ Automatic list refresh  

## 🐛 Troubleshooting

### Backend Not Running?
```powershell
netstat -ano | findstr "3031"
```

### Check Console Logs
Press `F12` → Console tab → Watch for API logs

### Common Errors

**400 Bad Request** → Check required fields  
**500 Server Error** → Check backend logs  
**Network Error** → Ensure backend is running  

## 📚 Documentation

- `USER_API_INTEGRATION_GUIDE.md` - Complete guide
- `API_CREATE_USER_DEBUG_GUIDE.md` - Debug guide
- `test_user_creation.js` - Test script

## 🎉 You're Ready!

The integration is complete. Just start creating users through the admin panel!
