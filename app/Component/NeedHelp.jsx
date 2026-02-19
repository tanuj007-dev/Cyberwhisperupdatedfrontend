"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageSquare, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'

const faqs = [
    {
        question: "Do you provide services on-site and remote?",
        answer: "Yes—delivery can be on-site, remote, or hybrid depending on scope."
    },
    {
        question: "Can we start with a pilot before a full engagement?",
        answer: "Yes—many clients begin with a small assessment or cyber range pilot and then scale."
    },
    {
        question: "Do you customize cyber range scenarios for our environment?",
        answer: "Yes—scenarios can be aligned to your tools, log sources, and top risks."
    },
    {
        question: "What do you need from us to start?",
        answer: "A short scope call, point of contact, and access requirements. We share a clear onboarding checklist after the first call."
    }
]

export default function NeedHelp() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className="w-full bg-[#F9F8FF] dark:bg-[#1B0D37] py-12 md:py-24 px-4 overflow-hidden relative transition-colors duration-300">
            {/* Cyber Grid Background Effect - Adapted for both themes */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(107,70,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(107,70,229,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(123,44,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(123,44,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100 pointer-events-none"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <div className="w-5 h-5 bg-[#6b46e5] shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
                        <span className="text-[#0f172a] dark:text-white text-sm font-bold tracking-[0.2em] uppercase">Support & Ops</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
                        Need Help? <span className="text-transparent bg-clip-text bg-purple-600">Start Here First</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Clear answers to streamline your engagement. No ambiguity, just execution.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm
                                ${openIndex === idx
                                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-500/50 shadow-lg shadow-purple-500/5 dark:shadow-[0_0_20px_rgba(123,44,255,0.15)]'
                                    : 'bg-white/80 dark:bg-[#1E123599] border-gray-200 dark:border-white/5 hover:border-purple-400/50 dark:hover:border-purple-500/30 hover:bg-white dark:hover:bg-[#251A40]'
                                }
                            `}
                        >
                            {/* Card Glow Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="flex items-start gap-4">
                                <div className={`mt-1 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                                    ${openIndex === idx ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-purple-100 dark:bg-[#2A1F45] text-purple-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'}
                                `}>
                                    <HelpCircle className="w-4 h-4" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className={`font-semibold text-lg leading-snug transition-colors duration-300 ${openIndex === idx ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-100'}`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : 'rotate-0'}`}>
                                            {openIndex === idx ? <Minus className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <Plus className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400" />}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {openIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pt-3 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-[15px] border-t border-purple-100 dark:border-white/5 mt-4">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
