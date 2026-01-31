import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/users/upload-profile
 * Handles profile image uploads for users locally
 * Saves images to public/uploads/profiles
 */
export async function POST(request) {
    try {
        console.log('=== USER PROFILE UPLOAD (LOCAL) ===');

        // Parse the multipart form data
        const formData = await request.formData();
        const file = formData.get('profile');

        console.log('Form data keys:', Array.from(formData.keys()));
        console.log('File received:', file ? file.name : 'No file');

        if (!file) {
            console.error('No file provided in form data');
            return NextResponse.json(
                { error: 'No file provided', message: 'Please upload a profile image' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            console.error('Invalid file type:', file.type);
            return NextResponse.json(
                { error: 'File must be an image', message: 'Only image files are allowed' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate file size (max 5MB for profile images)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            console.error('File too large:', file.size);
            return NextResponse.json(
                { error: 'File size exceeds 5MB limit', message: 'Please upload a smaller image' },
                { status: 400, headers: corsHeaders }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize filename
        const filename = `${timestamp}-${originalName}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        console.log('File saved locally:', filePath);

        // Generate public URL
        const fileUrl = `/uploads/profiles/${filename}`;

        // Return success with URL
        return NextResponse.json(
            {
                success: true,
                url: fileUrl,
                profile_image_url: fileUrl,
                message: 'Profile image uploaded successfully'
            },
            {
                status: 200,
                headers: corsHeaders
            }
        );

    } catch (error) {
        console.error('Error uploading profile image:', error);
        return NextResponse.json(
            { 
                error: 'Failed to upload profile image', 
                details: error.message,
                message: 'An error occurred while uploading the image'
            },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
}
