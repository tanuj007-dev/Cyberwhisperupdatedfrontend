'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBlogs } from '@/data/mockBlogs';
import { mockCategories } from '@/data/mockCategories';
import { mockTags } from '@/data/mockTags';
import { mockMedia, mockSiteSettings } from '@/data/mockMedia';
import { mockUsers } from '@/data/mockUsers';
import { API_BASE_URL } from '@/lib/apiConfig';

const AdminContext = createContext();

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

    const normalizeStatus = (s) => {
        if (!s) return 'inactive';
        const v = String(s).toLowerCase();
        if (v === 'published' || v === 'active' || v === 'live') return 'active';
        return v;
    };
    const mapBlogsForAdmin = (blogsList) =>
        (blogsList || []).map(blog => {
            const id = blog.id ?? blog.blog_id ?? blog._id;
            return {
                ...blog,
                id,
                blog_id: id,
                title: blog.title ?? blog.name,
                thumbnail: blog.thumbnail_url ?? blog.thumbnail ?? blog.image ?? blog.banner_url,
                added_date: blog.created_at ?? blog.added_date ?? blog.createdAt,
                updated_date: blog.updated_at ?? blog.updated_date ?? blog.updatedAt,
                likes: blog.likes ?? 0,
                blog_category_id: blog.category_id ?? blog.blog_category_id ?? blog.categoryId,
                user_id: blog.author_id ?? blog.user_id ?? blog.authorId,
                status: normalizeStatus(blog.status)
            };
        });

    const parseBlogsResponse = (result) => {
        if (!result || typeof result !== 'object') return [];
        if (Array.isArray(result)) return result;
        const arr = result.data ?? result.blogs ?? result.result ?? result.items ?? result.posts ?? result.records;
        if (Array.isArray(arr)) return arr;
        if (arr && !Array.isArray(arr)) return [arr];
        if (result.success && result.data) return Array.isArray(result.data) ? result.data : [result.data];
        if (result.data) return Array.isArray(result.data) ? result.data : [result.data];
        if (result.blogs) return Array.isArray(result.blogs) ? result.blogs : [result.blogs];
        return [];
    };

    const fetchBlogs = async () => {
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        const listUrl = base ? `${base}/api/blogs/list?page=1&limit=1000` : null;
        try {
            if (listUrl) {
                const response = await fetch(listUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const result = await response.json();
                    const blogsList = parseBlogsResponse(result);
                    if (blogsList.length > 0) {
                        setBlogs(mapBlogsForAdmin(blogsList));
                        return;
                    }
                }
            }
            // Fallback: Next.js proxy (same as public site server-side) — no status param
            const proxyRes = await fetch('/api/blogs/list?page=1&limit=1000', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (proxyRes.ok) {
                const result = await proxyRes.json();
                const blogsList = parseBlogsResponse(result);
                setBlogs(mapBlogsForAdmin(blogsList));
                return;
            }
        } catch (err) {
            console.warn('Blogs list: backend unreachable', err.message);
        }
        setBlogs(mockBlogs);
    };

    // Fetch users from API (Next.js proxy calls backend at API_BASE_URL so users render on admin panel)
    const fetchUsers = async () => {
        try {
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const response = await fetch(`${base}/api/users?page=1&limit=1000`, {
                method: 'GET',
                headers: getAdminHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`);
            }
            const result = await response.json();

            let usersList = [];
            if (result.success && result.data) {
                usersList = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                usersList = result;
            } else if (result.users) {
                usersList = Array.isArray(result.users) ? result.users : [result.users];
            }

            setUsers(usersList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users from API:', error.message);
            setUsers(mockUsers);
            setLoading(false);
        }
    };

    // Fetch media from API (backend may not have /api/media — 404 is expected, use mock)
    const fetchMedia = async () => {
        try {
            const apiUrl = API_BASE_URL.replace(/\/$/, '');
            const response = await fetch(`${apiUrl}/api/media`, {
                method: 'GET',
                headers: getAdminHeaders(),
            });

            if (response.status === 404) {
                setMedia(mockMedia);
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch media: ${response.status}`);
            }

            const result = await response.json();
            let mediaList = [];
            if (result.success && result.data) {
                mediaList = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                mediaList = result;
            } else if (result.media) {
                mediaList = Array.isArray(result.media) ? result.media : [result.media];
            }
            setMedia(mediaList);
            setLoading(false);
        } catch (error) {
            setMedia(mockMedia);
            setLoading(false);
        }
    };

    // Blog CRUD operations - POST to backend (3001) to support thumbnail_url, banner_url, image_url, video_url
    const addBlog = async (blogData) => {
        try {
            const backendUrl = API_BASE_URL;

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
            const backendUrl = API_BASE_URL.replace(/\/$/, '');
            const response = await fetch(`${backendUrl}/api/blogs/${blog_id}`, {
                method: 'PUT',
                headers: getAdminHeaders(),
                credentials: 'include',
                body: JSON.stringify(updatedBlog)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Failed to update blog');
            }

            await fetchBlogs(); // Refresh list
        } catch (error) {
            console.error('Error updating blog:', error);
            throw error;
        }
    };

    const deleteBlog = async (blog_id) => {
        try {
            const backendUrl = API_BASE_URL.replace(/\/$/, '');
            const response = await fetch(`${backendUrl}/api/blogs/${blog_id}`, {
                method: 'DELETE',
                headers: getAdminHeaders(),
                credentials: 'include'
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Failed to delete blog');
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
            const apiUrl = API_BASE_URL;
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
                profile_image_url: user.profile_image_url || ''
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
            const apiUrl = API_BASE_URL;
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
                profile_image_url: updatedUser.profile_image_url || ''
            };

            console.log('Updating user', id, 'with payload:', payload);

            const response = await fetch(`${apiUrl}/api/users/${id}/update`, {
                method: 'POST',
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
            const apiUrl = API_BASE_URL;

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
            const apiUrl = API_BASE_URL;
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
