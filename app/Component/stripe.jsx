"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const categories = [
    { id: 'essentials', label: 'Essentials' },
    { id: 'career-focus', label: 'Career Focus' },
    { id: 'skill-levels', label: 'Skill Levels' },
]

export default function Stripe() {
    const [activeTab, setActiveTab] = useState('essentials')
    const isScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef(null)

    // Handle scroll to section with offset
    const scrollToSection = (id) => {
        // Disable scroll spy temporarily
        isScrollingRef.current = true
        setActiveTab(id)

        const element = document.getElementById(id)
        if (element) {
            const offset = 120 // Height of header + stripe + buffer
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            // Re-enable scroll spy after animation completes
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false
            }, 1000)
        }
    }

    // Scroll Spy to update active tab
    useEffect(() => {
        let debounceTimer = null

        const handleScroll = () => {
            // Don't update if user just clicked a tab
            if (isScrollingRef.current) return

            // Debounce for performance
            if (debounceTimer) {
                clearTimeout(debounceTimer)
            }

            debounceTimer = setTimeout(() => {
                const sections = categories.map(cat => document.getElementById(cat.id))
                const scrollPosition = window.scrollY + 200

                sections.forEach(section => {
                    if (section) {
                        const sectionTop = section.offsetTop
                        const sectionHeight = section.offsetHeight

                        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                            setActiveTab(section.id)
                        }
                    }
                })
            }, 50) // 50ms debounce
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (debounceTimer) clearTimeout(debounceTimer)
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        }
    }, [])

    return (
        <nav className="sticky top-[72px] z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-y border-gray-100 dark:border-gray-800 py-3 font-sans transition-all duration-300 shadow-sm">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-[15px]">

                    {/* Label Section */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1a1a2e] dark:text-white whitespace-nowrap uppercase tracking-wider text-xs md:text-sm">Explore Categories:</span>
                    </div>

                    {/* Nav Links Section */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900/50 p-1.5 rounded-full overflow-x-auto scrollbar-hide w-full sm:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToSection(cat.id)}
                                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 z-10 whitespace-nowrap ${activeTab === cat.id ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {cat.label}
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#6B46E5] rounded-full -z-10 shadow-lg shadow-purple-500/30"
                                        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </nav>
    )
}
