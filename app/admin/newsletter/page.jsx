'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button, Badge, Modal, Skeleton, Toast } from '@/components/ui';
import { Trash2, Search, Download, Mail, Calendar, Filter } from 'lucide-react';

const NewsletterSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [totalCount, setTotalCount] = useState(0);

    const itemsPerPage = 10;

    // Fetch subscribers from API
    useEffect(() => {
        fetchSubscribers();
    }, [currentPage]);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            const response = await fetch(`/api/newsletter/subscribers?limit=${itemsPerPage}&offset=${offset}`);

            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }

            const data = await response.json();
            setSubscribers(data.subscribers || []);
            setTotalCount(data.total || 0);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            showToast('Failed to load subscribers', 'error');
            setSubscribers([]);
        } finally {
            setLoading(false);
        }
    };

    // Filtered subscribers based on search
    const filteredSubscribers = useMemo(() => {
        if (!searchTerm) return subscribers;

        return subscribers.filter((subscriber) => {
            const email = subscriber.email?.toLowerCase() || '';
            return email.includes(searchTerm.toLowerCase());
        });
    }, [subscribers, searchTerm]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/newsletter/subscribers/${selectedSubscriber.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete subscriber');
            }

            await fetchSubscribers();
            setDeleteModalOpen(false);
            setSelectedSubscriber(null);
            showToast('Subscriber deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            showToast('Failed to delete subscriber', 'error');
        }
    };

    const handleExportCSV = () => {
        const csvContent = [
            ['Email', 'Subscribed Date'],
            ...filteredSubscribers.map(sub => [
                sub.email,
                new Date(sub.created_at || sub.subscribed_at).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        showToast('CSV exported successfully', 'success');
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Newsletter Subscribers</h1>
                    <p className="text-gray-600">Manage your newsletter subscription list</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    disabled={filteredSubscribers.length === 0}
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-violet-600 mb-1">Total Subscribers</p>
                            <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                            <Mail className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600 mb-1">This Page</p>
                            <p className="text-3xl font-bold text-gray-900">{filteredSubscribers.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Filter className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-emerald-600 mb-1">Latest Subscriber</p>
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">
                                {subscribers[0]?.email || 'N/A'}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <Calendar className="text-white" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredSubscribers.length}</span> of <span className="font-semibold">{totalCount}</span> subscribers
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email Address
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Subscribed Date
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredSubscribers.map((subscriber, index) => (
                                <tr key={subscriber.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                {subscriber.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{subscriber.email}</p>
                                                <p className="text-xs text-gray-500">ID: {subscriber.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(subscriber.created_at || subscriber.subscribed_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant="success">Active</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => {
                                                    setSelectedSubscriber(subscriber);
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

                {filteredSubscribers.length === 0 && (
                    <div className="text-center py-12">
                        <Mail className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No subscribers found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {searchTerm ? 'Try adjusting your search' : 'Subscribers will appear here once they sign up'}
                        </p>
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
                title="Delete Subscriber"
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
                        Are you sure you want to delete <span className="font-semibold">"{selectedSubscriber?.email}"</span>?
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

export default NewsletterSubscribers;
