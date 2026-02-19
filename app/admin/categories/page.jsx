'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Modal, Input, Textarea, Toast } from '@/components/ui';
import { Edit2, Trash2, PlusCircle, FolderOpen, Hash, FileText } from 'lucide-react';

const Categories = () => {
    const { categories, addCategory, updateCategory, deleteCategory, blogs } = useAdmin();

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', description: '', status: 'active' });
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleOpenAdd = () => {
        setEditMode(false);
        setFormData({ name: '', slug: '', description: '', status: 'active' });
        setErrors({});
        setModalOpen(true);
    };

    const handleOpenEdit = (category) => {
        setEditMode(true);
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug || '',
            description: category.description || '',
            status: category.status
        });
        setErrors({});
        setModalOpen(true);
    };

    const handleOpenDelete = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const categoryData = {
            ...formData,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
        };

        if (editMode) {
            updateCategory(selectedCategory.id, categoryData);
            showToast('Category updated successfully', 'success');
        } else {
            addCategory(categoryData);
            showToast('Category created successfully', 'success');
        }

        setModalOpen(false);
        setFormData({ name: '', slug: '', description: '', status: 'active' });
    };

    const handleDelete = () => {
        deleteCategory(selectedCategory.id);
        setDeleteModalOpen(false);
        setSelectedCategory(null);
        showToast('Category deleted successfully', 'success');
    };

    const getBlogCount = (categoryId) => {
        return blogs.filter(blog => blog.blog_category_id === categoryId).length;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Categories</h1>
                    <p className="text-gray-600">Manage blog categories</p>
                </div>
                <Button onClick={handleOpenAdd} variant="primary" className="flex items-center gap-2">
                    <PlusCircle size={18} />
                    Add Category
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
                    <p className="text-sm text-gray-500">Total Categories</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-emerald-600">{categories.filter(c => c.status === 'active').length}</p>
                    <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-rose-600">{categories.filter(c => c.status === 'inactive').length}</p>
                    <p className="text-sm text-gray-500">Inactive</p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-violet-200 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-violet-100 rounded-lg">
                                        <FolderOpen className="text-violet-600" size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                                </div>
                                {category.slug && (
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                        <Hash size={12} />
                                        {category.slug}
                                    </p>
                                )}
                                {category.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{category.description}</p>
                                )}
                                <div className="flex items-center gap-3">
                                    <Badge variant={category.status === 'active' ? 'success' : 'danger'}>
                                        {category.status}
                                    </Badge>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <FileText size={12} />
                                        {getBlogCount(category.id)} posts
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => handleOpenEdit(category)}
                                className="flex-1 px-3 py-2 text-sm bg-violet-50 text-violet-600 hover:bg-violet-100 rounded-xl transition-colors font-medium flex items-center justify-center gap-1"
                            >
                                <Edit2 size={14} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleOpenDelete(category)}
                                className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium flex items-center justify-center gap-1"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <FolderOpen className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500 mb-4">No categories yet</p>
                    <Button onClick={handleOpenAdd} variant="primary">
                        Add your first category
                    </Button>
                </div>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editMode ? 'Edit Category' : 'Add Category'}
                size="md"
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
                        label="Category Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter category name"
                        required
                        error={errors.name}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug <span className="text-gray-400">(auto-generated)</span>
                        </label>
                        <div className="flex items-center">
                            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">/category/</span>
                            <input
                                name="slug"
                                value={formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="category-slug"
                                className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={formData.status === 'active'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                                />
                                <span className="text-sm text-gray-700">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === 'inactive'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                                />
                                <span className="text-sm text-gray-700">Inactive</span>
                            </label>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Category"
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
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete <span className="font-semibold">"{selectedCategory?.name}"</span>?
                    </p>
                    {selectedCategory && getBlogCount(selectedCategory.id) > 0 && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-800">
                                ⚠️ This category has {getBlogCount(selectedCategory.id)} blog post(s). They will become uncategorized.
                            </p>
                        </div>
                    )}
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
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

export default Categories;
