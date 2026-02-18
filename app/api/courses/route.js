import { API_BASE_URL } from '@/lib/apiConfig';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;

        const response = await fetch(
            `${API_BASE_URL}/api/courses?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }

        const data = await response.json();
        const rawCourses = Array.isArray(data.data) ? data.data : (Array.isArray(data.courses) ? data.courses : []);

        // Transform the response to match our component structure
        const transformedData = {
            success: data.success !== false,
            courses: rawCourses.map(course => ({
                id: course.id,
                title: course.title,
                short_description: course.short_description,
                description: course.description,
                rating: 4.5, // Default rating as not in response
                lessons: 20, // Default lessons as not in response
                level: course.level || 'Beginner',
                duration: '3 Weeks', // Default as not in response
                price: course.price,
                discounted_price: course.discounted_price,
                category: course.category || course.category_name || course.type || 'General',
                thumbnail: course.thumbnail || course.course_thumbnail || course.thumbnail_url || course.image,
                image: course.thumbnail || course.course_thumbnail || course.thumbnail_url || course.image,
                brochure_url: course.brochure_url || course.brochure || undefined,
                ...course
            })),
            pagination: data.pagination || { page: 1, limit: Number(limit), total: rawCourses.length }
        };

        return Response.json(transformedData, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return Response.json(
            { error: 'Failed to fetch courses', message: error.message, success: false },
            { status: 500 }
        );
    }
}

export async function OPTIONS(request) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
