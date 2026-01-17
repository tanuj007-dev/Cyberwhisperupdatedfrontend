import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/blogStorage';

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
 * Fetch a single blog by slug
 * 
 * Returns: { success: true, data: {...blog} }
 */
export async function GET(request, { params }) {
    try {
        const { slug } = params;

        // Get all blogs
        const blogs = await getAllBlogs();

        // Find blog by slug
        let blog = blogs.find(b => b.slug === slug);

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404, headers: corsHeaders }
            );
        }

        // Map blog fields to match frontend expectations
        blog = {
            ...blog,
            image: blog.banner_url || blog.thumbnail_url || blog.image,
            description: blog.short_description || blog.content?.substring(0, 200) || '',
            excerpt: blog.short_description || blog.content?.substring(0, 150) || '',
            date: blog.published_at || blog.created_at,
            author: blog.author_name || 'CyberWhisper Team',
            category: blog.category_name || 'Cybersecurity',
            tags: blog.tags || []
        };

        console.log('Blog fetched by slug:', slug, blog.title);

        return NextResponse.json(
            {
                success: true,
                message: 'Blog fetched successfully',
                data: blog
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
