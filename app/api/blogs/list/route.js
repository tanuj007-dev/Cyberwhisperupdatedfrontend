import { NextResponse } from 'next/server';
import { getFilteredBlogs } from '@/lib/blogStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function mapBlogToFrontend(blog) {
    const id = blog.id ?? blog.blog_id ?? blog._id;
    return {
        ...blog,
        id,
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

        const base = (API_BASE_URL || '').replace(/\/$/, '');
        const headers = { 'Content-Type': 'application/json' };
        let backendFailed = false;

        const normalizeAndReturn = (json) => {
            const raw = json.data ?? json.blogs ?? json.result ?? json.items ?? json.posts ?? (Array.isArray(json) ? json : []);
            const list = Array.isArray(raw) ? raw : [];
            const total = json.pagination?.total ?? json.total ?? list.length;
            const totalPages = json.pagination?.totalPages ?? (Math.ceil(total / limit) || 1);
            const data = list.map(mapBlogToFrontend);
            return NextResponse.json(
                {
                    success: true,
                    message: 'Blogs fetched successfully',
                    data,
                    pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
                },
                { status: 200, headers: corsHeaders }
            );
        };

        if (base) {
            try {
                // When status=all, try backend with no query first (matches Postman: GET /api/blogs/list)
                const urlsToTry = backendStatus === 'all'
                    ? [
                        `${base}/api/blogs/list`,
                        `${base}/api/blogs/list?page=${page}&limit=${limit}`,
                    ]
                    : [
                        `${base}/api/blogs/list?page=${page}&limit=${limit}${backendStatus && backendStatus !== 'all' ? `&status=${backendStatus}` : ''}${category_id ? `&category_id=${category_id}` : ''}`,
                    ];
                for (const listUrl of urlsToTry) {
                    const res = await fetch(listUrl, { headers, cache: 'no-store' });
                    if (!res.ok) continue;
                    const json = await res.json().catch(() => ({}));
                    return normalizeAndReturn(json);
                }
                backendFailed = true;
            } catch (err) {
                console.warn('Blogs list: backend unreachable, using local:', err.message);
                backendFailed = true;
            }
        } else {
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
