// API Configuration
export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031',
    endpoints: {
        blogs: '/api/blogs',
        uploadThumbnail: '/api/blogs/upload-thumbnail',
        uploadBanner: '/api/blogs/upload-banner',
    }
};

export default API_CONFIG;
