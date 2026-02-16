'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, FileText, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../../../../lib/apiConfig';

const getAdminToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        description: '',
        price: '',
        discounted_price: '',
        discount_flag: 0,
        level: 'beginner',
        language: 'English',
        status: 'draft',
        course_type: 'video',
        category: '',
        outcomes: '',
        faqs: '',
        meta_keywords: '',
        meta_description: '',
        brochure_url: '',
    });
    const [brochureUploading, setBrochureUploading] = useState(false);
    const [brochureFileName, setBrochureFileName] = useState('');
    const [courseThumbnailUrl, setCourseThumbnailUrl] = useState('');
    const [thumbnailUploading, setThumbnailUploading] = useState(false);

    useEffect(() => {
        if (id) fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/courses?page=1&limit=500');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const result = await response.json();
            const courses = result?.courses || [];
            const course = courses.find((c) => String(c.id) === String(id));
            if (!course) {
                alert('Course not found');
                router.push('/admin/courses');
                return;
            }
            setFormData({
                title: course.title || '',
                short_description: course.short_description || '',
                description: course.description || '',
                price: course.price ?? '',
                discounted_price: course.discounted_price ?? '',
                discount_flag: course.discount_flag ?? 0,
                level: course.level || 'beginner',
                language: course.language || 'English',
                status: course.status || 'draft',
                course_type: course.course_type || 'video',
                category: course.category || course.category_name || course.type || '',
                outcomes: course.outcomes || '',
                faqs: course.faqs || '',
                meta_keywords: course.meta_keywords || '',
                meta_description: course.meta_description || '',
                brochure_url: course.brochure_url || course.brochure || '',
            });
            if (course.brochure_url || course.brochure) setBrochureFileName('Current brochure attached');
            setCourseThumbnailUrl(course.thumbnail || course.course_thumbnail || course.thumbnail_url || '');
        } catch (err) {
            console.error('Error fetching course:', err);
            alert('Failed to load course');
            router.push('/admin/courses');
        } finally {
            setLoading(false);
        }
    };

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
                short_description: formData.short_description || undefined,
                description: formData.description || undefined,
                price: formData.price !== '' ? parseFloat(formData.price) : undefined,
                discounted_price: formData.discounted_price !== '' ? parseFloat(formData.discounted_price) : undefined,
                discount_flag: formData.discount_flag,
                level: formData.level,
                language: formData.language,
                status: formData.status,
                course_type: formData.course_type,
                category: formData.category?.trim() || undefined,
                outcomes: formData.outcomes || undefined,
                faqs: formData.faqs || undefined,
                meta_keywords: formData.meta_keywords || undefined,
                meta_description: formData.meta_description || undefined,
                brochure_url: formData.brochure_url || undefined,
                course_thumbnail: courseThumbnailUrl || undefined,
            };

            const response = await fetch(`${API_BASE_URL}/api/courses/update/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || errData.error || 'Failed to update course');
            }

            alert('Course updated successfully!');
            router.push('/admin/courses');
        } catch (err) {
            console.error('Update course error:', err);
            alert('Failed to update course: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading course...</p>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
                    <p className="text-gray-600 mt-1">Update course details</p>
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Short description</label>
                            <input
                                type="text"
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="video">Video</option>
                                <option value="live">Live</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course thumbnail (image)</label>
                            <p className="text-xs text-gray-500 mb-2">Upload an image for the course card. Stored on the backend.</p>
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
                                            if (!file.type.startsWith('image/')) { alert('Please select an image.'); return; }
                                            if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }
                                            const token = getAdminToken();
                                            if (!token) { alert('Please log in again.'); return; }
                                            setThumbnailUploading(true);
                                            try {
                                                const fd = new FormData();
                                                fd.append('thumbnail', file);
                                                const res = await fetch(`${API_BASE_URL}/api/courses/upload-thumbnail`, {
                                                    method: 'POST',
                                                    headers: { 'Authorization': `Bearer ${token}` },
                                                    body: fd,
                                                });
                                                const data = await res.json().catch(() => ({}));
                                                if (!res.ok) throw new Error(data.message || data.error || 'Upload failed');
                                                const url = data.url || data.thumbnail_url || data.course_thumbnail || data.data?.url;
                                                if (url) setCourseThumbnailUrl(url);
                                            } catch (err) {
                                                alert(err.message || 'Thumbnail upload failed');
                                            } finally {
                                                setThumbnailUploading(false);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </label>
                                {courseThumbnailUrl && (
                                    <div className="flex items-center gap-3">
                                        <img src={courseThumbnailUrl} alt="Thumbnail" className="h-20 w-28 object-cover rounded-lg border border-gray-200" />
                                        <button type="button" onClick={() => setCourseThumbnailUrl('')} className="text-sm text-red-600 hover:underline">Remove</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course brochure (PDF)</label>
                            <p className="text-xs text-gray-500 mb-2">One brochure per course. When a user downloads the brochure for this course, they get this file. Optional.</p>
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
                                            const token = getAdminToken();
                                            if (!token) {
                                                alert('Please log in again.');
                                                return;
                                            }
                                            const fd = new FormData();
                                            fd.append('file', file);
                                            const res = await fetch(`${API_BASE_URL}/api/brochure-downloads/upload`, {
                                                method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}` },
                                                body: fd,
                                            });
                                            const data = await res.json().catch(() => ({}));
                                            if (!res.ok) throw new Error(data.message || data.error || 'Upload failed');
                                            const url = data.data?.presignedUrl ?? data.data?.fileUrl ?? data.url ?? data.brochure_url ?? data.data?.url;
                                            if (!url) throw new Error('No brochure URL returned from server');
                                            setFormData((prev) => ({ ...prev, brochure_url: url }));
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
                            {(brochureFileName || formData.brochure_url) && (
                                <div className="mt-2 flex items-center gap-3">
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <FileText size={14} />
                                        {brochureFileName || 'Brochure attached'}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => { setFormData((prev) => ({ ...prev, brochure_url: '' })); setBrochureFileName(''); }}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Pricing & category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category / type</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g. Cybersecurity, Web Development, Cloud"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">FAQs</label>
                        <textarea
                            name="faqs"
                            value={formData.faqs}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">SEO</h2>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Meta keywords</label>
                        <input
                            type="text"
                            name="meta_keywords"
                            value={formData.meta_keywords}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Meta description</label>
                        <textarea
                            name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 text-gray-700 resize-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
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
