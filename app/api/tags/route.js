import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';
import { mockTags } from '@/data/mockTags';

/**
 * GET /api/tags
 * Fetches tags from backend if available; otherwise returns mock tags for admin dropdowns.
 */
export async function GET() {
    try {
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        if (base) {
            const res = await fetch(`${base}/api/tags`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                const data = await res.json();
                const list = data?.data ?? data?.tags ?? (Array.isArray(data) ? data : []);
                if (Array.isArray(list) && list.length > 0) {
                    return NextResponse.json({ data: list, success: true });
                }
            }
        }
    } catch (err) {
        console.warn('Tags API: backend unreachable, using mock tags', err?.message);
    }
    return NextResponse.json({ data: mockTags, success: true });
}
