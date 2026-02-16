import { NextResponse } from 'next/server';
import { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getFilteredBlogs } from '@/lib/blogStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// POST /api/blogs - Create a new blog post
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields (accept both 'content' and 'description')
        const {
            title,
            slug,
            category_id,
            author_id,
            content,
            description
        } = body;

        const blogContent = content || description;

        if (!title || !slug || !category_id || !author_id || !blogContent) {
            return NextResponse.json(
                {
                    error: 'Missing required fields',
                    required: ['title', 'slug', 'category_id', 'author_id', 'content OR description']
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate slug format (URL-friendly)
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(slug)) {
            return NextResponse.json(
                { error: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only.' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Create blog post object with all fields
        const blogPost = {
            // Required fields
            title,
            slug,
            category_id: parseInt(category_id),
            author_id: parseInt(author_id),
            content: blogContent,

            // Optional fields with defaults
            keywords: body.keywords || '',
            short_description: body.short_description || body.description || '',
            reading_time: body.reading_time || '5 min read',
            thumbnail_url: body.thumbnail_url || '',
            banner_url: body.banner_url || '',
            image_url: body.image_url || '',
            video_url: body.video_url || '',
            image_alt_text: body.image_alt_text || title,
            image_caption: body.image_caption || '',

            // Boolean fields
            is_popular: body.is_popular ?? false,
            allow_comments: body.allow_comments ?? true,
            show_on_homepage: body.show_on_homepage ?? true,
            is_sticky: body.is_sticky ?? false,

            // Status and visibility
            status: body.status || 'DRAFT',
            visibility: body.visibility || 'PUBLIC',

            // SEO fields
            seo_title: body.seo_title || title,
            seo_description: body.seo_description || body.short_description || '',
            focus_keyword: body.focus_keyword || '',
            meta_robots: body.meta_robots || 'INDEX',

            // Timestamps
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: body.status === 'PUBLISHED' ? new Date().toISOString() : null,
        };

        // Log the blog post (in production, save to database)
        console.log('New blog post created:', {
            id: Date.now(), // Generate temporary ID
            ...blogPost
        });

        // Save blog to file storage
        const savedBlog = await addBlog(blogPost);

        if (!savedBlog) {
            return NextResponse.json(
                { error: 'Failed to save blog post', details: 'Storage error' },
                { status: 500, headers: corsHeaders }
            );
        }

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: 'Blog post created successfully',
                data: savedBlog
            },
            { status: 201, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

// GET /api/blogs - Get all blog posts (try backend first, then local storage)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const category_id = searchParams.get('category_id');
        const limit = parseInt(searchParams.get('limit') || '10');
        const page = parseInt(searchParams.get('page') || '1');

        try {
            const q = new URLSearchParams({ page: String(page), limit: String(limit) });
            if (status) q.set('status', status);
            if (category_id) q.set('category_id', category_id);
            const res = await fetch(`${API_BASE_URL}/api/blogs?${q.toString()}`, { headers: { 'Content-Type': 'application/json' } });
            if (res.ok) {
                const json = await res.json();
                return NextResponse.json(json, { status: 200, headers: corsHeaders });
            }
        } catch (err) {
            console.warn('Blogs GET: backend unreachable, using local storage:', err.message);
        }

        const filterOptions = {};
        if (status) filterOptions.status = status;
        if (category_id) filterOptions.category_id = category_id;
        let blogs = await getFilteredBlogs(filterOptions);
        blogs = blogs.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        const total = blogs.length;
        const start = (page - 1) * limit;
        const data = blogs.slice(start, start + limit);

        return NextResponse.json(
            {
                success: true,
                message: 'Blogs fetched successfully',
                data,
                pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

// PUT /api/blogs - Update a blog post (requires ID in body)
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Blog ID is required for update' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Update in file storage
        const updatedBlog = await updateBlog(id, updateData);

        if (!updatedBlog) {
            return NextResponse.json(
                { error: 'Blog not found or update failed' },
                { status: 404, headers: corsHeaders }
            );
        }

        console.log('Blog post updated:', updatedBlog);

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post updated successfully',
                data: updatedBlog
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

// DELETE /api/blogs - Delete a blog post (requires ID in query)
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Blog ID is required for deletion' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Delete from file storage
        const success = await deleteBlog(id);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to delete blog' },
                { status: 500, headers: corsHeaders }
            );
        }

        console.log('Blog post deleted:', id);

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post deleted successfully'
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
