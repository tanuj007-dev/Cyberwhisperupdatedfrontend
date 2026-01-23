import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

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
 * GET /api/blogs/[slug]
 * Fetch a single blog by slug from the backend API
 * 
 * Returns: { success: true, data: {...blog} }
 */
export async function GET(request, context) {
    try {
        // Await params in Next.js 15+
        const { slug } = await context.params;

        // Check if the parameter is a number (ID) or string (slug)
        const isNumeric = /^\d+$/.test(slug);

        console.log('=== FETCH BLOG BY SLUG/ID ===');
        console.log('Parameter:', slug);
        console.log('Type:', isNumeric ? 'ID' : 'Slug');
        console.log('Backend API URL:', BACKEND_API_URL);

        // Fetch from backend API
        const response = await fetch(`${BACKEND_API_URL}/api/blogs/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        console.log('Backend response status:', response.status);

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { success: false, error: 'Blog not found' },
                    { status: 404, headers: corsHeaders }
                );
            }

            const errorText = await response.text();
            console.error('Backend error:', errorText);
            throw new Error(`Backend API error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Backend response:', result);

        // Handle different response structures
        let blog;
        if (result.success && result.data) {
            blog = result.data;
        } else if (result.id || result.slug) {
            blog = result;
        } else {
            throw new Error('Invalid blog data format');
        }

        // Map blog fields to match frontend expectations
        const mappedBlog = {
            ...blog,
            image: blog.banner_url || blog.thumbnail_url || blog.image,
            content: blog.description || blog.content || '',
            description: blog.short_description || blog.description?.substring(0, 200) || '',
            excerpt: blog.short_description || blog.description?.substring(0, 150) || '',
            date: blog.published_at || blog.created_at,
            author: blog.author_name || 'CyberWhisper Team',
            category: blog.category_name || 'Cybersecurity',
            tags: blog.tags || []
        };

        console.log('Blog fetched successfully:', mappedBlog.title);

        return NextResponse.json(
            {
                success: true,
                message: 'Blog fetched successfully',
                data: mappedBlog
            },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error fetching blog by slug:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog', details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}
