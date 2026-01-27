import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const response = await fetch(`${BACKEND_API_URL}/api/gallery/${id}/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
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
