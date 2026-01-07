'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBlogs } from '@/data/mockBlogs';
import { mockUsers } from '@/data/mockUsers';
import { mockCategories } from '@/data/mockCategories';
import { mockTags } from '@/data/mockTags';
import { mockMedia, mockSiteSettings } from '@/data/mockMedia';

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
        // Initialize data from mock files
        setBlogs(mockBlogs);
        setUsers(mockUsers);
        setCategories(mockCategories);
        setTags(mockTags);
        setMedia(mockMedia);
        setSiteSettings(mockSiteSettings);
        setLoading(false);
    }, []);

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
    const addUser = (user) => {
        const newUser = {
            ...user,
            id: Math.max(...users.map(u => u.id), 0) + 1,
            date_added: new Date().toISOString(),
            last_modified: new Date().toISOString(),
            wishlist: [],
            payment_keys: null,
            verification_code: null,
            temp: null,
            sessions: []
        };
        setUsers([...users, newUser]);
        return newUser;
    };

    const updateUser = (id, updatedUser) => {
        setUsers(users.map(user =>
            user.id === id
                ? { ...user, ...updatedUser, last_modified: new Date().toISOString() }
                : user
        ));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
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
    const getUserById = (id) => users.find(user => user.id === id);
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
