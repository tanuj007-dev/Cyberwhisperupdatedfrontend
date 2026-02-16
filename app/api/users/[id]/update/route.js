import { NextResponse } from 'next/server';
import { updateUser, getUserById } from '@/lib/userStorage';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function PUT(request, context) {
    try {
        // Await params in Next.js 15+
        const { id } = await context.params;
        const body = await request.json();
        
        console.log('=== UPDATE USER ===');
        console.log('User ID:', id);
        console.log('Update data:', body);
        
        // Check if user exists locally
        const existingUser = await getUserById(id);
        
        if (existingUser) {
            // Update in local storage
            const updatedUser = await updateUser(id, body);
            
            if (!updatedUser) {
                return NextResponse.json(
                    { success: false, message: 'Failed to update user' },
                    { status: 500, headers: corsHeaders }
                );
            }
            
            console.log('User updated successfully in local storage');
            
            return NextResponse.json(
                {
                    success: true,
                    message: 'User updated successfully',
                    data: updatedUser
                },
                { status: 200, headers: corsHeaders }
            );
        }
        
        // If not found locally, try backend server
        console.log('User not found locally, trying backend server');
        const backendUrl = `${BACKEND_URL}/users/${id}`;
        
        const res = await fetch(backendUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data, { status: res.status, headers: corsHeaders });
        }
        
        return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404, headers: corsHeaders }
        );
        
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
