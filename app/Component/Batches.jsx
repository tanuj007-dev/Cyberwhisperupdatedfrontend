'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, ArrowRight, Loader2, GraduationCap, IndianRupee, X, User, Mail, Phone as PhoneIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_BASE_URL } from '../../lib/apiConfig';

export default function Batches() {
    const { theme } = useTheme();
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEnrollClick = (batch) => {
        setSelectedBatch(batch);
        setIsModalOpen(true);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/batches/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    batch_id: selectedBatch?.id,
                }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || data.error || 'Registration failed');
            }
            alert(data.message || 'Registration successful! We will contact you soon.');
            setIsModalOpen(false);
            setFormData({ name: '', email: '', phone: '' });
        } catch (err) {
            console.error('Registration failed', err);
            alert(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            setLoading(true);
            const apiUrl = `${API_BASE_URL}/api/batches`;
            console.log('Fetching batches from:', apiUrl);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch batches');
            }

            const result = await response.json();
            console.log('Full API Response:', result);

            // Handle different response structures
            let batchesData = [];

            if (result.success && result.data) {
                batchesData = Array.isArray(result.data) ? result.data : [result.data];
            } else if (Array.isArray(result)) {
                batchesData = result;
            } else if (result.batches) {
                batchesData = result.batches;
            }

            console.log('Parsed batches data:', batchesData);

            // Filter only ACTIVE and UPCOMING batches for public display
            const activeBatches = batchesData.filter(
                batch => batch.status === 'ACTIVE' || batch.status === 'UPCOMING'
            );

            console.log('Filtered active batches:', activeBatches);

            setBatches(activeBatches);
        } catch (err) {
            console.error('Error fetching batches:', err);
            setError(err.message);
            setBatches([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (startTime, endTime) => {
        if (!startTime || !endTime) return 'N/A';

        const formatTimeString = (time) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            return `${displayHour}:${minutes || '00'} ${ampm}`;
        };

        return `${formatTimeString(startTime)} - ${formatTimeString(endTime)}`;
    };

    const formatCurrency = (amount) => {
        if (!amount) return 'Contact Us';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <section className="relative w-full py-16 md:py-24 bg-[#FBF9FF] dark:bg-linear-to-b dark:from-[#1B0D37] dark:via-[#241245] dark:to-[#1B0D37] overflow-hidden font-sans transition-colors duration-300">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-5 h-5 bg-[#6b46e5] shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
                        <span className="text-[#0f172a] dark:text-white text-sm font-bold tracking-[0.2em] uppercase">Upcoming Training Sessions</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400">
                            Upcoming Batches
                        </span>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Join our expert-led cybersecurity training programs and advance your career
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-purple-300 dark:border-purple-500/30 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-500 mx-auto" />
                            <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">Loading batches...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm"
                    >
                        <p className="font-semibold">Error loading batches</p>
                        <p className="text-sm opacity-80">{error}</p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && batches.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-lg dark:shadow-none"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Batches Available</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Check back soon for upcoming training sessions!</p>
                    </motion.div>
                )}

                {/* Table Container */}
                {!loading && batches.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-purple-500/10"
                    >
                        {/* Table Header - Desktop */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                            <div className="col-span-4 flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 opacity-80" />
                                <span className="font-bold">Program</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 justify-center">
                                <Calendar className="w-5 h-5 opacity-80" />
                                <span className="font-bold">Date</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 justify-center">
                                <Clock className="w-5 h-5 opacity-80" />
                                <span className="font-bold">Timings</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 justify-center">
                                <IndianRupee className="w-5 h-5 opacity-80" />
                                <span className="font-bold">Investment</span>
                            </div>
                            <div className="col-span-2 flex items-center justify-center">
                                <span className="font-bold">Action</span>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                            {batches.map((batch, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    key={batch.id}
                                    className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 p-6 lg:px-8 lg:py-5 hover:bg-purple-50 dark:hover:bg-white/5 transition-all duration-300 relative"
                                >
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    {/* Program Column */}
                                    <div className="lg:col-span-4 flex flex-col lg:flex-row lg:items-center gap-3 relative z-10">
                                        {/* Icon - Mobile/Desktop */}
                                        <div className="hidden lg:flex w-12 h-12 rounded-xl bg-purple-100 dark:bg-linear-to-br dark:from-purple-500/20 dark:to-violet-500/20 items-center justify-center flex-shrink-0 border border-purple-200 dark:border-purple-500/20 group-hover:border-purple-400 dark:group-hover:border-purple-500/40 transition-colors">
                                            <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 dark:text-white font-bold text-lg lg:text-base group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">
                                                {batch.program_name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className="text-gray-500 dark:text-gray-500 text-sm">{batch.program_type || 'Professional Certification'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Info Grid */}
                                    <div className="lg:hidden grid grid-cols-2 gap-4 mt-2">
                                        {/* Date */}
                                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Start Date
                                            </div>
                                            <p className="text-gray-900 dark:text-white font-bold">{formatDate(batch.start_date)}</p>
                                        </div>
                                        {/* Time */}
                                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                Timings
                                            </div>
                                            <p className="text-gray-900 dark:text-white font-bold text-sm">{formatTime(batch.start_time, batch.end_time)}</p>
                                        </div>
                                    </div>

                                    {/* Date Column - Desktop */}
                                    <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative z-10">
                                        <p className="text-gray-900 dark:text-white font-semibold">{formatDate(batch.start_date)}</p>
                                    </div>

                                    {/* Timings Column - Desktop */}
                                    <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative z-10">
                                        <p className="text-gray-900 dark:text-white font-semibold">{formatTime(batch.start_time, batch.end_time)}</p>
                                    </div>

                                    {/* Price Column */}
                                    <div className="lg:col-span-2 flex flex-col items-start lg:items-center justify-center relative z-10 mt-2 lg:mt-0">
                                        {/* Mobile Label */}
                                        <p className="lg:hidden text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Investment</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-gray-900 dark:text-white font-bold text-xl lg:text-base">
                                                {formatCurrency(batch.discount_price || batch.price)}
                                            </span>
                                            {batch.discount_price && batch.discount_price < batch.price && (
                                                <span className="text-gray-500 text-sm line-through">
                                                    {formatCurrency(batch.price)}
                                                </span>
                                            )}
                                        </div>
                                        {batch.discount_price && batch.discount_price < batch.price && (
                                            <span className="text-emerald-400 text-xs font-bold mt-0.5">
                                                Save {Math.round((1 - batch.discount_price / batch.price) * 100)}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Column */}
                                    <div className="lg:col-span-2 flex items-center justify-start lg:justify-center relative z-10 mt-4 lg:mt-0">
                                        <button
                                            onClick={() => handleEnrollClick(batch)}
                                            className="w-full lg:w-auto group/btn flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-6 py-3 lg:py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
                                        >
                                            <span>Enroll Now</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Table Footer */}
                        <div className="px-8 py-4 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-gray-500 text-sm">
                                Showing <span className="text-gray-900 dark:text-white font-semibold">{batches.length}</span> upcoming batches
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>Limited seats available - Enroll today!</span>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>

            {/* Enrollment Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-[#1a0b2e] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enroll Now</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                        Register to enroll in <span className="text-purple-600 dark:text-purple-400 font-semibold">{selectedBatch?.program_name}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="relative items-center justify-center group/input">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            placeholder="Full Name"
                                            className="w-full pl-6 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-400 dark:text-white text-sm"
                                        />
                                    </div>

                                    <div className="relative items-center justify-center group/input">
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            placeholder="Email Address"
                                            className="w-full pl-6 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-400 dark:text-white text-sm"
                                        />
                                    </div>

                                    <div className="relative items-center justify-center group/input">
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleFormChange}
                                            placeholder="Mobile Number"
                                            className="w-full pl-6 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-400 dark:text-white text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-violet-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Registering...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Register</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed">
                                    By registering, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
