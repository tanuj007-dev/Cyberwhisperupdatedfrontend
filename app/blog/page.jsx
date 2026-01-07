"use client"
import React from 'react'
import BlogCard from '../Component/BlogCard'
import BlogSidebar from '../Component/BlogSidebar'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Import relevant assets
import img1 from '../Component/assets/cyber_lab_1.png'
import img2 from '../Component/assets/cyber_lab_2.png'
import img3 from '../Component/assets/cyber_lab_3.png'
import img4 from '../Component/assets/cyber_lab_4.png'
import img5 from '../Component/assets/card1.png'
import img6 from '../Component/assets/course-hero-img.png'

const BLOG_POSTS = [
    {
        id: 1,
        title: "Top 10 Cybersecurity Threats Every Business Must Watch Out for in 2025",
        image: img1,
        slug: "top-10-cybersecurity-threats-2025"
    },
    {
        id: 2,
        title: "Ransomware Attack Explain Preventin Response & Recovery Strategies",
        image: img2,
        slug: "ransomware-attack-strategies"
    },
    {
        id: 3,
        title: "Essential Security Tips to Protect Your Remote Workforce and Data",
        image: img3,
        slug: "remote-workforce-security"
    },
    {
        id: 4,
        title: "The Future of Cyber Threats Key Risks and Trends to Watch in 2025",
        image: img4,
        slug: "future-of-cyber-threats-2025"
    },
    {
        id: 5,
        title: "Why Employee Training Is the First Line of Defense Against Cyber Attack",
        image: img5,
        slug: "employee-training-defense"
    },
    {
        id: 6,
        title: "Cloud Security Best Practice Business Should Follow to Stay Protected",
        image: img6,
        slug: "cloud-security-best-practices"
    }
]

export default function BlogPage() {
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
                    Stay updated with the latest trends, tips, and insights in the world of cybersecurity.
                </motion.p>
            </section>

            {/* Blog Content with Sidebar */}
            <section className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Grid List */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {BLOG_POSTS.map((post) => (
                                <BlogCard key={post.id} {...post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex justify-center items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-[#6B46E5] transition-all"
                            >
                                <FiChevronLeft size={20} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1C0F2D] text-white shadow-lg font-bold"
                            >
                                1
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#6B46E5] hover:text-[#6B46E5] transition-all font-medium"
                            >
                                2
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#6B46E5] hover:text-[#6B46E5] transition-all font-medium"
                            >
                                3
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-[#6B46E5] transition-all"
                            >
                                <FiChevronRight size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar />
                </div>
            </section>

            {/* Decorative background elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        </div>
    )
}
