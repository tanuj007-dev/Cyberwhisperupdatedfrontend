import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';

        // Fetch categories from the backend
        // Assuming backend has an endpoint /courses/categories
        const response = await fetch(`${backendUrl}/courses/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            // Fallback if backend endpoint fails or doesn't exist yet, 
            // though "dynamic" request implies we should trust the backend.
            // But let's log it.
            console.warn(`Backend responded with ${response.status} for categories.`);
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        // Backend should return array of strings or objects. 
        // If it returns { categories: [...] }, we handle it.
        // Assuming data is the list or data.data is the list.
        const categories = Array.isArray(data) ? data : (data.categories || data.data || []);

        return NextResponse.json(categories, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        console.error('Error fetching categories from backend:', error);

        // Optional: Return a safe default or empty list if backend fails, 
        // but for "dynamic" request, returning error might be better to debug.
        // However, to keep UI from crashing:
        return NextResponse.json([], { status: 500 });
    }
}

export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
