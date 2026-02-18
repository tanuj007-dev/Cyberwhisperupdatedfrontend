'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { API_BASE_URL } from '../../lib/apiConfig'

export default function EnrollModal({ open, onClose, courseTitle, modalTitle = 'Enroll Now', submitLabel = 'Register' }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        if (!open) return
        const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    useEffect(() => {
        if (!open) {
            setName('')
            setEmail('')
            setPhone('')
            setMessage({ type: '', text: '' })
        }
    }, [open])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !phone.trim()) {
            setMessage({ type: 'error', text: 'Please fill all fields.' })
            return
        }
        setSubmitting(true)
        setMessage({ type: '', text: '' })
        try {
            const response = await fetch(`${API_BASE_URL}/api/course-enrollments/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    course_name: (courseTitle && courseTitle.trim()) || '',
                    name: name.trim(),
                    email: email.trim(),
                    phone_number: phone.trim(),
                }),
            }).catch(() => null)
            if (response?.ok) {
                setMessage({ type: 'success', text: 'Registration successful! We will contact you soon.' })
                setName('')
                setEmail('')
                setPhone('')
                setTimeout(() => { onClose() }, 1500)
            } else {
                const errData = await response?.json().catch(() => ({}))
                setMessage({ type: 'error', text: errData.message || 'Registration failed. Please try again.' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setSubmitting(false)
        }
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Enroll in course"
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-[#7B2CFF]/30 overflow-hidden">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 z-10"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="p-6 pt-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{modalTitle}</h3>
                    {courseTitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 truncate" title={courseTitle}>{courseTitle}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="enroll-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                                id="enroll-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="enroll-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                id="enroll-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="enroll-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone number</label>
                            <input
                                id="enroll-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Your phone number"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        {message.text && (
                            <p className={`text-sm ${message.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {message.text}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 rounded-xl bg-[#6B46E5] hover:bg-[#5a3ac4] text-white font-bold transition-colors disabled:opacity-50"
                        >
                            {submitting ? (submitLabel === 'Join Now' ? 'Joining...' : 'Registering...') : submitLabel}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
