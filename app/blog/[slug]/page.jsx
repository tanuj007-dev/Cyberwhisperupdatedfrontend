"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import BlogSidebar from '../../Component/BlogSidebar'
import { FaQuoteLeft } from 'react-icons/fa'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { API_BASE_URL } from '@/lib/apiConfig'

// Normalize heading tags to lowercase so h1–h6 always render with blog-post-body styles
function normalizeContentHeadings(html) {
    if (typeof html !== 'string') return html || ''
    return html.replace(/<\/?([Hh][1-6])>/g, (m) => m.toLowerCase())
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

            let blogData = result.data ?? result.blog ?? result.post ?? result
            if (blogData && (blogData.id || blogData.slug || blogData.title)) {
                // Map author from author_first_name + author_last_name if backend sends those
                const first = blogData.author_first_name ?? blogData.authorFirstName ?? ''
                const last = blogData.author_last_name ?? blogData.authorLastName ?? ''
                const authorFromNames = [first, last].filter(Boolean).join(' ').trim()
                if (authorFromNames && !blogData.author) {
                    blogData = { ...blogData, author: authorFromNames }
                }
                // Map social handle URLs from API (backend uses facebook_handle_url, linkedin_handle_url, etc.)
                const social = {
                    facebook_url: blogData.facebook_url ?? blogData.Facebook_handle_url ?? blogData.facebook_handle_url ?? null,
                    linkedin_url: blogData.linkedin_url ?? blogData.linkedin_handle_url ?? null,
                    twitter_url: blogData.twitter_url ?? blogData.x_handle_url ?? null,
                    instagram_url: blogData.instagram_url ?? blogData.Instagram_handle_url ?? blogData.instagram_handle_url ?? null
                }
                const tagsArray = Array.isArray(blogData.tags) ? blogData.tags : (blogData.keywords ? String(blogData.keywords).split(',').map(k => k.trim()).filter(Boolean) : [])
                setBlog({ ...blogData, ...social, tags: tagsArray })
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
                        <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-4">Blog Post Not Found</h1>
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
                        {/* Featured Image — only render when we have a real URL (do not show if deleted/cleared) */}
                        {(() => {
                            const imgUrl = (blog.image || blog.banner_url || blog.thumbnail_url || '').trim();
                            return imgUrl && imgUrl !== 'null' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
                            >
                                <Image
                                    src={imgUrl}
                                    alt={blog.title || 'Blog image'}
                                    fill
                                    className="object-cover"
                                    priority
                                    onError={(e) => {
                                        console.error('Image failed to load:', imgUrl);
                                        // Hide the image and show a placeholder
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-200 text-gray-500">Image not available</div>';
                                        }
                                    }}
                                    unoptimized={imgUrl.includes('cloudinary')}
                                />
                            </motion.div>
                            ) : null;
                        })()}

                        {/* Article Content */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-8">
                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-[#1C0F2D]">
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

                            {/* Blog Content - headings, paragraphs, lists, etc. from editor reflected here */}
                            <div
                                className="blog-post-body text-slate-600 space-y-6
                                    [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-bold [&_h1]:text-[#1C0F2D] [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight
                                    [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-semibold [&_h2]:text-[#1C0F2D] [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:leading-snug
                                    [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:leading-snug
                                    [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2
                                    [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-gray-800 [&_h5]:mt-4 [&_h5]:mb-2
                                    [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:text-gray-700 [&_h6]:mt-3 [&_h6]:mb-1 [&_h6]:uppercase
                                    [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-slate-600
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1
                                    [&_li]:my-0.5 [&_li]:leading-relaxed
                                    [&_blockquote]:border-l-4 [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:bg-violet-50/50 [&_blockquote]:rounded-r-lg
                                    [&_a]:text-violet-600 [&_a]:underline [&_a]:font-medium [&_a]:decoration-violet-500 [&_a:hover]:text-violet-800 [&_a:hover]:decoration-violet-700
                                    [&_code]:bg-violet-100 [&_code]:text-violet-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                                    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-4 [&_img]:shadow-md
                                    [&_iframe]:max-w-full [&_iframe]:rounded-lg [&_iframe]:my-4
                                    [&_.video-embed-wrapper]:my-4 [&_.video-embed-wrapper_iframe]:aspect-video [&_.video-embed-wrapper_iframe]:w-full"
                            >
                                {blog.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: normalizeContentHeadings(blog.content) }} />
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
