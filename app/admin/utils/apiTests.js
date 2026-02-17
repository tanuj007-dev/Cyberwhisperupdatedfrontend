/**
 * API Test Utilities for Admin Blog Integration
 * 
 * Use these functions to test your API endpoints in the browser console
 */

const API_BASE = 'https://darkred-mouse-801836.hostingersite.com';

/**
 * Test thumbnail upload
 * Usage in browser console:
 * const fileInput = document.querySelector('input[type="file"]');
 * testThumbnailUpload(fileInput.files[0]);
 */
export async function testThumbnailUpload(file) {
    if (!file) {
        console.error('❌ No file provided');
        return;
    }

    console.log('🔄 Uploading thumbnail...');
    console.log('File:', file.name, file.type, (file.size / 1024).toFixed(2) + ' KB');

    const formData = new FormData();
    formData.append('thumbnail', file);

    try {
        const response = await fetch(`${API_BASE}/api/blogs/upload-thumbnail`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Upload successful!');
            console.log('Image URL:', data.url || data.thumbnail_url);
            console.log('Full response:', data);
            return data;
        } else {
            console.error('❌ Upload failed:', response.status, response.statusText);
            console.error('Error:', data);
            return null;
        }
    } catch (error) {
        console.error('❌ Network error:', error.message);
        return null;
    }
}

/**
 * Test blog creation
 * Usage: testCreateBlog()
 */
export async function testCreateBlog(overrides = {}) {
    const testBlogData = {
        title: "Test Blog Post - " + new Date().toISOString(),
        slug: "test-blog-post-" + Date.now(),
        category_id: 1,
        author_id: 1,
        keywords: "test, blog, demo",
        description: "This is a test blog post created via API.",
        thumbnail_url: "https://via.placeholder.com/800x600",
        banner_url: "https://via.placeholder.com/1200x400",
        is_popular: false,
        status: "DRAFT",
        ...overrides
    };

    console.log('🔄 Creating blog post...');
    console.log('Data:', testBlogData);

    try {
        const response = await fetch(`${API_BASE}/api/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testBlogData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Blog created successfully!');
            console.log('Blog ID:', data.data?.id);
            console.log('Full response:', data);
            return data;
        } else {
            console.error('❌ Blog creation failed:', response.status, response.statusText);
            console.error('Error:', data);
            return null;
        }
    } catch (error) {
        console.error('❌ Network error:', error.message);
        return null;
    }
}

/**
 * Test full workflow: upload image then create blog
 */
export async function testFullWorkflow(file, blogData = {}) {
    console.log('🚀 Starting full workflow test...');
    console.log('='.repeat(50));

    // Step 1: Upload thumbnail
    const uploadResult = await testThumbnailUpload(file);
    if (!uploadResult) {
        console.error('❌ Workflow failed at image upload step');
        return;
    }

    console.log('\n' + '='.repeat(50));

    // Step 2: Create blog with uploaded image
    const imageUrl = uploadResult.url || uploadResult.thumbnail_url;
    const blogResult = await testCreateBlog({
        thumbnail_url: imageUrl,
        banner_url: imageUrl,
        ...blogData
    });

    if (!blogResult) {
        console.error('❌ Workflow failed at blog creation step');
        return;
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Full workflow completed successfully!');
    console.log('📝 Blog ID:', blogResult.data?.id);
    console.log('🖼️  Image URL:', imageUrl);

    return blogResult;
}

/**
 * Get example curl commands for testing
 */
export function getCurlExamples() {
    console.log('📋 CURL Command Examples:');
    console.log('\n1. Upload Thumbnail:');
    console.log(`curl --location '${API_BASE}/api/blogs/upload-thumbnail' \\
--form 'thumbnail=@"/path/to/your/image.jpg"'`);

    console.log('\n2. Create Blog:');
    console.log(`curl --location '${API_BASE}/api/blogs' \\
--header 'Content-Type: application/json' \\
--data '{
  "title": "Test Blog Post",
  "slug": "test-blog-post",
  "category_id": 1,
  "author_id": 1,
  "keywords": "test, demo",
  "description": "This is a test blog post.",
  "thumbnail_url": "https://via.placeholder.com/800x600",
  "banner_url": "https://via.placeholder.com/1200x400",
  "is_popular": false,
  "status": "DRAFT"
}'`);
}

// Auto-expose to window for easy browser console access
if (typeof window !== 'undefined') {
    window.blogApiTests = {
        testThumbnailUpload,
        testCreateBlog,
        testFullWorkflow,
        getCurlExamples
    };
    console.log('✅ Blog API test utilities loaded!');
    console.log('Access via: window.blogApiTests');
    console.log('Example: window.blogApiTests.getCurlExamples()');
}

export default {
    testThumbnailUpload,
    testCreateBlog,
    testFullWorkflow,
    getCurlExamples
};
