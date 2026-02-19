'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button, Badge, Modal, Skeleton, Toast } from '@/components/ui';
import { API_BASE_URL } from '../../../lib/apiConfig';
import {
    Upload,
    Trash2,
    Search,
    // Edit2,
    // Eye,
    Image as ImageIcon,
    X,
    Plus,
    Filter,
    Grid3x3,
    List as ListIcon,
    Loader2
} from 'lucide-react';
import Image from 'next/image';

const GalleryManagement = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterContext, setFilterContext] = useState('');
    const [filterActive, setFilterActive] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Modals
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);

    // Upload form state
    const [uploadForm, setUploadForm] = useState({
        image: null,
        title: '',
        context: 'projects',
        alt_text: '',
        tags: '',
        sort_order: 1,
        is_active: true
    });

    // Edit form state
    const [editForm, setEditForm] = useState({
        title: '',
        context: '',
        alt_text: '',
        tags: [],
        sort_order: 1,
        is_active: true
    });

    const contexts = ['projects', 'portfolio', 'team', 'events', 'training', 'facilities'];

    // Fetch all images
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery`);
            if (!response.ok) throw new Error('Failed to fetch images');

            const data = await response.json();
            console.log('Gallery API Response:', data);

            // Handle different response structures
            let imageArray = [];
            if (Array.isArray(data)) {
                imageArray = data;
            } else if (data.images && Array.isArray(data.images)) {
                imageArray = data.images;
            } else if (data.data && Array.isArray(data.data)) {
                imageArray = data.data;
            }

            setImages(imageArray);
        } catch (error) {
            console.error('Error fetching images:', error);
            showToast('Failed to load images', 'error');
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    // Filtered images
    const filteredImages = useMemo(() => {
        // Ensure images is an array
        if (!Array.isArray(images)) {
            console.warn('Images is not an array:', images);
            return [];
        }

        return images.filter((image) => {
            const matchesSearch =
                image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesContext = !filterContext || image.context === filterContext;
            const matchesActive = !filterActive ||
                (filterActive === 'active' && image.is_active) ||
                (filterActive === 'inactive' && !image.is_active);

            return matchesSearch && matchesContext && matchesActive;
        });
    }, [images, searchTerm, filterContext, filterActive]);

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    // Upload image
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!uploadForm.image) {
            showToast('Please select an image', 'error');
            return;
        }

        console.log('🔍 Upload form data:', uploadForm);
        console.log('🔍 Image file details:', uploadForm.image);
        console.log('🔍 Image file type:', typeof uploadForm.image);
        console.log('🔍 Is File object?', uploadForm.image instanceof File);

        const formData = new FormData();
        formData.append('image', uploadForm.image);
        formData.append('title', uploadForm.title);
        formData.append('context', uploadForm.context);
        formData.append('alt_text', uploadForm.alt_text);
        formData.append('tags', uploadForm.tags);
        formData.append('sort_order', uploadForm.sort_order);
        formData.append('is_active', uploadForm.is_active);

        console.log('🔍 FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(`  - ${key}:`, value, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : typeof value);
        }

        setUploading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            await fetchImages();
            setUploadModalOpen(false);
            resetUploadForm();
            showToast('Image uploaded successfully', 'success');
        } catch (error) {
            console.error('Error uploading image:', error);
            showToast('Failed to upload image', 'error');
        } finally {
            setUploading(false);
        }
    };

    // Delete image
    const handleDelete = async () => {
        setDeleting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery/${selectedImage.id}/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Delete failed');
            }

            await fetchImages();
            setDeleteModalOpen(false);
            setSelectedImage(null);
            showToast('Image deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting image:', error);
            showToast(error.message || 'Failed to delete image', 'error');
        } finally {
            setDeleting(false);
        }
    };

    // Update image metadata
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery/${selectedImage.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) throw new Error('Update failed');

            await fetchImages();
            setEditModalOpen(false);
            setSelectedImage(null);
            showToast('Image updated successfully', 'success');
        } catch (error) {
            console.error('Error updating image:', error);
            showToast('Failed to update image', 'error');
        } finally {
            setUpdating(false);
        }
    };

    // View single image
    const handleViewImage = async (image) => {
        try {
            const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/gallery/${image.id}`);
            if (!response.ok) throw new Error('Failed to fetch image details');

            const data = await response.json();
            setSelectedImage(data);
            setViewModalOpen(true);
        } catch (error) {
            console.error('Error fetching image details:', error);
            showToast('Failed to load image details', 'error');
        }
    };

    const openEditModal = (image) => {
        setSelectedImage(image);
        setEditForm({
            title: image.title || '',
            context: image.context || 'projects',
            alt_text: image.alt_text || '',
            tags: Array.isArray(image.tags) ? image.tags : (image.tags ? image.tags.split(',') : []),
            sort_order: image.sort_order || 1,
            is_active: image.is_active !== undefined ? image.is_active : true
        });
        setEditModalOpen(true);
    };

    const resetUploadForm = () => {
        setUploadForm({
            image: null,
            title: '',
            context: 'projects',
            alt_text: '',
            tags: '',
            sort_order: 1,
            is_active: true
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[320px] gap-4">
                <Loader2 className="w-12 h-12 text-violet-600 animate-spin" aria-hidden />
                <p className="text-gray-600 font-medium">Loading gallery…</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-64" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Gallery Management</h1>
                    <p className="text-gray-600">Upload and manage your gallery images</p>
                </div>
                <button
                    onClick={() => setUploadModalOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
                >
                    <Upload size={18} />
                    Upload Image
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-violet-600 mb-1">Total Images</p>
                            <p className="text-3xl font-bold text-gray-900">{images.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                            <ImageIcon className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-600 mb-1">Active</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {images.filter(img => img.is_active).length}
                            </p>
                        </div>
                      
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600 mb-1">Contexts</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {new Set(images.map(img => img.context)).size}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Filter className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-amber-600 mb-1">Filtered</p>
                            <p className="text-3xl font-bold text-gray-900">{filteredImages.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                            <Search className="text-white" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title, alt text, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Context Filter */}
                    <select
                        value={filterContext}
                        onChange={(e) => setFilterContext(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white text-gray-900"
                    >
                        <option value="">All Contexts</option>
                        {contexts.map((context) => (
                            <option key={context} value={context} className="text-gray-900 bg-white">
                                {context.charAt(0).toUpperCase() + context.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Active Filter */}
                    <select
                        value={filterActive}
                        onChange={(e) => setFilterActive(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white text-gray-900"
                    >
                        <option value="" className="text-gray-900 bg-white">All Status</option>
                        <option value="active" className="text-gray-900 bg-white">Active</option>
                        <option value="inactive" className="text-gray-900 bg-white">Inactive</option>
                    </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 mt-4">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <Grid3x3 size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <ListIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredImages.length}</span> of <span className="font-semibold">{images.length}</span> images
                </p>
            </div>

            {/* Gallery Grid/List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image) => (
                            <div
                                key={image.id}
                                className="group relative rounded-xl overflow-hidden border border-gray-200 hover:border-violet-500 transition-all hover:shadow-lg"
                            >
                                <div className="relative aspect-square bg-gray-100">
                                    <Image
                                        src={image.image_url || image.url}
                                        alt={image.alt_text || image.title}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                        {/* <button
                                            onClick={() => handleViewImage(image)}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                            title="View"
                                        >
                                            <Eye size={18} className="text-gray-900" />
                                        </button> */}
                                        {/* <button
                                            onClick={() => openEditModal(image)}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} className="text-gray-900" />
                                        </button> */}
                                        <button
                                            onClick={() => {
                                                setSelectedImage(image);
                                                setDeleteModalOpen(true);
                                            }}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} className="text-red-600" />
                                        </button>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={image.is_active ? 'success' : 'warning'}>
                                            {image.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                                        {image.title || 'Untitled'}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        <Badge variant="info">{image.context}</Badge>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Order: {image.sort_order} • ID: {image.id}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredImages.map((image) => (
                            <div
                                key={image.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-violet-500 transition-all"
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                        src={image.image_url || image.url}
                                        alt={image.alt_text || image.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                                        {image.title || 'Untitled'}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate mb-2">
                                        {image.alt_text || 'No description'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="info">{image.context}</Badge>
                                        <Badge variant={image.is_active ? 'success' : 'warning'}>
                                            {image.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <span className="text-xs text-gray-400">Order: {image.sort_order}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    {/* <button
                                        onClick={() => handleViewImage(image)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <Eye size={18} />
                                    </button> */}
                                    {/* <button
                                        onClick={() => openEditModal(image)}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            setSelectedImage(image);
                                            setDeleteModalOpen(true);
                                        }}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No images found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {searchTerm || filterContext || filterActive
                                ? 'Try adjusting your filters'
                                : 'Upload your first image to get started'}
                        </p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <Modal
                isOpen={uploadModalOpen}
                onClose={() => {
                    setUploadModalOpen(false);
                    resetUploadForm();
                }}
                title="Upload New Image"
                footer={
                    <>
                        <Button variant="outline" onClick={() => {
                            setUploadModalOpen(false);
                            resetUploadForm();
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpload} disabled={uploading}>
                            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : 'Upload'}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleUpload} className={`space-y-4 ${uploading ? 'pointer-events-none opacity-70' : ''}`}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image File *
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUploadForm({ ...uploadForm, image: e.target.files[0] })}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={uploadForm.title}
                            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                            className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Context *
                        </label>
                        <select
                            value={uploadForm.context}
                            onChange={(e) => setUploadForm({ ...uploadForm, context: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white text-gray-900"
                        >
                            {contexts.map((context) => (
                                <option key={context} value={context} className="text-gray-900 bg-white">
                                    {context.charAt(0).toUpperCase() + context.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                        </label>
                        <input
                            type="text"
                            value={uploadForm.alt_text}
                            onChange={(e) => setUploadForm({ ...uploadForm, alt_text: e.target.value })}
                            className="w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="Describe the image for accessibility"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={uploadForm.tags}
                            onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="photography, portfolio, team"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort Order
                        </label>
                        <input
                            type="number"
                            value={uploadForm.sort_order}
                            onChange={(e) => setUploadForm({ ...uploadForm, sort_order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            min="1"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="upload-active"
                            checked={uploadForm.is_active}
                            onChange={(e) => setUploadForm({ ...uploadForm, is_active: e.target.checked })}
                            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <label htmlFor="upload-active" className="text-sm font-medium text-gray-700">
                            Active
                        </label>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedImage(null);
                }}
                title="Edit Image Metadata"
                footer={
                    <>
                        <Button variant="outline" onClick={() => {
                            setEditModalOpen(false);
                            setSelectedImage(null);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} disabled={updating}>
                            {updating ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : 'Update'}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Context *
                        </label>
                        <select
                            value={editForm.context}
                            onChange={(e) => setEditForm({ ...editForm, context: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white text-gray-900"
                        >
                            {contexts.map((context) => (
                                <option key={context} value={context} className="text-gray-900 bg-white">
                                    {context.charAt(0).toUpperCase() + context.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                        </label>
                        <input
                            type="text"
                            value={editForm.alt_text}
                            onChange={(e) => setEditForm({ ...editForm, alt_text: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={Array.isArray(editForm.tags) ? editForm.tags.join(', ') : editForm.tags}
                            onChange={(e) => setEditForm({
                                ...editForm,
                                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort Order
                        </label>
                        <input
                            type="number"
                            value={editForm.sort_order}
                            onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            min="1"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="edit-active"
                            checked={editForm.is_active}
                            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <label htmlFor="edit-active" className="text-sm font-medium text-gray-700">
                            Active
                        </label>
                    </div>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal
                isOpen={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false);
                    setSelectedImage(null);
                }}
                title="Image Details"
            >
                {selectedImage && (
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={selectedImage.image_url || selectedImage.url}
                                alt={selectedImage.alt_text || selectedImage.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Title</p>
                                <p className="text-gray-900">{selectedImage.title || 'Untitled'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Context</p>
                                <Badge variant="info">{selectedImage.context}</Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Alt Text</p>
                                <p className="text-gray-900">{selectedImage.alt_text || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {(selectedImage.tags || []).map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Sort Order</p>
                                <p className="text-gray-900">{selectedImage.sort_order}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <Badge variant={selectedImage.is_active ? 'success' : 'warning'}>
                                    {selectedImage.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Image ID</p>
                                <p className="text-gray-900">{selectedImage.id}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Image"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                            {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : 'Delete'}
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete <span className="font-semibold">"{selectedImage?.title}"</span>?
                    </p>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
            </Modal>

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

export default GalleryManagement;
