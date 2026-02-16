import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

export async function GET(request, { params }) {
    try {
        const { id } = params;

        const response = await fetch(`${BACKEND_API_URL}/api/gallery/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image', message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const response = await fetch(`${BACKEND_API_URL}/api/gallery/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Update failed: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json(
            { error: 'Failed to update image', message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        console.log('Attempting to delete image with ID:', id);

        const response = await fetch(`${BACKEND_API_URL}/api/gallery/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Backend delete response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend delete error:', errorText);

            let errorData = {};
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                errorData = { message: errorText };
            }

            throw new Error(errorData.message || `Delete failed: ${response.status}`);
        }

        const data = await response.json().catch(() => ({ success: true }));
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: 'Failed to delete image', message: error.message },
            { status: 500 }
        );
    }
}
