import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/blogs/upload-thumbnail
 * Handles thumbnail image uploads for blog posts
 * Proxies the request to the backend API
 * 
 * Returns: { success: true, url: "uploaded-image-url", thumbnail_url: "uploaded-image-url" }
 */
export async function POST(request) {
    try {
        console.log('=== BLOG THUMBNAIL UPLOAD ===');
        console.log('Backend API URL:', BACKEND_API_URL);

        // Parse the multipart form data
        const formData = await request.formData();
        const file = formData.get('thumbnail');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400, headers: corsHeaders }
            );
        }

        console.log('Uploading file:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Forward the request to the backend
        const backendFormData = new FormData();
        backendFormData.append('thumbnail', file);

        const response = await fetch(`${BACKEND_API_URL}/api/blogs/upload-thumbnail`, {
            method: 'POST',
            body: backendFormData,
        });

        console.log('Backend response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend error:', errorText);

            let errorData = {};
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                errorData = { error: errorText || `Upload failed: ${response.status}` };
            }

            return NextResponse.json(
                { error: errorData.error || errorData.message || 'Failed to upload thumbnail' },
                { status: response.status, headers: corsHeaders }
            );
        }

        const data = await response.json();
        console.log('Upload successful:', data);

        // Return success with URL
        return NextResponse.json(
            data,
            {
                status: 200,
                headers: corsHeaders
            }
        );

    } catch (error) {
        console.error('Error uploading thumbnail:', error);
        return NextResponse.json(
            { error: 'Failed to upload thumbnail', details: error.message },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
}
