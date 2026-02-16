import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'batch-enrollments.json');

async function ensureDataDir() {
    await fs.mkdir(dataDir, { recursive: true });
}

export async function appendLocalBatchEnrollment(payload) {
    await ensureDataDir();
    let list = [];
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        list = JSON.parse(raw);
        if (!Array.isArray(list)) list = [];
    } catch {
        list = [];
    }
    const entry = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: payload.name ?? '',
        email: payload.email ?? '',
        phone: payload.phone ?? '',
        batch_id: payload.batch_id ?? null,
        created_at: new Date().toISOString(),
    };
    list.push(entry);
    await fs.writeFile(filePath, JSON.stringify(list, null, 2));
    return entry;
}
