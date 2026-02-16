import { API_BASE_URL } from '../../../lib/apiConfig';

// API Configuration
export const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: {
        blogs: '/api/blogs',
        uploadThumbnail: '/api/blogs/upload-thumbnail',
        uploadBanner: '/api/blogs/upload-banner',
        coursesDelete: (id) => `/api/courses/delete/admin/${id}`,
    }
};

export default API_CONFIG;
