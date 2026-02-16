'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Loader2, Mail, User, Phone } from 'lucide-react';

const getBackendBase = () =>
    typeof window !== 'undefined'
        ? (process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://darkred-mouse-801836.hostingersite.com').replace(/\/$/, '')
        : 'https://darkred-mouse-801836.hostingersite.com';

export default function BrochuresPage() {
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState(null);
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    useEffect(() => {
        fetchDownloads();
    }, [page]);

    const fetchDownloads = async () => {
        try {
            setLoading(true);
            setError(null);
            const base = getBackendBase();
            const response = await fetch(`${base}/api/brochure-downloads?page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`Failed to load (${response.status})`);
            const data = await response.json();
            const list = data.data ?? data.downloads ?? (Array.isArray(data) ? data : []);
            setDownloads(Array.isArray(list) ? list : []);
            setPagination({
                total: data.pagination?.total ?? list?.length ?? 0,
                totalPages: data.pagination?.totalPages ?? 1,
            });
        } catch (err) {
            setError(err.message);
            setDownloads([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes('pdf')) {
            setUploadMessage({ type: 'error', text: 'Please upload a PDF file.' });
            return;
        }
        setUploading(true);
        setUploadMessage(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('/api/brochure/upload', { method: 'POST', body: formData });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || result.message || 'Upload failed');
            setUploadMessage({ type: 'success', text: 'Brochure uploaded. It will be used for downloads.' });
            e.target.value = '';
        } catch (err) {
            setUploadMessage({ type: 'error', text: err.message || 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Brochures</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Upload the course brochure and view download requests.</p>
            </div>

            {/* Upload section */}
            <div className="mb-10 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText size={20} />
                    Current brochure (PDF)
                </h2>
                <p className="text-sm text-gray-600 dark:te xt-gray-400 mb-4">
                    Upload a PDF to replace the brochure that users get when they submit the &quot;Download brochure&quot; form on Training / Courses.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6B46E5] text-white rounded-xl font-semibold cursor-pointer hover:bg-[#5a38c7] transition-colors disabled:opacity-50">
                    <Upload size={18} />
                    {uploading ? 'Uploading...' : 'Choose PDF to upload'}
                    <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
                {uploadMessage && (
                    <p className={`mt-3 text-sm ${uploadMessage.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {uploadMessage.text}
                    </p>
                )}
            </div>

            {/* Brochure downloads list */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Brochure download requests</h2>
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
                        {error}
                        <button type="button" onClick={() => fetchDownloads()} className="ml-2 underline">Retry</button>
                    </div>
                )}
                {loading && downloads.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                    </div>
                ) : downloads.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">No brochure download requests yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {downloads.map((row) => (
                            <div
                                key={row.id}
                                className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                            >
                                <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                    <User size={16} />
                                    {row.name}
                                </span>
                                {row.email && (
                                    <a href={`mailto:${row.email}`} className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                                        <Mail size={14} />
                                        {row.email}
                                    </a>
                                )}
                                {row.mobile_number && (
                                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone size={14} />
                                        {row.mobile_number}
                                    </span>
                                )}
                                {row.created_at && (
                                    <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">
                                        {new Date(row.created_at).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {pagination.totalPages > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 text-sm"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400">
                            Page {page} of {pagination.totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                            disabled={page >= pagination.totalPages}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 text-sm"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
