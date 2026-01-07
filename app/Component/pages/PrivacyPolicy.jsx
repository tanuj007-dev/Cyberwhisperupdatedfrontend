"use client"
import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'collection', title: '2. Information We Collect' },
    { id: 'usage', title: '3. How We Use Data' },
    { id: 'security', title: '4. Data Security' },
    { id: 'rights', title: '5. Your Privacy Rights' },
    { id: 'cookies', title: '6. Cookie Policy' }
];

export default function PrivacyPolicy() {
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
                        <Lock className="w-5 h-5 text-[#6b46e5]" />
                        <span className="text-sm font-bold text-[#6b46e5] uppercase tracking-wider">Your Data, Protected</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] mb-6">Privacy Policy</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        At Cyber Whisper, your privacy is our top priority. We are committed to being
                        transparent about how we collect, use, and safeguard your personal information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Table of Contents */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4 p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-xl shadow-purple-200/20">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-[#6b46e5]" />
                                <h3 className="text-xl font-bold text-[#1a1a2e]">Policy Sections</h3>
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
                                <Lock className="w-8 h-8 mb-4 text-purple-400" />
                                <h4 className="font-bold mb-2">Privacy Questions?</h4>
                                <p className="text-sm text-purple-200/80 mb-4">Our Data Protection Officer is here to help with your concerns.</p>
                                <button className="w-full py-2.5 bg-white text-[#1a0b2e] rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors">
                                    Email Privacy Team
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
                                    Welcome to Cyber Whisper. This Privacy Policy describes how we collect, use, process, and
                                    disclose your information, including personal information, in conjunction with your
                                    access to and use of the Cyber Whisper website and training platforms.
                                </p>
                                <p>
                                    As a cyber security organization, we understand the critical nature of data protection.
                                    We implement industry-standard encryption and security protocols to ensure that
                                    your digital footprint remains confidential and secure within our ecosystem.
                                </p>
                                <p>
                                    By using our services, you consent to the data practices described in this policy.
                                    We periodically update this policy and will notify users of any significant changes.
                                </p>
                            </div>
                        </div>

                        <div id="collection" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Information We Collect
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <p>We collect information that you provide directly to us, including:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Account information (Name, Email, Professional background).',
                                        'Payment information processed through secure third-party gateways.',
                                        'Course progress, lab performance metrics, and quiz results.',
                                        'Communications sent to our specialized support teams.'
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 bg-white border border-purple-50 rounded-2xl flex items-start gap-3 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" />
                                            <span className="font-medium text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div id="usage" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                How We Use Data
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Your information allows us to provide a personalized learning experience. Specifically, we use it to:</p>
                                <div className="space-y-4">
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">1</div>
                                        <p>Deliver the training programs, lab access, and certifications you have enrolled in.</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">2</div>
                                        <p>Monitor platform security and prevent credential sharing or unauthorized access.</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-8 h-8 rounded-full bg-[#6b46e5] text-white flex items-center justify-center font-bold shrink-0">3</div>
                                        <p>Improve our curriculum based on aggregated, anonymous performance data.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="security" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Data Security
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    We employ "Defense in Depth" strategies to protect your data. All sensitive communications
                                    are encrypted using SSL/TLS 1.3. We perform regular vulnerability scans and
                                    penetration tests on our own infrastructure.
                                </p>
                                <p>
                                    Access to personal data is strictly limited to authorized employees who require
                                    the information to perform their roles. We use multi-factor authentication (MFA)
                                    for all administrative access.
                                </p>
                            </div>
                        </div>

                        <div id="rights" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Your Privacy Rights
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    Depending on your location, you may have specific rights regarding your personal data:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Access:</strong> The right to request copies of your personal data.</li>
                                    <li><strong>Correction:</strong> The right to request that we correct any inaccurate information.</li>
                                    <li><strong>Erasure:</strong> The right to request that we erase your personal data under certain conditions.</li>
                                    <li><strong>Portability:</strong> The right to request that we transfer your data to another organization.</li>
                                </ul>
                            </div>
                        </div>

                        <div id="cookies" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Cookie Policy
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    We use cookies to enhance navigation, analyze site usage, and assist in our
                                    marketing efforts. Functional cookies are essential for our lab environments
                                    to maintain your state and progress.
                                </p>
                                <p>
                                    You can control cookie settings in your browser, but disabling essential
                                    cookies may result in the inability to access certain features of our
                                    training platforms.
                                </p>
                                <div className="mt-8 p-10 bg-[#f8fafc] rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                    <p className="font-bold text-[#1a1a2e] mb-2 uppercase tracking-widest text-sm">Policy Version</p>
                                    <p className="text-[#6b46e5] font-black text-2xl">v4.2 - UPDATED DEC 2025</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
