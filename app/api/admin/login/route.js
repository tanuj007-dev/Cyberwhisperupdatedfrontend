import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function POST(request) {
    try {
        const body = await request.json();
        const url = `${API_BASE_URL}/api/admin/login`;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        const origin = request.headers.get('origin');
        if (origin) headers['Origin'] = origin;

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        const data = await response.json().catch(() => ({}));

        if (process.env.NODE_ENV !== 'production') {
            console.log('[Admin login]', url, '→', response.status, '| email:', body?.email ?? '(none)', '| backend error:', data?.error ?? data?.message ?? '');
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Admin login proxy error:', error);
        return NextResponse.json(
            { message: 'Cannot reach auth server. Is the backend running?', error: error.message },
            { status: 502 }
        );
    }
}
