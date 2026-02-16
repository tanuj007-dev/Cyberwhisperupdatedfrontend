'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, FileText, Upload } from 'lucide-react';

const getCoursesApiBase = () =>
    typeof window !== 'undefined'
        ? (process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://darkred-mouse-801836.hostingersite.com').replace(/\/$/, '')
        : 'https://darkred-mouse-801836.hostingersite.com';

const getAdminToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

const initialForm = {
    title: '',
    faqs: '',
    short_description: '',
    description: '',
    outcomes: '',
    price: '',
    discount_flag: 0,
    discounted_price: '',
    level: 'beginner',
    language: 'English',
    category_id: 1,
    sub_category_id: 5,
    course_type: 'video',
    status: 'draft',
    is_free_course: 0,
    multi_instructor: 0,
    enable_drip_content: 1,
    creator: 1,
    meta_keywords: '',
    meta_description: '',
};

export default function AddCoursePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [brochureUrl, setBrochureUrl] = useState('');
    const [brochureUploading, setBrochureUploading] = useState(false);
    const [brochureFileName, setBrochureFileName] = useState('');
    const [courseThumbnailUrl, setCourseThumbnailUrl] = useState('');
    const [thumbnailUploading, setThumbnailUploading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsed = e.target.type === 'number' ? (value === '' ? '' : Number(value)) : value;
        const isCheckbox = e.target.type === 'checkbox';
        setFormData((prev) => ({
            ...prev,
            [name]: isCheckbox ? (e.target.checked ? 1 : 0) : parsed,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getAdminToken();
        if (!token) {
            alert('Please log in again.');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                title: formData.title,
                faqs: formData.faqs || undefined,
                short_description: formData.short_description || undefined,
                description: formData.description || undefined,
                outcomes: formData.outcomes || undefined,
                price: parseFloat(formData.price) || 0,
                discount_flag: formData.discount_flag ?? 0,
                discounted_price: formData.discounted_price ? parseFloat(formData.discounted_price) : undefined,
                level: formData.level || 'beginner',
                language: formData.language || 'English',
                category_id: Number(formData.category_id) || 1,
                sub_category_id: Number(formData.sub_category_id) || 5,
                course_type: formData.course_type || 'video',
                status: formData.status || 'draft',
                is_free_course: formData.is_free_course ?? 0,
                multi_instructor: formData.multi_instructor ?? 0,
                enable_drip_content: formData.enable_drip_content ?? 1,
                creator: Number(formData.creator) || 1,
                meta_keywords: formData.meta_keywords || undefined,
                meta_description: formData.meta_description || undefined,
                brochure_url: brochureUrl || undefined,
                course_thumbnail: courseThumbnailUrl || undefined,
            };

            const base = getCoursesApiBase();
            const response = await fetch(`${base}/api/courses/add/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || errData.error || 'Failed to create course');
            }

            alert('Course created successfully!');
            router.push('/admin/courses');
        } catch (err) {
            console.error('Create course error:', err);
            alert('Failed to create course: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/admin/courses')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
                    <p className="text-gray-600 mt-1">Create a course to display on the homepage and courses page</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                                placeholder="e.g. Advanced TypeScript Mastery"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Short description</label>
                            <input
                                type="text"
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                                placeholder="One-line summary"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                                placeholder="Full course description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="all">All levels</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course type</label>
                            <select
                                name="course_type"
                                value={formData.course_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            >
                                <option value="video">Video</option>
                                <option value="live">Live</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course thumbnail (image)</label>
                            <p className="text-xs text-gray-500 mb-2">Upload an image for the course card. Stored on the backend and saved with the course.</p>
                            <div className="flex flex-wrap items-start gap-4">
                                <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Upload size={18} />
                                    {thumbnailUploading ? 'Uploading...' : 'Choose image'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={thumbnailUploading}
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            if (!file.type.startsWith('image/')) {
                                                alert('Please select an image file (e.g. JPG, PNG, WebP).');
                                                return;
                                            }
                                            if (file.size > 5 * 1024 * 1024) {
                                                alert('Image must be under 5MB.');
                                                return;
                                            }
                                            const token = getAdminToken();
                                            if (!token) {
                                                alert('Please log in again.');
                                                return;
                                            }
                                            setThumbnailUploading(true);
                                            try {
                                                const fd = new FormData();
                                                fd.append('thumbnail', file);
                                                const base = getCoursesApiBase();
                                                const res = await fetch(`${base}/api/courses/upload-thumbnail`, {
                                                    method: 'POST',
                                                    headers: { 'Authorization': `Bearer ${token}` },
                                                    body: fd,
                                                });
                                                const data = await res.json().catch(() => ({}));
                                                if (!res.ok) throw new Error(data.message || data.error || 'Upload failed');
                                                const url = data.url || data.thumbnail_url || data.course_thumbnail || data.data?.url;
                                                if (url) {
                                                    setCourseThumbnailUrl(url);
                                                    setThumbnailPreview(url);
                                                }
                                            } catch (err) {
                                                alert(err.message || 'Thumbnail upload failed');
                                            } finally {
                                                setThumbnailUploading(false);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </label>
                                {thumbnailPreview && (
                                    <div className="flex items-center gap-3">
                                        <img src={thumbnailPreview} alt="Thumbnail preview" className="h-20 w-28 object-cover rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => { setCourseThumbnailUrl(''); setThumbnailPreview(''); }}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course brochure (PDF)</label>
                            <p className="text-xs text-gray-500 mb-2">Optional. Upload a PDF brochure for this course. Users can download it when they request the course brochure.</p>
                            <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                                <Upload size={18} />
                                {brochureUploading ? 'Uploading...' : 'Choose PDF'}
                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    className="hidden"
                                    disabled={brochureUploading}
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        if (!file.type.includes('pdf')) {
                                            alert('Please select a PDF file.');
                                            return;
                                        }
                                        setBrochureUploading(true);
                                        try {
                                            const fd = new FormData();
                                            fd.append('file', file);
                                            const res = await fetch('/api/courses/brochure-upload', { method: 'POST', body: fd });
                                            const data = await res.json().catch(() => ({}));
                                            if (!res.ok) throw new Error(data.error || 'Upload failed');
                                            setBrochureUrl(data.url);
                                            setBrochureFileName(file.name);
                                        } catch (err) {
                                            alert(err.message || 'Upload failed');
                                        } finally {
                                            setBrochureUploading(false);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </label>
                            {brochureFileName && (
                                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                    <FileText size={14} />
                                    {brochureFileName} — will be attached to this course
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Pricing & IDs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                                placeholder="99.99"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Discounted price</label>
                            <input
                                type="number"
                                name="discounted_price"
                                value={formData.discounted_price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                                placeholder="79.99"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category ID</label>
                            <input
                                type="number"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Sub-category ID</label>
                            <input
                                type="number"
                                name="sub_category_id"
                                value={formData.sub_category_id}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="discount_flag"
                                id="discount_flag"
                                checked={!!formData.discount_flag}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="discount_flag" className="text-sm font-medium text-gray-700">Discount active</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_free_course"
                                id="is_free_course"
                                checked={!!formData.is_free_course}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="is_free_course" className="text-sm font-medium text-gray-700">Free course</label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Outcomes & FAQs</h2>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Outcomes</label>
                        <textarea
                            name="outcomes"
                            value={formData.outcomes}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            placeholder="e.g. Understand advanced TypeScript patterns, Create scalable applications"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">FAQs (Q: ... A: ...)</label>
                        <textarea
                            name="faqs"
                            value={formData.faqs}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            placeholder="Q: Is this for beginners? A: No, intermediate+"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">SEO (optional)</h2>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Meta keywords</label>
                        <input
                            type="text"
                            name="meta_keywords"
                            value={formData.meta_keywords}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                            placeholder="typescript, advanced, programming"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Meta description</label>
                        <textarea
                            name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-300 text-black"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 font-semibold"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                        {isSubmitting ? 'Creating...' : 'Create Course'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/courses')}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
