import { NextResponse } from 'next/server';

const getBackendBase = () => {
    const url = process.env.BACKEND_API_URL || process.env.ADMIN_BACKEND_URL || 'https://darkred-mouse-801836.hostingersite.com';
    return url.replace(/\/api\/?$/, '');
};

export async function GET(request, { params }) {
    try {
        const resolved = await Promise.resolve(params);
        const email = resolved.email ? decodeURIComponent(resolved.email) : '';
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        const base = getBackendBase();
        const url = `${base}/api/admin/otp-status/${encodeURIComponent(email)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });
        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Admin otp-status proxy error:', error);
        return NextResponse.json(
            { message: 'Cannot reach auth server. Is the backend running?', error: error.message },
            { status: 502 }
        );
    }
}
