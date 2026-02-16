/**
 * Decode JWT payload without verification (client-side).
 * Use only to read claims like role; actual verification is done by the backend.
 * @param {string} token - JWT string
 * @returns {object} Decoded payload or {}
 */
export function decodeJwtPayload(token) {
    if (!token || typeof token !== 'string') return {};
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return {};
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        const json = typeof atob !== 'undefined' ? atob(padded) : Buffer.from(padded, 'base64').toString('utf8');
        return JSON.parse(json);
    } catch {
        return {};
    }
}

/**
 * Get role from JWT payload. Supports common claim names.
 * @param {string} token - JWT string
 * @returns {string} 'ADMIN' | 'STUDENT' | 'INSTRUCTOR' | null
 */
export function getRoleFromToken(token) {
    const payload = decodeJwtPayload(token);
    const role = payload.role ?? payload.user_role ?? payload.userRole ?? payload.role_id;
    if (role == null) return null;
    const s = String(role).toUpperCase();
    if (s === 'ADMIN' || s === 'STUDENT' || s === 'INSTRUCTOR') return s;
    if (s === '1') return 'ADMIN';
    if (s === '2') return 'STUDENT';
    if (s === '3') return 'INSTRUCTOR';
    return s;
}
