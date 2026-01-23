import { NextResponse } from 'next/server';

// Use server-side env variable for backend API
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://api.cyberwhisper.in';

export async function POST(request) {
    console.log('📤 Gallery Upload API Route Called');
    console.log('🔗 Backend URL:', BACKEND_API_URL);

    try {
        const formData = await request.formData();

        // Log form data details (without file content)
        console.log('📋 Form Data Fields:');
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  - ${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
            } else {
                console.log(`  - ${key}: ${value}`);
            }
        }

        const uploadUrl = `${BACKEND_API_URL}/api/gallery/upload`;
        console.log('🎯 Uploading to:', uploadUrl);

        // Forward the FormData directly to the backend
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        console.log('📥 Backend Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Backend Error Content:', errorText);

            let errorJson = {};
            try {
                errorJson = JSON.parse(errorText);
            } catch (e) {
                // Not JSON, probably HTML error page
                errorJson = { message: errorText.slice(0, 200) }; // Truncate html
            }

            throw new Error(errorJson.message || errorJson.error || `Backend failed with ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Upload Successful:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('❌ Error handling upload:', error);
        return NextResponse.json(
            { error: 'Upload Handler Failed', message: error.message },
            { status: 500 }
        );
    }
}
