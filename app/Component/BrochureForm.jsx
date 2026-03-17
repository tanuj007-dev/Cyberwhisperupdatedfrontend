'use client'

import React, { useState, useEffect } from 'react'
import { FileDown, Loader2, X } from 'lucide-react'
import { API_BASE_URL, apiUrl } from '../../lib/apiConfig'

const BROCHURE_FILENAME = 'CyberWhisper_Brochure.pdf'

export default function BrochureForm({ className = '', onSuccess, brochureUrl: brochureUrlProp, courseTitle, courseId }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [message, setMessage] = useState(null)
    const [fetchedUrl, setFetchedUrl] = useState(null)
    const brochureUrl = brochureUrlProp ?? fetchedUrl ?? null
    const hasBrochure = Boolean(courseId) || Boolean(brochureUrl)

    useEffect(() => {
        if (brochureUrlProp) return
        fetch(`${(API_BASE_URL || '').replace(/\/$/, '')}/api/brochure/current`)
            .then((res) => res.ok ? res.json() : {})
            .then((data) => {
                if (data?.url) setFetchedUrl(data.url)
            })
            .catch(() => { })
    }, [brochureUrlProp])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setMessage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!hasBrochure) {
            setMessage(courseTitle ? 'No brochure available for this course.' : 'No brochure available.')
            return
        }
        setIsSubmitting(true)
        setMessage(null)
        try {
            const addRes = await fetch(apiUrl('/api/brochure-downloads/add'), {
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

            setIsDownloading(true)
            setMessage('Preparing download...')

            let downloadHref = null
            if (courseId) {
                const urlRes = await fetch(apiUrl(`/api/courses/${courseId}/brochure-download-url`), { headers: { 'Content-Type': 'application/json' } })
                if (urlRes.ok) {
                    const data = await urlRes.json().catch(() => ({}))
                    const url = data?.url ?? data?.data?.url ?? data?.downloadUrl ?? data?.data?.downloadUrl ?? data?.presignedUrl ?? data?.data?.presignedUrl
                    if (url && typeof url === 'string') downloadHref = url
                }
            }
            if (!downloadHref && brochureUrl) {
                const base = (API_BASE_URL || '').replace(/\/$/, '')
                const isS3Url = brochureUrl.startsWith('http') && (brochureUrl.includes('amazonaws.com') || brochureUrl.includes('s3.'))
                downloadHref = isS3Url
                    ? (typeof window !== 'undefined' ? window.location.origin : '') + '/api/courses/brochure-download?url=' + encodeURIComponent(brochureUrl.startsWith('http') ? brochureUrl : (base || '') + brochureUrl)
                    : brochureUrl.startsWith('http') ? brochureUrl : (base ? base : (typeof window !== 'undefined' ? window.location.origin : '')) + brochureUrl
            }
            if (!downloadHref) {
                setMessage('Could not get download link. No brochure may be attached to this course.')
                setIsDownloading(false)
                return
            }

            const link = document.createElement('a')
            link.href = downloadHref
            link.download = courseTitle ? `${courseTitle.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 60)}_Brochure.pdf` : BROCHURE_FILENAME
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            setTimeout(() => {
                setMessage('Brochure is downloading. Check your downloads.')
                setIsDownloading(false)
                setFormData({ name: '', email: '', mobile: '' })
                onSuccess?.()
            }, 2000)
        } catch (err) {
            setMessage(err.message || 'Something went wrong. Please try again.')
            setIsDownloading(false)
        } finally {
            setIsSubmitting(false)
        }
    }

    const noBrochure = !hasBrochure

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
                    disabled={isSubmitting || isDownloading || noBrochure}
                    className="w-full flex items-center justify-center gap-2 bg-[#310E3F] dark:bg-[#6B46E5] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#6B46E5] dark:hover:bg-[#7B5CF0] transition-colors disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing…
                        </>
                    ) : isDownloading ? (
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

            {/* Full-screen Download Loader Modal */}
            {isDownloading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-[#6B46E5] border-t-transparent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FileDown className="w-6 h-6 text-[#6B46E5]" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Downloading Brochure
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Please wait while we prepare your download...
                                </p>
                                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Processing download</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-[#6B46E5] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
