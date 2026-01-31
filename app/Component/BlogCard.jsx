"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GoArrowUpRight } from "react-icons/go"

export default function BlogCard({ image, title, slug, description, short_description }) {
    const displayDescription = description || short_description;
    const blogLink = `/blog/${slug || '#'}`;

    return (
        <Link href={blogLink} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-purple-100 flex flex-col h-full"
            >
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#1C0F2D] leading-tight group-hover:text-[#6B46E5] transition-colors duration-300 line-clamp-2 mb-3">
                        {title}
                    </h3>

                    {displayDescription && (
                        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                            {displayDescription}
                        </p>
                    )}

                    <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-[#6B46E5] transition-colors duration-300">
                            Read More
                            <GoArrowUpRight className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
