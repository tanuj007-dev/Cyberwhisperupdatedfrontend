"use client"
import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'eligibility', title: '2. Eligibility for Refund' },
    { id: 'process', title: '3. Refund Process' },
    { id: 'non-refundable', title: '4. Non-Refundable Items' },
    { id: 'cancellation', title: '5. Cancellation Policy' },
    { id: 'dispute', title: '6. Dispute Resolution' }
];

export default function RefundPolicy() {
    const [activeSection, setActiveSection] = useState('introduction');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="min-h-screen bg-[#fcfaff] py-20 px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Area */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                        <ShieldCheck className="w-5 h-5 text-[#6b46e5]" />
                        <span className="text-sm font-bold text-[#6b46e5] uppercase tracking-wider">Transparency First</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] mb-6">Refund & Cancellation Policy</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        At Cyber Whisper, we believe in long-term relationships based on trust.
                        Our refund policy is designed to be fair, clear, and transparent.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Table of Contents */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4 p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-xl shadow-purple-200/20">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-[#6b46e5]" />
                                <h3 className="text-xl font-bold text-[#1a1a2e]">Table of Contents</h3>
                            </div>
                            <div className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold transition-all duration-300 flex items-center justify-between group ${activeSection === section.id
                                            ? 'bg-[#6b46e5] text-white'
                                            : 'text-gray-500 hover:bg-purple-50 hover:text-[#6b46e5]'
                                            }`}
                                    >
                                        {section.title}
                                        <ArrowRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`} />
                                    </button>
                                ))}
                            </div>

                            {/* Help Box */}
                            <div className="mt-10 p-6 bg-gradient-to-br from-[#1a0b2e] to-[#2d124d] rounded-2xl text-white">
                                <HelpCircle className="w-8 h-8 mb-4 text-purple-400" />
                                <h4 className="font-bold mb-2">Need Help?</h4>
                                <p className="text-sm text-purple-200/80 mb-4">Contact our support team for any clarification regarding policies.</p>
                                <button className="w-full py-2.5 bg-white text-[#1a0b2e] rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content Sections */}
                    <div className="lg:col-span-8 space-y-24 pb-20">

                        <div id="introduction" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Introduction
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    Welcome to Cyber Whisper. We value your commitment to enhancing your cyber security skills.
                                    This Refund & Cancellation Policy outlines the circumstances under which we issue refunds for
                                    our courses, workshops, and consulting services.
                                </p>
                                <p>
                                    Our goal is to ensure that our learners and clients have a seamless experience. We invest
                                    significant resources into preparing our high-quality training materials, lab environments,
                                    and instructor schedules. Therefore, we maintain a structured policy to protect both our
                                    commitment to quality and your investment.
                                </p>
                                <p>
                                    By enrolling in any of our programs, you agree to the terms laid out in this document.
                                    We encourage you to read this policy thoroughly before making a purchase.
                                </p>
                            </div>
                        </div>

                        <div id="eligibility" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Eligibility for Refund
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Technical issues preventing course access that cannot be resolved.',
                                        'Accidental double payments for the same session.',
                                        'Requests made within 48 hours of original purchase (Pre-course start).',
                                        'Course cancellation by Cyber Whisper due to unplanned events.'
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 bg-white border border-purple-50 rounded-2xl flex items-start gap-3 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p>
                                    Refund requests are prioritized based on the date of submission and the specific details
                                    provided. We aim to review all eligibility claims within 3-5 business days. Please note
                                    that "change of mind" after accessing course materials does not typically qualify for a
                                    full refund.
                                </p>
                            </div>
                        </div>

                        <div id="process" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Refund Process
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="space-y-4">
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">1</div>
                                        <p>Submit a formal refund request via our Support Portal with your transaction ID.</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">2</div>
                                        <p>Our finance team will verify the eligibility and calculate any applicable processing fees or deductions.</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">3</div>
                                        <p>Once approved, the refund will be initiated to your original payment method (Bank account, Card, or Wallet).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="non-refundable" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Non-Refundable Items
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    Certain expenses incurred by Cyber Whisper are immediate and final upon registration.
                                    These include but are not limited to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Pre-activated cloud lab environment credits.</li>
                                    <li>Physical study materials or kits already dispatched.</li>
                                    <li>Third-party examination vouchers or certification fees.</li>
                                    <li>Administrative processing fees (non-refundable transaction costs).</li>
                                </ul>
                            </div>
                        </div>

                        <div id="cancellation" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Cancellation Policy
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    For live workshops and physical bootcamps, cancellations made more than 7 days
                                    prior to the event will receive a 75% refund.
                                </p>
                                <p>
                                    Cancellations within 3-7 days of the event are eligible for a 50% refund or a
                                    full credit for a future session.
                                </p>
                            </div>
                        </div>

                        <div id="dispute" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Dispute Resolution
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    We strive for complete satisfaction. In case of any disagreement, contact our senior support manager directly.
                                </p>
                                <div className="mt-8 p-10 bg-[#f8fafc] rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                    <p className="font-bold text-[#1a1a2e] mb-2 uppercase tracking-widest text-sm">Last Updated</p>
                                    <p className="text-[#6b46e5] font-black text-2xl">DECEMBER 2025</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
