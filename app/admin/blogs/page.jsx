'use client';

import { useState, useMemo } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Modal, Skeleton, Toast } from '@/components/ui';
import { Edit2, Trash2, Eye, Search, Star, StarOff, Filter, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BlogList = () => {
    const router = useRouter();
    const { blogs, users, categories, deleteBlog, toggleBlogPopular, loading } = useAdmin();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

    const itemsPerPage = 10;

    // Filtered and searched blogs
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const title = blog.title ?? blog.name ?? '';
            const matchesSearch = !searchTerm || title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.keywords && String(blog.keywords).toLowerCase().includes(searchTerm.toLowerCase()));
            const catId = blog.blog_category_id ?? blog.category_id;
            const matchesCategory = !filterCategory || catId == filterCategory || String(catId) === String(filterCategory);
            const matchesStatus = !filterStatus || (blog.status && String(blog.status).toLowerCase() === String(filterStatus).toLowerCase());

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [blogs, searchTerm, filterCategory, filterStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleDelete = async () => {
        try {
            await deleteBlog(selectedBlog.blog_id);
            setDeleteModalOpen(false);
            setSelectedBlog(null);
            showToast('Blog deleted successfully', 'success');
        } catch (error) {
            showToast('Failed to delete blog', 'error');
        }
    };

    const handleTogglePopular = async (blog) => {
        try {
            await toggleBlogPopular(blog.blog_id);
            showToast(`Blog ${!blog.is_popular ? 'marked' : 'unmarked'} as popular`, 'success');
        } catch (error) {
            showToast('Failed to update blog', 'error');
        }
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Uncategorized';
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton variant="title" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-20" />
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">All Blogs</h1>
                    <p className="text-gray-600">Manage your blog posts</p>
                </div>
                <Link href="/admin/blogs/add">
                    <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                        + Add New Blog
                    </button>
                </Link>
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
                                placeholder="Search by title or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2.5 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="active">Published</option>
                        <option value="inactive">Draft</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{paginatedBlogs.length}</span> of <span className="font-semibold">{filteredBlogs.length}</span> blogs
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Blog
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Featured
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedBlogs.map((blog) => (
                                <tr key={blog.blog_id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-200"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 truncate max-w-xs mb-0.5">
                                                    {blog.title}
                                                </p>
                                                <p className="text-xs text-gray-500">ID: {blog.blog_id} • {blog.likes} likes</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="info">{getCategoryName(blog.blog_category_id)}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {getUserName(blog.user_id)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleTogglePopular(blog)}
                                            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            {blog.is_popular ? (
                                                <Star className="text-amber-500 fill-amber-500" size={20} />
                                            ) : (
                                                <StarOff className="text-gray-400" size={20} />
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant={blog.status === 'active' ? 'success' : 'warning'}>
                                            {blog.status === 'active' ? 'Published' : 'Draft'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(blog.added_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => router.push(`/admin/blogs/${blog.blog_id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/admin/blogs/edit/${blog.blog_id}`)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedBlog(blog);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {paginatedBlogs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No blogs found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    <div className="flex gap-1">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                                if (currentPage > 3) {
                                    pageNum = currentPage - 2 + i;
                                }
                                if (currentPage > totalPages - 3) {
                                    pageNum = totalPages - 4 + i;
                                }
                            }
                            if (pageNum < 1 || pageNum > totalPages) return null;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${currentPage === pageNum
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Blog"
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
                        Are you sure you want to delete <span className="font-semibold">"{selectedBlog?.title}"</span>?
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

export default BlogList;
