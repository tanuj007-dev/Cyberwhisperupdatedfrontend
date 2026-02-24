import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';

const s3Bucket = process.env.AWS_S3_BUCKET;
const s3Region = process.env.AWS_REGION || process.env.AWS_S3_REGION || 'us-east-1';
const s3Prefix = (process.env.AWS_S3_BROCHURE_PREFIX || 'course-brochures').replace(/^\/+|\/+$/g, '') || 'course-brochures';
const s3PublicUrlBase = process.env.AWS_S3_PUBLIC_URL_BASE || '';
const useS3 = !!(s3Bucket && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

function sanitize(name) {
    return name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 80) || 'brochure';
}

/**
 * GET /api/courses/brochure-presign?filename=my-file.pdf&contentType=application/pdf
 *
 * Returns a pre-signed S3 PUT URL the browser can use to upload directly to S3.
 * Also returns the final public fileUrl that should be stored in the DB after upload.
 *
 * If S3 is not configured it returns { fallback: true } so the frontend
 * can fall back to the regular /api/courses/brochure-upload route.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const rawName = searchParams.get('filename') || 'brochure.pdf';
        const contentType = searchParams.get('contentType') || 'application/pdf';

        if (!useS3) {
            // Tell the frontend to fall back to the multipart upload route
            return NextResponse.json({ fallback: true, reason: 'S3 not configured' });
        }

        const ext = path.extname(rawName) || '.pdf';
        const baseName = sanitize(path.basename(rawName, ext));
        const filename = `${Date.now()}-${baseName}${ext}`;
        const key = `${s3Prefix}/${filename}`;

        const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
        const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

        const s3 = new S3Client({
            region: s3Region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const command = new PutObjectCommand({
            Bucket: s3Bucket,
            Key: key,
            ContentType: contentType,
        });

        // Pre-signed URL valid for 15 minutes (plenty for a 100MB upload)
        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

        // Final public URL where the file will be accessible after upload
        const fileUrl = s3PublicUrlBase
            ? `${s3PublicUrlBase.replace(/\/$/, '')}/${key}`
            : `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${key}`;

        return NextResponse.json({ uploadUrl, fileUrl, key, success: true });
    } catch (err) {
        console.error('Brochure presign error:', err);
        return NextResponse.json({ error: err.message || 'Failed to generate presigned URL' }, { status: 500 });
    }
}
