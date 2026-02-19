'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Modal, Input, Toast } from '@/components/ui';
import { Edit2, Trash2, PlusCircle, Tag, Palette, X } from 'lucide-react';

const TagsPage = () => {
    const { tags, addTag, updateTag, deleteTag } = useAdmin();

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', color: '#8B5CF6' });
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const colorOptions = [
        '#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B',
        '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1',
        '#14B8A6', '#A855F7'
    ];

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleOpenAdd = () => {
        setEditMode(false);
        setFormData({ name: '', slug: '', color: '#8B5CF6' });
        setErrors({});
        setModalOpen(true);
    };

    const handleOpenEdit = (tag) => {
        setEditMode(true);
        setSelectedTag(tag);
        setFormData({ name: tag.name, slug: tag.slug, color: tag.color || '#8B5CF6' });
        setErrors({});
        setModalOpen(true);
    };

    const handleOpenDelete = (tag) => {
        setSelectedTag(tag);
        setDeleteModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Tag name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const tagData = {
            ...formData,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
        };

        if (editMode) {
            updateTag(selectedTag.id, tagData);
            showToast('Tag updated successfully', 'success');
        } else {
            addTag(tagData);
            showToast('Tag created successfully', 'success');
        }

        setModalOpen(false);
        setFormData({ name: '', slug: '', color: '#8B5CF6' });
    };

    const handleDelete = () => {
        deleteTag(selectedTag.id);
        setDeleteModalOpen(false);
        setSelectedTag(null);
        showToast('Tag deleted successfully', 'success');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Tags</h1>
                    <p className="text-gray-600">Manage blog tags and labels</p>
                </div>
                <Button onClick={handleOpenAdd} variant="primary" className="flex items-center gap-2">
                    <PlusCircle size={18} />
                    Add Tag
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            {/* Tags Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap gap-3">
                    {filteredTags.map((tag) => (
                        <div
                            key={tag.id}
                            className="group relative inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                            style={{ borderLeft: `4px solid ${tag.color}` }}
                        >
                            <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: tag.color }}
                            />
                            <span className="font-medium text-gray-800">{tag.name}</span>
                            <span className="text-xs text-gray-500">({tag.slug})</span>

                            {/* Actions */}
                            <div className="hidden group-hover:flex items-center gap-1 ml-2">
                                <button
                                    onClick={() => handleOpenEdit(tag)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleOpenDelete(tag)}
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTags.length === 0 && (
                    <div className="text-center py-12">
                        <Tag className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No tags found. Add your first tag!</p>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-gray-900">{tags.length}</p>
                    <p className="text-sm text-gray-500">Total Tags</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-violet-600">{colorOptions.length}</p>
                    <p className="text-sm text-gray-500">Color Options</p>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editMode ? 'Edit Tag' : 'Add Tag'}
                footer={
                    <>
                        <Button variant="outline" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                <div className="space-y-5">
                    <Input
                        label="Tag Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter tag name"
                        required
                        error={errors.name}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug <span className="text-gray-400">(auto-generated)</span>
                        </label>
                        <input
                            name="slug"
                            value={formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="tag-slug"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Palette className="inline mr-1" size={16} />
                            Tag Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color })}
                                    className={`w-8 h-8 rounded-lg transition-all ${formData.color === color
                                            ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                                            : 'hover:scale-110'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl"
                            style={{ borderLeft: `4px solid ${formData.color}` }}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: formData.color }}
                            />
                            <span className="font-medium text-gray-800">
                                {formData.name || 'Tag Name'}
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Tag"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </>
                }
            >
                <p className="text-gray-700">
                    Are you sure you want to delete <span className="font-semibold">"{selectedTag?.name}"</span>?
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

export default TagsPage;
