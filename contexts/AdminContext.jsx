'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBlogs } from '@/data/mockBlogs';
import { mockCategories } from '@/data/mockCategories';
import { mockTags } from '@/data/mockTags';
import { mockMedia, mockSiteSettings } from '@/data/mockMedia';
import { mockUsers } from '@/data/mockUsers';

const AdminContext = createContext();

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
                setBlogs(mockBlogs);
                setCategories(mockCategories);
                setTags(mockTags);
                setMedia(mockMedia);
                setSiteSettings(mockSiteSettings);

                // Fetch users from API, fallback to mock data
                await fetchUsers();
            } catch (error) {
                console.error('Error initializing admin data:', error);
                setLoading(false);
            }
        };

        initializeData();
    }, []);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            console.log('Fetching users from API:', `${apiUrl}/api/users?page=1&limit=1000`);

            const response = await fetch(`${apiUrl}/api/users?page=1&limit=1000`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    // Blog CRUD operations
    const addBlog = (blog) => {
        const newBlog = {
            ...blog,
            blog_id: Math.max(...blogs.map(b => b.blog_id), 0) + 1,
            added_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
            likes: 0
        };
        setBlogs([...blogs, newBlog]);
        return newBlog;
    };

    const updateBlog = (blog_id, updatedBlog) => {
        setBlogs(blogs.map(blog =>
            blog.blog_id === blog_id
                ? { ...blog, ...updatedBlog, updated_date: new Date().toISOString() }
                : blog
        ));
    };

    const deleteBlog = (blog_id) => {
        setBlogs(blogs.filter(blog => blog.blog_id !== blog_id));
    };

    const toggleBlogPopular = (blog_id) => {
        setBlogs(blogs.map(blog =>
            blog.blog_id === blog_id
                ? { ...blog, is_popular: !blog.is_popular, updated_date: new Date().toISOString() }
                : blog
        ));
    };

    // User CRUD operations
    const addUser = async (user) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const payload = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone || '',
                password: user.password || 'TempPass@123',
                title: user.title || '',
                address: user.address || '',
                biography: user.biography || '',
                linkedin_url: user.linkedin_url || '',
                github_url: user.github_url || '',
                role: user.role === 'INSTRUCTOR' || user.is_instructor ? 'INSTRUCTOR' : 'USER',
                is_instructor: user.is_instructor || false,
                profile_image_url: user.profile_image_url || '',
                skills: user.skills || []
            };

            console.log('Creating user with payload:', payload);

            const response = await fetch(`${apiUrl}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const payload = {
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                phone: updatedUser.phone || '',
                title: updatedUser.title || '',
                address: updatedUser.address || '',
                biography: updatedUser.biography || '',
                linkedin_url: updatedUser.linkedin_url || '',
                github_url: updatedUser.github_url || '',
                role: updatedUser.role === 'INSTRUCTOR' || updatedUser.is_instructor ? 'INSTRUCTOR' : 'USER',
                is_instructor: updatedUser.is_instructor || false,
                profile_image_url: updatedUser.profile_image_url || '',
                skills: updatedUser.skills || []
            };

            console.log('Updating user', id, 'with payload:', payload);

            const response = await fetch(`${apiUrl}/api/users/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            console.log('Deleting user:', id);

            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
    const addMedia = (mediaItem) => {
        const newMedia = {
            ...mediaItem,
            id: Math.max(...media.map(m => m.id), 0) + 1,
            uploadedAt: new Date().toISOString()
        };
        setMedia([...media, newMedia]);
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
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
