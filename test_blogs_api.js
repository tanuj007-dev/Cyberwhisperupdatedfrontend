// Test script for the blogs API endpoint
// Run this with: node test_blogs_api.js

const testBlogData = {
    "title": "Zero Trust Security Architecture",
    "slug": "zero-trust-security-architecture",
    "category_id": 2,
    "author_id": 5,
    "content": "Comprehensive guide to implementing zero trust architecture in your organization for better security.",
    "keywords": "zero trust, network security, identity verification",
    "short_description": "Learn how to implement zero trust architecture",
    "reading_time": "5 min read",
    "thumbnail_url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767779908/cyberwhisper/blogs/thumbnails/yyffva8labqfbbiif99u.jpg",
    "banner_url": "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767779969/cyberwhisper/blogs/banners/s17mwkjjufcv6kzuustp.jpg",
    "image_alt_text": "Zero Trust Security Diagram",
    "image_caption": "Implementation layers of Zero Trust Architecture",
    "is_popular": true,
    "status": "PUBLISHED",
    "visibility": "PUBLIC",
    "seo_title": "Zero Trust Security Architecture Implementation Guide",
    "seo_description": "Complete guide to implementing zero trust architecture for enterprise security",
    "focus_keyword": "zero trust security",
    "meta_robots": "INDEX",
    "allow_comments": true,
    "show_on_homepage": true,
    "is_sticky": false
};

async function testBlogsAPI() {
    try {
        console.log('🧪 Testing POST /api/blogs endpoint...\n');
        console.log('📤 Sending data:', JSON.stringify(testBlogData, null, 2));
        console.log('\n' + '='.repeat(60) + '\n');

        const response = await fetch('http://localhost:3001/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testBlogData),
        });

        console.log('📊 Response Status:', response.status);
        console.log('📊 Response Status Text:', response.statusText);
        console.log('\n' + '='.repeat(60) + '\n');

        const data = await response.json();
        console.log('📥 Response Data:', JSON.stringify(data, null, 2));
        console.log('\n' + '='.repeat(60) + '\n');

        if (response.ok) {
            console.log('✅ SUCCESS: Blog API is working correctly!');
            console.log(`📝 Blog ID: ${data.data.id}`);
            console.log(`📝 Title: ${data.data.title}`);
            console.log(`📝 Status: ${data.data.status}`);
            console.log(`📝 Created At: ${data.data.created_at}`);
        } else {
            console.log('❌ ERROR: API returned an error');
            console.log('Error details:', data.error);
        }

    } catch (error) {
        console.error('\n❌ FETCH ERROR:', error.message);
        console.log('\n⚠️  Make sure your Next.js dev server is running on http://localhost:3001');
        console.log('   Run: npm run dev');
    }
}

// Test GET endpoint
async function testGetBlogs() {
    try {
        console.log('\n\n🧪 Testing GET /api/blogs endpoint...\n');

        const response = await fetch('http://localhost:3001/api/blogs?limit=5&page=1');
        const data = await response.json();

        console.log('📥 Response:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ GET endpoint working!');
        }
    } catch (error) {
        console.error('❌ GET Error:', error.message);
    }
}

// Run tests
(async () => {
    await testBlogsAPI();
    await testGetBlogs();
})();
