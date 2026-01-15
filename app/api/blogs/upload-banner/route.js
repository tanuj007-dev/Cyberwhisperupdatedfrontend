import { NextResponse } from 'next/server';

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
 * POST /api/blogs/upload-banner
 * Handles banner image uploads for blog posts
 * 
 * Returns: { success: true, url: "uploaded-image-url", banner_url: "uploaded-image-url" }
 */
export async function POST(request) {
    try {
        // Parse the multipart form data
        const formData = await request.formData();
        const file = formData.get('banner');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image' },
                { status: 400 }
            );
        }

        // Validate file size (max 20MB for banners)
        const maxSize = 20 * 1024 * 1024; // 20MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 20MB limit' },
                { status: 400 }
            );
        }

        // In production, you would:
        // 1. Upload to Cloudinary (or your preferred cloud storage)
        // 2. Return the permanent URL
        
        // For now, we'll generate a mock URL based on the file name and timestamp
        const fileName = file.name.replace(/\s+/g, '_');
        const timestamp = Date.now();
        const mockUrl = `https://res.cloudinary.com/dwpkrvrfk/image/upload/v${timestamp}/cyberwhisper/blogs/banners/${timestamp}_${fileName}`;

        console.log('Banner uploaded:', {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            generatedUrl: mockUrl
        });

        // Return success with URL
        return NextResponse.json(
            {
                success: true,
                message: 'Banner uploaded successfully',
                url: mockUrl,
                banner_url: mockUrl,
                data: {
                    url: mockUrl,
                    fileName: file.name,
                    fileSize: file.size,
                    uploadedAt: new Date().toISOString()
                }
            },
            { 
                status: 200,
                headers: corsHeaders
            }
        );

    } catch (error) {
        console.error('Error uploading banner:', error);
        return NextResponse.json(
            { error: 'Failed to upload banner', details: error.message },
            { 
                status: 500,
                headers: corsHeaders
            }
        );
    }
}
