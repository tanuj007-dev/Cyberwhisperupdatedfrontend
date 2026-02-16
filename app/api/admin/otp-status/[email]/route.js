import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function GET(request, { params }) {
    try {
        const resolved = await Promise.resolve(params);
        const email = resolved.email ? decodeURIComponent(resolved.email) : '';
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        const url = `${API_BASE_URL}/api/admin/otp-status/${encodeURIComponent(email)}`;

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
