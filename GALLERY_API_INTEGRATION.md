# Gallery API Integration Guide

## Overview
The gallery system has been successfully integrated with dynamic API endpoints to manage and display images across the CyberWhisper application.

## API Endpoints

### 1. **GET /api/gallery** - Fetch All Images
Retrieves all gallery images from the backend.

**Frontend URL:** `http://localhost:3000/api/gallery`  
**Backend URL:** `http://localhost:3001/api/gallery`

**Response Structure:**
```json
{
  "images": [
    {
      "id": 1,
      "image_url": "https://example.com/image.jpg",
      "title": "Image Title",
      "context": "projects",
      "alt_text": "Image description",
      "tags": ["tag1", "tag2"],
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-01-23T10:00:00Z",
      "updated_at": "2026-01-23T10:00:00Z"
    }
  ]
}
```

### 2. **POST /api/gallery/upload** - Upload Image
Uploads a new image with metadata.

**Frontend URL:** `http://localhost:3000/api/gallery/upload`  
**Backend URL:** `http://localhost:3001/api/gallery/upload`

**Request Format:** `multipart/form-data`

**Form Fields:**
- `image` (File) - The image file to upload
- `title` (String) - Image title
- `context` (String) - Category context (projects, portfolio, team, events, training, facilities)
- `alt_text` (String) - Alternative text for accessibility
- `tags` (String) - Comma-separated tags
- `sort_order` (Number) - Display order
- `is_active` (Boolean) - Active status

**Example cURL:**
```bash
curl --location 'http://localhost:3000/api/gallery/upload' \
--form 'image=@"/path/to/image.png"' \
--form 'title="My Gallery Image"' \
--form 'context="projects"' \
--form 'alt_text="A beautiful image"' \
--form 'tags="photography,portfolio"' \
--form 'sort_order="1"' \
--form 'is_active="true"'
```

### 3. **PUT /api/gallery/{id}** - Update Image Metadata
Updates metadata for an existing image (does not change the image file).

**Frontend URL:** `http://localhost:3000/api/gallery/{id}`  
**Backend URL:** `http://localhost:3001/api/gallery/{id}`

**Request Format:** `application/json`

**Request Body:**
```json
{
  "title": "Updated Title",
  "context": "portfolio",
  "alt_text": "Updated alt text",
  "tags": ["tag1", "tag2"],
  "sort_order": 5,
  "is_active": true
}
```

**Example cURL:**
```bash
curl --location 'http://localhost:3000/api/gallery/3' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Updated Title",
  "context": "portfolio",
  "alt_text": "Updated alt text",
  "tags": ["tag1", "tag2"],
  "sort_order": 5,
  "is_active": true
}'
```

### 4. **DELETE /api/gallery/{id}/remove** - Delete Image
Permanently deletes an image and its metadata.

**Frontend URL:** `http://localhost:3000/api/gallery/{id}/remove`  
**Backend URL:** `http://localhost:3001/api/gallery/{id}/remove`

**Example cURL:**
```bash
curl --location --request DELETE 'http://localhost:3000/api/gallery/3/remove'
```

## Frontend Integration

### Admin Panel (`/admin/gallery`)
Located at: `app/admin/gallery/page.jsx`

**Features:**
- ✅ Upload images with drag-and-drop
- ✅ View images in grid or list mode
- ✅ Search and filter by context and status
- ✅ Edit image metadata
- ✅ Delete images with confirmation
- ✅ Preview images in lightbox
- ✅ Real-time stats (total, active, contexts, filtered)
- ✅ Toast notifications for actions

**Usage:**
1. Navigate to `http://localhost:3000/admin/gallery`
2. Click "Upload Image" to add new images
3. Use filters to find specific images
4. Click action buttons (View, Edit, Delete) on images

### Public Gallery Page (`/gallery`)
Located at: `app/Component/GalleryPage.jsx`

