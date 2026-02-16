import { NextResponse } from 'next/server';

const getBackendBase = () => {
    const url = process.env.BACKEND_API_URL || process.env.ADMIN_BACKEND_URL || 'https://darkred-mouse-801836.hostingersite.com';
    return url.replace(/\/api\/?$/, '');
};

export async function POST(request) {
    try {
        const body = await request.json();
        const base = getBackendBase();
        const response = await fetch(`${base}/api/admin/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Admin verify-otp proxy error:', error);
        return NextResponse.json(
            { message: 'Cannot reach auth server. Is the backend running?', error: error.message },
            { status: 502 }
        );
    }
}
