"use client"
import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight, HelpCircle, FileText, CheckCircle2, AlertTriangle, Clock, CreditCard, Mail, Phone, MapPin } from 'lucide-react';

const sections = [
    { id: 'definitions', title: '1. Definitions' },
    { id: 'quick-summary', title: '2. Quick Summary' },
    { id: 'courses', title: '3. Courses & Certification' },
    { id: 'labs', title: '4. Labs & CTF' },
    { id: 'workshops', title: '5. Workshops & Webinars' },
    { id: 'corporate', title: '6. Corporate & Consulting' },
    { id: 'non-refundable', title: '7. Non-Refundable Items' },
    { id: 'request-refund', title: '8. How to Request' },
    { id: 'timelines', title: '9. Processing Timelines' },
    { id: 'disputes', title: '10. Disputes' },
    { id: 'updates', title: '11. Policy Updates' },
    { id: 'contact', title: '12. Contact' }
];

export default function RefundPolicy() {
    const [activeSection, setActiveSection] = useState('definitions');

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
                        <span className="text-sm font-bold text-[#6b46e5] uppercase tracking-wider">Transparent & Fair</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-[#1a1a2e] mb-6">Refund & Cancellation Policy</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        This policy explains when refunds, cancellations, transfers, or credits may apply to Cyber Whisper trainings, workshops, cyber range/lab access, subscriptions, and professional services.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Table of Contents */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4 p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-xl shadow-purple-200/20 max-h-[80vh] overflow-y-auto scrollbar-hide">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-[#6b46e5]" />
                                <h3 className="text-xl font-bold text-[#1a1a2e]">Table of Contents</h3>
                            </div>
                            <div className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-between group ${activeSection === section.id
                                            ? 'bg-[#6b46e5] text-white'
                                            : 'text-gray-500 hover:bg-purple-50 hover:text-[#6b46e5]'
                                            }`}
                                    >
                                        <span className='truncate'>{section.title}</span>
                                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${activeSection === section.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`} />
                                    </button>
                                ))}
                            </div>

                            {/* Help Box */}
                            <div className="mt-10 p-6 bg-gradient-to-br from-[#1a0b2e] to-[#2d124d] rounded-2xl text-white">
                                <HelpCircle className="w-8 h-8 mb-4 text-purple-400" />
                                <h4 className="font-bold mb-2">Need Help?</h4>
                                <p className="text-sm text-purple-200/80 mb-4">Contact our support team for any clarification regarding policies.</p>
                                <button onClick={() => scrollToSection('contact')} className="w-full py-2.5 bg-white text-[#1a0b2e] rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content Sections */}
                    <div className="lg:col-span-8 space-y-24 pb-20">

                        {/* 1. Definitions */}
                        <div id="definitions" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                1. Definitions
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <ul className="space-y-3">
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Course/Training” means instructor-led or self-paced learning programs, including certification preparation.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Workshop/Bootcamp” means time-bound live sessions (online or on-site).</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Cyber Range/Labs” means hands-on environments, CTFs, virtual machines, cloud resources, and lab credits.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Seat” means a reserved enrolment for a specific batch/date.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Services” means consulting, SOC support, VAPT, deployment, or other professional engagements.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>“Third‑Party Fees” means payment gateway charges, exam vouchers, cloud usage billed by providers, or partner costs.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* 2. Quick Summary */}
                        <div id="quick-summary" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                2. Quick Summary
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" /><span>A small “cooling‑off” refund may be considered only before the batch starts and before meaningful access/usage of content or labs.</span></li>
                                        <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" /><span>Once a course/workshop starts, or cyber range/labs are activated, refunds are generally not available. We offer reschedule/credit options instead.</span></li>
                                        <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" /><span>Third‑party fees, reserved capacity, and consumed lab credits are non‑refundable.</span></li>
                                        <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" /><span>Corporate/enterprise engagements follow signed commercial terms; booking advances and delivered work are non‑refundable.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 3. Courses & Certification */}
                        <div id="courses" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                3. Courses & Certification Trainings
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <p>Refund eligibility depends on timing and access/usage:</p>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">3.1 Before the batch starts</h3>
                                    <ul className="space-y-2 list-disc pl-5 marker:text-[#6b46e5]">
                                        <li>Refund request within 24 hours of purchase AND at least 24 hours before the first scheduled session: refund may be approved after deducting non‑refundable Third‑Party Fees and payment gateway charges.</li>
                                        <li>If the batch starts within 24 hours of purchase, we may offer a transfer to the next available batch instead of a refund.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">3.2 After the batch starts</h3>
                                    <ul className="space-y-2 list-disc pl-5 marker:text-[#6b46e5]">
                                        <li>No cash refunds once the first session has started or access has been granted to premium course content/materials beyond a basic preview.</li>
                                        <li>You may request a one‑time batch transfer (subject to seat availability) within the first 7 days of the batch start. Transfers may carry an administrative fee.</li>
                                        <li>Missed classes, partial attendance, or scheduling conflicts do not qualify for refunds.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 4. Cyber Range */}
                        <div id="labs" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                4. Cyber Range / Hands‑on Labs / CTF
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <ul className="space-y-3">
                                    <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" /><span>Because labs consume compute/cloud resources and are provisioned per user, subscriptions and lab activations are non‑refundable once started.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>If you have not activated the range/labs and request cancellation within 48 hours of purchase, we may approve a refund after deducting non‑refundable Third‑Party Fees.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>Credits (not cash refunds) may be offered for verified platform outages that materially prevent access for an extended period.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* 5. Workshops */}
                        <div id="workshops" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                5. Workshops, Webinars & On‑site Programs
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <ul className="space-y-3 list-disc pl-5 marker:text-[#6b46e5]">
                                    <li><strong>Cancellations 2+ days before:</strong> eligible for a refund after deducting Third‑Party Fees and administrative charges, OR a full credit for a future event.</li>
                                    <li><strong>Cancellations 0–2 days before:</strong> credit only (no cash refund).</li>
                                    <li><strong>Cancellations within 0–2 days/no-shows:</strong> no refund/credit.</li>
                                    <li>For on‑site deliveries, travel, accommodation, venue, and logistics costs are non‑refundable once incurred.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 6. Corporate */}
                        <div id="corporate" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                6. Corporate Training & Consulting
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <ul className="space-y-3 list-disc pl-5 marker:text-[#6b46e5]">
                                    <li>Commercial terms in the signed proposal/SOW/contract will apply.</li>
                                    <li>If no written terms exist, a booking/retainer (typically 10–20%) is treated as non‑refundable to cover scheduling and reserved capacity.</li>
                                    <li>Fees for delivered work, completed milestones, consumed hours, and incurred costs are non‑refundable.</li>
                                    <li>If a client postpones after scheduling, we may offer rescheduling subject to availability; additional costs may apply.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 7. Non-Refundable Items */}
                        <div id="non-refundable" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                7. Non‑Refundable Items (Always)
                            </h2>
                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Payment gateway / bank charges, currency conversion fees.</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Exam vouchers, third‑party tools/licenses, cloud credits once reserved.</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Digital content once downloaded or accessed.</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Any lab/range/CTF access once provisioned.</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Custom curriculum development & bespoke labs.</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Taxes (e.g., GST) as per invoice and tax rules.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 8. How to Request */}
                        <div id="request-refund" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                8. How to Request a Cancellation/Refund
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#6b46e5]/10 text-[#6b46e5] flex items-center justify-center font-bold shrink-0 text-sm">1</div>
                                    <p>Email support with your order/transaction ID, program name, and the reason for the request.</p>
                                </div>
                                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#6b46e5]/10 text-[#6b46e5] flex items-center justify-center font-bold shrink-0 text-sm">2</div>
                                    <p>We may ask for verification details to prevent fraud and to confirm account usage (lab activation, content access, attendance).</p>
                                </div>
                                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#6b46e5]/10 text-[#6b46e5] flex items-center justify-center font-bold shrink-0 text-sm">3</div>
                                    <p>If approved, refunds are processed to the original payment method where possible.</p>
                                </div>
                            </div>
                        </div>

                        {/* 9. Timelines */}
                        <div id="timelines" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                9. Refund Processing Timelines
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-[#6b46e5]" />
                                    <div>
                                        <div className="font-bold text-[#2d124d]">Review/Decision</div>
                                        <div className="text-sm text-gray-500">Typically within 10–15 business days</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-center gap-3">
                                    <CreditCard className="w-6 h-6 text-[#6b46e5]" />
                                    <div>
                                        <div className="font-bold text-[#2d124d]">Refund Initiation</div>
                                        <div className="text-sm text-gray-500">Typically within 10–20 business days</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 italic">Refund amounts, where applicable, are net of non‑refundable fees and any value already consumed.</p>
                        </div>

                        {/* 10. Disputes */}
                        <div id="disputes" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                10. Disputes & Chargebacks
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Please contact us first so we can resolve issues quickly. If a chargeback/dispute is filed, we may suspend related access while the dispute is investigated. We will share relevant logs/records with the payment provider to validate service delivery and usage.</p>
                            </div>
                        </div>

                        {/* 11. Policy Updates */}
                        <div id="updates" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                11. Policy Updates
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We may update this policy from time to time. The latest version will be available on our website. Continued use of our services after an update constitutes acceptance of the revised policy.</p>
                            </div>
                        </div>

                        {/* 12. Contact */}
                        <div id="contact" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                12. Contact
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                                        <Mail className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Email Us</h4>
                                        <a href="mailto:connect@cyberwhisper.tech" className="text-gray-600 hover:text-[#6b46e5] transition-colors">connect@cyberwhisper.tech</a>
                                    </div>

                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                                        <Phone className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Call Us</h4>
                                        <a href="tel:+919220946887" className="text-gray-600 hover:text-[#6b46e5] transition-colors">+91 92209 46887</a>
                                    </div>

                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all md:col-span-2">
                                        <MapPin className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Registered Address</h4>
                                        <p className="text-gray-600">62-A, 3rd Floor, Suraj Nagar, Model Town, Delhi - 110033, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
