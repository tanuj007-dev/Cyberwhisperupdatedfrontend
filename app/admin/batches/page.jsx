'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock, Users, IndianRupee, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../lib/apiConfig';

export default function BatchesPage() {
    const router = useRouter();
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        setRole(typeof window !== 'undefined' ? localStorage.getItem('adminRole') : null);
    }, []);

    useEffect(() => {
        fetchBatches();
    }, []);

    const canManageBatches = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'INSTRUCTOR';

    const fetchBatches = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/batches`);

            if (!response.ok) {
                throw new Error('Failed to fetch batches');
            }

            const result = await response.json();

            // Handle API response structure: { success: true, data: [...] }
            let batchesData = [];
            if (result.success && result.data) {
                batchesData = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                batchesData = result;
            } else if (result.batches) {
                batchesData = result.batches;
            }

            setBatches(batchesData);
        } catch (err) {
            console.error('Error fetching batches:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this batch?')) return;

        setDeletingId(id);
        try {
            const response = await fetch(`${API_BASE_URL}/api/batches/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete batch');
            }

            // Remove from local state
            setBatches(batches.filter(batch => batch.id !== id));
            alert('Batch deleted successfully');
        } catch (err) {
            console.error('Error deleting batch:', err);
            alert('Failed to delete batch: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        const colors = {
            'ACTIVE': 'bg-green-100 text-green-800 border-green-200',
            'INACTIVE': 'bg-red-100 text-red-800 border-red-200',
            'COMPLETED': 'bg-gray-100 text-gray-800 border-gray-200',
            'UPCOMING': 'bg-blue-100 text-blue-800 border-blue-200'
        };

        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading batches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900">Batch Management</h1>
                    <p className="text-gray-600 mt-2">Manage all training batches and schedules</p>
                </div>
                {canManageBatches && (
                    <button
                        onClick={() => router.push('/admin/batches/add')}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                    >
                        <Plus size={20} />
                        Add New Batch
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
                    <p className="font-semibold">Error loading batches</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Batches Grid */}
            {batches.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Batches Found</h3>
                    <p className="text-gray-600 mb-6">{!canManageBatches ? 'No batches available at the moment.' : 'Get started by creating your first batch'}</p>
                    {canManageBatches && (
                        <button
                            onClick={() => router.push('/admin/batches/add')}
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                        >
                            <Plus size={20} />
                            Add New Batch
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {batches.map((batch) => (
                        <div
                            key={batch.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                                <div className="flex items-start justify-between mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(batch.status)}`}>
                                        {batch.status}
                                    </span>
                                    {canManageBatches && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => router.push(`/admin/batches/edit/${batch.id}`)}
                                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(batch.id)}
                                                disabled={deletingId === batch.id}
                                                className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Delete"
                                            >
                                                {deletingId === batch.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{batch.program_name}</h3>
                                <p className="text-purple-100 text-sm">{batch.program_type || 'Professional Certification'}</p>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* Date Range */}
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 font-medium">Duration</p>
                                        <p className="text-gray-900 font-semibold">
                                            {formatDate(batch.start_date)} - {formatDate(batch.end_date)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">{batch.duration_weeks}</p>
                                    </div>
                                </div>

                                {/* Timing */}
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 font-medium">Schedule</p>
                                        <p className="text-gray-900 font-semibold">
                                            {batch.start_time?.slice(0, 5)} - {batch.end_time?.slice(0, 5)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">{batch.schedule_type || 'Flexible Schedule'}</p>
                                    </div>
                                </div>

                                {/* Students */}
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 font-medium">Capacity</p>
                                        <p className="text-gray-900 font-semibold">Max {batch.max_students} students</p>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-start gap-3">
                                    <IndianRupee className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 font-medium">Pricing</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-gray-900 font-bold text-lg">{formatCurrency(batch.discount_price || batch.price)}</span>
                                            {batch.discount_price && batch.discount_price < batch.price && (
                                                <span className="text-gray-400 line-through text-sm">{formatCurrency(batch.price)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
