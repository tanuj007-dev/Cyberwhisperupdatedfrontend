# 🎯 Quick Start Guide - Blog API Integration

## Step 1: Start Your Backend Server

Make sure your backend API is running:
```bash
# Backend should be running on http://localhost:3031
```

## Step 2: Access Admin Panel

Navigate to the admin blog creation page:
```
http://localhost:3000/admin/blogs/add
```

## Step 3: Upload an Image

1. Click on the "Featured Image" upload area
2. Select an image (max 10MB)
3. Wait for the upload success message
4. Image preview will appear

**What happens behind the scenes:**
```
User selects image
    ↓
POST http://localhost:3031/api/blogs/upload-thumbnail
    ↓
Response: { url: "https://cloudinary.com/..." }
    ↓
Image URL saved in form state
```

## Step 4: Fill in Blog Details

Required fields:
- ✅ **Title** (auto-generates slug)
- ✅ **Category** (dropdown)
- ✅ **Author** (dropdown)
- ✅ **Content** (rich text editor)

Optional fields:
- Short Description
- Tags
- Reading Time
- SEO Settings
- And more...

## Step 5: Publish or Save as Draft

Click one of these buttons:
- **"Publish"** → Creates blog with `status: "ACTIVE"`
- **"Save Draft"** → Creates blog with `status: "DRAFT"`

**What happens behind the scenes:**
```
User clicks "Publish"
    ↓
Validate form data
    ↓
POST http://localhost:3031/api/blogs
    ↓
Body: {
  title: "...",
  slug: "...",
  category_id: 2,
  author_id: 5,
  description: "...",
  thumbnail_url: "...",
  banner_url: "...",
  keywords: "...",
  is_popular: true,
  status: "ACTIVE"
}
    ↓
Response: { success: true, data: { id: 123, ... } }
    ↓
Success notification
    ↓
Redirect to /admin/blogs
```

## ✅ Integration Checklist

Before testing, ensure:

- [ ] Backend server running on port 3031
- [ ] Database has at least one category
- [ ] Database has at least one user/author
- [ ] Image upload endpoint is working
- [ ] Blog creation endpoint is working

## 🧪 Quick Test

### Test 1: API Availability
Open browser console and run:
```javascript
fetch('http://localhost:3031/api/blogs')
  .then(r => r.json())
  .then(d => console.log('✅ API is reachable', d))
  .catch(e => console.error('❌ API error', e));
```

### Test 2: Create Test Blog
```javascript
window.blogApiTests.testCreateBlog({
  title: "My Test Blog",
  category_id: 1,  // Make sure this category exists
  author_id: 1     // Make sure this author exists
});
```

## 🎨 Form Field Mapping

| UI Field | API Field | Type | Required |
|----------|-----------|------|----------|
| Blog Title | `title` | string | ✅ |
| Slug | `slug` | string | ✅ |
| Category | `category_id` | number | ✅ |
| Author | `author_id` | number | ✅ |
| Content | `description` | string | ✅ |
| Featured Image | `thumbnail_url` | string | - |
| Banner | `banner_url` | string | - |
| Tags | `keywords` | string | - |
| Popular Post | `is_popular` | boolean | - |
| Status | `status` | string | ✅ |

## 🔍 Troubleshooting

### Image upload fails
**Check:**
1. Backend server is running
2. File size < 10MB
3. File type is an image
4. Check browser console for errors
5. Check network tab for request/response

### Blog creation fails
**Check:**
1. All required fields are filled
2. Category ID exists in database
3. Author ID exists in database
4. Backend server logs for errors
5. Browser console for error messages

### "Failed to fetch" error
**Solution:**
- Make sure backend is running on http://localhost:3031
- Check CORS settings on backend
- Verify API endpoints are correct

## 📝 Example API Responses

### Successful Image Upload
```json
{
  "url": "https://res.cloudinary.com/.../thumbnail.jpg",
  "success": true
}
```

### Successful Blog Creation
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": 123,
    "title": "Zero Trust Security",
    "slug": "zero-trust-security",
    "status": "ACTIVE",
    "created_at": "2026-01-13T12:00:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Category not found",
  "message": "The specified category_id does not exist"
}
```

## 🎓 Next Steps

1. ✅ Test image upload
2. ✅ Test blog creation with draft status
3. ✅ Test blog creation with active status
4. ✅ Verify blog appears in database
5. ✅ Check blog list page for new blog

## 📚 Documentation Files

- **Full Documentation**: `app/admin/README.md`
- **Integration Summary**: `app/admin/INTEGRATION_SUMMARY.md`
- **This Quick Start**: `app/admin/QUICK_START.md`
- **API Config**: `app/admin/config/api.js`
- **Test Utilities**: `app/admin/utils/apiTests.js`

---

**Need more help?** Check the full README.md file in the admin directory!
