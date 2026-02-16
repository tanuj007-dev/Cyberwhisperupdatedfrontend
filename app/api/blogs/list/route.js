import { NextResponse } from 'next/server';
import { getFilteredBlogs } from '@/lib/blogStorage';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const BACKEND_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

function mapBlogToFrontend(blog) {
    return {
        ...blog,
        image: blog.banner_url || blog.thumbnail_url || blog.image,
        description: blog.short_description || (typeof blog.content === 'string' ? blog.content.substring(0, 200) : '') || '',
        excerpt: blog.short_description || (typeof blog.content === 'string' ? blog.content.substring(0, 150) : '') || '',
        date: blog.published_at || blog.created_at,
        author: blog.author_name || 'CyberWhisper Team',
        category: blog.category_name || 'Cybersecurity',
    };
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/blogs/list
 * Fetches from backend (3001) first so newly added blogs appear; falls back to local storage if backend fails.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
        const category_id = searchParams.get('category_id');
        const statusParam = searchParams.get('status') || 'ACTIVE';
        // Backend may expect PUBLISHED for public list
        const backendStatus = statusParam === 'all' ? 'all' : statusParam === 'ACTIVE' ? 'PUBLISHED' : statusParam;

        let backendFailed = false;
        try {
            const q = new URLSearchParams({ page: String(page), limit: String(limit) });
            if (backendStatus && backendStatus !== 'all') q.set('status', backendStatus);
            if (category_id) q.set('category_id', category_id);
            // Backend exposes GET /api/blogs (not /api/blogs/list)
            const listUrl = `${BACKEND_URL}/api/blogs?${q.toString()}`;
            const res = await fetch(listUrl, { headers: { 'Content-Type': 'application/json' } });
            if (res.ok) {
                const json = await res.json();
                const raw = json.data ?? json.blogs ?? (Array.isArray(json) ? json : []);
                const list = Array.isArray(raw) ? raw : [];
                const total = json.pagination?.total ?? list.length;
                const totalPages = json.pagination?.totalPages ?? Math.ceil(total / limit);
                const data = list.map(mapBlogToFrontend);
                return NextResponse.json(
                    {
                        success: true,
                        message: 'Blogs fetched successfully',
                        data,
                        pagination: {
                            page,
                            limit,
                            total,
                            totalPages,
                            hasNextPage: page < totalPages,
                            hasPrevPage: page > 1,
                        },
                    },
                    { status: 200, headers: corsHeaders }
                );
            }
            backendFailed = true;
        } catch (err) {
            console.warn('Blogs list: backend unreachable, using local:', err.message);
            backendFailed = true;
        }

        if (backendFailed) {
            let filterOptions = {};
            if (category_id) filterOptions.category_id = category_id;
            if (statusParam && statusParam !== 'all' && statusParam !== 'ACTIVE' && statusParam !== 'PUBLISHED') filterOptions.status = statusParam;
            let blogs = await getFilteredBlogs(filterOptions);
            if (statusParam === 'ACTIVE' || statusParam === 'PUBLISHED') {
                blogs = blogs.filter(b => ['PUBLISHED', 'ACTIVE'].includes((b.status || '').toUpperCase()));
            }
            blogs = blogs.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const mapped = blogs.map(mapBlogToFrontend);
            const total = mapped.length;
            const startIndex = (page - 1) * limit;
            const paginatedBlogs = mapped.slice(startIndex, startIndex + limit);
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
                        hasNextPage: startIndex + limit < total,
                        hasPrevPage: page > 1,
                    },
                },
                { status: 200, headers: corsHeaders }
            );
        }
    } catch (error) {
        console.error('Error fetching blogs list:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
