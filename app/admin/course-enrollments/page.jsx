'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Users, Mail, Phone, BookOpen } from 'lucide-react';

export default function CourseEnrollmentsPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    useEffect(() => {
        fetchEnrollments();
    }, [page]);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/course-enrollments?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`Failed to load enrollments (${response.status})`);
            }

            const data = await response.json();
            const list = data.data ?? data.enrollments ?? (Array.isArray(data) ? data : []);
            setEnrollments(Array.isArray(list) ? list : []);

            if (data.pagination) {
                setPagination({
                    total: data.pagination.total ?? list.length,
                    totalPages: data.pagination.totalPages ?? 1,
                });
            } else {
                setPagination({ total: list.length, totalPages: 1 });
            }
        } catch (err) {
            console.error('Error fetching course enrollments:', err);
            setError(err.message);
            setEnrollments([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading && enrollments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading enrollments...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black ">Course Enrollments</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Enrollments from the Enroll Now button on courses</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                    <button
                        onClick={() => fetchEnrollments()}
                        className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-lg text-sm font-medium"
                    >
                        Retry
                    </button>
                </div>
            )}

            {enrollments.length === 0 && !loading ? (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No enrollments yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Course enrollments will appear here when users click Enroll Now.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {enrollments.map((row) => (
                        <div
                            key={row.id ?? `${row.email}-${row.course_name}`}
                            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex flex-wrap items-start gap-4">
                                    <div className="flex-1 min-w-0 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {row.course_name && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium">
                                                    <BookOpen size={14} />
                                                    {row.course_name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{row.name}</span>
                                            {row.email && (
                                                <a href={`mailto:${row.email}`} className="inline-flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                                                    <Mail size={14} />
                                                    {row.email}
                                                </a>
                                            )}
                                        </div>
                                        {row.phone_number && (
                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Phone size={14} />
                                                {row.phone_number}
                                            </span>
                                        )}
                                        {row.created_at && (
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Enrolled: {new Date(row.created_at).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
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
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 text-gray-900 dark:text-white"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                        Page {page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={page >= pagination.totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 text-gray-900 dark:text-white"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
