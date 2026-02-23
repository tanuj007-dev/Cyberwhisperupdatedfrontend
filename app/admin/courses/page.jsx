'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, Loader2, IndianRupee, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../lib/apiConfig';

const getAdminToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        setRole(typeof window !== 'undefined' ? localStorage.getItem('adminRole') : null);
    }, []);

    useEffect(() => {
        fetchCourses();
    }, []);

    const isStudent = role === 'STUDENT';
    const canManageCourses = role === 'ADMIN' || role === 'SUPERADMIN';

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/courses?page=1&limit=100`);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const result = await response.json();

            // Backend can return { data: [...] } or { courses: [...] }
            const list = Array.isArray(result.data) ? result.data : (Array.isArray(result.courses) ? result.courses : []);
            if (result.success !== false && list.length >= 0) {
                setCourses(list);
            } else {
                setCourses([]);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError(err.message);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        const token = getAdminToken();
        if (!token) {
            alert('Please log in again.');
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`${API_BASE_URL}/api/courses/delete/admin/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `Failed to delete course (${response.status})`);
            }

            // Success: 200 with body or 204 No Content
            setCourses((prev) => prev.filter((c) => c.id !== id && String(c.id) !== String(id)));
            alert('Course deleted successfully');
        } catch (err) {
            console.error('Error deleting course:', err);
            alert('Failed to delete course: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const formatCurrency = (amount) => {
        if (amount == null) return '—';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        const colors = {
            published: 'bg-green-100 text-green-800 border-green-200',
            draft: 'bg-amber-100 text-amber-800 border-amber-200',
            archived: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading courses...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900">Course Management</h1>
                    <p className="text-gray-600 mt-2">Manage courses shown on the homepage and courses page</p>
                </div>
                {canManageCourses && (
                    <button
                        onClick={() => router.push('/admin/courses/add')}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                    >
                        <Plus size={20} />
                        Add Course
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
                    <p className="font-semibold">Error loading courses</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {courses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-6">
                        {isStudent ? 'No courses available.' : 'Add your first course to show it on the homepage.'}
                    </p>
                    {canManageCourses && (
                        <button
                            onClick={() => router.push('/admin/courses/add')}
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                        >
                            <Plus size={20} />
                            Add Course
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(course.status)}`}>
                                        {course.status || 'draft'}
                                    </span>
                                    {canManageCourses && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => router.push(`/admin/courses/edit/${course.id}`)}
                                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                disabled={deletingId === course.id}
                                                className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Delete"
                                            >
                                                {deletingId === course.id ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
                                <p className="text-purple-100 text-sm mt-1">
                                    {course.level || 'All levels'} · {course.language || 'English'}
                                </p>
                            </div>
                            <div className="p-6 space-y-4">
                                {course.short_description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">{course.short_description}</p>
                                )}
                                <div className="flex items-center gap-3">
                                    <IndianRupee className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">Price</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-bold text-gray-900">
                                                {formatCurrency(course.discounted_price ?? course.price)}
                                            </span>
                                            {course.discounted_price != null && course.price != null && course.discounted_price < course.price && (
                                                <span className="text-gray-400 line-through text-sm">{formatCurrency(course.price)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BarChart2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">Category</p>
                                        <p className="font-medium text-gray-900">
                                            {course.category?.trim() || (course.category_id != null && course.category_id !== '' ? `ID ${course.category_id}` : '—')}
                                        </p>
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
