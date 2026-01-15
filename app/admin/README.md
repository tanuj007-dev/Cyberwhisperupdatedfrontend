# Admin Blog API Integration

This document explains how the admin panel integrates with the backend APIs for blog management.

## API Endpoints

### Base URL
- **Development**: `http://localhost:3031`
- **Production**: Set via `NEXT_PUBLIC_API_URL` environment variable

---

## 1. Upload Thumbnail Image

**Endpoint**: `POST /api/blogs/upload-thumbnail`

**Purpose**: Upload a thumbnail/featured image for a blog post

### Request
```bash
curl --location 'http://localhost:3031/api/blogs/upload-thumbnail' \
--form 'thumbnail=@"/path/to/your/image.jpg"'
```

**Form Data**:
- `thumbnail`: Image file (multipart/form-data)

### Response
```json
{
  "url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767779908/cyberwhisper/blogs/thumbnails/yyffva8labqfbbiif99u.jpg",
  "success": true
}
```

### Frontend Implementation
The image upload is handled in the `handleImageChange` function:
- Validates file type (must be an image)
- Validates file size (max 10MB)
- Uploads to backend API
- Receives URL and updates form state

---

## 2. Create Blog Post

**Endpoint**: `POST /api/blogs`

**Purpose**: Create a new blog post with all metadata

### Request
```bash
curl --location 'http://localhost:3031/api/blogs' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Zero Trust Security Architecture",
  "slug": "zero-trust-security",
  "category_id": 2,
  "author_id": 5,
  "keywords": "zero trust, network security, identity verification",
  "description": "Learn how to implement zero trust architecture in your organization for better security.",
  "thumbnail_url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767779908/cyberwhisper/blogs/thumbnails/yyffva8labqfbbiif99u.jpg",
  "banner_url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767779969/cyberwhisper/blogs/banners/s17mwkjjufcv6kzuustp.jpg",
  "is_popular": true,
  "status": "ACTIVE"
}'
```

### Request Body Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Blog post title |
| `slug` | string | Yes | URL-friendly slug (auto-generated from title) |
| `category_id` | integer | Yes | Category ID from database |
| `author_id` | integer | Yes | Author/User ID from database |
| `keywords` | string | No | Comma-separated keywords for SEO |
| `description` | string | Yes | Main blog content (HTML/Markdown) |
| `thumbnail_url` | string | No | URL of uploaded thumbnail image |
| `banner_url` | string | No | URL of banner image |
| `is_popular` | boolean | No | Mark as featured/popular post |
| `status` | string | Yes | `ACTIVE` or `DRAFT` |

### Additional Fields (Extended)
The admin panel also sends these optional fields:
- `short_description`: Brief excerpt
- `reading_time`: Estimated reading time
- `image_alt_text`: Alt text for accessibility
- `image_caption`: Image caption
- `visibility`: `PUBLIC` or `PRIVATE`
- `seo_title`: Custom SEO title
- `seo_description`: Meta description
- `focus_keyword`: Primary SEO keyword
- `meta_robots`: `INDEX` or `NOINDEX`
- `allow_comments`: Boolean
- `show_on_homepage`: Boolean
- `is_sticky`: Pin to top of blog list

### Response
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": 123,
    "title": "Zero Trust Security Architecture",
    "slug": "zero-trust-security",
    // ... other fields
  }
}
```

---

## Frontend Workflow

### 1. **Upload Image**
```javascript
// User selects an image file
const file = e.target.files[0];

// Validate file
if (!file.type.startsWith('image/')) {
  showToast('Please select an image file', 'error');
  return;
}

// Upload to API
const formData = new FormData();
formData.append('thumbnail', file);

const response = await fetch('http://localhost:3031/api/blogs/upload-thumbnail', {
  method: 'POST',
  body: formData
});

const data = await response.json();
const imageUrl = data.url; // Use this URL in blog creation
```

### 2. **Create Blog**
```javascript
// Prepare blog data
const blogData = {
  title: "My Blog Title",
  slug: "my-blog-title",
  category_id: 2,
  author_id: 5,
  description: "Blog content here...",
  thumbnail_url: imageUrl, // From step 1
  banner_url: imageUrl,
  is_popular: true,
  status: "ACTIVE"
};

// Send to API
const response = await fetch('http://localhost:3031/api/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(blogData)
});

const result = await response.json();
console.log('Blog created:', result.data.id);
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3031
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.yourproduction.com
```

---

## Error Handling

The admin panel handles these error scenarios:

1. **Image Upload Errors**
   - Invalid file type
   - File too large (> 10MB)
   - Network errors
   - Server errors

2. **Blog Creation Errors**
   - Missing required fields
   - Invalid category/author ID
   - Server validation errors
   - Network errors

All errors are displayed to the user via toast notifications.

---

## Testing the Integration

### 1. Test Image Upload
1. Go to `/admin/blogs/add`
2. Click on the featured image upload area
3. Select an image
4. Wait for upload success message
5. Verify the image preview appears

### 2. Test Blog Creation
1. Fill in all required fields:
   - Title
   - Category
   - Author
   - Content
   - Upload a featured image
2. Click "Publish" or "Save Draft"
3. Check console for API response
4. Verify redirect to `/admin/blogs`

---

## Common Issues

### Issue: "Failed to upload image"
**Solution**: Check that backend server is running on port 3031

### Issue: "No image URL received from server"
**Solution**: Verify API response structure matches expected format

### Issue: "Failed to create blog post"
**Solution**: 
- Check all required fields are filled
- Verify category_id and author_id exist in database
- Check backend server logs

---

## Additional Notes

- The admin panel uses the same image for both `thumbnail_url` and `banner_url`
- Slugs are auto-generated from titles but can be manually edited
- Keywords are generated from selected tags
- Status is automatically set based on "Publish" vs "Save Draft" button
- All API calls include proper error handling and user feedback
