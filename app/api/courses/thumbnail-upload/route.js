import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const useCloudinary = cloudName && apiKey && apiSecret;

const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'uploads', 'course-thumbnails');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * POST /api/courses/thumbnail-upload
 * Uploads course thumbnail: to Cloudinary CDN when configured, else local public/uploads/course-thumbnails.
 * Returns { success, url, course_thumbnail } - use course_thumbnail in API payload.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('thumbnail') || formData.get('file') || formData.get('image');

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: 'No file provided', message: 'Please upload an image' },
                { status: 400 }
            );
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image', message: 'Only image files are allowed' },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File size exceeds 5MB limit', message: 'Please upload a smaller image' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (useCloudinary) {
            const cloudinary = (await import('cloudinary')).v2;
            cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

            const tmpPath = path.join(tmpdir(), `course-thumb-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`);
            await writeFile(tmpPath, buffer);
            try {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(tmpPath, {
                        folder: 'cyberwhisper/courses/thumbnails',
                        resource_type: 'image',
                    }, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
                const cdnUrl = result.secure_url;
                return NextResponse.json({
                    success: true,
                    url: cdnUrl,
                    course_thumbnail: cdnUrl,
                    message: 'Thumbnail uploaded successfully',
                });
            } finally {
                await unlink(tmpPath).catch(() => {});
            }
        }

        await mkdir(THUMBNAILS_DIR, { recursive: true });
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filePath = path.join(THUMBNAILS_DIR, filename);
        await writeFile(filePath, buffer);
        let origin = process.env.NEXT_PUBLIC_APP_URL || '';
        try {
            if (request.url) origin = origin || new URL(request.url).origin;
        } catch (_) {}
        const absoluteUrl = origin ? `${origin.replace(/\/$/, '')}/uploads/course-thumbnails/${filename}` : `/uploads/course-thumbnails/${filename}`;

        return NextResponse.json({
            success: true,
            url: absoluteUrl,
            course_thumbnail: absoluteUrl,
            message: 'Thumbnail uploaded successfully',
        });
    } catch (error) {
        console.error('Course thumbnail upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed', details: error.message, message: error.message },
            { status: 500 }
        );
    }
}
