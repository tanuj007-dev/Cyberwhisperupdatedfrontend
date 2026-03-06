const DEFAULT_API_BASE = 'https://lightcoral-newt-645489.hostingersite.com';

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_API_BASE;

/** Build a single API URL. Use this instead of manually concatenating base + path to avoid double DNS. */
export function apiUrl(path) {
    const base = (API_BASE_URL || '').replace(/\/$/, '');
    const p = typeof path === 'string' ? path.trim() : '';
    if (!p) return base || '';
    if (p.startsWith('http://') || p.startsWith('https://')) return p;
    return base ? `${base}${p.startsWith('/') ? '' : '/'}${p}` : p;
}
