import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        if (!base) {
            return NextResponse.json({ success: false, message: 'API_BASE_URL not configured' }, { status: 502 });
        }

        const url = `${base}/api/newsletter/subscribers/${id}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const text = await res.text();
        let data = {};
        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = { success: res.ok, message: res.statusText };
            }
        }

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Proxy Delete Error:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