**Features:**
- ✅ Dynamically fetches images from API
- ✅ Displays only active images
- ✅ Category filtering (All, Training, Team, Workshops, Events, Facilities)
- ✅ Lightbox modal for full-size viewing
- ✅ Image navigation (prev/next)
- ✅ Loading skeleton while fetching
- ✅ Error handling with fallback to static images
- ✅ Responsive grid layout
- ✅ Smooth animations

**Context Mapping:**
The API uses `context` field which maps to gallery categories:
- `projects` → Projects
- `portfolio` → Portfolio
- `team` → Team
- `events` → Events
- `training` → Training
- `facilities` → Facilities
- `workshop` → Workshops

## Configuration

### Environment Variables
Located at: `.env.local`

```bash
# Frontend API (Next.js dev server)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Backend API (Your actual backend server)
BACKEND_API_URL=http://localhost:3001
```

**Important:** 
- Frontend calls go to `http://localhost:3000/api/*`
- Next.js API routes proxy to `http://localhost:3001/api/*`
- This avoids CORS issues

## How It Works

### Request Flow
```
Browser → Next.js API Route → Backend API → Database
   ↓            ↓                  ↓
Frontend    Proxy Layer        Your Backend
(Port 3000) (Port 3000)       (Port 3001)
```

### Data Flow in Gallery Page
1. **Component Mounts** → `useEffect` triggers API call
2. **Fetch Images** → `GET /api/gallery`
3. **Parse Response** → Handle different response structures
4. **Filter Active** → Only show `is_active: true` images
5. **Map to Format** → Convert API data to gallery format
6. **Combine Data** → API images + static fallback images
7. **Render** → Display in grid with animations

### Error Handling
- **API Failure:** Falls back to static images
- **No Images:** Shows empty state with message
- **Loading:** Displays skeleton loaders
- **Network Error:** Shows error banner, continues with static images

## Testing

### Test Image Upload
```bash
curl --location 'http://localhost:3000/api/gallery/upload' \
--form 'image=@"test-image.jpg"' \
--form 'title="Test Image"' \
--form 'context="events"' \
--form 'alt_text="Test description"' \
--form 'tags="test,demo"' \
--form 'sort_order="1"' \
--form 'is_active="true"'
```

### Test Fetch Images
```bash
curl http://localhost:3000/api/gallery
```

### Test Update Metadata
```bash
curl --location 'http://localhost:3000/api/gallery/1' \
--header 'Content-Type: application/json' \
--data '{"title": "Updated Title", "is_active": true}'
```

### Test Delete Image
```bash
curl --location --request DELETE 'http://localhost:3000/api/gallery/1/remove'
```

## Troubleshooting

### Images Not Showing
1. Check if backend is running on port 3001
2. Verify `BACKEND_API_URL` in `.env.local`
3. Check browser console for API errors
4. Ensure images have `is_active: true`

### Upload Failing
1. Check file size limits
2. Verify FormData is being sent correctly
3. Check backend logs for errors
4. Ensure all required fields are provided

### CORS Errors
- Should not occur as we're using Next.js API routes as proxy
- If you see CORS errors, verify you're calling `/api/gallery` not the backend directly

## File Structure

```
app/
├── api/
│   └── gallery/
│       ├── route.js                    # GET /api/gallery
│       ├── upload/
│       │   └── route.js                # POST /api/gallery/upload
│       └── [id]/
│           ├── route.js                # GET, PUT /api/gallery/{id}
│           └── remove/
│               └── route.js            # DELETE /api/gallery/{id}/remove
├── admin/
│   └── gallery/
│       └── page.jsx                    # Admin gallery management
└── Component/
    └── GalleryPage.jsx                 # Public gallery page
```

## Next Steps

1. **Add Pagination:** For large galleries, implement pagination
2. **Image Optimization:** Add image compression before upload
3. **Bulk Operations:** Add bulk delete/update functionality
4. **Advanced Filters:** Add date range, tags filter
5. **Analytics:** Track image views and engagement

## Support

For issues or questions:
- Check browser console for errors
- Check backend logs
- Verify API endpoints are accessible
- Ensure environment variables are set correctly
