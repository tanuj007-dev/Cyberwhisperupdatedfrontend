# ✅ Brochure Upload Integration with Backend API

## Overview
The brochure upload system has been updated to use your backend API endpoint `/api/brochure-downloads/upload` for uploading and storing brochures. The system handles presigned URLs and saves the brochure information to your database.

## Architecture

### Upload Flow
```
Frontend (Course Add/Edit) 
    ↓ 
Next.js API Route (/api/courses/brochure-upload)
    ↓ 
Backend API (/api/brochure-downloads/upload)
    ↓ 
Cloud Storage (S3/Other) + Database
```

## Changes Made

### 1. Updated Next.js API Route
**File**: `app/api/courses/brochure-upload/route.js`

- **Before**: Handled local file storage, S3, Cloudinary directly
- **After**: Forwards requests to your backend API with proper authorization

**Key Features**:
- Validates file size (200MB max)
- Extracts authorization token from request headers
- Forwards FormData to your backend API
- Returns the response from your backend (presigned URLs, file URLs, etc.)

### 2. CORS Configuration
**File**: `next.config.mjs`

Added comprehensive proxy rules to prevent CORS issues:
- `/api/courses/:path*` → `http://localhost:3031/api/courses/:path*`
- `/api/brochure-downloads/:path*` → `http://localhost:3031/api/brochure-downloads/:path*`

### 3. API Configuration
**File**: `lib/apiConfig.js`

Updated to use local proxy in development mode:
- Development: Uses `http://localhost:3000` (proxy)
- Production: Uses production backend URL

## How It Works

### Frontend Upload Process
1. User selects PDF file in course add/edit form
2. File validation (PDF type, 200MB max)
3. Upload to `/api/courses/brochure-upload` with authorization token
4. Next.js route forwards to your backend API
5. Backend processes upload and returns URL/presigned URL
6. URL is stored in course form and saved to database

### Backend API Integration
Your backend API endpoint should:
```bash
POST /api/brochure-downloads/upload
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body:
  file: <PDF file>

Expected Response:
{
  "success": true,
  "url": "https://your-storage.com/brochures/filename.pdf",
  "presigned_url": "https://...", // if applicable
  "file_id": "123", // if applicable
  // ... other fields your backend returns
}
```

## Frontend Response Handling

The frontend is designed to handle various response formats from your backend:

```javascript
const raw = data.url ?? data.uri ?? data.file_url ?? data.file_uri ?? 
          data.fileUrl ?? data.brochure_url ?? data.brochure_uri ?? 
          data.download_url ?? data.link ?? data.result ??
          data.data?.url ?? data.data?.uri ?? data.data?.file_url ??
          // ... more fallbacks
```

This means your backend can return the URL in any of these common field names.

## Usage in Course Forms

### Adding a Course
1. Go to `/admin/courses/add`
2. Fill in course details
3. Under "Course brochure (PDF)", click "Choose PDF"
4. Select PDF file (max 200MB)
5. File uploads automatically to your backend
6. URL is stored and will be saved when course is created

### Editing a Course
1. Go to `/admin/courses/edit/[id]`
2. Same upload process as adding
3. Existing brochure can be replaced or removed

## Error Handling

### Frontend Errors
- File type validation (PDF only)
- File size validation (200MB max)
- Authorization token validation
- Network error handling

### Backend Errors
- Authorization failures
- File upload failures
- Storage errors
- Database errors

All errors are displayed to the user via alert messages.

## Security Considerations

1. **Authorization**: All uploads require valid JWT token
2. **File Validation**: PDF type and size limits enforced
3. **CORS**: Properly configured for development
4. **Token Forwarding**: Authorization token passed to backend

## Testing

### Prerequisites
1. Backend server running on port 3031
2. Valid admin JWT token
3. `/api/brochure-downloads/upload` endpoint functional

### Test Steps
1. Start development server: `npm run dev`
2. Login to admin panel
3. Go to course add/edit page
4. Try uploading a PDF brochure
5. Check network tab for successful requests
6. Verify URL is returned and stored

## Troubleshooting

### CORS Errors
- Ensure backend server is running
- Check proxy configuration in `next.config.mjs`
- Verify API configuration in `lib/apiConfig.js`

### Upload Failures
- Check authorization token validity
- Verify backend endpoint is accessible
- Check backend logs for errors
- Ensure file meets size/type requirements

### Missing URL
- Verify backend response format
- Check response field names
- Ensure backend returns a valid URL

## Production Deployment

In production, the system will:
1. Use production backend URL directly
2. Bypass Next.js proxy
3. Connect directly to your backend API

Ensure your production backend has:
- Proper CORS configuration
- JWT authentication
- File upload handling
- Database storage for brochure URLs

## Summary

✅ Backend API integration complete  
✅ Authorization token forwarding implemented  
✅ CORS issues resolved  
✅ File validation in place  
✅ Error handling implemented  
✅ Works for both add and edit course pages  

The brochure upload system is now fully integrated with your backend API and ready for use! 🎉
