export async function GET(request) {
    try {
        const categories = [
            'Programming',
            'CISCO',
            'Red Hat',
            'CompTIA',
            'Microsoft Azure',
            'Cybersecurity'
        ];

        return Response.json(categories, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        return Response.json(
            { error: 'Failed to fetch categories' },
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
