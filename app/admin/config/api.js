import { API_BASE_URL, apiUrl } from '../../../lib/apiConfig';

// API Configuration - all endpoints are full URLs; use as-is, do not prepend base (avoids double DNS)
export const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: {
        blogs: apiUrl('/api/blogs'),
        uploadThumbnail: apiUrl('/api/blogs/upload-thumbnail'),
        uploadBanner: apiUrl('/api/blogs/upload-banner'),
        coursesDelete: (id) => apiUrl(`/api/courses/delete/admin/${id}`),
    }
};

export default API_CONFIG;
