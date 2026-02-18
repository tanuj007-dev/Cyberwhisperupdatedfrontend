"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, BarChart2, Calendar, ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import BrochureFormModal from './BrochureFormModal'
import EnrollModal from './EnrollModal'
import { useEnquiry } from '../context/EnquiryContext'
import { useVisibleCount, useSliderSwipe } from '../context/useSliderSwipe'
import { API_BASE_URL } from '../../lib/apiConfig'
// Import fallback assets
import thumb1 from './assets/cyber_lab_1.webp'
import thumb2 from './assets/cyber_lab_2.webp'
import thumb3 from './assets/cyber_lab_3.webp'

const fallbackImages = [thumb1, thumb2, thumb3]

export default function TrainingSection() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState(['All'])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [brochureModalOpen, setBrochureModalOpen] = useState(false)
    const [brochureCourse, setBrochureCourse] = useState(null)
    const [enrollModalOpen, setEnrollModalOpen] = useState(false)
    const [enrollCourseTitle, setEnrollCourseTitle] = useState('')
    const [slideIndex, setSlideIndex] = useState(0)
    const visibleCount = useVisibleCount()
    const { openEnquiry } = useEnquiry()

    const openEnrollModal = (title) => {
        setEnrollCourseTitle(title || '')
        setEnrollModalOpen(true)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE_URL}/api/courses?page=1&limit=10`, { cache: 'no-store' })
            if (!response.ok) {
                throw new Error('Failed to fetch courses')
            }

            const data = await response.json()

            // API returns { success, data: [...] } or { success, courses: [...] }
            const rawList = Array.isArray(data.data) ? data.data : (Array.isArray(data.courses) ? data.courses : [])
            // Normalize: add category label (API has category_id, not category)
            const normalized = rawList.map(course => ({
                ...course,
                category: course.category ?? (course.category_id != null ? `Category ${course.category_id}` : 'General')
            }))
            setCourses(normalized)

            const uniqueCategories = ['All', ...new Set(normalized.map(c => c.category).filter(Boolean))]
            setCategories(uniqueCategories)
        } catch (err) {
            console.error('Error fetching courses:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Filter courses by active category
    const filteredCourses = activeCategory === 'All'
        ? courses
        : courses.filter(course => course.category === activeCategory)

    const totalSlides = Math.max(1, Math.ceil(filteredCourses.length / visibleCount))
    const canGoPrev = slideIndex > 0
    const canGoNext = slideIndex < totalSlides - 1

    const goPrev = useCallback(() => setSlideIndex((i) => Math.max(0, i - 1)), [])
    const goNext = useCallback(() => setSlideIndex((i) => Math.min(totalSlides - 1, i + 1)), [totalSlides])
    const swipeHandlers = useSliderSwipe(slideIndex, totalSlides, goPrev, goNext)
    const slideChunks = React.useMemo(() => {
        const chunks = []
        for (let i = 0; i < totalSlides; i++) {
            chunks.push(filteredCourses.slice(i * visibleCount, (i + 1) * visibleCount))
        }
        return chunks
    }, [filteredCourses, totalSlides, visibleCount])

    useEffect(() => {
        setSlideIndex(0)
    }, [activeCategory, filteredCourses.length])

    return (
        <section className="relative w-full bg-white dark:bg-black py-24 lg:py-14 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Background Decorative Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 400C150 350 300 450 450 400C600 350 750 450 900 400C1050 350 1200 450 1350 400C1500 350 1650 450 1800 400" stroke="#6B46E5" strokeWidth="1" />
                    <path d="M0 450C150 400 300 500 450 450C600 400 750 500 900 450C1050 400 1200 500 1350 450" stroke="#6B46E5" strokeWidth="0.5" />
                    <path d="M0 350C150 300 300 400 450 350C600 300 750 400 900 350C1050 300 1200 400 1350 350" stroke="#6B46E5" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-8 space-y-4 lg:space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-[13px] font-semibold text-[#1a1a2e] dark:text-white uppercase tracking-[0.2em]">
                            LEARNING HUB
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-[50px] lg:text-4xl font-semibold text-[#1a1a2e] dark:text-white tracking-tight">
                        Stay Connected, Keep Training
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg lg:text-base font-medium max-w-3xl mx-auto">
                        Immersive Tech Experiences in Our Workshop at Techfest, IIT Bombay
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 lg:mb-8">
                    <div className="inline-flex bg-[#F8F9FD] dark:bg-gray-900 p-1.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm max-w-full overflow-x-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] shadow-lg'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-[#1a1a2e] dark:hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Training Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 dark:text-red-400 text-lg font-semibold">Error: {error}</p>
                        <button
                            onClick={fetchCourses}
                            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No courses available in this category.</p>
                    </div>
                ) : (
                    <div className="relative mb-16 lg:mb-10 touch-pan-y select-none px-2 sm:px-4 md:px-0" {...swipeHandlers}>
                        {/* Navigation buttons */}
                        {totalSlides > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    disabled={!canGoPrev}
                                    aria-label="Previous courses"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-[#7B2CFF] text-[#6B46E5] shadow-lg flex items-center justify-center hover:bg-[#6B46E5] hover:text-white hover:border-[#6B46E5] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronLeft size={22} className="md:w-6 md:h-6" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!canGoNext}
                                    aria-label="Next courses"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-[#7B2CFF] text-[#6B46E5] shadow-lg flex items-center justify-center hover:bg-[#6B46E5] hover:text-white hover:border-[#6B46E5] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ChevronRight size={22} className="md:w-6 md:h-6" />
                                </button>
                            </>
                        )}

                        {/* Slider: one slide = one viewport width on mobile so cards don't cut */}
                        <div className="overflow-hidden w-full min-w-0">
                            <motion.div
                                className="flex"
                                style={{ width: `${totalSlides * 100}%` }}
                                animate={{ x: slideIndex ? `-${(slideIndex / totalSlides) * 100}%` : '0%' }}
                                transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            >
                                {slideChunks.map((slideCourses, slideIdx) => (
                                    <div
                                        key={slideIdx}
                                        className="flex gap-8 lg:gap-4 shrink-0 px-1 md:px-0 items-start justify-center w-full min-w-0"
                                        style={{ width: `${100 / totalSlides}%`, minWidth: `${100 / totalSlides}%` }}
                                    >
                                        {slideCourses.map((course, idx) => (
                                            <motion.div
                                                key={course.id ?? `${slideIdx}-${idx}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05 }}
                                                className="shrink-0 flex-none rounded-xl border border-[#7B2CFF]/30 bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-900/95 shadow-lg shadow-gray-200/50 dark:shadow-none overflow-hidden group hover:shadow-xl hover:shadow-[#6B46E5]/15 hover:border-[#6B46E5]/50 transition-all duration-300 flex flex-col dark:text-white max-w-[360px]"
                                                style={visibleCount === 1 ? { width: '100%' } : { width: `calc((100% - ${(visibleCount - 1) * 2}rem) / ${visibleCount})`, maxWidth: '360px' }}
                                            >
                                        {/* Card Content Top */}
                                        <div className="p-4 pb-3 space-y-4 shrink-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="bg-[#6B46E5] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                    {course.category || 'General'}
                                                </span>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">{course.rating || 4.5}</span>
                                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                                                    {(course.price != null || course.discounted_price != null) && (
                                                        <span className="text-sm text-slate-600 dark:text-gray-300 flex items-center gap-1.5">
                                                            {course.discounted_price != null && course.price != null && course.discounted_price < course.price ? (
                                                                <>
                                                                    <span className="font-semibold text-[#6B46E5]">
                                                                        ₹{Number(course.discounted_price).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                                                    </span>
                                                                    <span className="line-through text-slate-400 dark:text-gray-500">
                                                                        ₹{Number(course.price).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span>₹{Number(course.discounted_price ?? course.price).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}</span>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-base font-bold text-[#1a1a2e] dark:text-white leading-snug line-clamp-3 group-hover:text-[#6B46E5] dark:group-hover:text-[#A78BFA] transition-colors duration-200">
                                                {course.title}
                                            </h3>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEnrollModal(course.title)}
                                                        className="flex-1 bg-[#310E3F] dark:bg-[#6B46E5] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#6B46E5] dark:hover:bg-[#7C3AED] transition-colors"
                                                    >
                                                        Enroll Now
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setBrochureCourse(course)
                                                            setBrochureModalOpen(true)
                                                        }}
                                                        className="flex-1 border-2 border-[#6B46E5] dark:border-purple-400 text-[#6B46E5] dark:text-purple-300 py-2 rounded-lg text-xs font-bold hover:bg-[#6B46E5]/10 dark:hover:bg-purple-500/10 transition-colors"
                                                    >
                                                        Learn More
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => openEnquiry(true)}
                                                    className="w-full py-2 rounded-lg text-xs font-bold border border-[#6B46E5]/50 dark:border-purple-400 text-[#6B46E5] dark:text-purple-300 hover:bg-[#6B46E5] hover:text-white dark:hover:bg-[#6B46E5] transition-colors"
                                                >
                                                    Book a demo
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                                                    <BarChart2 size={16} className="text-[#6B46E5] dark:text-purple-400" />
                                                    <span className="text-[10px] font-medium text-slate-700 dark:text-gray-300 text-center">{course.level || 'Beginner'}</span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                                                    <Calendar size={16} className="text-[#6B46E5] dark:text-purple-400" />
                                                    <span className="text-[10px] font-medium text-slate-700 dark:text-gray-300 text-center">{course.duration || '3 Weeks'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Image Bottom */}
                                        <div className="px-4 pb-3">
                                            <div className="relative aspect-[3/2] rounded-b-xl overflow-hidden ring-1 ring-black/5">
                                                <Image
                                                    src={(() => {
                                                        const raw = course.thumbnail || course.course_thumbnail || course.thumbnail_url || course.image || fallbackImages[idx % fallbackImages.length]
                                                        if (typeof raw !== 'string') return raw
                                                        const sep = raw.includes('?') ? '&' : '?'
                                                        const v = course.last_modified ?? course.updated_at ?? course.id ?? ''
                                                        return `${raw}${sep}v=${v}`
                                                    })()}
                                                    alt={course.title}
                                                    fill
                                                    unoptimized={!!(course.thumbnail || course.course_thumbnail || (typeof course.image === 'string' && course.image.startsWith('http')))}
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            </div>
                                        </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Dots indicator */}
                        {totalSlides > 1 && (
                            <div className="flex justify-center gap-2 mt-8 lg:mt-5">
                                {Array.from({ length: totalSlides }).map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setSlideIndex(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-[#6B46E5] scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#6B46E5]/70'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <BrochureFormModal
                    open={brochureModalOpen}
                    onClose={() => { setBrochureModalOpen(false); setBrochureCourse(null) }}
                    brochureUrl={brochureCourse?.brochure_url || brochureCourse?.brochure}
                    courseTitle={brochureCourse?.title}
                />
                <EnrollModal open={enrollModalOpen} onClose={() => setEnrollModalOpen(false)} courseTitle={enrollCourseTitle} />

                {/* View All Button */}
                <div className="flex justify-center">
                    <button className="group flex items-center gap-3 bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] px-10 py-3 rounded-full font-bold text-lg hover:bg-[#6B46E5] dark:hover:bg-gray-200 transition-all hover:shadow-2xl active:scale-95">
                        View All
                        <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}
