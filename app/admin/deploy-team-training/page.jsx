'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Users, Mail, Phone, Building2, Briefcase } from 'lucide-react';
import { API_BASE_URL } from '../../../lib/apiConfig';

const getAdminToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

export default function DeployTeamTrainingPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, [page]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}/api/deploy-team-training?page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Failed to load requests (${response.status})`);
            }

            const data = await response.json();
            const list = data.data ?? data.requests ?? (Array.isArray(data) ? data : []);
            setRequests(Array.isArray(list) ? list : []);

            if (data.pagination) {
                setPagination({
                    total: data.pagination.total ?? list.length,
                    totalPages: data.pagination.totalPages ?? 1,
                });
            } else {
                setPagination({ total: list.length, totalPages: 1 });
            }
        } catch (err) {
            console.error('Error fetching deploy team requests:', err);
            setError(err.message);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this request?')) return;
        const token = getAdminToken();
        if (!token) {
            alert('Please log in again.');
            return;
        }
        setDeletingId(id);
        try {
            const response = await fetch(`${API_BASE_URL}/api/deploy-team-training/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || errData.error || 'Delete failed');
            }
            setRequests(requests.filter((r) => String(r.id) !== String(id)));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-gray-900">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading requests...</p>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-white text-gray-900">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900">Deploy Team Training Requests</h1>
                <p className="text-gray-600 mt-2">Requests submitted from the Deploy Team Training form</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                    <button
                        onClick={() => fetchRequests()}
                        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
                    >
                        Retry
                    </button>
                </div>
            )}

            {requests.length === 0 && !loading ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests yet</h3>
                    <p className="text-gray-600">Deploy Team Training form submissions will appear here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {requests.map((req) => (
                        <div
                            key={req.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900">{req.full_name}</span>
                                            {req.work_email && (
                                                <a href={`mailto:${req.work_email}`} className="inline-flex items-center gap-1 text-sm text-purple-600 hover:underline">
                                                    <Mail size={14} />
                                                    {req.work_email}
                                                </a>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-600">
                                            {req.phone_whatsapp && (
                                                <span className="flex items-center gap-1">
                                                    <Phone size={14} />
                                                    {req.phone_whatsapp}
                                                </span>
                                            )}
                                            {req.company_name && (
                                                <span className="flex items-center gap-1">
                                                    <Building2 size={14} />
                                                    {req.company_name}
                                                </span>
                                            )}
                                            {req.job_title && (
                                                <span className="flex items-center gap-1">
                                                    <Briefcase size={14} />
                                                    {req.job_title}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {req.team_size && (
                                                <span className="px-2 py-1 bg-gray-100 rounded">Team: {req.team_size}</span>
                                            )}
                                            {req.delivery_mode && (
                                                <span className="px-2 py-1 bg-gray-100 rounded">{req.delivery_mode}</span>
                                            )}
                                            {req.timeline && (
                                                <span className="px-2 py-1 bg-gray-100 rounded">{req.timeline}</span>
                                            )}
                                        </div>
                                        {req.track_certification && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-gray-700">Track/Certification:</span>{' '}
                                                {req.track_certification}
                                            </p>
                                        )}
                                        {req.message_requirement && (
                                            <p className="text-sm text-gray-600 border-t border-gray-100 pt-3 mt-3">
                                                {req.message_requirement}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(req.id)}
                                        disabled={deletingId === req.id}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Delete"
                                    >
                                        {deletingId === req.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-600">
                        Page {page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={page >= pagination.totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
