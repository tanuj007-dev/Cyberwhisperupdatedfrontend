import { NextResponse } from 'next/server';
import { appendLocalBatchEnrollment } from '@/lib/batchEnrollmentStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone_number, batch_id } = body;

        // Prepare payload for external API
        const payload = {
            batch_id: batch_id ?? null,
            name: name ?? '',
            email: email ?? '',
            phone_number: phone_number ?? ''
        };

        console.log('Batch enrollment request:', payload);

        // Try to forward to external API
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        let response;
        let batchDetails = null;

        // Fetch batch details for local storage
        try {
            const batchResponse = await fetch(`${base}/api/batches/${batch_id}`);
            if (batchResponse.ok) {
                const batchData = await batchResponse.json();
                batchDetails = batchData.data || batchData;
            }
        } catch (err) {
            console.warn('Could not fetch batch details:', err.message);
        }

        try {
            response = await fetch(`${base}/api/batches/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (fetchErr) {
            console.warn('Backend unreachable, saving batch enrollment locally:', fetchErr.message);
            await appendLocalBatchEnrollment({
                ...payload,
                batch_name: batchDetails?.program_name || '',
                program_name: batchDetails?.program_name || '',
                start_date: batchDetails?.start_date || null
            });
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 404 || !response.ok) {
            console.warn('Backend returned', response.status, '- saving batch enrollment locally');
            await appendLocalBatchEnrollment({
                ...payload,
                batch_name: batchDetails?.program_name || '',
                program_name: batchDetails?.program_name || '',
                start_date: batchDetails?.start_date || null
            });
            return NextResponse.json({ success: true, message: 'Registration successful! We will contact you soon.' });
        }

        // Also save to local storage for admin panel
        await appendLocalBatchEnrollment({
            ...payload,
            batch_name: batchDetails?.program_name || '',
            program_name: batchDetails?.program_name || '',
            start_date: batchDetails?.start_date || null
        });

        return NextResponse.json({ success: true, ...data });
    } catch (err) {
        console.error('Batch enrollment error:', err);
        return NextResponse.json(
            { success: false, message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
