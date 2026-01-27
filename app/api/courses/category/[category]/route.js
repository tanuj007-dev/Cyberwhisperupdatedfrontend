import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { category } = await params;
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';

        // Fetch courses filtered by category from the backend
        const response = await fetch(`${backendUrl}/courses?category=${encodeURIComponent(category)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.warn(`Backend responded with ${response.status} for courses in category ${category}.`);
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        // The backend likely returns { success: true, data: [...] } or just [...]
        const rawCourses = Array.isArray(data) ? data : (data.data || data.courses || []);

        // Transform backend data to match frontend component expectations
        const courses = rawCourses.map(course => ({
            id: course.id,
            title: course.title,
            // Fallback to null if no image, so frontend can use its default imported image.
            // Do NOT use a string path unless it points to a valid public file.
            image: course.image || course.thumbnail || null,
            // Default values if backend doesn't provide them yet
            rating: course.rating || 4.5,
            lessons: course.lessons || 24,
            level: course.level || 'Intermediate',
            duration: course.duration || '4 Weeks',
            category: course.category || category, // Ensure category is set
            ...course // Keep other original fields
        }));

        return NextResponse.json({ courses }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });

    } catch (error) {
        console.error(`Error fetching courses for category ${params.category}:`, error);
        return NextResponse.json(
            { courses: [], error: 'Failed to fetch courses from backend' },
            { status: 500 }
        );
    }
}

export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
