/**
 * Test User Creation API
 * 
 * This script tests the user creation API endpoint to verify it's working correctly.
 * Run this script when your backend is running on port 3031.
 * 
 * Usage: node test_user_creation.js
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';

const testUserData = {
    first_name: "John23",
    last_name: "Doe",
    email: "john23.doe@example.com",
    phone: "+1234464890",
    password: "SecurePass123!",
    title: "Senior Security Engineer",
    address: "123 Cyber Street, Tech City",
    biography: "Experienced cybersecurity professional with 10+ years in the field",
    linkedin_url: "https://linkedin.com/in/johndoe",
    github_url: "https://github.com/johndoe",
    role: "INSTRUCTOR",
    is_instructor: true,
    profile_image_url: "https://res.cloudinary.com/dwpkrvrfk/image/upload/v1767788923/cyberwhisper/users/profiles/ime2evfm62sb23xri2ee.jpg",
    skills: []
};

async function testCreateUser() {
    console.log('🧪 Testing User Creation API...\n');
    console.log('📍 API Endpoint:', `${API_URL}/api/users`);
    console.log('📦 Payload:', JSON.stringify(testUserData, null, 2));
    console.log('\n⏳ Sending request...\n');

    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(testUserData)
        });

        console.log('📊 Response Status:', response.status, response.statusText);
        console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('\n📄 Response Body (raw):', responseText);

        if (!response.ok) {
            console.error('\n❌ API Request Failed!');
            console.error('Status:', response.status);
            console.error('Response:', responseText);
            process.exit(1);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('\n❌ Failed to parse JSON response');
            console.error('Error:', e.message);
            process.exit(1);
        }

        console.log('\n✅ User Created Successfully!');
        console.log('📝 Created User:', JSON.stringify(data, null, 2));

        // Test fetching users
        console.log('\n\n🔍 Testing Fetch Users API...');
        const fetchResponse = await fetch(`${API_URL}/api/users?page=1&limit=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('📊 Fetch Response Status:', fetchResponse.status);

        if (fetchResponse.ok) {
            const users = await fetchResponse.json();
            console.log('✅ Fetched Users Successfully!');
            console.log('👥 Total Users:', Array.isArray(users) ? users.length : users.data?.length || 'Unknown');
        } else {
            console.warn('⚠️  Failed to fetch users');
        }

        console.log('\n\n🎉 All tests passed!');

    } catch (error) {
        console.error('\n❌ Error during API test:');
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);

        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 Tip: Make sure your backend server is running on port 3031');
            console.error('   Check with: netstat -ano | findstr "3031"');
        }

        process.exit(1);
    }
}

// Check if backend is reachable first
async function checkBackend() {
    console.log('🔍 Checking if backend is running...');
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        console.log('✅ Backend is reachable!\n');
        return true;
    } catch (error) {
        console.error('❌ Backend is not reachable!');
        console.error('   Error:', error.message);
        console.error('\n💡 Please ensure:');
        console.error('   1. Backend server is running');
        console.error('   2. Backend is listening on port 3031');
        console.error('   3. No firewall is blocking the connection\n');
        return false;
    }
}

// Main execution
(async () => {
    const isBackendReachable = await checkBackend();
    if (isBackendReachable) {
        await testCreateUser();
    } else {
        process.exit(1);
    }
})();
