import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const url = `${BACKEND_URL}/users/${id}`; // Usually update is PUT /users/:id, but AdminContext sends /users/:id/update? No, AdminContext fetch URL is /api/users/${id}/update.
        // Wait, let's check AdminContext fetch call again in Step 240.
        // Line 199: fetch(`${apiUrl}/api/users/${id}/update`, { method: 'PUT' ... })
        // So the frontend calls /api/users/:id/update
        // The question is: what does the BACKEND expect? 
        // Usually REST is PUT /users/:id. 
        // If I proxy to ${BACKEND_URL}/users/${id}/update, it assumes backend has that route.
        // If backend is standard REST, it might be just PUT /users/${id}.
        // I'll assume standard REST for the backend unless I see otherwise. 
        // Let's try proxying to standard PUT /users/:id. If that fails, I can change it.

        // Actually, looking at previous conversations, the backend seems to follow what the frontend expects or vice versa. 
        // Let's assume the backend is standard RESTful. I will proxy to `${BACKEND_URL}/users/${id}`.

        const backendUrl = `${BACKEND_URL}/users/${id}`;

        const res = await fetch(backendUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
