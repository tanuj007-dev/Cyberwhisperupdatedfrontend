import { decodeJwtPayload } from './jwt';

const ADMIN_LOGIN_PATH = '/admin/login';

/**
 * Clear admin session from localStorage and redirect to login.
 * Call this on 401 responses or when token is expired client-side.
 */
export function clearAdminSessionAndRedirect() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    window.location.href = ADMIN_LOGIN_PATH;
}

/**
 * Check if JWT is expired using the exp claim (seconds since epoch).
 * Uses a 10-second buffer so we log out slightly before actual expiry.
 * @param {string} token - JWT string
 * @returns {boolean} true if expired or invalid
 */
export function isTokenExpired(token) {
    if (!token || typeof token !== 'string') return true;
    try {
        const payload = decodeJwtPayload(token);
        const exp = payload.exp;
        if (exp == null) return false; // no exp claim, assume valid
        const now = Math.floor(Date.now() / 1000);
        const buffer = 10; // seconds
        return exp - buffer < now;
    } catch {
        return true;
    }
}
