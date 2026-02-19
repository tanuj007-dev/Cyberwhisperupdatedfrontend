'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../../../lib/apiConfig';

export default function AddBatchPage() {
    const router = useRouter();
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
                ...formData,
                course_id: parseInt(formData.course_id) || 1,
                max_students: parseInt(formData.max_students),
                duration_weeks: parseInt(formData.duration_weeks),
                instructor_id: parseInt(formData.instructor_id) || 1,
                price: parseFloat(formData.price),
                discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
                start_time: formData.start_time + ':00',
                end_time: formData.end_time + ':00'
            };

            const response = await fetch(`${API_BASE_URL}/api/batches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create batch');
            }

            const result = await response.json();
            console.log('Batch created successfully:', result);

            alert('Batch created successfully!');
            router.push('/admin/batches');
        } catch (error) {
            console.error('Error creating batch:', error);
            alert('Failed to create batch: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-black">Add New Batch</h1>
                    <p className="text-black mt-1">Create a new training batch</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                {/* Program Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-black border-b pb-2">Program Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-black mb-2">
                                Program Name *
                            </label>
                            <input
                                type="text"
                                name="program_name"
                                value={formData.program_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., One Year Cyber Security Diploma"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Program Type *
                            </label>
                            <select
                                name="program_type"
                                value={formData.program_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option>Professional Certification</option>
                                <option>Diploma Program</option>
                                <option>Short Course</option>
                                <option>Workshop</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="UPCOMING">Upcoming</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Brief description of the program"
                        />
                    </div>
                </div>

                {/* Schedule Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-black border-b pb-2">Schedule</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                End Date *
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 text-black py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 text-black py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                End Time *
                            </label>
                            <input
                                type="time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                required
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Duration (Weeks) *
                            </label>
                            <input
                                type="number"
                                name="duration_weeks"
                                value={formData.duration_weeks}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Schedule Type *
                            </label>
                            <select
                                name="schedule_type"
                                value={formData.schedule_type}
                                onChange={handleChange}
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    <h2 className="text-xl font-bold text-black border-b pb-2">Pricing & Capacity</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
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
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="99999"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Discount Price (₹)
                            </label>
                            <input
                                type="number"
                                name="discount_price"
                                value={formData.discount_price}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="79999"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Max Students *
                            </label>
                            <input
                                type="number"
                                name="max_students"
                                value={formData.max_students}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/batches')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-black rounded-xl font-semibold hover:bg-gray-50 transition-colors"
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
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Create Batch
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
