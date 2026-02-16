import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const useCloudinary = cloudName && apiKey && apiSecret;

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/users/upload-profile
 * Uploads profile image: to Cloudinary (CDN) when configured, else local public/uploads/profiles.
 * Returns { success, url, profile_image_url } with the CDN or local URL to save in DB.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('profile');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided', message: 'Please upload a profile image' },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image', message: 'Only image files are allowed' },
                { status: 400, headers: corsHeaders }
            );
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 5MB limit', message: 'Please upload a smaller image' },
                { status: 400, headers: corsHeaders }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (useCloudinary) {
            const cloudinary = (await import('cloudinary')).v2;
            cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

            const tmpPath = path.join(tmpdir(), `profile-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`);
            await writeFile(tmpPath, buffer);
            try {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(tmpPath, {
                        folder: 'cyberwhisper/users/profiles',
                        resource_type: 'image',
                    }, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
                const cdnUrl = result.secure_url;
                return NextResponse.json(
                    {
                        success: true,
                        url: cdnUrl,
                        profile_image_url: cdnUrl,
                        message: 'Profile image uploaded successfully',
                    },
                    { status: 200, headers: corsHeaders }
                );
            } finally {
                await unlink(tmpPath).catch(() => {});
            }
        }

        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${timestamp}-${originalName}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
        const fileUrl = `/uploads/profiles/${filename}`;

        return NextResponse.json(
            {
                success: true,
                url: fileUrl,
                profile_image_url: fileUrl,
                message: 'Profile image uploaded successfully',
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error uploading profile image:', error);
        return NextResponse.json(
            {
                error: 'Failed to upload profile image',
                details: error.message,
                message: 'An error occurred while uploading the image',
            },
            { status: 500, headers: corsHeaders }
        );
    }
}
