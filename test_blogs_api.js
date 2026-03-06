// Test script for the blogs API endpoint
// Run this with: node test_blogs_api.js

// Test GET endpoint
async function testGetBlogs() {
    try {
        console.log('\n\n🧪 Testing GET /api/blogs endpoint...\n');

        const response = await fetch('https://lightcoral-newt-645489.hostingersite.com/api/blogs?limit=5&page=1');
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
    await testGetBlogs();
})();
