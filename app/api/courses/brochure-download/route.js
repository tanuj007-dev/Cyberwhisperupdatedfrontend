import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

/**
 * GET /api/courses/brochure-download?url=ENCODED_BROCHURE_URL
 *
 * For S3 brochure URLs, the direct link often returns Access Denied because the object is private.
 * This route asks the backend for a presigned download URL, then redirects the user to it.
 * For non-S3 URLs, redirects to the original URL.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const brochureUrl = searchParams.get('url');
        if (!brochureUrl) {
            return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
        }
        const decodedUrl = decodeURIComponent(brochureUrl);

        // If it's an S3 URL, try to get a presigned URL from the backend to avoid Access Denied
        const isS3 = decodedUrl.includes('amazonaws.com') || decodedUrl.includes('s3.');
        if (isS3 && API_BASE_URL) {
            try {
                const base = (API_BASE_URL || '').replace(/\/$/, '');
                let presignedUrl = null;

                // Try ?fileUrl= (full URL)
                const presignedRes = await fetch(
                    `${base}/api/brochure-downloads/presigned?fileUrl=${encodeURIComponent(decodedUrl)}`,
                    { cache: 'no-store' }
                );
                if (presignedRes.ok) {
                    const data = await presignedRes.json().catch(() => ({}));
                    presignedUrl = data.url ?? data.data?.url ?? data.presignedUrl ?? data.data?.presignedUrl ?? data.presigned_url ?? data.data?.presigned_url;
                }

                // Try ?key= (S3 key) if fileUrl didn't work
                if (!presignedUrl && decodedUrl) {
                    try {
                        const u = new URL(decodedUrl);
                        const key = u.pathname.replace(/^\//, '');
                        if (key) {
                            const keyRes = await fetch(
                                `${base}/api/brochure-downloads/presigned?key=${encodeURIComponent(key)}`,
                                { cache: 'no-store' }
                            );
                            if (keyRes.ok) {
                                const data = await keyRes.json().catch(() => ({}));
                                presignedUrl = data.url ?? data.data?.url ?? data.presignedUrl ?? data.data?.presignedUrl ?? data.presigned_url ?? data.data?.presigned_url;
                            }
                        }
                    } catch (_) {}
                }

                if (presignedUrl && typeof presignedUrl === 'string') {
                    return NextResponse.redirect(presignedUrl, 302);
                }

                // Try /download endpoint that might redirect
                const downloadRes = await fetch(
                    `${base}/api/brochure-downloads/download?fileUrl=${encodeURIComponent(decodedUrl)}`,
                    { redirect: 'manual', cache: 'no-store' }
                );
                if (downloadRes.status === 302 || downloadRes.status === 301) {
                    const location = downloadRes.headers.get('location');
                    if (location) return NextResponse.redirect(location, 302);
                }
            } catch (_) {
                // Fall through to redirect to original URL
            }
        }

        // Non-S3 or backend didn't return presigned URL: redirect to original brochure URL
        return NextResponse.redirect(decodedUrl, 302);
    } catch (err) {
        console.error('Brochure download proxy error:', err);
        return NextResponse.json({ error: 'Download failed' }, { status: 500 });
    }
}
