import { NextResponse } from 'next/server';
import { getLocalBatchEnrollments } from '@/lib/batchEnrollmentStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page') || '1');
        const limit = Number(searchParams.get('limit') || '10');

        const base = (API_BASE_URL || '').replace(/\/$/, '');
        if (base) {
            try {
                const url = `${base}/api/batches/enrollments?page=${page}&limit=${limit}`;
                console.log('Fetching batch enrollments from:', url);

                const res = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store',
                });

                const data = await res.json().catch(() => ({}));
                console.log('External API response:', data);

                if (res.ok) {
                    const list = data.data ?? data.enrollments ?? (Array.isArray(data) ? data : []);
                    return NextResponse.json({
                        success: true,
                        data: Array.isArray(list) ? list : [],
                        pagination: data.pagination ?? { total: list.length, totalPages: 1, page, limit },
                    });
                }
            } catch (e) {
                console.warn('External API failed, falling back to local storage:', e.message);
                // fall through to local
            }
        }

        const local = await getLocalBatchEnrollments();
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
        console.error('Batch enrollments list error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
