"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import BlogSidebar from '../../Component/BlogSidebar'
import { FaFacebook, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { FaQuoteLeft } from 'react-icons/fa'

// Assets
import featuredImg from '../../Component/assets/cyber_lab_1.webp'

export default function BlogPostDetail({ params }) {
    // In a real app, you'd fetch based on params.slug
    return (
        <div className="min-h-screen bg-[#FBFAFF] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={featuredImg}
                                alt="Cybersecurity Trends"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Article Content */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-8">
                            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                                <p>
                                    Cybersecurity is constantly evolving. Explore the key trends and technologies set to shape the security landscape in 2025 and beyond. Whether you're a business owner or an IT professional, understanding these trends is crucial for maintaining robust defenses against ever-growing cyber threats. Cybersecurity is constantly evolving. Explore the key trends and technologies set to shape the security landscape in 2025 and beyond.
                                </p>

                                <p>
                                    By keeping an eye on these trends and integrating them into your cybersecurity strategies, you can stay one step ahead of cybercriminals and better your business in an increasingly interconnected world. Explore the key trends and technologies set to shape the security landscape in 2025 and beyond. From AI-driven defense systems to blockchain security, here's what you need to watch.
                                </p>

                                {/* Blue Blockquote */}
                                <div className="bg-[#F4F7FF] border-l-4 border-[#6B46E5] p-8 rounded-2xl relative">
                                    <FaQuoteLeft className="text-4xl text-[#6B46E5]/10 absolute top-4 left-4" />
                                    <p className="text-[#1C0F2D] font-bold text-xl leading-relaxed relative z-10 italic">
                                        Stay ahead of evolving threats. Contact our team of cybersecurity experts today to learn how we can help you implement the latest security technologies and protect your business in 2025 and beyond.
                                    </p>
                                </div>

                                <p>
                                    The cybersecurity landscape is evolving quickly, and businesses must stay proactive in adopting new technologies and strategies to combat emerging threats. From AI and machine learning to Zero Trust security and blockchain, the trends of 2025 will shape how we defend against cyber attacks and ensure the safety of our digital assets.
                                </p>

                                <h2 className="text-3xl font-extrabold text-[#1C0F2D] pt-4">Securing Your Future with Cyber Security</h2>

                                <p>
                                    In today's fast-paced digital world, cybersecurity is no longer optional—it's a necessity. "Securing Your Future with Cyber" is more than just a slogan; it's a commitment to building a resilient infrastructure that protects your business and personal data from evolving cyber threats.
                                </p>

                                {/* Bullet Points */}
                                <ul className="space-y-4 list-none pl-0">
                                    {[
                                        "Proactively identify and neutralize potential threats with AI-powered tools",
                                        "Safeguard your sensitive data with state-of-the-art encryption and secure",
                                        "Minimize downtime and disruptions by implementing strong disaster recovery plans",
                                        "Build a secure infrastructure that grows with your business, providing flexible cybersecurity",
                                        "Rely on a team of cybersecurity professionals to provide ongoing support, risk assessments, and strategies"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="w-2 h-2 rounded-full bg-[#6B46E5] mt-2.5 shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="border-t border-slate-100 pt-8 italic text-sm">
                                    Securing Your Future with Cyber is more than a slogan—it's a commitment to protecting your data and building resilience against evolving threats. With advanced cybersecurity strategies, you safeguard trust, reputation, and sustainable growth.
                                </p>
                            </div>

                            {/* Tags and Socials */}
                            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex gap-3 items-center flex-wrap">
                                    <span className="text-sm font-bold text-[#1C0F2D]">Tags:</span>
                                    {['SafeBusiness', 'ThreatFree', 'SecureTech'].map(tag => (
                                        <span
                                            key={tag}
                                            className={`px-4 py-1.5 rounded-lg text-white font-bold text-xs uppercase ${tag === 'SafeBusiness' ? 'bg-[#1C2D5A]' :
                                                tag === 'ThreatFree' ? 'bg-[#1C3E8A]' : 'bg-[#4880FF]'
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 items-center">
                                    {[FaFacebook, FaLinkedin, FaInstagram, FaXTwitter].map((Icon, idx) => (
                                        <button
                                            key={idx}
                                            className="w-10 h-10 rounded-lg bg-[#F4F7FF] text-[#1C2D5A] flex items-center justify-center hover:bg-[#6B46E5] hover:text-white transition-all transform hover:-translate-y-1"
                                        >
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
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
