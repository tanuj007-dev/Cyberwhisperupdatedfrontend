"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BlogCard from '../Component/BlogCard'
import BlogSidebar from '../Component/BlogSidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Loader2, X } from 'lucide-react'

export default function BlogPage() {
    const router = useRouter()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const blogsPerPage = 6

    useEffect(() => {
        if (selectedBlog) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [selectedBlog]);

    useEffect(() => {
        fetchBlogs()
    }, [currentPage])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            // Use current server in development, fallback to environment variable
            const baseUrl = typeof window !== 'undefined'
                ? `http://${window.location.hostname}:${window.location.port}`
                : 'http://localhost:3000'

            const apiUrl = `${baseUrl}/api/blogs/list?page=${currentPage}&limit=${blogsPerPage}`
            console.log('Fetching blogs from API:', apiUrl)

            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`Failed to fetch blogs: ${response.statusText}`)
            }

            const result = await response.json()
            console.log('Blogs API response:', result)

            // Handle the new API response structure: { success: true, data: [...], pagination: {...} }
            let blogsList = []
            let totalPages = 1

            if (result.success && result.data) {
                blogsList = Array.isArray(result.data) ? result.data : [result.data]
                if (result.pagination) {
                    totalPages = result.pagination.totalPages || 1
                }
            } else if (Array.isArray(result)) {
                blogsList = result
                totalPages = Math.ceil(result.length / blogsPerPage)
            }

            console.log('Fetched blogs:', blogsList.length, 'Total pages:', totalPages)
            setBlogs(blogsList)
            setTotalPages(totalPages)
        } catch (err) {
            console.error('Error fetching blogs:', err)
            setError(err.message)
            setBlogs([])
        } finally {
            setLoading(false)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog)
    }

    const handleCloseModal = () => {
        setSelectedBlog(null)
    }

    return (
        <div className="min-h-screen bg-[#FBFAFF] pt-32 pb-20 overflow-hidden relative">
            {/* Hero Section for Blog */}
            <section className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-[#1C0F2D] mb-4"
                >
                    Our <span className="text-[#6B46E5]">Blog</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-600 max-w-6xl mx-auto text-lg"
                >

                </motion.p>
            </section>

            {/* Blog Content with Sidebar */}
            <section className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Grid List */}
                    <div className="flex-1">
                        {/* Loading State */}
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                                    <p className="text-gray-600">Loading blogs...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6">
                                <p className="font-semibold">Error loading blogs</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && blogs.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blogs Available</h3>
                                <p className="text-gray-600">Check back soon for new content!</p>
                            </div>
                        )}

                        {/* Blog Grid */}
                        {!loading && blogs.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                                    {blogs.map((post) => (
                                        <div key={post.id} onClick={() => handleBlogClick(post)} className="cursor-pointer h-full">
                                            <BlogCard {...post} onClick={() => handleBlogClick(post)} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex justify-center items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${currentPage === 1
                                                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-white border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-[#6B46E5]'
                                                }`}
                                        >
                                            <FiChevronLeft size={20} />
                                        </motion.button>

                                        {/* Page Numbers */}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <motion.button
                                                key={pageNum}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handlePageClick(pageNum)}
                                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${currentPage === pageNum
                                                    ? 'bg-[#1C0F2D] text-white shadow-lg'
                                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6B46E5] hover:text-[#6B46E5]'
                                                    }`}
                                            >
                                                {pageNum}
                                            </motion.button>
                                        ))}

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${currentPage === totalPages
                                                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-white border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-[#6B46E5]'
                                                }`}
                                        >
                                            <FiChevronRight size={20} />
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar />
                </div>
            </section>

            {/* Blog Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ margin: 0 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-transform hover:scale-110"
                            >
                                <X className="w-6 h-6 text-gray-800" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto custom-scrollbar">
                                {/* Hero Image */}
                                <div className="relative w-full h-64 md:h-96">
                                    <Image
                                        src={selectedBlog.image}
                                        alt={selectedBlog.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                </div>

                                <div className="p-8 md:p-12 space-y-6">
                                    {/* Header */}
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2 items-center text-sm">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                                                {selectedBlog.category || 'Cybersecurity'}
                                            </span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-600">
                                                By {selectedBlog.author || 'Cyber Whisper Team'}
                                            </span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-600">
                                                {selectedBlog.date ? new Date(selectedBlog.date).toLocaleDateString() : 'Recent'}
                                            </span>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold text-[#1C0F2D] leading-tight">
                                            {selectedBlog.title}
                                        </h2>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#1C0F2D] prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-img:rounded-xl"
                                        dangerouslySetInnerHTML={{ __html: selectedBlog.content || selectedBlog.description }}
                                    />

                                    {/* Tags */}
                                    {selectedBlog.tags && (
                                        <div className="pt-8 border-t border-gray-100">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedBlog.tags.split(',').map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-default"
                                                    >
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Decorative background elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        </div>
    )
}
