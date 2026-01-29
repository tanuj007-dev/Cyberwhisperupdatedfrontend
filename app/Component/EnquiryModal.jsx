"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export default function EnquiryModal() {
    const { isOpen, closeEnquiry } = useEnquiry();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const response = await fetch(`${apiUrl}/api/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Form submitted successfully:', data);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            // Close modal after 2 seconds
            setTimeout(() => {
                closeEnquiry();
                setSubmitStatus(null);
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to submit enquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeEnquiry}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeEnquiry}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <div className="mb-6 text-center">
                                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Get a Quote</h3>
                                <p className="text-gray-600">Tell us about your requirements and we'll get back to you shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Enter your subject"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="3"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>

                                {/* Success Message */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">Thank you! We'll get back to you soon.</span>
                                    </motion.div>
                                )}

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800"
                                    >
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm">{errorMessage}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || submitStatus === 'success'}
                                    className="w-full bg-[#310E3F] text-white font-semibold py-3 rounded-lg hover:bg-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                                    {isSubmitting ? 'Submitting...' : submitStatus === 'success' ? 'Submitted!' : 'Submit Enquiry'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
