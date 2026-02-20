import { NextResponse } from 'next/server';
import { getAllUsers, addUser, getFilteredUsers } from '@/lib/userStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const role = searchParams.get('role');

        let users = await getAllUsers();

        if (users.length === 0) {
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const queryString = searchParams.toString();
            const auth = request.headers.get('Authorization');
            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
            if (auth) headers['Authorization'] = auth;

            // Try backend: some APIs use /users, others /api/users
            const urlsToTry = [
                `${base}/users${queryString ? `?${queryString}` : ''}`,
                `${base}/api/users${queryString ? `?${queryString}` : ''}`,
            ];
            for (const url of urlsToTry) {
                try {
                    const res = await fetch(url, { method: 'GET', headers, cache: 'no-store' });
                    const data = await res.json().catch(() => ({}));
                    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.users) ? data.users : Array.isArray(data) ? data : [];
                    if (res.ok && list.length >= 0) {
                        const total = data?.pagination?.total ?? data?.total ?? list.length;
                        const startIndex = (page - 1) * limit;
                        const endIndex = startIndex + limit;
                        const paginatedUsers = list.slice(startIndex, endIndex);
                        return NextResponse.json({
                            success: true,
                            message: 'Users fetched successfully',
                            data: paginatedUsers,
                            pagination: {
                                page,
                                limit,
                                total,
                                totalPages: Math.ceil(Number(total) / limit) || 1,
                                hasNextPage: endIndex < total,
                                hasPrevPage: page > 1,
                            },
                        }, { status: 200, headers: corsHeaders });
                    }
                } catch (e) {
                    continue;
                }
            }
        }

        if (status || role) {
            const filters = {};
            if (status) filters.status = status;
            if (role) filters.role = role;
            users = await getFilteredUsers(filters);
        }
        users = users.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        const total = users.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = users.slice(startIndex, endIndex);

        return NextResponse.json(
            {
                success: true,
                message: 'Users fetched successfully',
                data: paginatedUsers,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: endIndex < total,
                    hasPrevPage: page > 1,
                },
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        console.log('=== CREATE USER ===');
        console.log('User data:', body);
        
        // Validate required fields
        if (!body.first_name || !body.last_name || !body.email) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required fields',
                    required: ['first_name', 'last_name', 'email']
                },
                { status: 400, headers: corsHeaders }
            );
        }
        
        // Prepare user data
        const userData = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone || '',
            title: body.title || '',
            address: body.address || '',
            biography: body.biography || '',
            linkedin_url: body.linkedin_url || '',
            github_url: body.github_url || '',
            role: body.role || 'USER',
            is_instructor: body.is_instructor || false,
            profile_image_url: body.profile_image_url || '',
            skills: body.skills || [],
            status: body.status || 'active'
        };
        
        // Save to local storage
        const newUser = await addUser(userData);
        
        if (!newUser) {
            return NextResponse.json(
                { success: false, message: 'Failed to create user' },
                { status: 500, headers: corsHeaders }
            );
        }
        
        console.log('User created successfully:', newUser.id);
        
        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully',
                data: newUser
            },
            { status: 201, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
