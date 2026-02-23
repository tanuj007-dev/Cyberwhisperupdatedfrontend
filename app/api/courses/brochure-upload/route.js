import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const COURSE_BROCHURES_DIR = path.join(process.cwd(), 'public', 'uploads', 'course-brochures');
const MAX_BROCHURE_SIZE = 100 * 1024 * 1024; // 100MB

function sanitize(name) {
    return name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 80) || 'brochure';
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('brochure');
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }
        if (file.size > MAX_BROCHURE_SIZE) {
            return NextResponse.json(
                { error: 'File too large', message: 'Brochure must be 100MB or less' },
                { status: 400 }
            );
        }
        const ext = path.extname(file.name) || '.pdf';
        const baseName = sanitize(path.basename(file.name, ext));
        const filename = `${Date.now()}-${baseName}${ext}`;
        await mkdir(COURSE_BROCHURES_DIR, { recursive: true });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(COURSE_BROCHURES_DIR, filename);
        await writeFile(filePath, buffer);
        const url = `/uploads/course-brochures/${filename}`;
        return NextResponse.json({ url, success: true });
    } catch (err) {
        console.error('Course brochure upload error:', err);
        return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
    }
}
