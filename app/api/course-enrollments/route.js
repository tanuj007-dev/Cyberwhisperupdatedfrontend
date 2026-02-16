import { NextResponse } from 'next/server';
import { getLocalEnrollments } from '@/lib/courseEnrollmentStorage';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page') || '1');
        const limit = Number(searchParams.get('limit') || '10');

        let response;
        try {
            response = await fetch(
                `${BACKEND_URL}/api/course-enrollments?page=${page}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } catch (fetchErr) {
            const local = await getLocalEnrollments();
            const start = (page - 1) * limit;
            const paginated = local.slice(start, start + limit);
            return NextResponse.json({
                success: true,
                data: paginated,
                pagination: { total: local.length, totalPages: Math.max(1, Math.ceil(local.length / limit)), page, limit },
            });
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 404) {
            const local = await getLocalEnrollments();
            const start = (page - 1) * limit;
            const paginated = local.slice(start, start + limit);
            return NextResponse.json({
                success: true,
                data: paginated,
                pagination: { total: local.length, totalPages: Math.max(1, Math.ceil(local.length / limit)), page, limit },
            });
        }

        if (!response.ok) {
            return NextResponse.json(
                { success: false, ...data },
                { status: response.status }
            );
        }

        const list = data.data ?? data.enrollments ?? (Array.isArray(data) ? data : []);
        return NextResponse.json({
            success: true,
            data: Array.isArray(list) ? list : [],
            pagination: data.pagination ?? { total: list.length, totalPages: 1, page, limit },
        });
    } catch (err) {
        console.error('Course enrollments list error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
