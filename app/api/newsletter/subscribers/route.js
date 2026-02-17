import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '10';
        const offset = searchParams.get('offset') || '0';

        const base = (API_BASE_URL || '').replace(/\/$/, '');
        if (!base) {
            return NextResponse.json({ subscribers: [], total: 0, message: 'API_BASE_URL not configured' }, { status: 502 });
        }

        const url = `${base}/api/newsletter/subscribers?limit=${limit}&offset=${offset}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        const text = await res.text();
        let data = {};
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            console.error('Backend returned non-JSON:', text?.slice(0, 200));
        }

        if (!res.ok) {
            console.error('Newsletter subscribers backend error:', res.status, data);
            return NextResponse.json({
                subscribers: [],
                total: 0,
                error: data.message || data.error || `Backend returned ${res.status}`,
            }, { status: res.status >= 500 ? 502 : res.status });
        }

        const subscribers = data.subscribers ?? data.data ?? (Array.isArray(data) ? data : []);
        const total = data.total ?? data.count ?? (Array.isArray(subscribers) ? subscribers.length : 0);

        return NextResponse.json({
            subscribers: Array.isArray(subscribers) ? subscribers : [],
            total: Number(total) || 0,
        });
    } catch (error) {
        console.error('Newsletter subscribers proxy error:', error);
        return NextResponse.json(
            { subscribers: [], total: 0, error: error.message || 'Proxy error' },
            { status: 500 }
        );
    }
}
