'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import BrochureForm from './BrochureForm'

export default function BrochureFormModal({ open, onClose, brochureUrl, courseTitle }) {
    useEffect(() => {
        if (!open) return
        const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Download brochure"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Modal panel */}
            <div className="relative w-full max-w-md bg-card dark:bg-gray-900 rounded-2xl shadow-xl border border-[#7B2CFF]/30 overflow-hidden">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="p-6 pt-10">
                    <BrochureForm className="p-0! border-0! shadow-none!" onSuccess={onClose} brochureUrl={brochureUrl} courseTitle={courseTitle} />
                </div>
            </div>
        </div>
    )
}
