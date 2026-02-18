'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, BookOpen, BarChart2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import thumb1 from '../Component/assets/cyber_lab_1.webp'
import BrochureFormModal from '../Component/BrochureFormModal'
import EnrollModal from '../Component/EnrollModal'
import { useEnquiry } from '../context/EnquiryContext'
import { API_BASE_URL } from '@/lib/apiConfig'

const defaultImage = thumb1

export default function AllCoursesPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCourses, setTotalCourses] = useState(0)
    const [brochureModalOpen, setBrochureModalOpen] = useState(false)
    const [brochureCourse, setBrochureCourse] = useState(null)
    const [enrollModalOpen, setEnrollModalOpen] = useState(false)
    const [enrollCourseTitle, setEnrollCourseTitle] = useState('')
    const { openEnquiry } = useEnquiry()

    const openEnrollModal = (title) => {
        setEnrollCourseTitle(title || '')
        setEnrollModalOpen(true)
    }
    const limit = 10

    useEffect(() => {
        fetchAllCourses(currentPage)
    }, [currentPage])

    const fetchAllCourses = async (page) => {
        setLoading(true)
        setError(null)
        try {
            const base = (API_BASE_URL || '').replace(/\/$/, '')
            const response = await fetch(
                `${base}/api/courses?page=${page}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch courses: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error('API returned unsuccessful response')
            }

            // API returns { data: [...] } or { courses: [...] }
            const list = Array.isArray(data.data) ? data.data : (data.courses || [])
            setCourses(list)
            setTotalPages(data.pagination?.pages || 1)
            setTotalCourses(data.pagination?.total || 0)
        } catch (err) {
            console.error('Error fetching courses:', err)
            setError(err.message)
            setCourses([])
        } finally {
            setLoading(false)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo(0, 0)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            window.scrollTo(0, 0)
        }
    }

    const getCoursePrice = (course) => {
        if (course.discounted_price && course.discounted_price > 0) {
            return `₹${course.discounted_price}`
        }
        return course.price ? `₹${course.price}` : 'Free'
    }

    return (
        <section className="relative w-full bg-white dark:bg-gray-900 py-24 px-6 overflow-hidden font-sans transition-colors">
            {/* Background Decorative Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08]">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-500">
                    <path d="M0 400C150 350 300 450 450 400C600 350 750 450 900 400C1050 350 1200 450 1350 400C1500 350 1650 450 1800 400" stroke="currentColor" strokeWidth="1" />
                    <path d="M0 450C150 400 300 500 450 450C600 400 750 500 900 450C1050 400 1200 500 1350 450" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 350C150 300 300 400 450 350C600 300 750 400 900 350C1050 300 1200 400 1350 350" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 bg-[#6B46E5] dark:bg-violet-500 shadow-[3px_3px_6px_rgba(107,70,229,0.45)] dark:shadow-violet-500/30"></div>
                        <span className="text-[13px] font-semibold text-[#1a1a2e] dark:text-gray-200 uppercase tracking-[0.2em]">
                            ALL COURSES
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-[50px] font-semibold text-[#1a1a2e] dark:text-white tracking-tight">
                        Explore All {totalCourses} Courses
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg font-medium max-w-3xl mx-auto">
                        Browse our complete catalog of professional training courses
                    </p>
                </div>

                <BrochureFormModal
                    open={brochureModalOpen}
                    onClose={() => { setBrochureModalOpen(false); setBrochureCourse(null) }}
                    brochureUrl={brochureCourse?.brochure_url || brochureCourse?.brochure}
                    courseTitle={brochureCourse?.title}
                />

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {loading && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-[#6B46E5] dark:border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-slate-500 dark:text-gray-400">Loading courses...</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="text-center space-y-4 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                                <p className="text-red-600 dark:text-red-400 font-semibold">Error loading courses</p>
                                <p className="text-slate-500 dark:text-gray-400 text-sm">{error}</p>
                            </div>
                        </div>
                    )}
                    {!loading && courses.length === 0 && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <p className="text-slate-400 dark:text-gray-500">No courses available</p>
                        </div>
                    )}
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-[#7B2CFF] dark:border-gray-700 shadow-[0_15px_40px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden group hover:shadow-[0_25px_60px_rgba(107,70,229,0.08)] dark:hover:ring-2 dark:hover:ring-violet-500/50 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Card Content Top */}
                            <div className="px-6 pb-6 mt-6">
                                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <Image
                                        src={(course.course_thumbnail || course.image || course.thumbnail) || defaultImage}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized={typeof (course.course_thumbnail || course.image || course.thumbnail) === 'string' && (course.course_thumbnail || course.image || course.thumbnail)?.startsWith('http')}
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            e.currentTarget.src = defaultImage.src
                                            e.currentTarget.srcset = defaultImage.src
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="px-8 pb-4 space-y-6 grow flex flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="bg-[#E9E4FF] dark:bg-violet-500/20 text-[#6B46E5] dark:text-violet-400 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider inline-block">
                                            {course.level || 'Beginner'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-sm text-slate-900 dark:text-gray-100">{course.rating || 4.5}</span>
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-[22px] font-semibold text-[#1a1a2e] dark:text-white leading-[1.2] group-hover:text-[#6B46E5] dark:group-hover:text-violet-400 transition-colors line-clamp-3">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                                        {course.short_description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
                                    <div className="flex items-center justify-between text-slate-400 dark:text-gray-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <BookOpen size={18} />
                                            <span className="text-[11px] font-bold uppercase tracking-tighter">{course.lessons || 20} lessons</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-100 dark:bg-gray-600" />
                                        <div className="flex flex-col items-center gap-1">
                                            <BarChart2 size={18} />
                                            <span className="text-[11px] font-bold uppercase tracking-tighter">{course.level || 'Beginner'}</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-100 dark:bg-gray-600" />
                                        <div className="flex flex-col items-center gap-1">
                                            <Calendar size={18} />
                                            <span className="text-[11px] font-bold uppercase tracking-tighter">{course.duration || '3 Weeks'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-[#6B46E5] dark:text-violet-400 font-bold text-lg">
                                        {getCoursePrice(course)}
                                    </p>
                                    {course.discounted_price && course.price > course.discounted_price && (
                                        <p className="text-slate-400 dark:text-gray-500 line-through text-sm">
                                            ₹{course.price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="px-8 pb-8 mt-auto">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => openEnrollModal(course.title)}
                                            className="flex-1 bg-[#310E3F] dark:bg-violet-600 text-white py-3 rounded-full text-sm font-bold hover:bg-[#6B46E5] dark:hover:bg-violet-500 transition-colors"
                                        >
                                            Enroll Now
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBrochureCourse(course)
                                                setBrochureModalOpen(true)
                                            }}
                                            className="flex-1 border-2 border-[#310E3F] dark:border-violet-500 text-[#310E3F] dark:text-violet-400 py-3 rounded-full text-sm font-bold hover:border-[#6B46E5] hover:text-[#6B46E5] dark:hover:border-violet-400 dark:hover:text-violet-300 transition-all"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => openEnquiry(true)}
                                        className="w-full py-2.5 rounded-full text-sm font-bold border border-[#6B46E5]/50 dark:border-violet-500/50 text-[#6B46E5] dark:text-violet-400 hover:bg-[#6B46E5] hover:text-white dark:hover:bg-violet-500 dark:hover:text-white transition-all"
                                    >
                                        Book a demo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-6 mb-16">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'bg-[#1a1a2e] dark:bg-gray-700 text-white hover:bg-[#6B46E5] dark:hover:bg-violet-500'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            setCurrentPage(page)
                                            window.scrollTo(0, 0)
                                        }}
                                        className={`w-10 h-10 rounded-full font-bold transition-all ${currentPage === page
                                            ? 'bg-[#1a1a2e] dark:bg-violet-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'bg-[#1a1a2e] dark:bg-gray-700 text-white hover:bg-[#6B46E5] dark:hover:bg-violet-500'
                                    }`}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Page Info */}
                        <div className="text-center text-slate-500 dark:text-gray-400 text-sm">
                            Showing {Math.min((currentPage - 1) * limit + 1, totalCourses)} to {Math.min(currentPage * limit, totalCourses)} of {totalCourses} courses
                        </div>
                    </div>
                )}

                <EnrollModal
                    open={enrollModalOpen}
                    onClose={() => setEnrollModalOpen(false)}
                    courseTitle={enrollCourseTitle}
                />
            </div>
        </section>
    )
}
