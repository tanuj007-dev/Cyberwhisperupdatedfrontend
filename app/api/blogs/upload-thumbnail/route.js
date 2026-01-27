import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
 * Handles thumbnail image uploads for blog posts locally
 * Saves images to public/uploads/thumbnails
 */
export async function POST(request) {
    try {
        console.log('=== BLOG THUMBNAIL UPLOAD (LOCAL) ===');

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

        const buffer = Buffer.from(await file.arrayBuffer());

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize filename
        const filename = `${timestamp}-${originalName}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'thumbnails');
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        console.log('File saved locally:', filePath);

        // Generate public URL
        const fileUrl = `/uploads/thumbnails/${filename}`;

        // Return success with URL
        return NextResponse.json(
            {
                success: true,
                url: fileUrl,
                thumbnail_url: fileUrl,
                message: 'Thumbnail uploaded successfully'
            },
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
