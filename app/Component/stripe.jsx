"use client"
import React, { useState } from 'react'

const categories = [
    { id: 'essentials', label: 'Essentials' },
    { id: 'career-focus', label: 'Career Focus' },
    { id: 'skill-levels', label: 'Skill Levels' },
]

export default function Stripe() {
    const [activeTab, setActiveTab] = useState('essentials')

    return (
        <nav className="w-full bg-white dark:bg-black border-y border-gray-100 dark:border-gray-800 py-2 font-sans transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-[16px]">

                    {/* Label Section */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1a1a2e] dark:text-white whitespace-nowrap">Categories:</span>
                    </div>

                    {/* Nav Links Section */}
                    <div className="flex items-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide w-full sm:w-auto justify-center sm:justify-end pb-1 sm:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`relative whitespace-nowrap font-bold transition-all duration-300 py-1 ${activeTab === cat.id
                                    ? 'text-[#6B46E5]'
                                    : 'text-slate-900/60 dark:text-white/60 hover:text-[#6B46E5]/80'
                                    }`}
                            >
                                {cat.label}
                                {/* Optional: Subtle indicator line for active state */}
                                {activeTab === cat.id && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#6B46E5] rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </nav>
    )
}
