"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Reusing the same image assets
import img1 from './assets/cyber_lab_1.png'
import img2 from './assets/cyber_lab_2.png'
import img3 from './assets/cyber_lab_3.png'

const LATEST_ARTICLES = [
    {
        title: "Understanding Cyber Threats in 2025",
        image: img1,
        slug: "top-10-cybersecurity-threats-2025",
        date: "Jan 03, 2026"
    },
    {
        title: "Ransomware Prevention Strategies",
        image: img2,
        slug: "ransomware-attack-strategies",
        date: "Dec 28, 2025"
    },
    {
        title: "Cloud Security Best Practices",
        image: img3,
        slug: "cloud-security-best-practices",
        date: "Dec 20, 2025"
    }
]

export default function BlogSidebar() {
    return (
        <aside className="w-full lg:w-80 space-y-8 sticky top-32 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-[#1C0F2D] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6B46E5] mt-2.5 shrink-0" />
                    Latest Articles
                </h3>

                <div className="space-y-6">
                    {LATEST_ARTICLES.map((article, idx) => (
                        <Link
                            key={idx}
                            href={`/blog/${article.slug}`}
                            className="group flex gap-4 items-start"
                        >
                            <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-100">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1C0F2D] group-hover:text-[#6B46E5] transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                </h4>
                                <p className="text-xs text-slate-400 font-medium">
                                    {article.date}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories or Newsletter could go here */}
            <div className="bg-[#1C0F2D] rounded-2xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-bold">Secure Your Business</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Get the latest security updates and threat alerts directly in your inbox.
                    </p>
                    <button className="w-full py-3 bg-[#6B46E5] hover:bg-[#5A3AC7] text-white rounded-xl font-bold transition-all">
                        Subscribe Now
                    </button>
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#6B46E5]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
        </aside>
    )
}
