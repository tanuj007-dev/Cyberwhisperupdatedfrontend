"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import BlogSidebar from '../../Component/BlogSidebar'
import { FaFacebook, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { FaQuoteLeft } from 'react-icons/fa'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { API_BASE_URL } from '@/lib/apiConfig'

function SocialShareLinks({ blog }) {
    const [pageUrl, setPageUrl] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') setPageUrl(window.location.href)
    }, [])
    const encodedUrl = encodeURIComponent(pageUrl)
    const links = [
        { Icon: FaFacebook, url: (blog?.facebook_url && blog.facebook_url.trim()) || `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
        { Icon: FaLinkedin, url: (blog?.linkedin_url && blog.linkedin_url.trim()) || `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { Icon: FaXTwitter, url: (blog?.twitter_url && blog.twitter_url.trim()) || `https://twitter.com/intent/tweet?url=${encodedUrl}` },
        { Icon: FaInstagram, url: (blog?.instagram_url && blog.instagram_url.trim()) || '#' }
    ]
    return (
        <>
            {links.map(({ Icon, url }, idx) => (
                <a
                    key={idx}
                    href={url}
                    target={url === '#' ? undefined : '_blank'}
                    rel={url === '#' ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-lg bg-[#F4F7FF] text-[#1C2D5A] flex items-center justify-center hover:bg-[#6B46E5] hover:text-white transition-all transform hover:-translate-y-1"
                >
                    <Icon size={18} />
                </a>
            ))}
        </>
    )
}

export default function BlogPostDetail({ params }) {
    // Unwrap the params Promise (Next.js 15+)
    const { slug } = use(params)

    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchBlogBySlug()
    }, [slug])

    const fetchBlogBySlug = async () => {
        try {
            setLoading(true)
            const apiUrl = `${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}`
            console.log('Fetching blog from API:', apiUrl)

            const response = await fetch(apiUrl, { headers: { 'Content-Type': 'application/json' } })

            if (!response.ok) {
                throw new Error(`Failed to fetch blog: ${response.statusText}`)
            }

            const result = await response.json()
            console.log('Blog API response:', result)

            const blogData = result.data ?? result.blog ?? result.post ?? result
            if (blogData && (blogData.id || blogData.slug || blogData.title)) {
                setBlog(blogData)
            } else {
                console.error('Invalid blog data format:', result)
                throw new Error('Invalid blog data format')
            }
        } catch (err) {
            console.error('Error fetching blog:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBFAFF] pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading blog post...</p>
                </div>
            </div>
        )
    }

    // Error State
    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#FBFAFF] pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                        <p className="text-gray-600 mb-8">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FBFAFF] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        {/* Featured Image */}
                        {(blog.image || blog.banner_url || blog.thumbnail_url) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
                            >
                                <Image
                                    src={blog.image || blog.banner_url || blog.thumbnail_url}
                                    alt={blog.title || 'Blog image'}
                                    fill
                                    className="object-cover"
                                    priority
                                    onError={(e) => {
                                        console.error('Image failed to load:', blog.image);
                                        // Hide the image and show a placeholder
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-200 text-gray-500">Image not available</div>';
                                        }
                                    }}
                                    unoptimized={(blog.image || blog.banner_url || blog.thumbnail_url).includes('cloudinary')}
                                />
                            </motion.div>
                        )}

                        {/* Article Content */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-8">
                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-[#1C0F2D] leading-tight">
                                {blog.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-slate-100">
                                {blog.author && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">By {blog.author}</span>
                                    </div>
                                )}
                                {(blog.date || blog.created_at) && (
                                    <div className="flex items-center gap-2">
                                        <span>•</span>
                                        <span>{new Date(blog.date || blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                )}
                                {blog.category && (
                                    <div className="flex items-center gap-2">
                                        <span>•</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                            {blog.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Blog Content */}
                            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                                {blog.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                ) : (
                                    <p>{blog.description || blog.excerpt || 'No content available for this blog post.'}</p>
                                )}
                            </div>

                            {/* Tags and Socials */}
                            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                {/* Tags */}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex gap-3 items-center flex-wrap">
                                        <span className="text-sm font-bold text-[#1C0F2D]">Tags:</span>
                                        {blog.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar />
                </div>
            </div>
        </div>
    )
}
