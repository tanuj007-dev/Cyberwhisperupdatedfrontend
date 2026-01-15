import { NextResponse } from 'next/server';
import { getFilteredBlogs } from '@/lib/blogStorage';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/blogs/list
 * Fetch published blogs with pagination
 * 
 * Query params:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 6)
 * - category_id: Filter by category (optional)
 * - status: Filter by status (default: ACTIVE)
 * 
 * Returns: { success: true, data: [...blogs], pagination: { ... } }
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
        const category_id = searchParams.get('category_id');
        const status = searchParams.get('status') || 'ACTIVE';

        // Get blogs from file storage
        let blogs = await getFilteredBlogs({ status, category_id });

        // Sort by created_at descending (newest first)
        blogs = blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Calculate pagination
        const total = blogs.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedBlogs = blogs.slice(startIndex, endIndex);

        // Log for debugging
        console.log('Blogs List API:', {
            page,
            limit,
            category_id,
            status,
            total,
            returned: paginatedBlogs.length,
            totalPages: Math.ceil(total / limit)
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Blogs fetched successfully',
                data: paginatedBlogs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: endIndex < total,
                    hasPrevPage: page > 1
                }
            },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error fetching blogs list:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
