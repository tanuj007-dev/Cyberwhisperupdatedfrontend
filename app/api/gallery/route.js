import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_API_URL}/api/gallery`, {
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
        console.error('Error fetching gallery images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery images', message: error.message },
            { status: 500 }
        );
    }
}
