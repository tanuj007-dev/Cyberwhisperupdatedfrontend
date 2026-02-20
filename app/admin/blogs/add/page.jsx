'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Select, Textarea, Toggle, Toast } from '@/components/ui';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { API_BASE_URL } from '@/lib/apiConfig';
import API_CONFIG from '@/app/admin/config/api';
import {
    Upload, X, FileText, Image as ImageIcon, User, Search, Settings,
    ChevronDown, ChevronUp, Save, Send, ArrowLeft, Calendar, Loader2
} from 'lucide-react';

// Section Component - Defined OUTSIDE the main component to prevent re-creation on every render
const Section = ({ id, title, icon: Icon, children, isCollapsed, onToggle }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
                type="button"
                onClick={() => onToggle(id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-50 rounded-lg">
                        <Icon className="text-violet-600" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                {isCollapsed ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronUp size={20} className="text-gray-400" />}
            </button>
            <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-[2000px] opacity-100'}`}>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AddBlog = () => {
    const router = useRouter();
    const { addBlog, categories, users, tags } = useAdmin();

    // Form State - organized by sections
    const [formData, setFormData] = useState({
        // Basic Info
        title: '',
        slug: '',
        shortDescription: '',
        blog_category_id: '',
        selectedTags: [],
        readingTime: '',

        // Featured Image
        thumbnail: '',
        banner: '',
        image_url: '',
        video_url: '',
        imageAltText: '',
        imageCaption: '',

        // Author & Publishing
        user_id: '',
        publishDate: new Date().toISOString().split('T')[0],
        status: 'draft',
        visibility: 'public',
        is_popular: false,

        // Content
        description: '',

        // SEO
        seoTitle: '',
        seoDescription: '',
        focusKeyword: '',
        canonicalUrl: '',
        metaRobots: 'index',

        // Settings
        allowComments: true,
        showOnHomepage: true,
        pinPost: false,

        // Legacy fields
        keywords: ''
    });

    // Section collapse state
    const [collapsedSections, setCollapsedSections] = useState({
        seo: true,
        social: true,
        settings: true
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');
    const [imageUrlPreview, setImageUrlPreview] = useState('');
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Auto-generate slug from title (debounced effect)
    useEffect(() => {
        if (formData.title && !formData.slug) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title]);

    const toggleSection = useCallback((section) => {
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleReadingTimeChange = useCallback((e) => {
        const value = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, readingTime: value }));
        if (errors.readingTime) {
            setErrors(prev => ({ ...prev, readingTime: '' }));
        }
    }, [errors]);

    const handleImageChange = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showToast('Image size must be less than 10MB', 'error');
            return;
        }

        try {
            showToast('Uploading image...', 'info');

            const formDataUpload = new FormData();
            formDataUpload.append('thumbnail', file);

            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const uploadUrl = base ? `${base}${API_CONFIG.endpoints.uploadThumbnail}` : API_CONFIG.endpoints.uploadThumbnail;
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formDataUpload
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to upload image');
            }

            const data = await response.json();
            console.log('Upload response:', data);

            // Get the URL from the response
            const imageUrl = data.url || data.thumbnail_url || data.data?.url;

            if (!imageUrl) {
                throw new Error('No image URL received from server');
            }

            // Update form data with the uploaded image URL
            setThumbnailPreview(imageUrl);
            setFormData(prev => ({ ...prev, thumbnail: imageUrl }));

            showToast('Thumbnail uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading image:', error);
            showToast('Failed to upload image. Please try again.', 'error');
        }
    }, []);

    const handleBannerChange = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showToast('Image size must be less than 10MB', 'error');
            return;
        }
        try {
            showToast('Uploading banner...', 'info');
            const formDataUpload = new FormData();
            formDataUpload.append('banner', file);
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const endpoint = API_CONFIG.endpoints.uploadBanner || API_CONFIG.endpoints.uploadThumbnail;
            const uploadUrl = base ? `${base}${endpoint}` : endpoint;
            const response = await fetch(uploadUrl, { method: 'POST', body: formDataUpload });
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || 'Upload failed');
            }
            const data = await response.json();
            const imageUrl = data.banner_url || data.url || data.thumbnail_url || data.data?.url;
            if (!imageUrl) throw new Error('No image URL received');
            setBannerPreview(imageUrl);
            setFormData(prev => ({ ...prev, banner: imageUrl }));
            showToast('Banner uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading banner:', error);
            showToast('Failed to upload banner.', 'error');
        }
        e.target.value = '';
    }, []);

    const handleImageUrlUpload = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showToast('Image size must be less than 10MB', 'error');
            return;
        }
        try {
            showToast('Uploading image...', 'info');
            const formDataUpload = new FormData();
            formDataUpload.append('thumbnail', file);
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const uploadUrl = base ? `${base}${API_CONFIG.endpoints.uploadThumbnail}` : API_CONFIG.endpoints.uploadThumbnail;
            const response = await fetch(uploadUrl, { method: 'POST', body: formDataUpload });
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || 'Upload failed');
            }
            const data = await response.json();
            const imageUrl = data.url || data.thumbnail_url || data.data?.url;
            if (!imageUrl) throw new Error('No image URL received');
            setImageUrlPreview(imageUrl);
            setFormData(prev => ({ ...prev, image_url: imageUrl }));
            showToast('Content image uploaded!', 'success');
        } catch (error) {
            console.error('Error uploading image:', error);
            showToast('Failed to upload image.', 'error');
        }
        e.target.value = '';
    }, []);

    const uploadContentImage = useCallback(async (file) => {
        if (!file?.type?.startsWith('image/')) throw new Error('Please select an image file');
        if (file.size > 10 * 1024 * 1024) throw new Error('Image must be under 10MB');
        const formDataUpload = new FormData();
        formDataUpload.append('thumbnail', file);
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        const uploadUrl = base ? `${base}${API_CONFIG.endpoints.uploadThumbnail}` : API_CONFIG.endpoints.uploadThumbnail;
        const response = await fetch(uploadUrl, { method: 'POST', body: formDataUpload });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || err.message || 'Upload failed');
        }
        const data = await response.json();
        const url = data.url || data.thumbnail_url || data.data?.url;
        if (!url) throw new Error('No image URL received');
        return url;
    }, []);

    const handleTagAdd = useCallback((tagId) => {
        setFormData(prev => {
            if (!prev.selectedTags.includes(tagId)) {
                return { ...prev, selectedTags: [...prev.selectedTags, tagId] };
            }
            return prev;
        });
    }, []);

    const handleTagRemove = useCallback((tagId) => {
        setFormData(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.filter(id => id !== tagId)
        }));
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.blog_category_id) newErrors.blog_category_id = 'Category is required';
        if (!formData.user_id) newErrors.user_id = 'Author is required';
        if (!formData.description.trim()) newErrors.description = 'Content is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (status = 'draft') => {
        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            setSubmitting(true);
            // Payload matches backend POST /api/blogs (Cloudinary CDN URLs from uploads, saved to DB)
            const blogPost = {
                title: formData.title,
                slug: formData.slug,
                category_id: parseInt(formData.blog_category_id),
                author_id: parseInt(formData.user_id),
                content: formData.description,
                keywords: (formData.keywords && formData.keywords.trim()) || formData.selectedTags.map(id => tags.find(t => t.id === id)?.name).filter(Boolean).join(', '),
                short_description: formData.shortDescription,
                reading_time: formData.readingTime ? `${formData.readingTime} min read` : '5 min read',
                thumbnail_url: formData.thumbnail || '',
                banner_url: formData.banner || '',
                image_url: formData.image_url || '',
                video_url: formData.video_url || '',
                image_alt_text: formData.imageAltText || formData.title,
                image_caption: formData.imageCaption || '',
                is_popular: !!formData.is_popular,
                status: status === 'publish' ? 'PUBLISHED' : status === 'scheduled' ? 'SCHEDULED' : 'DRAFT',
                visibility: (formData.visibility || 'public').toUpperCase() === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
                seo_title: formData.seoTitle || formData.title,
                seo_description: formData.seoDescription || formData.shortDescription,
                focus_keyword: formData.focusKeyword || '',
                meta_robots: (formData.metaRobots || 'index').toUpperCase() === 'NOINDEX' ? 'NOINDEX' : 'INDEX',
                allow_comments: !!formData.allowComments,
                show_on_homepage: !!formData.showOnHomepage,
                is_sticky: !!formData.pinPost
            };

            // Show loading state
            showToast('Saving blog post...', 'info');

            // Use addBlog from context which handles API and state refresh
            await addBlog(blogPost);

            showToast(
                status === 'publish' ? 'Blog published successfully!' : 'Blog saved as draft!',
                'success'
            );

            setTimeout(() => {
                router.push('/admin/blogs');
            }, 1500);

        } catch (error) {
            console.error('Error creating blog:', error);
            showToast(error.message || 'Failed to create blog post', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    // Debug logging
    console.log('Users from AdminContext:', users);
    console.log('Categories from AdminContext:', categories);

    const categoryOptions = (categories || [])
        .filter(c => c.status === 'active')
        .map(c => ({ value: c.id, label: c.name }));

    const userOptions = (users || [])
        .filter(u => !u.status || u.status === 'active' || u.status === 'ACTIVE')
        .map(u => ({
            value: u.id,
            label: `${u.first_name} ${u.last_name}${u.is_instructor ? ' (Instructor)' : ''}`
        }));

    console.log('Category Options:', categoryOptions);
    console.log('User Options:', userOptions);
    console.log('Total users:', users?.length);
    console.log('User options count:', userOptions.length);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/admin/blogs')}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Add New Blog</h1>
                        <p className="text-gray-600">Create a new blog post with full details</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSubmit('draft')}
                        className="flex items-center gap-2"
                        disabled={submitting}
                    >
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {submitting ? 'Saving…' : 'Save Draft'}
                    </Button>
                    <button
                        type="button"
                        onClick={() => handleSubmit('publish')}
                        disabled={submitting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        {submitting ? 'Publishing…' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* SECTION 1 — BASIC INFO */}
                <Section
                    id="basic"
                    title="Basic Information"
                    icon={FileText}
                    isCollapsed={collapsedSections.basic ?? false}
                    onToggle={toggleSection}
                >
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title (H1) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                className="w-full px-0 py-3 text-4xl font-bold text-gray-900 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500 focus:ring-0 bg-transparent placeholder-gray-400"
                            />
                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-gray-400">(auto-generated)</span>
                                </label>
                                <div className="flex items-center">
                                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-500 text-sm">/blog/</span>
                                    <input
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="your-blog-slug"
                                        className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <Input
                                label="Reading Time (minutes)"
                                name="readingTime"
                                type="text"
                                value={formData.readingTime}
                                onChange={handleReadingTimeChange}
                                placeholder="e.g., 5"
                            />
                        </div>

                        <Textarea
                            label="Short Description (Excerpt)"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            placeholder="Brief summary of the blog post..."
                            rows={3}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                label="Category"
                                name="blog_category_id"
                                value={formData.blog_category_id}
                                onChange={handleChange}
                                options={categoryOptions}
                                required
                                error={errors.blog_category_id}
                                placeholder="Select a category"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                <div className="border border-gray-300 rounded-xl p-3 min-h-[100px]">
                                    {/* Dropdown: add a tag from fetched list */}
                                    <select
                                        className="w-full max-w-xs mb-3 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                        value=""
                                        onChange={(e) => {
                                            const id = e.target.value ? Number(e.target.value) : null;
                                            if (id) handleTagAdd(id);
                                            e.target.value = '';
                                        }}
                                    >
                                        <option value="">Select a tag to add...</option>
                                        {tags
                                            .filter(t => !formData.selectedTags.includes(t.id))
                                            .map(tag => (
                                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                                            ))}
                                    </select>
                                    {/* Selected Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {formData.selectedTags.map(tagId => {
                                            const tag = tags.find(t => t.id === tagId);
                                            return tag ? (
                                                <span
                                                    key={tag.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
                                                >
                                                    {tag.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleTagRemove(tag.id)}
                                                        className="hover:text-violet-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SECTION 2 — FEATURED IMAGE */}
                <Section
                    id="image"
                    title="Featured Image"
                    icon={ImageIcon}
                    isCollapsed={collapsedSections.image ?? false}
                    onToggle={toggleSection}
                >
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image <span className="text-red-500">*</span>
                            </label>
                            {thumbnailPreview ? (
                                <div className="relative group rounded-xl overflow-hidden">
                                    <img
                                        src={thumbnailPreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setThumbnailPreview('');
                                                setFormData(prev => ({ ...prev, thumbnail: '' }));
                                            }}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-4 bg-violet-100 rounded-2xl mb-4 group-hover:bg-violet-200 transition-colors">
                                            <Upload className="text-violet-600" size={32} />
                                        </div>
                                        <p className="mb-2 text-sm text-gray-600">
                                            <span className="font-semibold text-violet-600">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, WebP up to 10MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Image Alt Text"
                                name="imageAltText"
                                value={formData.imageAltText}
                                onChange={handleChange}
                                placeholder="Describe the image for accessibility"
                            />
                            <Input
                                label="Image Caption"
                                name="imageCaption"
                                value={formData.imageCaption}
                                onChange={handleChange}
                                placeholder="Optional caption for the image"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                            <p className="text-xs text-gray-500 mb-2">Optional. Shown as header/banner for the post.</p>
                            {bannerPreview ? (
                                <div className="relative inline-block text-black">
                                    <img src={bannerPreview} alt="Banner" className="h-32 object-cover rounded-xl border" />
                                    <button type="button" onClick={() => { setBannerPreview(''); setFormData(prev => ({ ...prev, banner: '' })); }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><X size={16} /></button>
                                </div>
                            ) : (
                                <label className="inline-flex items-center text-black gap-2 px-4 py-2.5 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <Upload size={18} /> Choose banner image
                                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
                                </label>
                            )}
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content Image (image_url)</label>
                            <p className="text-xs text-gray-500 mb-2">Optional. Image used in the post body.</p>
                            <div className="flex flex-wrap gap-3 items-start">
                                {imageUrlPreview ? (
                                    <div className="relative inline-block">
                                        <img src={imageUrlPreview} alt="Content" className="h-24 object-cover rounded-xl border" />
                                        <button type="button" onClick={() => { setImageUrlPreview(''); setFormData(prev => ({ ...prev, image_url: '' })); }} className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"><X size={14} /></button>
                                    </div>
                                ) : (
                                    <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                                        <Upload size={18} /> Upload image
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUrlUpload} />
                                    </label>
                                )}
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="Or paste image URL"
                                    className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (video_url)</label>
                            <p className="text-xs text-gray-500 mb-2">Optional. Paste a video URL (e.g. Cloudinary, YouTube).</p>
                            <input
                                type="url"
                                name="video_url"
                                value={formData.video_url}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-black"
                            />
                        </div> */}
                    </div>
                </Section>

                {/* SECTION 3 — AUTHOR & PUBLISHING */}
                <Section
                    id="author"
                    title="Author & Publishing"
                    icon={User}
                    isCollapsed={collapsedSections.author ?? false}
                    onToggle={toggleSection}
                >
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                label="Author"
                                name="user_id"
                                value={formData.user_id}
                                onChange={handleChange}
                                options={userOptions}
                                required
                                error={errors.user_id}
                                placeholder="Select an author"
                            />
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Publish Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        name="publishDate"
                                        value={formData.publishDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Status</label>
                                <div className="flex gap-3">
                                    {['draft'].map((status) => (
                                        <label key={status} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={formData.status === status}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-sm text-gray-700 capitalize">{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Visibility <span className="text-red-500">*</span></label>
                                <div className="flex gap-3">
                                    {['public'].map((vis) => (
                                        <label key={vis} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value={vis}
                                                checked={formData.visibility === vis}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-sm text-gray-700 capitalize">{vis}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </Section>

                {/* SECTION 4 — CONTENT */}
                <Section
                    id="content"
                    title="Content"
                    icon={FileText}
                    isCollapsed={collapsedSections.content ?? false}
                    onToggle={toggleSection}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Blog Content <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-0.5">Place the cursor where you want an image or video, then use the Image or Video button in the toolbar to insert there.</p>
                        </div>
                        <RichTextEditor
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write your blog content here. Use the toolbar to insert images (upload or URL) or videos (YouTube/Vimeo) anywhere in the content."
                            rows={16}
                            error={errors.description}
                            onUploadImage={uploadContentImage}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>
                </Section>

                {/* SECTION 5 — SEO */}
                <Section
                    id="seo"
                    title="SEO Settings"
                    icon={Search}
                    isCollapsed={collapsedSections.seo ?? true}
                    onToggle={toggleSection}
                >
                    <div className="space-y-5">
                        <Input
                            label="SEO Title"
                            name="seoTitle"
                            value={formData.seoTitle}
                            onChange={handleChange}
                            placeholder="SEO optimized title (60 characters recommended)"
                        />
                        <Textarea
                            label="SEO Description"
                            name="seoDescription"
                            value={formData.seoDescription}
                            onChange={handleChange}
                            placeholder="Meta description for search engines (155 characters recommended)"
                            rows={3}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Focus Keyword"
                                name="focusKeyword"
                                value={formData.focusKeyword}
                                onChange={handleChange}
                                placeholder="Main keyword to optimize for"
                            />
                            <Input
                                label="Canonical URL"
                                name="canonicalUrl"
                                value={formData.canonicalUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Robots</label>
                            <div className="flex gap-4">
                                {['index', 'noindex'].map((option) => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="metaRobots"
                                            value={option}
                                            checked={formData.metaRobots === option}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                        />
                                        <span className="text-sm text-gray-700 capitalize">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SECTION 6 — SETTINGS */}
                {/* <Section
                    id="settings"
                    title="Post Settings"
                    icon={Settings}
                    isCollapsed={collapsedSections.settings ?? true}
                    onToggle={toggleSection}
                >
                    <div className="space-y-4">
                        <Toggle
                            label="Allow Comments"
                            name="allowComments"
                            checked={formData.allowComments}
                            onChange={handleChange}
                        />
                        <Toggle
                            label="Show on Homepage"
                            name="showOnHomepage"
                            checked={formData.showOnHomepage}
                            onChange={handleChange}
                        />
                        <Toggle
                            label="Pin Post (Sticky)"
                            name="pinPost"
                            checked={formData.pinPost}
                            onChange={handleChange}
                        />
                    </div>
                </Section> */}
            </div>

            {/* Bottom Action Bar */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 -mx-4 lg:-mx-8 px-4 lg:px-8 py-4 mt-8">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/admin/blogs')}
                    >
                        Cancel
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSubmit('draft')}
                            className="flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save as Draft
                        </Button>
                        <button
                            type="button"
                            onClick={() => handleSubmit('publish')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                            <Send size={18} />
                            Publish Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
};

export default AddBlog;
