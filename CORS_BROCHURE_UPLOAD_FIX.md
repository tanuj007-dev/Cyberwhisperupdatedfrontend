# ✅ CORS Error Fix for Brochure Upload

## Problem Fixed
The brochure upload was failing with CORS errors because:
1. The frontend (localhost:3000) was trying to directly access the backend (localhost:3031)
2. The Next.js proxy configuration was incomplete - only covered `/api/users` endpoints
3. The API configuration was pointing to production URL instead of using the local proxy

## Changes Made

### 1. Updated `next.config.mjs`
Added comprehensive proxy rules for all backend API endpoints:
- `/api/users/:path*` → User management
- `/api/admin/:path*` → Admin authentication  
- `/api/courses/:path*` → Courses management (including brochure upload)
- `/api/brochure/:path*` → Brochure management
- `/api/gallery/:path*` → Gallery management
- `/api/media/:path*` → Media management
- `/api/newsletter/:path*` → Newsletter
- `/api/deploy-team-training/:path*` → Deploy team training
- `/api/batches/:path*` → Batches
- `/api/blogs/:path*` → Blogs
- `/api/helpcenter/:path*` → Help center
- `/api/enquiries/:path*` → Enquiries

### 2. Updated `lib/apiConfig.js`
Modified the API configuration to:
- Use local proxy (`http://localhost:3000`) in development mode
- Use production backend URL in production
- Automatically detect development vs production environment

## How It Works Now

**Development Mode:**
```
Frontend (localhost:3000) → Next.js Proxy (localhost:3000) → Backend (localhost:3031) ✅
```

**Production Mode:**
```
Frontend → Backend (direct) ✅
```

## Next Steps

### ⚠️ IMPORTANT: Restart Your Dev Server

The changes won't take effect until you restart the Next.js development server:

1. **Stop the current server**: Press `Ctrl+C` in the terminal running `npm run dev`
2. **Start it again**: Run `npm run dev`
3. **Wait for it to compile**
4. **Try uploading a brochure again**

## Testing

After restarting:

1. Go to `http://localhost:3000/admin/courses/add`
2. Fill in the course details
3. Under "Course brochure (PDF)", click "Choose PDF"
4. Select a PDF file (under 200MB)
5. The upload should now work without CORS errors

## Verification

Check the Network tab in DevTools:
- Request URLs should be: `http://localhost:3000/api/...` (not 3031)
- Status should be: `200` or `201`
- No CORS errors in console

## Troubleshooting

### Still getting CORS error?
- Make sure you restarted the dev server
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Ctrl+Shift+R)

### Backend not running?
- Check if backend is on port 3031: `netstat -ano | findstr "3031"`
- Start your backend server if it's not running

## Summary

✅ Next.js proxy configured for all API endpoints  
✅ API configuration updated to use proxy in development  
✅ CORS error should be completely resolved  
⏳ **Action Required**: Restart dev server  
🎯 **Then**: Try uploading brochure again  

The brochure upload should now work perfectly! 🎉
