"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const faqs = [
    "Which course is best ethical hacking or cyber security?",
    "Is this course aligned with CEH or other certifications?",
    "How much does a CEH exam cost?",
    "Is ethical hacking legal?",
    "Which hacker has the highest salary?",
    "Can I work as a freelancer or bug bounty hunter after.."
]

export default function NeedHelp() {
    return (
        <section className="w-full bg-white py-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-[15px]    text-black  font-bold">
                            Ask & Learn
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-[42px] font-semibold text-[#1a1a2e] tracking-tight">
                        Need Help? Start Here First
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
                        Find answers to the most common questions about our cybersecurity courses
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group flex items-center gap-4 p-6 bg-[#F9F8FF] border border-[#7B2CFF] rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer"
                        >
                            <div className="shrink-0 bg-[#D6BDFF78] rounded-full  text-[#7B2CFF] group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={24} className="opacity-60" />
                            </div>
                            <span className="text-[#1a1a2e]  text-[15px] md:text-base leading-snug">
                                {faq}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button className="group flex items-center gap-3 bg-[#310E3F] text-white px-8 md:px-10 py-3 md:py-3 rounded-full font-bold text-base md:text-lg hover:bg-[#6B46E5] transition-all hover:shadow-2xl active:scale-95">
                        View All
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[#310E3F]" />
                        </div>
                    </button>
                </div>

            </div>
        </section>
    )
}
