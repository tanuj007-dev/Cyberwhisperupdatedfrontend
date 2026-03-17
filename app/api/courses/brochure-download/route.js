import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

/**
 * GET /api/courses/brochure-download?url=ENCODED_BROCHURE_URL
 *
 * Brochure URLs from the API are often S3 pre-signed URLs that expire (e.g. after 24 hours).
 * This route asks the backend for a fresh presigned URL using the S3 object key, then redirects.
 * Backend must implement GET /api/brochure-downloads/presigned?key=BUCKET_KEY and return a new
 * presigned URL (e.g. { url: "https://..." }) so downloads work after the stored URL has expired.
 */
function getS3KeyFromUrl(url) {
    try {
        const u = new URL(url);
        return u.pathname.replace(/^\//, '').trim() || null;
    } catch {
        return null;
    }
}

function parsePresignedResponse(data) {
    return data?.url ?? data?.data?.url ?? data?.presignedUrl ?? data?.data?.presignedUrl ?? data?.presigned_url ?? data?.data?.presigned_url;
}

const EXPIRED_HTML = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Download link expired</title></head>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:80px auto;padding:24px;text-align:center;">
  <h1 style="color:#333;">Download link expired</h1>
  <p style="color:#666;">This brochure link has expired. Please go back to the course page and click "Download brochure" again so we can generate a new link.</p>
  <p><a href="javascript:history.back()" style="color:#6B46E5;">Go back</a></p>
</body></html>
`;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const brochureUrl = searchParams.get('url');
        if (!brochureUrl) {
            return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
        }
        const decodedUrl = decodeURIComponent(brochureUrl);

        const isS3 = decodedUrl.includes('amazonaws.com') || decodedUrl.includes('s3.');
        if (isS3 && API_BASE_URL) {
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            let presignedUrl = null;

            try {
                // Prefer S3 key: backend can generate a fresh presigned URL; the stored URL may be expired
                const key = getS3KeyFromUrl(decodedUrl);
                if (key) {
                    const keyRes = await fetch(
                        `${base}/api/brochure-downloads/presigned?key=${encodeURIComponent(key)}`,
                        { cache: 'no-store' }
                    );
                    if (keyRes.ok) {
                        const data = await keyRes.json().catch(() => ({}));
                        presignedUrl = parsePresignedResponse(data);
                    }
                }

                if (!presignedUrl) {
                    const presignedRes = await fetch(
                        `${base}/api/brochure-downloads/presigned?fileUrl=${encodeURIComponent(decodedUrl)}`,
                        { cache: 'no-store' }
                    );
                    if (presignedRes.ok) {
                        const data = await presignedRes.json().catch(() => ({}));
                        presignedUrl = parsePresignedResponse(data);
                    }
                }

                if (!presignedUrl) {
                    const downloadRes = await fetch(
                        `${base}/api/brochure-downloads/download?fileUrl=${encodeURIComponent(decodedUrl)}`,
                        { redirect: 'manual', cache: 'no-store' }
                    );
                    if (downloadRes.status === 302 || downloadRes.status === 301) {
                        const location = downloadRes.headers.get('location');
                        if (location) presignedUrl = location;
                    }
                }

                if (presignedUrl && typeof presignedUrl === 'string') {
                    return NextResponse.redirect(presignedUrl, 302);
                }
            } catch (e) {
                console.warn('Brochure presigned request failed:', e?.message || e);
            }

            // S3 URL but no fresh link: do not redirect to expired URL; show clear message
            return new NextResponse(EXPIRED_HTML, {
                status: 503,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        }

        return NextResponse.redirect(decodedUrl, 302);
    } catch (err) {
        console.error('Brochure download proxy error:', err);
        return NextResponse.json({ error: 'Download failed' }, { status: 500 });
    }
}
