import { NextResponse } from 'next/server';
import { batches } from '../route';

// GET single batch by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const batchId = parseInt(id);

        const batch = batches.find(b => b.id === batchId);

        if (!batch) {
            return NextResponse.json(
                { error: 'Batch not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(batch);
    } catch (error) {
        console.error('Error fetching batch:', error);
        return NextResponse.json(
            { error: 'Failed to fetch batch', message: error.message },
            { status: 500 }
        );
    }
}

// POST update batch by ID
export async function POST(request, { params }) {
    try {
        const { id } = params;
        const batchId = parseInt(id);
        const body = await request.json();

        const batchIndex = batches.findIndex(b => b.id === batchId);

        if (batchIndex === -1) {
            return NextResponse.json(
                { error: 'Batch not found' },
                { status: 404 }
            );
        }

        // Update batch with new data
        const updatedBatch = {
            ...batches[batchIndex],
            ...body,
            id: batchId, // Ensure ID doesn't change
            updated_at: new Date().toISOString()
        };

        // Handle numeric conversions
        if (body.max_students) updatedBatch.max_students = parseInt(body.max_students);
        if (body.duration_weeks) updatedBatch.duration_weeks = parseInt(body.duration_weeks);
        if (body.price) updatedBatch.price = parseFloat(body.price);
        if (body.discount_price) updatedBatch.discount_price = parseFloat(body.discount_price);

        batches[batchIndex] = updatedBatch;

        return NextResponse.json({
            success: true,
            message: 'Batch updated successfully',
            data: updatedBatch
        });
    } catch (error) {
        console.error('Error updating batch:', error);
        return NextResponse.json(
            { error: 'Failed to update batch', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE batch by ID
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const batchId = parseInt(id);

        const batchIndex = batches.findIndex(b => b.id === batchId);

        if (batchIndex === -1) {
            return NextResponse.json(
                { error: 'Batch not found' },
                { status: 404 }
            );
        }

        // Remove batch from array
        const deletedBatch = batches.splice(batchIndex, 1)[0];

        return NextResponse.json({
            success: true,
            message: 'Batch deleted successfully',
            data: deletedBatch
        });
    } catch (error) {
        console.error('Error deleting batch:', error);
        return NextResponse.json(
            { error: 'Failed to delete batch', message: error.message },
            { status: 500 }
        );
    }
}
