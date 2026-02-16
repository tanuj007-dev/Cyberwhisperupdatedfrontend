import { NextResponse } from 'next/server';

const getBackendBase = () => {
    const url = process.env.BACKEND_API_URL || process.env.ADMIN_BACKEND_URL || 'https://darkred-mouse-801836.hostingersite.com';
    return url.replace(/\/api\/?$/, '');
};

export async function POST(request) {
    try {
        const body = await request.json();
        let authHeader = request.headers.get('Authorization');
        // If client sent dev-bypass (e.g. "Dev: Log in without backend"), use server-side token so backend accepts the request
        const serverToken = process.env.NEWSLETTER_SERVICE_TOKEN || process.env.ADMIN_SERVICE_TOKEN;
        if (authHeader?.startsWith('Bearer dev-bypass')) {
            if (serverToken) {
                authHeader = `Bearer ${serverToken.trim()}`;
            } else {
                // Dev mode: avoid 401 so UI doesn't error. No emails sent; user can set NEWSLETTER_SERVICE_TOKEN or log in for real send.
                return NextResponse.json(
                    {
                        success: true,
                        message: 'Dev mode: no emails were sent. Log in with your admin account (email + password + OTP) or set NEWSLETTER_SERVICE_TOKEN in .env.local to send for real.',
                    },
                    { status: 200 }
                );
            }
        }
        const base = getBackendBase();
        const url = `${base}/api/newsletter/send`;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authHeader) headers['Authorization'] = authHeader;

        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({}));

        if (process.env.NODE_ENV !== 'production') {
            console.log('[Newsletter send]', url, '→', res.status);
        }

        if (res.status === 404) {
            return NextResponse.json(
                { success: false, message: 'Newsletter send is not implemented on the backend. Add POST /api/newsletter/send to your API or configure BACKEND_API_URL.', error: 'Not implemented' },
                { status: 501 }
            );
        }

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Newsletter send proxy error:', error);
        return NextResponse.json(
            { success: false, message: 'Cannot reach backend. Is it running?', error: error.message },
            { status: 502 }
        );
    }
}
