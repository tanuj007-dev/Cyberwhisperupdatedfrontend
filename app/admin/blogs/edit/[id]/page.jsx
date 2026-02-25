'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Select, Textarea, Toggle, Toast, Skeleton } from '@/components/ui';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { API_BASE_URL } from '@/lib/apiConfig';
import API_CONFIG from '@/app/admin/config/api';
import {
    Upload, X, FileText, Image as ImageIcon, User, Search, Settings,
    ChevronDown, ChevronUp, Save, ArrowLeft, Calendar, Loader2
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

const EditBlog = () => {
    const router = useRouter();
    const params = useParams();
    const { getBlogById, updateBlog, categories, users, tags } = useAdmin();

    const [formData, setFormData] = useState(null);
    const [collapsedSections, setCollapsedSections] = useState({
        seo: true,
        social: true,
        settings: true
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const initialImageUrlsRef = useRef({ thumbnail_url: '', banner_url: '' });

    const fetchedContentRef = useRef(false);

    // Load blog from context first, then fetch full blog (with content) from API so editor shows previous content
    useEffect(() => {
        fetchedContentRef.current = false;
        const blog = getBlogById(parseInt(params.id));
        if (blog) {
            const thumb = blog.thumbnail_url || blog.thumbnail || '';
            const banner = blog.banner_url || blog.banner || '';
            initialImageUrlsRef.current = { thumbnail_url: thumb, banner_url: banner };

            // Parse tags from keywords if selectedTags is empty or missing
            let selectedTags = blog.selectedTags || [];
            if (selectedTags.length === 0 && blog.keywords && tags.length > 0) {
                const keywordList = String(blog.keywords).split(',').map(k => k.trim()).filter(Boolean);
                const matchedIds = keywordList
                    .map(name => tags.find(t => String(t.name).toLowerCase() === name.toLowerCase())?.id)
                    .filter(Boolean);
                if (matchedIds.length > 0) {
                    selectedTags = matchedIds;
                }
            }

            setFormData({
                ...blog,
                description: blog.content ?? blog.description ?? '',
                shortDescription: blog.short_description ?? blog.shortDescription ?? '',
                readingTime: blog.reading_time ?? blog.readingTime ?? '',
                imageAltText: blog.image_alt_text ?? blog.imageAltText ?? '',
                imageCaption: blog.image_caption ?? blog.imageCaption ?? '',
                publishDate: blog.publishDate || (blog.added_date ? new Date(blog.added_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
                visibility: blog.visibility || 'public',
                seoTitle: blog.seoTitle || blog.seo_title || '',
                seoDescription: blog.seoDescription || blog.seo_description || '',
                focusKeyword: blog.focusKeyword || blog.focus_keyword || '',
                canonicalUrl: blog.canonicalUrl || blog.canonical_url || '',
                metaRobots: blog.metaRobots || blog.meta_robots || 'index',
                allowComments: blog.allowComments ?? true,
                showOnHomepage: blog.showOnHomepage ?? true,
                pinPost: blog.pinPost ?? false,
                selectedTags: selectedTags,
            });
            setThumbnailPreview(thumb || banner || blog.thumbnail);
        }
        setLoading(false);
    }, [params.id, getBlogById, tags]);

    // Fetch full blog from API (including content) so edit form shows previous content even if list didn't return it
    useEffect(() => {
        if (!formData || !params.id || fetchedContentRef.current) return;
        const slug = formData.slug || formData.slug_url;
        const id = formData.blog_id ?? formData.id;
        const fetchFullBlog = async () => {
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const urlsToTry = [];
            if (slug) urlsToTry.push(`/api/blogs/${encodeURIComponent(slug)}`);
            if (id) urlsToTry.push(`${base}/api/blogs/${id}`);
            if (slug) urlsToTry.push(`${base}/api/blogs/${encodeURIComponent(slug)}`);
            for (const url of urlsToTry) {
                try {
                    const res = await fetch(url, { headers: { Accept: 'application/json' } });
                    if (!res.ok) continue;
                    const result = await res.json();
                    const data = result.data ?? result.blog ?? result.post ?? result;
                    if (!data) continue;
                    const fullContent = data.content ?? data.description ?? data.body ?? '';
                    if (fullContent && fullContent.trim() !== '') {
                        fetchedContentRef.current = true;
                        setFormData(prev => prev ? {
                            ...prev,
                            description: fullContent,
                            // Also populate SEO fields from full API response if they exist
                            seoTitle: prev.seoTitle || data.seo_title || data.seoTitle || '',
                            seoDescription: prev.seoDescription || data.seo_description || data.seoDescription || '',
                            focusKeyword: prev.focusKeyword || data.focus_keyword || data.focusKeyword || '',
                            canonicalUrl: prev.canonicalUrl || data.canonical_url || data.canonicalUrl || '',
                            metaRobots: prev.metaRobots !== 'index' ? prev.metaRobots : (data.meta_robots || data.metaRobots || prev.metaRobots),
                        } : prev);
                    }
                    break;
                } catch (_) {
                    continue;
                }
            }
        };
        fetchFullBlog();
    }, [params.id, formData]);

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

    const handleImageChange = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showToast('Image must be under 10MB', 'error');
            return;
        }
        setUploadingImage(true);
        try {
            showToast('Uploading image...', 'info');
            const formDataUpload = new FormData();
            formDataUpload.append('thumbnail', file);
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const response = await fetch(`${base}${API_CONFIG.endpoints.uploadThumbnail}`, {
                method: 'POST',
                body: formDataUpload
            });
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || err.message || 'Upload failed');
            }
            const data = await response.json();
            const imageUrl = data.url || data.thumbnail_url || data.data?.url;
            if (!imageUrl) throw new Error('No image URL received');
            setThumbnailPreview(imageUrl);
            setFormData(prev => ({ ...prev, thumbnail: imageUrl, thumbnail_url: imageUrl, banner: imageUrl, banner_url: imageUrl }));
            showToast('Image uploaded. Update blog to save.', 'success');
        } catch (error) {
            console.error('Image upload error:', error);
            showToast(error.message || 'Upload failed', 'error');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    }, []);

    const uploadContentImage = useCallback(async (file) => {
        if (!file?.type?.startsWith('image/')) throw new Error('Please select an image file');
        if (file.size > 10 * 1024 * 1024) throw new Error('Image must be under 10MB');
        const formDataUpload = new FormData();
        formDataUpload.append('thumbnail', file);
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        const response = await fetch(`${base}${API_CONFIG.endpoints.uploadThumbnail}`, { method: 'POST', body: formDataUpload });
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

    const handleSubmit = async () => {
        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            const rawThumb = (formData.thumbnail_url || formData.thumbnail || '').trim();
            const rawBanner = (formData.banner_url || formData.banner || '').trim();
            const isDataUrl = (s) => typeof s === 'string' && s.startsWith('data:');
            const thumbnail_url = isDataUrl(rawThumb) ? (initialImageUrlsRef.current.thumbnail_url || '') : rawThumb;
            const banner_url = isDataUrl(rawBanner) ? (initialImageUrlsRef.current.banner_url || '') : rawBanner;
            // Send empty string when cleared so backend persists removal (null is often ignored by APIs)
            const thumbnail_urlToSend = (thumbnail_url || '').trim() ? thumbnail_url : '';
            const banner_urlToSend = (banner_url || '').trim() ? banner_url : '';

            const blogData = {
                title: formData.title,
                slug: formData.slug,
                category_id: parseInt(formData.blog_category_id),
                author_id: parseInt(formData.user_id),
                content: formData.description,
                keywords: formData.selectedTags?.map(id => tags.find(t => t.id === id)?.name).filter(Boolean).join(', ') || formData.keywords || '',
                short_description: formData.shortDescription || '',
                reading_time: formData.readingTime || '5 min read',
                thumbnail_url: thumbnail_urlToSend,
                banner_url: banner_urlToSend,
                image_url: formData.image_url || '',
                video_url: formData.video_url || '',
                image_alt_text: formData.imageAltText || formData.title || '',
                image_caption: formData.imageCaption || null,
                is_popular: !!formData.is_popular,
                status: formData.status === 'active' || formData.status === 'ACTIVE' || formData.status === 'PUBLISHED' ? 'PUBLISHED' : formData.status === 'scheduled' || formData.status === 'SCHEDULED' ? 'SCHEDULED' : 'DRAFT',
                visibility: (formData.visibility || 'PUBLIC').toUpperCase(),
                seo_title: formData.seoTitle || formData.title || '',
                seo_description: formData.seoDescription || formData.shortDescription || '',
                focus_keyword: formData.focusKeyword || null,
                canonical_url: formData.canonicalUrl || null,
                meta_robots: (formData.metaRobots || 'INDEX').toUpperCase(),
                allow_comments: !!formData.allowComments,
                show_on_homepage: !!formData.showOnHomepage,
                is_sticky: !!formData.pinPost
            };

            setSubmitting(true);
            showToast('Updating blog post...', 'info');
            await updateBlog(formData.blog_id, blogData);
            showToast('Blog updated successfully!', 'success');

            setTimeout(() => {
                router.push('/admin/blogs');
            }, 1500);
        } catch (error) {
            console.error('Error updating blog:', error);
            showToast(error.message || 'Failed to update blog post', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    if (loading || !formData) {
        return (
            <div className="max-w-5xl mx-auto space-y-6">
                <Skeleton variant="title" />
                <Skeleton className="h-96" />
            </div>
        );
    }

    const categoryOptions = categories
        .filter(c => c.status === 'active')
        .map(c => ({ value: c.id, label: c.name }));

    const userOptions = users
        .filter(u => u.status === 'active')
        .map(u => ({
            value: u.id,
            label: `${u.first_name} ${u.last_name} ${u.is_instructor ? '(Instructor)' : ''}`
        }));

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
                        <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Edit Blog</h1>
                        <p className="text-gray-600">Update blog post details • ID: {formData.blog_id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {submitting ? 'Updating…' : 'Update Blog'}
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
                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            required
                            error={errors.title}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-gray-400 font-normal">(read-only)</span>
                                </label>
                                <div className="flex items-center">
                                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-500 text-sm">/blog/</span>
                                    <input
                                        name="slug"
                                        readOnly
                                        value={formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || ''}
                                        placeholder="your-blog-slug"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-r-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Slug cannot be changed after creation.</p>
                            </div>
                            <Input
                                label="Reading Time"
                                name="readingTime"
                                value={formData.readingTime}
                                onChange={handleChange}
                                placeholder="e.g., 5 min read"
                            />
                        </div>



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
                                            .filter(t => !formData.selectedTags?.includes(t.id))
                                            .map(tag => (
                                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                                            ))}
                                    </select>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.selectedTags?.map(tagId => {
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
                                Featured Image
                            </label>
                            {uploadingImage ? (
                                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-violet-300 rounded-xl bg-violet-50/50">
                                    <Loader2 className="w-10 h-10 text-violet-600 animate-spin mb-3" />
                                    <p className="text-sm font-medium text-violet-700">Image Uploading</p>
                                </div>
                            ) : thumbnailPreview ? (
                                <div className="relative group rounded-xl overflow-hidden">
                                    <img
                                        src={thumbnailPreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23e2e8f0" width="800" height="400"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <label className="p-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                            <Upload size={20} />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setThumbnailPreview('');
                                                initialImageUrlsRef.current = { thumbnail_url: '', banner_url: '' };
                                                setFormData(prev => ({ ...prev, thumbnail: '', thumbnail_url: '', banner: '', banner_url: '' }));
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Publish Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        name="publishDate"
                                        value={formData.publishDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 text-gray-700 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <div className="flex gap-3">
                                    {[{ value: 'active', label: 'Published' }, { value: 'inactive', label: 'Draft' }].map((status) => (
                                        <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status.value}
                                                checked={formData.status === status.value}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-sm text-gray-700">{status.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                {/* <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                                <div className="flex gap-3">
                                    {['public', ].map((vis) => (
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
                                </div> */}
                            </div>
                        </div>



                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Blog ID <span className="text-gray-400 font-normal">(read-only)</span></label>
                                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.id ?? formData.blog_id ?? '—'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Created <span className="text-gray-400 font-normal">(read-only)</span></label>
                                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.added_date ? new Date(formData.added_date).toLocaleString() : '—'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated <span className="text-gray-400 font-normal">(read-only)</span></label>
                                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.updated_date ? new Date(formData.updated_date).toLocaleString() : '—'}</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SECTION 4 — CONTENT (body only; add images/videos via toolbar inside editor) */}
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
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                        <Save size={18} />
                        Update Blog
                    </button>
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

export default EditBlog;
