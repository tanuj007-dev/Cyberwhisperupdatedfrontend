import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const enrollmentsFile = path.join(dataDir, 'course-enrollments.json');

async function ensureDataDir() {
    await fs.mkdir(dataDir, { recursive: true });
}

export async function getLocalEnrollments() {
    try {
        await ensureDataDir();
        const raw = await fs.readFile(enrollmentsFile, 'utf-8');
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function appendLocalEnrollment(payload) {
    await ensureDataDir();
    const list = await getLocalEnrollments();
    const entry = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        course_name: payload.course_name ?? '',
        name: payload.name ?? '',
        email: payload.email ?? '',
        phone_number: payload.phone_number ?? '',
        created_at: new Date().toISOString(),
    };
    list.push(entry);
    await fs.writeFile(enrollmentsFile, JSON.stringify(list, null, 2));
    return entry;
}
