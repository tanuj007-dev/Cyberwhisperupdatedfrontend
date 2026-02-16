import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const base = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';
        const url = `${base}/api/newsletter/subscribers/${id}`;

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
