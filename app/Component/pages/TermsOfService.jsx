"use client"
import React, { useEffect, useState } from 'react';
import { Gavel, ArrowRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'services', title: '2. Description of Services' },
    { id: 'conduct', title: '3. User Conduct' },
    { id: 'intellectual', title: '4. Intellectual Property' },
    { id: 'liability', title: '5. Limitation of Liability' },
    { id: 'governing', title: '6. Governing Law' }
];

export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState('acceptance');

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
                        <Gavel className="w-5 h-5 text-[#6b46e5]" />
                        <span className="text-sm font-bold text-[#6b46e5] uppercase tracking-wider">The Rules of the Game</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] mb-6">Terms & Services</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        By using our platform, you agree to follow these guidelines. We've
                        kept them clear and straightforward to protect both our community and our mission.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Table of Contents */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4 p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-xl shadow-purple-200/20">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-[#6b46e5]" />
                                <h3 className="text-xl font-bold text-[#1a1a2e]">Service Terms</h3>
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
                                <h4 className="font-bold mb-2">Legal Query?</h4>
                                <p className="text-sm text-purple-200/80 mb-4">Reach out to our compliance department for any legal clarifications.</p>
                                <button className="w-full py-2.5 bg-white text-[#1a0b2e] rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors">
                                    Contact Legal
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content Sections */}
                    <div className="lg:col-span-8 space-y-24 pb-20">

                        <div id="acceptance" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Acceptance of Terms
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    Welcome to Cyber Whisper. By accessing or using our websites, training platforms,
                                    cyber ranges, or any other services provided by Cyber Whisper (collectively, the "Services"),
                                    you agree to be bound by these Terms & Services.
                                </p>
                                <p>
                                    If you do not agree to these terms, please do not use our Services. These terms
                                    apply to all visitors, learners, and clients who access or use our services
                                    globally.
                                </p>
                                <p>
                                    We reserve the right to modify or replace these terms at any time. If a revision
                                    is material, we will provide at least 30 days' notice prior to any new terms
                                    taking effect.
                                </p>
                            </div>
                        </div>

                        <div id="services" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Description of Services
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <p>Cyber Whisper provides comprehensive cyber security ecosystem services, including:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Immersive Cyber Range training environments.',
                                        'Professional certification programs and workshops.',
                                        'AI-driven threat landscape simulation and analysis.',
                                        'Corporate cyber defence consulting and auditing.'
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 bg-white border border-purple-50 rounded-2xl flex items-start gap-3 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" />
                                            <span className="font-medium text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div id="conduct" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                User Conduct
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    While our cyber ranges are built for simulated attacks, ethical conduct is
                                    paramount. You agree not to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Use our infrastructure to launch actual attacks against third parties.</li>
                                    <li>Share or distribute login credentials or course materials without authorization.</li>
                                    <li>Attempt to reverse-engineer our proprietary simulation software.</li>
                                    <li>Engage in any activity that disrupts or interferes with our Services.</li>
                                </ul>
                                <p>
                                    Violation of these rules will result in immediate termination of your access
                                    without refund and may lead to legal action.
                                </p>
                            </div>
                        </div>

                        <div id="intellectual" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Intellectual Property
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    The Services and their original content, features, and functionality (including
                                    lab scenarios, curriculum, and logos) are and will remain the exclusive
                                    property of Cyber Whisper.
                                </p>
                                <p>
                                    Our proprietary "Whisper-Range" technology and AI threat models are protected
                                    by copyright, trademark, and other laws within international jurisdictions.
                                </p>
                            </div>
                        </div>

                        <div id="liability" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Limitation of Liability
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    In no event shall Cyber Whisper be liable for any indirect, incidental, special,
                                    consequential, or punitive damages, including loss of profits or data,
                                    resulting from your use of the Services.
                                </p>
                                <p>
                                    Our training programs are designed to enhance skills. While we provide
                                    high-quality defense knowledge, Cyber Whisper does not guarantee 100%
                                    immunity from cyber threats for your organization.
                                </p>
                            </div>
                        </div>

                        <div id="governing" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                Governing Law
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    These Terms shall be governed and construed in accordance with the laws of
                                    India, without regard to its conflict of law provisions.
                                </p>
                                <p>
                                    Any legal action or proceeding arising under these terms will be brought
                                    exclusively in the courts located in Delhi, India.
                                </p>
                                <div className="mt-8 p-10 bg-[#f8fafc] rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                    <p className="font-bold text-[#1a1a2e] mb-2 uppercase tracking-widest text-sm">Last Revision</p>
                                    <p className="text-[#6b46e5] font-black text-2xl">DECEMBER 27, 2025</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
