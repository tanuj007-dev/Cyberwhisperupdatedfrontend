'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Loader2, Calendar, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../lib/apiConfig';

export default function ActivityLogsPage() {
    const router = useRouter();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [entityType, setEntityType] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    const LIMIT = 50;
    const ENTITY_TYPES = [
        { label: 'All Activities', value: '' },
        { label: 'Batch', value: 'batch' },
        { label: 'Blog', value: 'blog' },
        { label: 'Course', value: 'course' },
        { label: 'User', value: 'user' }
    ];

    const fetchLogs = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

            const params = new URLSearchParams({
                page: page.toString(),
                limit: LIMIT.toString()
            });

            if (entityType) {
                params.append('entityType', entityType);
            }

            const response = await fetch(`${API_BASE_URL}/api/audit-logs?${params}`, {
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch activity logs');
            }

            const result = await response.json();

            // Handle API response structure
            let logsData = [];
            if (result.success && result.data) {
                logsData = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result.data)) {
                logsData = result.data;
            } else if (Array.isArray(result)) {
                logsData = result;
            }

            // Initial sort by recent
            logsData.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));

            setLogs(logsData);
            setTotalPages(Math.ceil(logsData.length / LIMIT));
            setCurrentPage(page);
        } catch (err) {
            console.error('Error fetching logs:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(1);
    }, [entityType]);

    // Handle sort changes
    useEffect(() => {
        if (logs.length > 0) {
            const sortedLogs = [...logs];
            if (sortBy === 'recent') {
                sortedLogs.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
            } else if (sortBy === 'oldest') {
                sortedLogs.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
            }
            setLogs(sortedLogs);
        }
    }, [sortBy]);

    const handleFilterChange = (e) => {
        setEntityType(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const getActionBadgeColor = (action) => {
        const action_lower = (action || '').toLowerCase();
        if (action_lower.includes('create') || action_lower.includes('add')) return 'bg-green-100 text-green-800';
        if (action_lower.includes('update') || action_lower.includes('edit')) return 'bg-blue-100 text-blue-800';
        if (action_lower.includes('delete')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const getActionIcon = (action) => {
        const action_lower = (action || '').toLowerCase();
        if (action_lower.includes('delete')) return <AlertCircle size={16} />;
        if (action_lower.includes('create') || action_lower.includes('add')) return <CheckCircle size={16} />;
        return null;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    const paginatedLogs = logs.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/admin/blogs')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-black">
                        Activity Log
                    </h1>
                    <p className="text-gray-600 mt-1">Track all system activities and changes</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-black mb-2">
                            <Filter size={16} className="inline mr-2" />
                            Entity Type
                        </label>
                        <select
                            value={entityType}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        >
                            {ENTITY_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-black mb-2">
                            <Calendar size={16} className="inline mr-2" />
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-red-800">
                    <p className="text-sm font-medium">Error: {error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
            ) : logs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-600">No activity logs found</p>
                </div>
            ) : (
                <>
                    {/* Logs Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Entity</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedLogs.map((log, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900 capitalize">
                                                    {log.entityType || log.entity_type || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                                        {getActionIcon(log.action)}
                                                    </div>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getActionBadgeColor(log.action)}`}>
                                                        {log.action || 'Unknown'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <User size={16} className="text-gray-400" />
                                                    {log.user_email || log.performedBy?.name || log.userId || 'Unknown'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatDate(log.createdAt || log.created_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === page
                                            ? 'bg-purple-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Summary */}
                    <div className="mt-8 text-center text-sm text-gray-600">
                        <p>Showing {paginatedLogs.length > 0 ? (currentPage - 1) * LIMIT + 1 : 0} to {Math.min(currentPage * LIMIT, logs.length)} of {logs.length} activities</p>
                    </div>
                </>
            )}
        </div>
    );
}
