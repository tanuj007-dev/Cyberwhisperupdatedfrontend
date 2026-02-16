import { NextResponse } from 'next/server';
import { appendLocalBatchEnrollment } from '@/lib/batchEnrollmentStorage';

const BACKEND_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, batch_id } = body;

        const payload = {
            name: name ?? '',
            email: email ?? '',
            phone: phone ?? '',
            batch_id: batch_id ?? null,
        };

        let response;
        try {
            response = await fetch(`${BACKEND_URL}/api/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (fetchErr) {
            console.warn('Backend unreachable, saving batch enrollment locally:', fetchErr.message);
            await appendLocalBatchEnrollment(payload);
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 404 || !response.ok) {
            console.warn('Backend returned', response.status, '- saving batch enrollment locally');
            await appendLocalBatchEnrollment(payload);
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        return NextResponse.json({ success: true, ...data });
    } catch (err) {
        console.error('Batch enrollment error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
