import { NextResponse } from 'next/server';

// In-memory storage for batches (in production, use a database)
// This will persist across requests but reset on server restart
let batches = [
    {
        id: 1,
        course_id: 1,
        program_name: "One Year Cyber Security Diploma",
        program_type: "Professional Certification",
        start_date: "2026-03-01",
        end_date: "2027-03-01",
        start_time: "10:00:00",
        end_time: "12:00:00",
        schedule_type: "Flexible Schedule",
        max_students: 50,
        duration_weeks: 52,
        instructor_id: 5,
        price: 99999,
        discount_price: 79999,
        description: "Comprehensive cyber security diploma program",
        status: "ACTIVE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

let nextId = 2;

// GET all batches
export async function GET(request) {
    try {
        return NextResponse.json({
            success: true,
            data: batches
        });
    } catch (error) {
        console.error('Error fetching batches:', error);
        return NextResponse.json(
            { error: 'Failed to fetch batches', message: error.message },
            { status: 500 }
        );
    }
}

// POST create new batch
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['program_name', 'start_date', 'end_date', 'price', 'max_students'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create new batch
        const newBatch = {
            id: nextId++,
            course_id: body.course_id || 1,
            program_name: body.program_name,
            program_type: body.program_type || 'Professional Certification',
            start_date: body.start_date,
            end_date: body.end_date,
            start_time: body.start_time || '10:00:00',
            end_time: body.end_time || '12:00:00',
            schedule_type: body.schedule_type || 'Flexible Schedule',
            max_students: parseInt(body.max_students) || 50,
            duration_weeks: parseInt(body.duration_weeks) || 52,
            instructor_id: body.instructor_id || 1,
            price: parseFloat(body.price),
            discount_price: body.discount_price ? parseFloat(body.discount_price) : null,
            description: body.description || '',
            status: body.status || 'ACTIVE',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        batches.push(newBatch);

        return NextResponse.json({
            success: true,
            message: 'Batch created successfully',
            data: newBatch
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating batch:', error);
        return NextResponse.json(
            { error: 'Failed to create batch', message: error.message },
            { status: 500 }
        );
    }
}

// Export batches array for use in [id] route
export { batches };
