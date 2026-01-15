"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, BookOpen, BarChart2, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { safeFetch, mockData } from '@/app/utils/safeFetch'

// Import assets
import thumb1 from './assets/cyber_lab_1.webp'
import thumb2 from './assets/cyber_lab_2.webp'
import thumb3 from './assets/cyber_lab_3.webp'

const defaultImage = thumb1

export default function CourseSection() {
    const [activeCategory, setActiveCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [categoriesLoading, setCategoriesLoading] = useState(true)

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories()
    }, [])

    // Fetch courses when active category changes
    useEffect(() => {
        if (activeCategory) {
            fetchCourses(activeCategory)
        }
    }, [activeCategory])

    const fetchCategories = async () => {
        setCategoriesLoading(true)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const response = await fetch(
                `${apiUrl}/api/courses/categories`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    credentials: 'include'
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.status}`)
            }

            const data = await response.json()
            const fetchedCategories = Array.isArray(data) ? data : (data.categories || [])

            if (fetchedCategories.length > 0) {
                setCategories(fetchedCategories)
                setActiveCategory(fetchedCategories[0])
            }
        } catch (err) {
            console.warn('Backend unavailable, using fallback categories:', err.message)
            // Fallback categories
            const fallbackCategories = ['Programming', 'CISCO', 'Red Hat', 'CompTIA', 'Microsoft Azure', 'Cybersecurity']
            setCategories(fallbackCategories)
            setActiveCategory(fallbackCategories[0])
        } finally {
            setCategoriesLoading(false)
        }
    }

    const fetchCourses = async (category) => {
        setLoading(true)
        setError(null)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
            const response = await fetch(
                `${apiUrl}/api/courses/category/${category.toLowerCase()}?page=1&limit=10`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    credentials: 'include'
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch courses: ${response.status}`)
            }

            const data = await response.json()
            const processedCourses = (data.courses || data || []).map((course, idx) => ({
                ...course,
                image: course.image || defaultImage,
                rating: course.rating || 4.5,
                lessons: course.lessons || 20,
                level: course.level || 'A1 - A2',
                duration: course.duration || '2 Weeks',
                category: category
            }))

            setCourses(processedCourses)
        } catch (err) {
            console.warn('Backend unavailable for courses, showing empty state:', err.message)
            // Don't set error state to avoid red error messages
            setCourses([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative w-full bg-background py-12 md:py-24 px-4 md:px-6 overflow-hidden font-sans transition-colors duration-300">
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
                <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-[11px] md:text-[13px] font-semibold text-foreground uppercase tracking-[0.2em]">
                            LEARNING HUB
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-[50px] font-semibold text-foreground tracking-tight leading-tight"
                    >
                        {categories.length > 0 ? `Explore ${categories.length} Training Categories` : 'Stay Connected, Keep Training'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-muted-foreground text-sm md:text-lg font-medium max-w-3xl mx-auto px-4"
                    >
                        Discover comprehensive courses tailored to your skill level and career goals
                    </motion.p>
                </div>

                {/* Filter Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16"
                >
                    {categoriesLoading ? (
                        <div className="text-center py-8">
                            <div className="inline-block">
                                <div className="w-8 h-8 border-4 border-[#6B46E5] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-slate-500 mt-2">Loading categories...</p>
                        </div>
                    ) : (
                        <div className="inline-flex bg-secondary p-1.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm max-w-full overflow-x-auto scrollbar-hide flex-nowrap md:flex-wrap">
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                            ? 'bg-primary text-primary-foreground shadow-lg'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))
                            ) : (
                                <p className="text-slate-400 px-6 py-2.5">No categories available</p>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {loading && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-[#6B46E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-slate-500">Loading courses...</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="text-center space-y-4 bg-red-50 p-6 rounded-lg">
                                <p className="text-red-600 font-semibold">Error loading courses</p>
                                <p className="text-slate-500 text-sm">{error}</p>
                                <p className="text-slate-400 text-xs">Showing default courses</p>
                            </div>
                        </div>
                    )}
                    {!loading && courses.length === 0 && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <p className="text-slate-400">No courses available for this category</p>
                        </div>
                    )}
                    {courses.map((course, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card text-card-foreground rounded-[2.5rem] border border-[#7B2CFF] shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_25px_60px_rgba(107,70,229,0.08)] transition-all duration-500 flex flex-col"
                        >
                            {/* Card Content Top */}
                            <div className="p-8 pb-4 space-y-6 grow">
                                <div className="flex items-center justify-between">
                                    <span className="bg-[#E9E4FF] text-[#6B46E5] px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
                                        {course.category}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm   text-foreground">{course.rating}</span>
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </div>

                                <h3 className="text-[22px] font-semibold text-foreground leading-[1.2] group-hover:text-[#6B46E5] transition-colors">
                                    {course.title}
                                </h3>

                                <div className="flex items-center gap-3">
                                    <button className="flex-1 bg-[#310E3F] text-white py-3 rounded-full text-sm font-bold hover:bg-[#6B46E5] transition-colors dark:bg-white dark:text-[#310E3F] dark:hover:bg-gray-200">
                                        Enroll Now
                                    </button>
                                    <button className="flex-1 border-2 border-[#310E3F] text-[#310E3F] py-3 rounded-full text-sm font-bold hover:border-[#6B46E5] hover:text-[#6B46E5] transition-all dark:border-white dark:text-white dark:hover:border-gray-200 dark:hover:text-gray-200">
                                        Learn More
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-slate-400">
                                    <div className="flex flex-col items-center gap-1">
                                        <BookOpen size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{course.lessons} lessons</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-100" />
                                    <div className="flex flex-col items-center gap-1">
                                        <BarChart2 size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{course.level}</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-100" />
                                    <div className="flex flex-col items-center gap-1">
                                        <Calendar size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{course.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Image Bottom */}
                            <div className="px-6 pb-6 mt-auto">
                                <div className="relative aspect-16/10 rounded-[1.5rem] overflow-hidden">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <Link href="/courses">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 md:px-10 py-3 rounded-full font-bold text-base md:text-lg hover:bg-[#6B46E5] transition-all hover:shadow-2xl"
                        >
                            View All
                            <div className="w-6 h-6 md:w-7 md:h-7 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
