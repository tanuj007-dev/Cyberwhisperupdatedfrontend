import { NextResponse } from 'next/server';
import { API_BASE_URL } from '../../../../lib/apiConfig';

export const maxDuration = 300; // 5 minutes for large uploads
export const dynamic = 'force-dynamic';

const MAX_BROCHURE_SIZE = 200 * 1024 * 1024; // 200MB

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('brochure');
        
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }
        
        if (file.size > MAX_BROCHURE_SIZE) {
            return NextResponse.json(
                { error: 'File too large', message: 'Brochure must be 200MB or less' },
                { status: 400 }
            );
        }

        // Get authorization token from request headers
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
        }

        // Create new FormData to forward to backend
        const backendFormData = new FormData();
        backendFormData.append('file', file);

        // Forward the request to your backend API
        const backendResponse = await fetch(`${API_BASE_URL}/api/brochure-downloads/upload`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                // Don't set Content-Type header, let browser set it with boundary for FormData
            },
            body: backendFormData,
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}));
            return NextResponse.json(
                { 
                    error: errorData.error || errorData.message || 'Backend upload failed',
                    message: errorData.message || 'Failed to upload brochure to backend'
                },
                { status: backendResponse.status }
            );
        }

        const responseData = await backendResponse.json();
        
        // Return the response from your backend API
        // This should include the presigned URL or file URL that gets saved to DB
        return NextResponse.json({
            success: true,
            ...responseData
        });

    } catch (err) {
        console.error('Course brochure upload error:', err);
        return NextResponse.json({ 
            error: err.message || 'Upload failed',
            message: 'Failed to upload brochure'
        }, { status: 500 });
    }
}
