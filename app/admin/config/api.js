// API Configuration
export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com',
    endpoints: {
        blogs: '/api/blogs',
        uploadThumbnail: '/api/blogs/upload-thumbnail',
        uploadBanner: '/api/blogs/upload-banner',
        coursesDelete: (id) => `/api/courses/delete/admin/${id}`,
    }
};

export default API_CONFIG;
