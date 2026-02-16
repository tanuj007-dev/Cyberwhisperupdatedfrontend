import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const response = await fetch(`${API_BASE_URL}/api/gallery/${id}/remove`, {
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
