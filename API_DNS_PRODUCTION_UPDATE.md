# ✅ API DNS Changed to Production URL

## Changes Made

### 1. Updated API Configuration
**File**: `lib/apiConfig.js`

**Before**: Used local proxy in development mode
```javascript
// Complex logic with development/production switching
const isDevelopment = process.env.NODE_ENV === 'development';
const developmentApiBase = 'http://localhost:3000';
```

**After**: Always uses production URL
```javascript
const DEFAULT_API_BASE = 'https://darkred-mouse-801836.hostingersite.com';
export const API_BASE_URL = DEFAULT_API_BASE;
```

### 2. Updated Course Add Page
**File**: `app/admin/courses/add/page.jsx`

**Before**: Called local Next.js route
```javascript
const res = await fetch(`/api/courses/brochure-upload`, {
```

**After**: Calls production backend API directly
```javascript
const res = await fetch(`${API_BASE_URL}/api/brochure-downloads/upload`, {
```

### 3. Updated Course Edit Page
**File**: `app/admin/courses/edit/[id]/page.jsx`

**Before**: Called local Next.js route
```javascript
const res = await fetch(`/api/courses/brochure-upload`, {
```

**After**: Calls production backend API directly
```javascript
const res = await fetch(`${API_BASE_URL}/api/brochure-downloads/upload`, {
```

## New Architecture

### Before (Local Development):
```
Frontend (localhost:3000)
    ↓ POST /api/courses/brochure-upload
Next.js Route (localhost:3000)
    ↓ POST /api/brochure-downloads/upload
Backend API (localhost:3031)
```

### After (Production Direct):
```
Frontend (localhost:3000)
    ↓ POST https://darkred-mouse-801836.hostingersite.com/api/brochure-downloads/upload
Backend API (Production)
```

## Benefits

1. ✅ **Direct Production Access**: No more local proxy dependencies
2. ✅ **Simplified Architecture**: Fewer moving parts
3. ✅ **Production Ready**: Same configuration in dev and prod
4. ✅ **CORS Free**: Direct API calls avoid CORS issues

## Important Notes

### CORS Considerations
Since you're now calling the production API directly from localhost, ensure your production backend has CORS configured to allow requests from `http://localhost:3000`.

### Backend CORS Configuration
Your production backend should include:
```javascript
// Example for Express.js
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));
```

### Authorization
The JWT token from your local development will be sent to the production backend. Ensure:
- Production backend accepts your development tokens
- Or use production tokens for testing

## Testing

### Prerequisites:
1. Production backend running at `https://darkred-mouse-801836.hostingersite.com`
2. CORS properly configured on production backend
3. Valid JWT token for production backend

### Test Steps:
1. Go to `http://localhost:3000/admin/courses/add`
2. Try uploading a brochure PDF
3. Should connect directly to production API
4. File should upload to production storage

### Expected Network Requests:
- `POST https://darkred-mouse-801836.hostingersite.com/api/brochure-downloads/upload`
- Status: 200 (success) or appropriate error code
- No more local route calls

## Troubleshooting

### CORS Errors
If you get CORS errors:
1. Check production backend CORS configuration
2. Ensure `http://localhost:3000` is allowed
3. Verify preflight OPTIONS requests are handled

### Authorization Errors
If you get 401 errors:
1. Check if your JWT token is valid for production
2. Verify token format and expiration
3. Ensure backend accepts the token

### Network Errors
If you get connection errors:
1. Verify production backend is accessible
2. Check if the endpoint URL is correct
3. Ensure no firewall blocks the request

## Summary

✅ API DNS changed to production URL  
✅ Direct backend API integration  
✅ Simplified upload flow  
✅ Production-ready configuration  
✅ CORS considerations documented  

The brochure upload now connects directly to your production backend API! 🎉
