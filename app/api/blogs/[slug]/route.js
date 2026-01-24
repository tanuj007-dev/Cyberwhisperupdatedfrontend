import { NextResponse } from 'next/server';
import { getBlogById, getAllBlogs } from '@/lib/blogStorage';

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
 * Fetch a single blog by slug or ID from local storage
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

        let blog;

        if (isNumeric) {
            // Fetch by ID
            blog = await getBlogById(parseInt(slug));
            console.log('Blog found by ID:', blog ? blog.title : 'Not found');
        } else {
            // Fetch by slug - need to search through all blogs
            const blogs = await getAllBlogs();
            blog = blogs.find(b => b.slug === slug);
            console.log('Blog found by slug:', blog ? blog.title : 'Not found');
        }

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404, headers: corsHeaders }
            );
        }

        // Map blog fields to match frontend expectations
        const mappedBlog = {
            ...blog,
            image: blog.banner_url || blog.thumbnail_url || blog.image,
            content: blog.content || blog.description || '',
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
