"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { API_BASE_URL } from '@/lib/apiConfig'

export default function BlogSidebar() {
    const [latestArticles, setLatestArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLatestArticles()
    }, [])

    const fetchLatestArticles = async () => {
        try {
            setLoading(true)
            const baseUrl = (API_BASE_URL || '').replace(/\/$/, '')

            // Fetch from hosting API
            const apiUrl = `${baseUrl}/api/blogs/list?page=1&limit=5`
            console.log('Fetching latest articles for sidebar:', apiUrl)

            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`Failed to fetch articles: ${response.statusText}`)
            }

            const result = await response.json()
            console.log('Sidebar articles API response:', result)

            // Handle API response structure; only show published/active on frontend
            const isPublished = (p) => ['PUBLISHED', 'ACTIVE'].includes(String(p.status || '').toUpperCase().replace(/\s/g, ''))
            let articles = []
            if (result.success && result.data) {
                articles = Array.isArray(result.data) ? result.data : [result.data]
            } else if (Array.isArray(result)) {
                articles = result
            }
            articles = articles.filter(isPublished)
            setLatestArticles(articles.slice(0, 5)) // Ensure max 3 articles
        } catch (err) {
            console.error('Error fetching latest articles:', err)
            // Keep empty array on error
            setLatestArticles([])
        } finally {
            setLoading(false)
        }
    }

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'Recent'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    }

    return (
        <aside className="w-full lg:w-80 space-y-8 sticky top-32 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-[#1C0F2D] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6B46E5] mt-2.5 shrink-0" />
                    Latest Articles
                </h3>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                    </div>
                )}

                {/* Articles List */}
                {!loading && latestArticles.length > 0 && (
                    <div className="space-y-6">
                        {latestArticles.map((article, idx) => (
                            <Link
                                key={article.id || idx}
                                href={`/blog/${article.id ?? article.slug ?? article.blog_id ?? ''}`}
                                className="group flex gap-4 items-start"
                            >
                                {/* Article Image - support backend shape (thumbnail_url/banner_url) or mapped (image) */}
                                {(article.image || article.thumbnail_url || article.banner_url) && String(article.image || article.thumbnail_url || article.banner_url).trim() && (
                                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={article.image || article.thumbnail_url || article.banner_url}
                                            alt={article.title || 'Article'}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                {/* Article Info */}
                                <div className="space-y-1 flex-1">
                                    <h4 className="text-sm font-bold text-[#1C0F2D] group-hover:text-[#6B46E5] transition-colors line-clamp-2 leading-snug">
                                        {article.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {formatDate(article.date || article.created_at)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && latestArticles.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-500">No articles available yet.</p>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
        
        </aside>
    )
}
