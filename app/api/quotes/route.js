import { NextResponse } from 'next/server';

// POST /api/quotes - Create a new quote/enquiry
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, subject, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Log the enquiry (in production, you'd save this to a database)
        console.log('New enquiry received:', {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        });

        // TODO: Add your database logic here
        // Example: await db.quotes.create({ name, email, phone, subject, message });

        // TODO: Send email notification
        // Example: await sendEmail({ to: 'admin@cyberwhisper.com', subject: 'New Enquiry', body: message });

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: 'Enquiry submitted successfully',
                data: {
                    name,
                    email,
                    subject,
                    submittedAt: new Date().toISOString()
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error processing quote request:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

// GET /api/quotes - Get all quotes (optional, for admin panel)
export async function GET(request) {
    try {
        // TODO: Fetch from database
        // Example: const quotes = await db.quotes.findMany();

        return NextResponse.json(
            {
                success: true,
                message: 'Quotes endpoint is working',
                data: []
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
