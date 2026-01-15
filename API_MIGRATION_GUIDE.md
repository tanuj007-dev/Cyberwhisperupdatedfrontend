# API Migration Guide for Admin Panel

## Overview
This document explains how to migrate the admin panel from static mock data to dynamic API calls.

## APIs to Implement

### 1. Blogs API
**Endpoint:** `GET http://localhost:3031/api/blogs`
**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Blog Title",
      "slug": "blog-title",
      "category_id": 1,
      "author_id": 1,
      ...
    }
  ]
}
```

### 2. Categories API
**Endpoint:** `GET http://localhost:3031/api/categories`
**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Cybersecurity",
      "slug": "cybersecurity",
      "description": "Category description"
    }
  ]
}
```

### 3. Tags API  
**Endpoint:** `GET http://localhost:3031/api/tags`
**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Security",
      "slug": "security"
    }
  ]
}
```

### 4. Users API ✅ (Already Implemented)
**Endpoint:** `GET http://localhost:3031/api/users?page=1&limit=1000`
**Status:** Working

### 5. Batches API ✅ (Already Implemented)
**Endpoint:** `GET http://localhost:3031/api/batches`
**Status:** Working

## Current Status

### ✅ Already Migrated to API
- Users (`/api/users`)
- Batches (`/api/batches`)
- Courses (`/api/courses/categories`, `/api/courses/category/:name`)
- Quotes (`/api/quotes`)

### ⏳ Still Using Mock Data
- Blogs - Uses `mockBlogs` from `@/data/mockBlogs`
- Categories - Uses `mockCategories` from `@/data/mockCategories`
- Tags - Uses `mockTags` from `@/data/mockTags`
- Media - Uses `mockMedia` from `@/data/mockMedia`
- Site Settings - Uses `mockSiteSettings` from `@/data/mockMedia`

## How to Implement

### Step 1: Create Backend API Endpoints
Create the following endpoints in your backend:
- `GET /api/blogs` - Return all blogs
- `GET /api/categories` - Return all categories
- `GET /api/tags` - Return all tags
- `GET /api/media` - Return all media (optional)
- `GET /api/settings` - Return site settings (optional)

### Step 2: Update AdminContext.jsx
Add fetch functions similar to `fetchUsers`:

```javascript
// Example for blogs
const fetchBlogs = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
        const response = await fetch(`${apiUrl}/api/blogs`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        
        const result = await response.json();
        let blogsList = [];
        
        if (result.success && result.data) {
            blogsList = Array.isArray(result.data) ? result.data : [result.data];
        } else if (Array.isArray(result)) {
            blogsList = result;
        }
        
        setBlogs(blogsList);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to mock data
        setBlogs(mockBlogs);
    }
};
```

### Step 3: Update Initialization
Replace this:
```javascript
setBlogs(mockBlogs);
setCategories(mockCategories);
setTags(mockTags);
```

With this:
```javascript
await Promise.all([
    fetchBlogs(),
    fetchCategories(),
    fetchTags(),
    fetchUsers()
]);
```

## Testing Checklist

After implementing each API:

1. ✅ Check browser console for API call logs
2. ✅ Verify correct URL (port 3031)
3. ✅ Verify response structure
4. ✅ Test dropdown/selection components
5. ✅ Test fallback to mock data when API fails

## Benefits of API Migration

- ✅ **Real-time data** - No need to refresh static data
- ✅ **Centralized data** - Single source of truth
- ✅ **Scalable** - Easy to update and maintain
- ✅ **Consistent** - Same data across all components
- ✅ **Production ready** - Works with real backend

## Fallback Strategy

All API calls include fallback to mock data:
```javascript
} catch (error) {
    console.error('Error:', error);
    setData(mockData); // Fallback
}
```

This ensures the admin panel always works, even if the backend is down.

## Quick Implementation

To implement all APIs at once:

1. Create backend endpoints for blogs, categories, and tags
2. Copy the `fetchUsers` function pattern
3. Replace resource names and URLs
4. Update `useEffect` initialization
5. Test each endpoint individually

## Next Steps

1. **Backend Team**: Implement missing API endpoints
2. **Frontend Team**: Update AdminContext when APIs are ready
3. **Testing**: Verify all dropdowns and selections work
4. **Cleanup**: Remove mock data files after migration (optional, keep as fallback)

---

**Status:** 
- Users API ✅
- Batches API ✅
- Blogs API ⏳ (Pending backend)
- Categories API ⏳ (Pending backend)
- Tags API ⏳ (Pending backend)
