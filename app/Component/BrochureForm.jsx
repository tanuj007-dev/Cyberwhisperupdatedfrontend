'use client'

import React, { useState, useEffect } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import { API_BASE_URL } from '../../lib/apiConfig'

const DEFAULT_BROCHURE_URL = '/uploads/brochures/brochure.pdf'
const BROCHURE_FILENAME = 'CyberWhisper_Brochure.pdf'

export default function BrochureForm({ className = '', onSuccess, brochureUrl: brochureUrlProp, courseTitle }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const [fetchedUrl, setFetchedUrl] = useState(null)
    // Use course brochure if provided, else fallback from API (global brochure)
    const brochureUrl = brochureUrlProp ?? fetchedUrl ?? null

    useEffect(() => {
        if (brochureUrlProp) return
        fetch('/api/brochure/current')
            .then((res) => res.ok ? res.json() : {})
            .then((data) => {
                if (data?.url) setFetchedUrl(data.url)
            })
            .catch(() => {})
    }, [brochureUrlProp])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setMessage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!brochureUrl) {
            setMessage(courseTitle ? 'No brochure available for this course.' : 'No brochure available.')
            return
        }
        setIsSubmitting(true)
        setMessage(null)
        try {
            const addRes = await fetch(`${API_BASE_URL}/api/brochure-downloads/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    mobile_number: formData.mobile.trim(),
                    ...(courseTitle && { course_title: courseTitle })
                })
            })
            if (!addRes.ok) {
                const errData = await addRes.json().catch(() => ({}))
                throw new Error(errData.message || errData.error || 'Request failed')
            }

            const link = document.createElement('a')
            link.href = brochureUrl.startsWith('http') ? brochureUrl : (typeof window !== 'undefined' ? window.location.origin : '') + brochureUrl
            link.download = courseTitle ? `${courseTitle.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 60)}_Brochure.pdf` : BROCHURE_FILENAME
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            setMessage('Brochure is downloading. Check your downloads.')
            setFormData({ name: '', email: '', mobile: '' })
            onSuccess?.()
        } catch (err) {
            setMessage(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const noBrochure = !brochureUrl

    return (
        <div className={`bg-card border border-[#7B2CFF]/30 rounded-2xl p-4 md:p-6 shadow-sm ${className}`}>
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileDown className="w-4 h-4 text-[#6B46E5]" />
                {courseTitle ? `Download brochure: ${courseTitle}` : 'Download course brochure'}
            </p>
            {noBrochure && (
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                    {courseTitle ? 'No brochure available for this course.' : 'No brochure available.'}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-3 py-2.5 text-sm bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent outline-none placeholder:text-muted-foreground"
                />
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-3 py-2.5 text-sm bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent outline-none placeholder:text-muted-foreground"
                />
                <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full px-3 py-2.5 text-sm bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent outline-none placeholder:text-muted-foreground"
                />
                <button
                    type="submit"
                    disabled={isSubmitting || noBrochure}
                    className="w-full flex items-center justify-center gap-2 bg-[#310E3F] dark:bg-[#6B46E5] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#6B46E5] dark:hover:bg-[#7B5CF0] transition-colors disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Downloading…
                        </>
                    ) : (
                        <>
                            <FileDown className="w-4 h-4" />
                            Download brochure
                        </>
                    )}
                </button>
            </form>
            {message && (
                <p className="text-xs text-[#6B46E5] dark:text-purple-400 mt-2">{message}</p>
            )}
        </div>
    )
}
