# Blog API - Quick Reference Card

## 📋 API Endpoints

### Create Blog Post
```bash
POST /api/blogs
Content-Type: application/json

{
  "title": "Your Blog Title",
  "slug": "your-blog-title",
  "category_id": 1,
  "author_id": 1,
  "content": "Your blog content...",
  "status": "PUBLISHED"
}
```

### Get All Blogs
```bash
GET /api/blogs?limit=10&page=1&status=PUBLISHED
```

### Update Blog
```bash
PUT /api/blogs
Content-Type: application/json

{
  "id": 123,
  "title": "Updated Title"
}
```

### Delete Blog
```bash
DELETE /api/blogs?id=123
```

## 🔑 Required Fields

- ✅ `title` - Blog title
- ✅ `slug` - URL-friendly slug
- ✅ `category_id` - Category ID (integer)
- ✅ `author_id` - Author ID (integer)
- ✅ `content` - Blog content

## 📝 Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `keywords` | string | "" | SEO keywords |
| `short_description` | string | "" | Excerpt |
| `reading_time` | string | "5 min read" | Reading time |
| `thumbnail_url` | string | "" | Thumbnail image |
| `banner_url` | string | "" | Banner image |
| `image_alt_text` | string | title | Alt text |
| `image_caption` | string | "" | Caption |
| `is_popular` | boolean | false | Featured post |
| `status` | string | "DRAFT" | DRAFT/PUBLISHED |
| `visibility` | string | "PUBLIC" | PUBLIC/PRIVATE |
| `seo_title` | string | title | SEO title |
| `seo_description` | string | "" | Meta description |
| `focus_keyword` | string | "" | Focus keyword |
| `meta_robots` | string | "INDEX" | INDEX/NOINDEX |
| `allow_comments` | boolean | true | Allow comments |
| `show_on_homepage` | boolean | true | Show on homepage |
| `is_sticky` | boolean | false | Pin post |

## 🎯 Response Codes

| Code | Meaning |
|------|---------|
| 201 | Created successfully |
| 200 | Success |
| 400 | Bad request / Validation error |
| 500 | Server error |

## 🧪 Testing

### Using cURL:
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog",
    "slug": "test-blog",
    "category_id": 1,
    "author_id": 1,
    "content": "Test content"
  }'
```

### Using Node.js:
```bash
node test_blogs_api.js
```

### Using Admin Panel:
1. Go to `/admin/blogs/add`
2. Fill form
3. Click "Publish" or "Save Draft"

## 🔍 Validation Rules

### Slug Format:
- ✅ Lowercase letters
- ✅ Numbers
- ✅ Hyphens
- ❌ Spaces
- ❌ Special characters
- ❌ Uppercase letters

Example: `zero-trust-security-2024` ✅  
Invalid: `Zero Trust Security!` ❌

## 📊 Example Success Response

```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": 1736781445089,
    "title": "Zero Trust Security",
    "slug": "zero-trust-security",
    "status": "PUBLISHED",
    "created_at": "2026-01-13T05:30:45.089Z",
    "updated_at": "2026-01-13T05:30:45.089Z"
  }
}
```

## ⚠️ Example Error Response

```json
{
  "error": "Missing required fields",
  "required": [
    "title",
    "slug",
    "category_id",
    "author_id",
    "content"
  ]
}
```

## 🚀 Admin Panel Usage

### Create Blog:
1. Navigate to `/admin/blogs/add`
2. Fill in required fields (marked with *)
3. Add optional fields as needed
4. Upload featured image
5. Click "Publish" or "Save Draft"

### Form Sections:
- 📄 **Basic Information** - Title, slug, category, tags
- 🖼️ **Featured Image** - Thumbnail upload
- 👤 **Author & Publishing** - Author, date, status
- ✍️ **Content** - Rich text editor
- 🔍 **SEO Settings** - Meta tags, keywords
- ⚙️ **Post Settings** - Comments, homepage, sticky

## 💡 Tips

1. **Slug Auto-Generation**: Slug is auto-generated from title
2. **Image Upload**: Upload images directly in the form
3. **Rich Text Editor**: Supports markdown formatting
4. **Draft Mode**: Save as draft before publishing
5. **SEO Optimization**: Fill SEO fields for better ranking

## 🔗 Related Files

- API Route: `app/api/blogs/route.js`
- Admin Form: `app/admin/blogs/add/page.jsx`
- Test Script: `test_blogs_api.js`
- Documentation: `BLOG_API_INTEGRATION.md`
