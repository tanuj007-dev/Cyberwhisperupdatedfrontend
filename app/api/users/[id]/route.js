import { NextResponse } from 'next/server';
import { getUserById, deleteUser } from '@/lib/userStorage';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request, context) {
    try {
        // Await params in Next.js 15+
        const { id } = await context.params;
        
        console.log('Fetching user by ID:', id);
        
        // Try local storage first
        const user = await getUserById(id);
        
        if (user) {
            console.log('User found in local storage');
            return NextResponse.json(
                { success: true, data: user },
                { status: 200, headers: corsHeaders }
            );
        }
        
        // If not found locally, try backend server
        console.log('User not found locally, trying backend server');
        const url = `${BACKEND_URL}/users/${id}`;
        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
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
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function DELETE(request, context) {
    try {
        // Await params in Next.js 15+
        const { id } = await context.params;
        
        console.log('=== DELETE USER ===');
        console.log('User ID:', id);
        
        // Try to delete from local storage
        const deleted = await deleteUser(id);
        
        if (deleted) {
            console.log('User deleted successfully from local storage');
            return NextResponse.json(
                {
                    success: true,
                    message: 'User deleted successfully'
                },
                { status: 200, headers: corsHeaders }
            );
        }
        
        // If not found locally, try backend server
        console.log('User not found locally, trying backend server');
        const url = `${BACKEND_URL}/users/${id}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
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
        console.error('Error deleting user:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
                details: error.message
            },
            { status: 500, headers: corsHeaders }
        );
    }
}
