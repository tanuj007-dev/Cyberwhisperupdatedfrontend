/**
 * Safe fetch utility with automatic fallback for when backend is unavailable
 * This prevents "Failed to fetch" console errors
 */

export async function safeFetch(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return { success: true, response, error: null };
    } catch (error) {
        clearTimeout(timeoutId);

        // Check if it's a network error (backend not available)
        if (error.name === 'AbortError') {
            console.warn(`Request timeout: ${url}`);
            return { success: false, response: null, error: 'Request timeout' };
        }

        if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
            console.warn(`Backend unavailable: ${url}`);
            return { success: false, response: null, error: 'Backend unavailable' };
        }

        console.warn(`Request failed: ${url}`, error.message);
        return { success: false, response: null, error: error.message };
    }
}

/**
 * Mock data for when backend is unavailable
 */
export const mockData = {
    categories: ['Programming', 'CISCO', 'Red Hat', 'CompTIA', 'Microsoft Azure', 'Cybersecurity'],

    courses: {
        programming: [
            {
                title: 'Introduction to Python Programming',
                category: 'Programming',
                rating: 4.8,
                lessons: 25,
                level: 'Beginner',
                duration: '4 Weeks',
            },
            {
                title: 'Advanced JavaScript & React',
                category: 'Programming',
                rating: 4.7,
                lessons: 30,
                level: 'Advanced',
                duration: '6 Weeks',
            },
        ],
        cisco: [
            {
                title: 'CCNA: Network Fundamentals',
                category: 'CISCO',
                rating: 4.9,
                lessons: 35,
                level: 'Intermediate',
                duration: '8 Weeks',
            },
        ],
        cybersecurity: [
            {
                title: 'Ethical Hacking Fundamentals',
                category: 'Cybersecurity',
                rating: 4.8,
                lessons: 28,
                level: 'Intermediate',
                duration: '5 Weeks',
            },
            {
                title: 'Security+ Certification Prep',
                category: 'Cybersecurity',
                rating: 4.7,
                lessons: 32,
                level: 'Intermediate',
                duration: '7 Weeks',
            },
        ],
    },
};

export default { safeFetch, mockData };
