'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../../../../lib/apiConfig';

export default function EditBatchPage() {
    const router = useRouter();
    const params = useParams();
    const batchId = params?.id;

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        course_id: '',
        program_name: '',
        program_type: 'Professional Certification',
        start_date: '',
        end_date: '',
        start_time: '10:00',
        end_time: '12:00',
        schedule_type: 'Flexible Schedule',
        max_students: 50,
        duration_weeks: 52,
        instructor_id: '',
        price: '',
        discount_price: '',
        description: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        if (batchId) {
            fetchBatch();
        }
    }, [batchId]);

    const fetchBatch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch batch');
            }

            const batch = await response.json();

            // Format data for form
            setFormData({
                course_id: batch.course_id || '',
                program_name: batch.program_name || '',
                program_type: batch.program_type || 'Professional Certification',
                start_date: batch.start_date ? batch.start_date.split('T')[0] : '',
                end_date: batch.end_date ? batch.end_date.split('T')[0] : '',
                start_time: batch.start_time ? batch.start_time.slice(0, 5) : '10:00',
                end_time: batch.end_time ? batch.end_time.slice(0, 5) : '12:00',
                schedule_type: batch.schedule_type || 'Flexible Schedule',
                max_students: batch.max_students || 50,
                duration_weeks: batch.duration_weeks || 52,
                instructor_id: batch.instructor_id || '',
                price: batch.price || '',
                discount_price: batch.discount_price || '',
                description: batch.description || '',
                status: batch.status || 'ACTIVE'
            });
        } catch (err) {
            console.error('Error fetching batch:', err);
            alert('Failed to load batch data');
            router.push('/admin/batches');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Convert numeric fields
            const payload = {
                program_name: formData.program_name,
                program_type: formData.program_type,
                start_date: formData.start_date,
                end_date: formData.end_date,
                start_time: formData.start_time + ':00',
                end_time: formData.end_time + ':00',
                schedule_type: formData.schedule_type,
                max_students: parseInt(formData.max_students),
                duration_weeks: parseInt(formData.duration_weeks),
                price: parseFloat(formData.price),
                discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
                description: formData.description,
                status: formData.status
            };

            const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}`, {
                method: 'POST', // As per your API spec
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update batch');
            }

            const result = await response.json();
            console.log('Batch updated successfully:', result);

            alert('Batch updated successfully!');
            router.push('/admin/batches');
        } catch (error) {
            console.error('Error updating batch:', error);
            alert('Failed to update batch: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading batch...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/admin/batches')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Batch</h1>
                    <p className="text-gray-600 mt-1">Update batch details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                {/* Program Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Program Details</h2>

                    <div className="pb-4 border-b border-gray-100">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Batch ID <span className="text-gray-400 font-normal">(read-only)</span>
                        </label>
                        <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2.5 rounded-xl w-fit">{batchId ?? '—'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Program Name *
                            </label>
                            <input
                                type="text"
                                name="program_name"
                                value={formData.program_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Program Type *
                            </label>
                            <select
                                name="program_type"
                                value={formData.program_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option>Professional Certification</option>
                                <option>Diploma Program</option>
                                <option>Short Course</option>
                                <option>Workshop</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="UPCOMING">Upcoming</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Schedule Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Schedule</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                End Date *
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                End Time *
                            </label>
                            <input
                                type="time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Duration (Weeks) *
                            </label>
                            <input
                                type="number"
                                name="duration_weeks"
                                value={formData.duration_weeks}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Schedule Type *
                            </label>
                            <select
                                name="schedule_type"
                                value={formData.schedule_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option>Flexible Schedule</option>
                                <option>Fixed Schedule</option>
                                <option>Weekend Only</option>
                                <option>Weekday Only</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Pricing & Capacity */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Pricing & Capacity</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="1"
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Discount Price (₹)
                            </label>
                            <input
                                type="number"
                                name="discount_price"
                                value={formData.discount_price}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Max Students *
                            </label>
                            <input
                                type="number"
                                name="max_students"
                                value={formData.max_students}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/batches')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Update Batch
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
