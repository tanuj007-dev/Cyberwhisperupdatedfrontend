// Test script for the quotes API endpoint
// Run this with: node test_quotes_api.js

const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+1234567890",
    subject: "Test Enquiry",
    message: "This is a test message to verify the API is working correctly."
};

async function testQuotesAPI() {
    try {
        console.log('Testing POST /api/quotes endpoint...\n');
        console.log('Sending data:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:3031/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        console.log('\nResponse Status:', response.status);
        console.log('Response Status Text:', response.statusText);

        const data = await response.json();
        console.log('\nResponse Data:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ SUCCESS: API is working correctly!');
        } else {
            console.log('\n❌ ERROR: API returned an error');
        }

    } catch (error) {
        console.error('\n❌ FETCH ERROR:', error.message);
        console.log('\nMake sure your Next.js dev server is running on http://localhost:3000');
    }
}

testQuotesAPI();
