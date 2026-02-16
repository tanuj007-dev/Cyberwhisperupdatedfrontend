import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const BROCHURES_DIR = path.join(process.cwd(), 'public', 'uploads', 'brochures');
const CONFIG_FILE = path.join(BROCHURES_DIR, 'current.json');
const FALLBACK_FILENAME = 'brochure.pdf';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('brochure');
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }
        const ext = path.extname(file.name) || '.pdf';
        const filename = FALLBACK_FILENAME;
        await mkdir(BROCHURES_DIR, { recursive: true });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(BROCHURES_DIR, filename);
        await writeFile(filePath, buffer);
        const url = `/uploads/brochures/${filename}`;
        await writeFile(CONFIG_FILE, JSON.stringify({ url, updatedAt: new Date().toISOString() }), 'utf-8');
        return NextResponse.json({ url, success: true });
    } catch (err) {
        console.error('Brochure upload error:', err);
        return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
    }
}
