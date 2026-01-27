import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '10';
        const offset = searchParams.get('offset') || '0';

        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
        const url = `${backendUrl}/newsletter/subscribers?limit=${limit}&offset=${offset}`;

        console.log(`Proxying Newsletter Subscribers request to: ${url}`);

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Backend returned ${res.status}`);
            return NextResponse.json({ subscribers: [], total: 0 }, { status: res.status });
        }

        const data = await res.json();

        // Ensure the response matches what the frontend expects { subscribers: [], total: number }
        // If backend returns { success: true, data: [...] }, we might need mapping.
        // Let's assume backend returns consistent structure or we pass it through if it matches.
        // If we look at other APIs in this project, they often structure as { success, data, pagination }.

        // Mapping attempt (safe fallback)
        const subscribers = data.subscribers || data.data || data;
        const total = data.total || data.count || (Array.isArray(subscribers) ? subscribers.length : 0);

        return NextResponse.json({
            subscribers: Array.isArray(subscribers) ? subscribers : [],
            total: total
        }, { status: 200 });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ subscribers: [], total: 0 }, { status: 500 });
    }
}
