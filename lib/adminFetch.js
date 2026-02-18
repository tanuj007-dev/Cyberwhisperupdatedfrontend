import { clearAdminSessionAndRedirect } from './adminAuth';

/**
 * Get headers for admin API calls (Bearer token + JSON).
 * Omit Content-Type when body is FormData so browser sets multipart boundary.
 */
function getAdminHeaders(options = {}) {
    const headers = { Accept: 'application/json' };
    if (options.body instanceof FormData) {
        // Let browser set Content-Type for FormData (with boundary)
    } else {
        headers['Content-Type'] = 'application/json';
    }
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Fetch wrapper for admin API calls. Adds auth headers and on 401 clears
 * session and redirects to login. Use for any request that requires the admin JWT.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
export async function adminFetch(url, options = {}) {
    const headers = { ...getAdminHeaders(options), ...(options.headers || {}) };
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        clearAdminSessionAndRedirect();
        throw new Error('Session expired. Please log in again.');
    }

    return response;
}

export { getAdminHeaders };
