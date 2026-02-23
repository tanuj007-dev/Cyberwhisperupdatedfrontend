import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';

const COURSE_BROCHURES_DIR = path.join(process.cwd(), 'public', 'uploads', 'course-brochures');
const MAX_BROCHURE_SIZE = 100 * 1024 * 1024; // 100MB

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const useCloudinary = cloudName && apiKey && apiSecret;

const isReadOnlyFs = () => typeof process.env.VERCEL !== 'undefined' || process.env.AWS_LAMBDA_FUNCTION_VERSION != null;

function sanitize(name) {
    return name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 80) || 'brochure';
}

// Vercel serverless has ~4.5MB request body limit; Blob is used for smaller PDFs
const VERCEL_BLOB_MAX_SIZE = 4 * 1024 * 1024; // 4MB to stay under limit
const hasBlobToken = typeof process.env.BLOB_READ_WRITE_TOKEN === 'string' && process.env.BLOB_READ_WRITE_TOKEN.length > 0;

const BROCHURE_UNAVAILABLE_MSG = 'Brochure upload is not available. Add Cloudinary (CLOUDINARY_*) or Vercel Blob (BLOB_READ_WRITE_TOKEN) env vars, or paste a direct PDF link below.';

// Optional: preset for client-side unsigned upload (create in Cloudinary: Upload > Upload presets, resource_type: raw)
const brochureUploadPreset = process.env.CLOUDINARY_BROCHURE_UPLOAD_PRESET;

/**
 * GET: returns Cloudinary client upload config when cloud name + brochure preset are set.
 * Used by add/edit course pages to upload brochure PDFs directly to Cloudinary from the browser.
 */
export async function GET() {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    const preset = brochureUploadPreset;
    if (!cloud || !preset) {
        return NextResponse.json({ cloudName: null, uploadPreset: null });
    }
    return NextResponse.json({ cloudName: cloud, uploadPreset: preset });
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('brochure');
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }
        if (file.size > MAX_BROCHURE_SIZE) {
            return NextResponse.json(
                { error: 'File too large', message: 'Brochure must be 100MB or less' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = path.extname(file.name) || '.pdf';
        const baseName = sanitize(path.basename(file.name, ext));
        const filename = `${Date.now()}-${baseName}${ext}`;

        // 1) Prefer Cloudinary when configured (works on Vercel; /tmp is writable)
        if (useCloudinary) {
            const tmpPath = path.join(tmpdir(), `course-brochure-${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '')}`);
            await writeFile(tmpPath, buffer);
            try {
                const cloudinary = (await import('cloudinary')).v2;
                cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(tmpPath, {
                        folder: 'cyberwhisper/courses/brochures',
                        resource_type: 'raw',
                    }, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
                const cdnUrl = result.secure_url;
                return NextResponse.json({ url: cdnUrl, success: true });
            } finally {
                await unlink(tmpPath).catch(() => {});
            }
        }

        // 2) On Vercel without Cloudinary: use Vercel Blob if token is set (max ~4.5MB per request)
        if (isReadOnlyFs() && hasBlobToken && buffer.length <= VERCEL_BLOB_MAX_SIZE) {
            try {
                const { put } = await import('@vercel/blob');
                const blob = await put(`course-brochures/${filename}`, buffer, { access: 'public' });
                return NextResponse.json({ url: blob.url, success: true });
            } catch (blobErr) {
                console.error('Vercel Blob brochure upload error:', blobErr);
            }
        }

        // 3) Save to local disk only if not read-only (e.g. local dev)
        if (isReadOnlyFs()) {
            return NextResponse.json(
                {
                    error: 'Brochure upload unavailable',
                    message: hasBlobToken && buffer.length > VERCEL_BLOB_MAX_SIZE
                        ? 'PDF is too large for this host (max ~4MB). Use the paste link field or configure Cloudinary for larger files.'
                        : BROCHURE_UNAVAILABLE_MSG,
                },
                { status: 503 }
            );
        }

        await mkdir(COURSE_BROCHURES_DIR, { recursive: true });
        const filePath = path.join(COURSE_BROCHURES_DIR, filename);
        await writeFile(filePath, buffer);
        const url = `/uploads/course-brochures/${filename}`;
        return NextResponse.json({ url, success: true });
    } catch (err) {
        const isReadOnly = err.code === 'EROFS' || (err.message && err.message.includes('read-only'));
        if (isReadOnly) {
            return NextResponse.json(
                { error: 'Brochure upload unavailable', message: BROCHURE_UNAVAILABLE_MSG },
                { status: 503 }
            );
        }
        console.error('Course brochure upload error:', err);
        return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
    }
}
