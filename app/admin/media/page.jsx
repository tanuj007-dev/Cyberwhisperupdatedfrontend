'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Modal, Input, Toast } from '@/components/ui';
import {
    Upload, Trash2, Eye, Copy, Check, Grid, List,
    Image as ImageIcon, Search, Filter, X, Download,
    Edit2, MoreVertical
} from 'lucide-react';

const MediaLibrary = () => {
    const { media, addMedia, updateMedia, deleteMedia } = useAdmin();

    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const [uploadData, setUploadData] = useState({
        name: '',
        url: '',
        alt: '',
        caption: ''
    });

    const [editData, setEditData] = useState({
        alt: '',
        caption: ''
    });

    const filteredMedia = media.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleCopyUrl = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        showToast('URL copied to clipboard', 'success');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleView = (item) => {
        setSelectedMedia(item);
        setViewModalOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedMedia(item);
        setEditData({ alt: item.alt || '', caption: item.caption || '' });
        setEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        updateMedia(selectedMedia.id, editData);
        setEditModalOpen(false);
        showToast('Media updated successfully', 'success');
    };

    const handleDelete = () => {
        deleteMedia(selectedMedia.id);
        setDeleteModalOpen(false);
        setSelectedMedia(null);
        showToast('Media deleted successfully', 'success');
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!uploadData.url) {
            showToast('Please provide an image URL', 'error');
            return;
        }

        addMedia({
            name: uploadData.name || 'Untitled Image',
            url: uploadData.url,
            thumbnail: uploadData.url,
            type: 'image/jpeg',
            size: 0,
            alt: uploadData.alt,
            caption: uploadData.caption,
            uploadedBy: 1
        });

        setUploadModalOpen(false);
        setUploadData({ name: '', url: '', alt: '', caption: '' });
        showToast('Media uploaded successfully', 'success');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return 'N/A';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Media Library</h1>
                    <p className="text-gray-600">Manage your images and media files</p>
                </div>
                <Button onClick={() => setUploadModalOpen(true)} variant="primary" className="flex items-center gap-2">
                    <Upload size={18} />
                    Upload Media
                </Button>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search media..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-violet-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-violet-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-gray-900">{media.length}</p>
                    <p className="text-sm text-gray-500">Total Files</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-violet-600">{media.filter(m => m.type?.includes('image')).length}</p>
                    <p className="text-sm text-gray-500">Images</p>
                </div>
            </div>

            {/* Media Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-violet-200 transition-all"
                        >
                            <div className="aspect-square relative overflow-hidden bg-gray-100">
                                <img
                                    src={item.thumbnail || item.url}
                                    alt={item.alt || item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e2e8f0" width="200" height="200"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleView(item)}
                                        className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                                        title="View"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleCopyUrl(item.url, item.id)}
                                        className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                                        title="Copy URL"
                                    >
                                        {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedMedia(item);
                                            setDeleteModalOpen(true);
                                        }}
                                        className="p-2.5 bg-red-500/80 hover:bg-red-600 rounded-xl text-white transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Preview</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Alt Text</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Size</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMedia.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img
                                            src={item.thumbnail || item.url}
                                            alt={item.alt || item.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3C/svg%3E';
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 truncate max-w-xs">{item.alt || '-'}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{formatFileSize(item.size)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(item.uploadedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleView(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button onClick={() => handleCopyUrl(item.url, item.id)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Copy URL">
                                                {copiedId === item.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                            </button>
                                            <button onClick={() => handleEdit(item)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedMedia(item); setDeleteModalOpen(true); }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredMedia.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <ImageIcon className="mx-auto text-gray-300 mb-4" size={64} />
                    <p className="text-gray-500 mb-4">No media files found</p>
                    <Button onClick={() => setUploadModalOpen(true)} variant="primary">
                        Upload your first image
                    </Button>
                </div>
            )}

            {/* View Modal */}
            <Modal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="Media Details"
                size="lg"
            >
                {selectedMedia && (
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden bg-gray-100">
                            <img
                                src={selectedMedia.url}
                                alt={selectedMedia.alt || selectedMedia.name}
                                className="w-full max-h-[400px] object-contain"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                <p className="text-gray-900">{selectedMedia.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Size</label>
                                <p className="text-gray-900">{formatFileSize(selectedMedia.size)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Alt Text</label>
                                <p className="text-gray-900">{selectedMedia.alt || 'No alt text'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Uploaded</label>
                                <p className="text-gray-900">{new Date(selectedMedia.uploadedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={selectedMedia.url}
                                    readOnly
                                    className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600"
                                />
                                <Button variant="outline" onClick={() => handleCopyUrl(selectedMedia.url, selectedMedia.id)}>
                                    {copiedId === selectedMedia.id ? <Check size={16} /> : <Copy size={16} />}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Media"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Alt Text"
                        value={editData.alt}
                        onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                        placeholder="Describe the image for accessibility"
                    />
                    <Input
                        label="Caption"
                        value={editData.caption}
                        onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                        placeholder="Optional caption"
                    />
                </div>
            </Modal>

            {/* Upload Modal */}
            <Modal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                title="Upload Media"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setUploadModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpload}>Upload</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Image URL"
                        value={uploadData.url}
                        onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                    <Input
                        label="File Name"
                        value={uploadData.name}
                        onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                        placeholder="my-image.jpg"
                    />
                    <Input
                        label="Alt Text"
                        value={uploadData.alt}
                        onChange={(e) => setUploadData({ ...uploadData, alt: e.target.value })}
                        placeholder="Describe the image"
                    />
                    <Input
                        label="Caption"
                        value={uploadData.caption}
                        onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                        placeholder="Optional caption"
                    />
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Media"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                }
            >
                <p className="text-gray-700">
                    Are you sure you want to delete <span className="font-semibold">"{selectedMedia?.name}"</span>?
                    This action cannot be undone.
                </p>
            </Modal>

            {/* Toast */}
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
};

export default MediaLibrary;
