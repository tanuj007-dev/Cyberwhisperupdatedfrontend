export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;

        // Call your backend API
        const backendUrl = 'http://localhost:3031';
        const response = await fetch(
            `${backendUrl}/api/courses?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform the response to match our component structure
        const transformedData = {
            success: data.success,
            courses: data.data?.map(course => ({
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
                category_id: course.category_id,
                category: course.category || 'General',
                thumbnail: course.thumbnail,
                ...course
            })) || [],
            pagination: data.pagination
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
