# User Profile Upload Fix

## Problem
When trying to upload a profile image while adding a user, the system was returning a 500 Internal Server Error because the API endpoint `/api/users/upload-profile` did not exist.

## Solution
Created a new API endpoint at `app/api/users/upload-profile/route.js` to handle profile image uploads.

## Implementation Details

### API Endpoint
- **Path**: `/api/users/upload-profile`
- **Method**: POST
- **Form Field**: `profile` (file)
- **Max File Size**: 5MB
- **Allowed Types**: Images only (image/*)
- **Storage**: `public/uploads/profiles/`
- **Response Format**:
  ```json
  {
    "success": true,
    "url": "/uploads/profiles/1234567890-filename.jpg",
    "profile_image_url": "/uploads/profiles/1234567890-filename.jpg",
    "message": "Profile image uploaded successfully"
  }
  ```

### Features
- ✅ CORS support
- ✅ File type validation
- ✅ File size validation (max 5MB)
- ✅ Automatic directory creation
- ✅ Unique filename generation with timestamp
- ✅ Filename sanitization
- ✅ Comprehensive error handling
- ✅ Detailed logging

### Testing

#### Using curl (Command Line)
```bash
curl --location 'http://localhost:3000/api/users/upload-profile' \
--form 'profile=@"/path/to/your/image.jpg"'
```

#### Using the Admin Panel
1. Navigate to `http://localhost:3000/admin/users`
2. Click "Add New User"
3. In the modal, find the "Profile Image" section
4. Drag and drop an image or click to select
5. The image should upload successfully

#### Expected Response
```json
{
  "success": true,
  "url": "/uploads/profiles/1738224567890-profile.jpg",
  "profile_image_url": "/uploads/profiles/1738224567890-profile.jpg",
  "message": "Profile image uploaded successfully"
}
```

### Error Handling

#### No File Provided (400)
```json
{
  "error": "No file provided",
  "message": "Please upload a profile image"
}
```

#### Invalid File Type (400)
```json
{
  "error": "File must be an image",
  "message": "Only image files are allowed"
}
```

#### File Too Large (400)
```json
{
  "error": "File size exceeds 5MB limit",
  "message": "Please upload a smaller image"
}
```

#### Server Error (500)
```json
{
  "error": "Failed to upload profile image",
  "details": "Error message here",
  "message": "An error occurred while uploading the image"
}
```

### Important Notes

1. **Port Configuration**: 
   - The Next.js app runs on port **3000** (not 3001)
   - API endpoint URL: `http://localhost:3000/api/users/upload-profile`
   - Environment variable `NEXT_PUBLIC_API_BASE_URL` is set to `http://localhost:3000/api`

2. **File Storage**:
   - Images are stored in `public/uploads/profiles/`
   - This directory is created automatically if it doesn't exist
   - Files are accessible via URL: `/uploads/profiles/filename.jpg`

3. **Filename Format**:
   - Pattern: `{timestamp}-{sanitized-original-name}.{ext}`
   - Example: `1738224567890-profile-image.jpg`
   - Special characters are removed for security

4. **Frontend Integration**:
   - The admin users page already has the upload UI
   - It sends the file with FormData using the field name `profile`
   - It handles the response and extracts the URL from multiple possible formats

## Files Modified/Created

### Created
- `app/api/users/upload-profile/route.js` - New API endpoint for profile uploads

### No Modifications Needed
- `app/admin/users/page.jsx` - Already had the upload UI and logic
- `.env.local` - Already had correct configuration

## Verification Checklist

- [x] API endpoint created
- [x] CORS headers configured
- [x] File validation implemented
- [x] Error handling added
- [x] Logging enabled
- [x] Directory auto-creation enabled
- [x] Unique filename generation
- [x] Sanitization implemented

## Next Steps

1. Restart your development server: `npm run dev`
2. Navigate to admin users page
3. Try uploading a profile image
4. Verify the image appears in `public/uploads/profiles/`
5. Confirm the URL is saved correctly in the user profile

## Troubleshooting

If you still encounter issues:

1. **Check the port**: Make sure you're using port 3000, not 3001
2. **Check console logs**: Look for detailed logs in the terminal
3. **Check file permissions**: Ensure the app can write to `public/uploads/`
4. **Clear browser cache**: Sometimes old errors are cached
5. **Restart dev server**: `Ctrl+C` then `npm run dev`

## Related Files

- User profile API: `app/api/users/route.js`
- User update API: `app/api/users/[id]/update/route.js`
- Admin users list: `app/admin/users/page.jsx`
- Admin context: `contexts/AdminContext.jsx`
