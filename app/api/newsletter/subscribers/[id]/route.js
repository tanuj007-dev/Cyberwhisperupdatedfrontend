import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const url = `${API_BASE_URL}/api/newsletter/subscribers/${id}`;

        console.log(`Proxying DELETE Subscriber request to: ${url}`);

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Proxy Delete Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
