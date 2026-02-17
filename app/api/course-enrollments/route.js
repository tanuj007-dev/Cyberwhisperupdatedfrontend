import { NextResponse } from 'next/server';
import { getLocalEnrollments } from '@/lib/courseEnrollmentStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page') || '1');
        const limit = Number(searchParams.get('limit') || '10');

        const base = (API_BASE_URL || '').replace(/\/$/, '');
        if (base) {
            try {
                const url = `${base}/api/course-enrollments?page=${page}&limit=${limit}`;
                const res = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store',
                });
                const data = await res.json().catch(() => ({}));
                if (res.ok) {
                    const list = data.data ?? data.enrollments ?? (Array.isArray(data) ? data : []);
                    return NextResponse.json({
                        success: true,
                        data: Array.isArray(list) ? list : [],
                        pagination: data.pagination ?? { total: list.length, totalPages: 1, page, limit },
                    });
                }
            } catch (e) {
                // fall through to local
            }
        }

        const local = await getLocalEnrollments();
        const start = (page - 1) * limit;
        const paginated = local.slice(start, start + limit);
        return NextResponse.json({
            success: true,
            data: paginated,
            pagination: {
                total: local.length,
                totalPages: Math.max(1, Math.ceil(local.length / limit)),
                page,
                limit,
            },
        });
    } catch (err) {
        console.error('Course enrollments list error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
