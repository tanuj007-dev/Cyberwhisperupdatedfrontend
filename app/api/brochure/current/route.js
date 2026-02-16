import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const BROCHURES_DIR = path.join(process.cwd(), 'public', 'uploads', 'brochures');
const CONFIG_FILE = path.join(BROCHURES_DIR, 'current.json');
const DEFAULT_URL = '/uploads/brochures/brochure.pdf';

export async function GET() {
    try {
        const data = await readFile(CONFIG_FILE, 'utf-8').catch(() => null);
        const parsed = data ? JSON.parse(data) : {};
        const url = parsed.url || DEFAULT_URL;
        return NextResponse.json({ url });
    } catch {
        return NextResponse.json({ url: DEFAULT_URL });
    }
}
