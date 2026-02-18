import { NextResponse } from 'next/server';
import { getBlogById, getAllBlogs } from '@/lib/blogStorage';
import { API_BASE_URL } from '@/lib/apiConfig';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function mapBlogToFrontend(blog) {
    const firstName = blog.author_first_name ?? blog.authorFirstName ?? '';
    const lastName = blog.author_last_name ?? blog.authorLastName ?? '';
    const authorFromNames = [firstName, lastName].filter(Boolean).join(' ').trim();
    const author = (blog.author_name ?? blog.authorName ?? authorFromNames) || 'CyberWhisper Team';

    return {
        ...blog,
        image: blog.banner_url || blog.thumbnail_url || blog.image,
        content: blog.content || blog.description || '',
        description: blog.short_description || (blog.description && blog.description.substring(0, 200)) || '',
        excerpt: blog.short_description || (blog.description && blog.description.substring(0, 150)) || '',
        date: blog.published_at || blog.created_at,
        author,
        category: blog.category_name || 'Cybersecurity',
        tags: blog.tags || [],
        facebook_url: blog.facebook_url ?? blog.Facebook_handle_url ?? blog.facebook_handle_url ?? null,
        linkedin_url: blog.linkedin_url ?? blog.linkedin_handle_url ?? null,
        twitter_url: blog.twitter_url ?? blog.x_handle_url ?? null,
        instagram_url: blog.instagram_url ?? blog.Instagram_handle_url ?? blog.instagram_handle_url ?? null
    };
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/blogs/[slug]
 * Fetch a single blog by slug or ID. Tries backend first, then local storage.
 */
export async function GET(request, context) {
    try {
        const { slug } = await context.params;

        try {
            const res = await fetch(`${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}`, { headers: { 'Content-Type': 'application/json' } });
            if (res.ok) {
                const json = await res.json();
                const blog = json.data ?? json;
                if (blog && (blog.id || blog.slug)) {
                    return NextResponse.json(
                        { success: true, message: 'Blog fetched successfully', data: mapBlogToFrontend(blog) },
                        { status: 200, headers: corsHeaders }
                    );
                }
            }
        } catch (err) {
            console.warn('Blog by slug: backend unreachable, using local:', err.message);
        }

        const isNumeric = /^\d+$/.test(slug);
        let blog = isNumeric
            ? await getBlogById(parseInt(slug))
            : (await getAllBlogs()).find(b => b.slug === slug);

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Blog fetched successfully', data: mapBlogToFrontend(blog) },
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
