import { NextResponse } from 'next/server';
import { appendLocalEnrollment } from '@/lib/courseEnrollmentStorage';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

export async function POST(request) {
    try {
        const body = await request.json();
        const { course_name, name, email, phone_number } = body;
        const payload = {
            course_name: course_name ?? '',
            name: name ?? '',
            email: email ?? '',
            phone_number: phone_number ?? '',
        };

        let response;
        try {
            response = await fetch(`${BACKEND_URL}/api/course-enrollments/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (fetchErr) {
            console.warn('Backend unreachable, saving enrollment locally:', fetchErr.message);
            await appendLocalEnrollment(payload);
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 404 || response.ok === false) {
            console.warn('Backend returned', response.status, '- saving enrollment locally');
            await appendLocalEnrollment(payload);
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        return NextResponse.json({ success: true, ...data });
    } catch (err) {
        console.error('Course enrollment add error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
