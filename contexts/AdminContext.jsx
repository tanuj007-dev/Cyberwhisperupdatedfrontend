'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBlogs } from '@/data/mockBlogs';
import { mockCategories } from '@/data/mockCategories';
import { mockTags } from '@/data/mockTags';
import { mockMedia, mockSiteSettings } from '@/data/mockMedia';
import { mockUsers } from '@/data/mockUsers';

const AdminContext = createContext();

// Backend base URL (admin APIs). Use 3001 by default so admin always hits your backend, not Next.js (3000).
const getBackendUrl = () => process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://darkred-mouse-801836.hostingersite.com';

// Headers for admin API calls: include Bearer token when available (after MFA login)
const getAdminHeaders = () => {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [media, setMedia] = useState([]);
    const [siteSettings, setSiteSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            try {
                // Initialize static data from mock files
                setCategories(mockCategories);
                setTags(mockTags);
                setSiteSettings(mockSiteSettings);

                // Fetch users, media and blogs from API, fallback to mock data
                await fetchUsers();
                await fetchMedia();
                await fetchBlogs();
            } catch (error) {
                console.error('Error initializing admin data:', error);
                setLoading(false);
            }
        };

        initializeData();
    }, []);

    const mapBlogsForAdmin = (blogsList) =>
        (blogsList || []).map(blog => ({
            ...blog,
            blog_id: blog.id,
            thumbnail: blog.thumbnail_url || blog.image,
            added_date: blog.created_at,
            updated_date: blog.updated_at,
            likes: blog.likes || 0,
            blog_category_id: blog.category_id,
            user_id: blog.author_id,
            status: (blog.status && blog.status.toLowerCase()) || 'inactive'
        }));

    const parseBlogsResponse = (result) => {
        if (result.success && result.data) return Array.isArray(result.data) ? result.data : [result.data];
        if (result.data && !Array.isArray(result.data)) return [result.data];
        if (Array.isArray(result)) return result;
        if (result.blogs) return Array.isArray(result.blogs) ? result.blogs : [result.blogs];
        return [];
    };

    // Fetch blogs: try backend first, then Next.js /api/blogs (local storage) so API works when backend is down
    const fetchBlogs = async () => {
        const backendUrl = getBackendUrl();
        const backendApiUrl = `${backendUrl}/api/blogs?limit=1000&page=1`;

        try {
            const response = await fetch(backendApiUrl);
            if (response.ok) {
                const result = await response.json();
                const blogsList = parseBlogsResponse(result);
                setBlogs(mapBlogsForAdmin(blogsList));
                return;
            }
        } catch (err) {
            console.warn('Blogs: backend unreachable, trying Next.js API:', err.message);
        }

        try {
            const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}` : 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/blogs?limit=1000&page=1`);
            if (response.ok) {
                const result = await response.json();
                const blogsList = parseBlogsResponse(result);
                setBlogs(mapBlogsForAdmin(blogsList));
                return;
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }

        setBlogs(mockBlogs);
    };

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const apiUrl = getBackendUrl();
            const response = await fetch(`${apiUrl}/api/users?page=1&limit=1000`, {
                method: 'GET',
                headers: getAdminHeaders(),
            });

            console.log('Fetch users response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`);
            }
            const result = await response.json();
            console.log('Full users API response:', result);

            // Handle API response structure: { success: true, data: [...] }
            let usersList = [];

            if (result.success && result.data) {
                usersList = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                usersList = result;
            } else if (result.users) {
                usersList = result.users;
            }

            console.log('Users fetched successfully from API:', usersList.length, 'users');
            setUsers(usersList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users from API:', error.message);
            console.log('Falling back to mock users data');
            // Fallback to mock users
            setUsers(mockUsers);
            setLoading(false);
        }
    };

    // Fetch media from API
    const fetchMedia = async () => {
        try {
            const apiUrl = getBackendUrl();
            const response = await fetch(`${apiUrl}/api/media`, {
                method: 'GET',
                headers: getAdminHeaders(),
            });

            console.log('Fetch media response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch media: ${response.status}`);
            }
            const result = await response.json();
            console.log('Full media API response:', result);

            // Handle API response structure
            let mediaList = [];
            if (result.success && result.data) {
                mediaList = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                mediaList = result;
            } else if (result.media) {
                mediaList = result.media;
            }

            console.log('Media fetched successfully from API:', mediaList.length, 'items');
            setMedia(mediaList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching media from API:', error.message);
            console.log('Falling back to mock media data');
            // Fallback to mock media
            setMedia(mockMedia);
            setLoading(false);
        }
    };

    // Blog CRUD operations - POST to backend (3001) to support thumbnail_url, banner_url, image_url, video_url
    const addBlog = async (blogData) => {
        try {
            const backendUrl = getBackendUrl();

            const response = await fetch(`${backendUrl}/api/blogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || errData.error || 'Failed to add blog');
            }

            const result = await response.json();
            await fetchBlogs(); // Refresh list
            return result.data || result;
        } catch (error) {
            console.error('Error adding blog:', error);
            throw error;
        }
    };

    const updateBlog = async (blog_id, updatedBlog) => {
        try {
            const backendUrl = getBackendUrl();
            const response = await fetch(`${backendUrl}/api/blogs`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: blog_id, ...updatedBlog })
            });

            if (!response.ok) {
                throw new Error('Failed to update blog');
            }

            await fetchBlogs(); // Refresh list
        } catch (error) {
            console.error('Error updating blog:', error);
            throw error;
        }
    };

    const deleteBlog = async (blog_id) => {
        try {
            const backendUrl = getBackendUrl();
            const response = await fetch(`${backendUrl}/api/blogs?id=${blog_id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            await fetchBlogs(); // Refresh list
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    };

    const toggleBlogPopular = async (blog_id) => {
        try {
            const blog = blogs.find(b => b.blog_id === blog_id);
            if (!blog) return;

            await updateBlog(blog_id, { is_popular: !blog.is_popular });
        } catch (error) {
            console.error('Error toggling blog popular status:', error);
            throw error;
        }
    };

    // User CRUD operations
    const addUser = async (user) => {
        try {
            const apiUrl = getBackendUrl();
            const payload = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone || '',
                password: user.password || 'TempPass@123',
                role: user.role || 'STUDENT',
                title: user.title || '',
                address: user.address || '',
                biography: user.biography || '',
                linkedin_url: user.linkedin_url || '',
                github_url: user.github_url || '',
                is_instructor: user.is_instructor || false,
                profile_image_url: user.profile_image_url || '',
                skills: user.skills || []
            };

            console.log('Creating user with payload:', payload);

            const response = await fetch(`${apiUrl}/api/users`, {
                method: 'POST',
                headers: getAdminHeaders(),
                body: JSON.stringify(payload),
                credentials: 'include',
                mode: 'cors'
            });

            console.log('Create user response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from server:', errorText);
                throw new Error(`Failed to create user: ${response.status} - ${errorText}`);
            }

            const newUser = await response.json();
            console.log('User created successfully:', newUser);
            // Refresh user list from API
            await fetchUsers();
            return newUser;
        } catch (error) {
            console.error('Error adding user:', error.message);
            throw error;
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            const apiUrl = getBackendUrl();
            const payload = {
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                phone: updatedUser.phone || '',
                role: updatedUser.role || 'STUDENT',
                title: updatedUser.title || '',
                address: updatedUser.address || '',
                biography: updatedUser.biography || '',
                linkedin_url: updatedUser.linkedin_url || '',
                github_url: updatedUser.github_url || '',
                is_instructor: updatedUser.is_instructor || false,
                profile_image_url: updatedUser.profile_image_url || '',
                skills: updatedUser.skills || []
            };

            console.log('Updating user', id, 'with payload:', payload);

            const response = await fetch(`${apiUrl}/api/users/${id}/update`, {
                method: 'PUT',
                headers: getAdminHeaders(),
                body: JSON.stringify(payload),
                credentials: 'include',
                mode: 'cors'
            });

            console.log('Update user response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from server:', errorText);
                throw new Error(`Failed to update user: ${response.status} - ${errorText}`);
            }

            // Refresh user list from API
            await fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error.message);
            throw error;
        }
    };

    const deleteUser = async (id) => {
        try {
            const apiUrl = getBackendUrl();

            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'DELETE',
                headers: getAdminHeaders(),
                credentials: 'include',
                mode: 'cors'
            });

            console.log('Delete user response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from server:', errorText);
                throw new Error(`Failed to delete user: ${response.status} - ${errorText}`);
            }

            // Refresh user list from API
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw error;
        }
    };

    // Category CRUD operations
    const addCategory = (category) => {
        const newCategory = {
            ...category,
            id: Math.max(...categories.map(c => c.id), 0) + 1,
            slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
        };
        setCategories([...categories, newCategory]);
        return newCategory;
    };

    const updateCategory = (id, updatedCategory) => {
        setCategories(categories.map(category =>
            category.id === id
                ? { ...category, ...updatedCategory }
                : category
        ));
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    // Tag CRUD operations
    const addTag = (tag) => {
        const newTag = {
            ...tag,
            id: Math.max(...tags.map(t => t.id), 0) + 1,
            slug: tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-')
        };
        setTags([...tags, newTag]);
        return newTag;
    };

    const updateTag = (id, updatedTag) => {
        setTags(tags.map(tag =>
            tag.id === id
                ? { ...tag, ...updatedTag }
                : tag
        ));
    };

    const deleteTag = (id) => {
        setTags(tags.filter(tag => tag.id !== id));
    };

    // Media CRUD operations
    const addMedia = async (mediaItem) => {
        const newMedia = {
            ...mediaItem,
            id: Math.max(...media.map(m => m.id), 0) + 1,
            uploadedAt: new Date().toISOString()
        };
        setMedia([...media, newMedia]);
        
        // Refresh media from backend to sync
        try {
            await fetchMedia();
        } catch (error) {
            console.log('Could not refresh media from backend, using local state');
        }
        
        return newMedia;
    };

    const updateMedia = (id, updatedMedia) => {
        setMedia(media.map(item =>
            item.id === id
                ? { ...item, ...updatedMedia }
                : item
        ));
    };

    const deleteMedia = (id) => {
        setMedia(media.filter(item => item.id !== id));
    };

    // Site Settings
    const updateSiteSettings = (newSettings) => {
        setSiteSettings({ ...siteSettings, ...newSettings });
    };

    // Helper functions
    const getBlogById = (blog_id) => blogs.find(blog => blog.blog_id === blog_id);

    const getUserById = async (id) => {
        try {
            const apiUrl = getBackendUrl();
            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'GET',
                headers: getAdminHeaders(),
                credentials: 'include',
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            // Fallback to local state
            return users.find(user => user.id === id);
        }
    };

    const getCategoryById = (id) => categories.find(category => category.id === id);
    const getTagById = (id) => tags.find(tag => tag.id === id);
    const getMediaById = (id) => media.find(item => item.id === id);

    // Stats helpers
    const getStats = () => {
        const totalBlogs = blogs.length;
        const publishedBlogs = blogs.filter(b => b.status === 'active' || b.status === 'published').length;
        const draftBlogs = blogs.filter(b => b.status === 'inactive' || b.status === 'draft').length;
        const scheduledBlogs = blogs.filter(b => b.status === 'scheduled').length;
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.status === 'active').length;
        const totalCategories = categories.length;
        const totalTags = tags.length;
        const totalMedia = media.length;
        const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);

        return {
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            scheduledBlogs,
            totalUsers,
            activeUsers,
            totalCategories,
            totalTags,
            totalMedia,
            totalLikes
        };
    };

    const value = {
        blogs,
        users,
        categories,
        tags,
        media,
        siteSettings,
        loading,
        // Blog operations
        addBlog,
        updateBlog,
        deleteBlog,
        toggleBlogPopular,
        getBlogById,
        // User operations
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        // Category operations
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        // Tag operations
        addTag,
        updateTag,
        deleteTag,
        getTagById,
        // Media operations
        addMedia,
        updateMedia,
        deleteMedia,
        getMediaById,
        // Settings
        updateSiteSettings,
        // Stats
        getStats
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
