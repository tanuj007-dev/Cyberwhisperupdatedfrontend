"use client"
import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, FileText, CheckCircle2, Shield, Globe, Mail, Phone, MapPin } from 'lucide-react';

const sections = [
    { id: 'who-we-are', title: '1. Who We Are' },
    { id: 'info-collect', title: '2. Information We Collect' },
    { id: 'data-use', title: '3. How We Use Information' },
    { id: 'data-share', title: '4. How We Share Your Information' },
    { id: 'cookies', title: '5. Cookies & Technologies' },
    { id: 'retention', title: '6. Data Retention' },
    { id: 'security', title: '7. Security' },
    { id: 'rights', title: '8. Privacy Rights' },
    { id: 'transfers', title: '9. International Transfers' },
    { id: 'children', title: '10. Children’s Privacy' },
    { id: 'changes', title: '11. Changes to Policy' },
    { id: 'contact', title: '12. Contact Us' }
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('who-we-are');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
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
                top: element.offsetTop - 100,
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
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-[#1a1a2e] mb-6">Privacy Policy</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        At Cyber Whisper, we value your trust. This policy outlines how we collect, use, and protect your information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Table of Contents */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4 p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-xl shadow-purple-200/20 max-h-[80vh] overflow-y-auto scrollbar-hide">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-[#6b46e5]" />
                                <h3 className="text-xl font-bold text-[#1a1a2e]">Policy Sections</h3>
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
                                        <span className="truncate">{section.title}</span>
                                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${activeSection === section.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content Sections */}
                    <div className="lg:col-span-8 space-y-20 pb-20">

                        {/* 1. Who we are */}
                        <div id="who-we-are" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                1. Who We Are and What This Policy Covers
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>
                                    Cyber Whisper (“Cyber Whisper”, “we”, “our”, “us”) provides cybersecurity training, certification preparation, cyber range and CTF labs, workshops, and cybersecurity services (such as SOC enablement, VAPT and threat intelligence monitoring) to individuals, colleges and institutions, and corporate clients across India (and, where applicable, globally).
                                </p>
                                <p>
                                    This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website, register for training, participate in labs or competitions, request a proposal or demo, or otherwise interact with our services (collectively, the “Services”).
                                </p>
                                <p className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <strong>Note:</strong> If you are a corporate or institutional participant and your enrollment is arranged by your employer/college, we may receive your details from that organization and may share training completion details back with them as described below.
                                </p>
                            </div>
                        </div>

                        {/* 2. Information we collect */}
                        <div id="info-collect" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                2. Information We Collect
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.1 Information you provide to us</h3>
                                    <ul className="grid gap-3">
                                        {[
                                            'Identity and contact details (name, email, phone number, organization, role, city).',
                                            'Account and enrollment details (login identifiers, course selections, batch details, certificates issued).',
                                            'Inquiries and communications (messages you send us, support tickets, call/WhatsApp details you choose to share).',
                                            'Billing information (invoice details, payment status). Payment card/UPI details are typically processed by trusted payment gateways and are not stored by us.'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.2 Information generated through your use of our Services</h3>
                                    <ul className="grid gap-3">
                                        {[
                                            'Training progress and performance (course progress, quiz results, lab completion, CTF scores/leaderboards where enabled).',
                                            'Platform and usage data (log files, session timestamps, pages/screens viewed, clicks, referrers).',
                                            'Device and network information (IP address, browser type, operating system, device identifiers, approximate location derived from IP).'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#6b46e5] mt-1 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.3 Security and operational data</h3>
                                    <p>To protect our Services, we may collect and analyze security-relevant telemetry such as authentication events, access logs, and suspicious activity indicators. This helps us prevent fraud, abuse, unauthorized access, and attacks.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.4 Information we do not intentionally collect</h3>
                                    <p>We do not intentionally collect highly sensitive personal data (such as government identifiers) unless it is necessary for a specific engagement and you (or your organization) provide it knowingly. <strong>We never ask for your passwords.</strong></p>
                                </div>
                            </div>
                        </div>

                        {/* 3. How we use your information */}
                        <div id="data-use" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                3. How We Use Your Information
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We use the information we collect for purposes such as:</p>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        'Provide and administer training, labs, cyber range/CTF access, and certification preparation.',
                                        'Manage registrations, accounts, attendance, and issue certificates/letters where applicable.',
                                        'Deliver corporate and institutional programs, including reporting completion status when agreed with the sponsoring organization.',
                                        'Provide customer support, respond to queries, and share proposals/quotes.',
                                        'Improve our curriculum, labs, and platform experience using aggregated insights.',
                                        'Send service-related updates (batch schedules, platform announcements, important changes).',
                                        'Send marketing communications about new programs or workshops (you can opt out anytime).',
                                        'Maintain safety and security, monitor abuse, and enforce our terms and acceptable-use rules.',
                                        'Comply with legal obligations and resolve disputes.'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-[#6b46e5]/10 text-[#6b46e5] flex items-center justify-center font-bold shrink-0 text-sm">{idx + 1}</div>
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. How we share your information */}
                        <div id="data-share" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                4. How We Share Your Information
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We do not sell your personal information. We share information only as needed to run our Services and deliver engagements, including:</p>
                                <ul className="list-disc pl-6 space-y-3 marker:text-[#6b46e5]">
                                    <li><strong>Service providers:</strong> hosting, email, analytics, customer support tools, and payment processors (who process data on our behalf).</li>
                                    <li><strong>Corporate/institutional sponsors:</strong> where your training is sponsored, we may share enrollment and completion status, certificates, or attendance summaries as agreed.</li>
                                    <li><strong>Legal and safety:</strong> if required by law, regulation, court order, or to protect the rights, safety, and security of Cyber Whisper, our users, or others.</li>
                                    <li><strong>Business changes:</strong> if we undergo a merger, acquisition, or asset transfer, information may be transferred as part of that transaction (subject to applicable law).</li>
                                </ul>
                            </div>
                        </div>

                        {/* 5. Cookies */}
                        <div id="cookies" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                5. Cookies and Similar Technologies
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We use cookies and similar technologies to operate our website and platforms, remember preferences, understand usage, and improve performance. Some cookies are necessary for the Services to function.</p>
                                <div className="space-y-3 mt-4">
                                    <div className="p-4 bg-white border-l-4 border-[#6b46e5] rounded-r-xl shadow-sm">
                                        <strong className="text-[#2d124d]">Necessary cookies:</strong> required for login sessions, security, and core site functionality.
                                    </div>
                                    <div className="p-4 bg-white border-l-4 border-[#6b46e5] rounded-r-xl shadow-sm">
                                        <strong className="text-[#2d124d]">Preference cookies:</strong> remember choices such as language or display settings.
                                    </div>
                                    <div className="p-4 bg-white border-l-4 border-[#6b46e5] rounded-r-xl shadow-sm">
                                        <strong className="text-[#2d124d]">Analytics cookies:</strong> help us understand traffic and improve pages and content.
                                    </div>
                                </div>
                                <p className="mt-4">You can manage cookies through your browser settings. Disabling certain cookies may affect website or platform functionality.</p>
                            </div>
                        </div>

                        {/* 6. Data Retention */}
                        <div id="retention" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                6. Data Retention
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We retain personal information only for as long as necessary for the purposes described in this policy, including to provide the Services, maintain records of certifications, comply with legal obligations, resolve disputes, and enforce agreements. Retention periods may vary depending on the type of data and the engagement.</p>
                            </div>
                        </div>

                        {/* 7. Security */}
                        <div id="security" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                7. Security
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="flex items-start gap-4">
                                    <Shield className="w-12 h-12 text-[#6b46e5] shrink-0 p-2 bg-purple-50 rounded-xl" />
                                    <p>We implement reasonable technical and organizational measures to protect information, such as access controls, encryption in transit, least-privilege access, logging and monitoring, and periodic security reviews. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
                                </div>
                            </div>
                        </div>

                        {/* 8. Your privacy rights */}
                        <div id="rights" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                8. Your Privacy Rights & Choices
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Depending on your location and applicable law, you may have rights such as access, correction, deletion, portability, and withdrawal of consent. In India, these rights may be available under applicable data protection laws (including, where applicable, the Digital Personal Data Protection Act, 2023).</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <strong className="block mb-2 text-[#2d124d]">Access & Correction</strong>
                                        <span className="text-sm">Request a copy of your information or ask us to correct inaccurate details.</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <strong className="block mb-2 text-[#2d124d]">Deletion</strong>
                                        <span className="text-sm">Request deletion of information where legally permissible and where we do not need it for legitimate purposes.</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <strong className="block mb-2 text-[#2d124d]">Marketing Opt-out</strong>
                                        <span className="text-sm">Unsubscribe from promotional communications. Service updates may still be sent.</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <strong className="block mb-2 text-[#2d124d]">Consent Withdrawal</strong>
                                        <span className="text-sm">Where processing is based on consent, you can withdraw it (subject to legal and contractual restrictions).</span>
                                    </div>
                                </div>
                                <p className="mt-4">To exercise your rights, contact us using the details in Section 12. We may verify your request before responding.</p>
                            </div>
                        </div>

                        {/* 9. International Data Transfers */}
                        <div id="transfers" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                9. International Data Transfers
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-6 h-6 text-[#6b46e5]" />
                                    <p>We may use cloud and service providers that process data in locations outside your state or country. Where we transfer personal information, we take steps to ensure appropriate safeguards consistent with applicable law.</p>
                                </div>
                            </div>
                        </div>

                        {/* 10. Children's Privacy */}
                        <div id="children" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                10. Children’s Privacy
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Our Services are intended for students and professionals. We do not knowingly collect personal information from children without appropriate consent. If you believe a child has provided personal information to us, please contact us so we can take appropriate action.</p>
                            </div>
                        </div>

                        {/* 11. Changes to this policy */}
                        <div id="changes" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                11. Changes to This Policy
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We may update this Privacy Policy from time to time. If we make material changes, we will post the updated policy on our website and update the “Last updated” date on the title page.</p>
                            </div>
                        </div>

                        {/* 12. Contact Us */}
                        <div id="contact" className="scroll-mt-32 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                12. Contact Us
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>For questions, requests, or concerns about privacy, contact Cyber Whisper:</p>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                                        <Mail className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Email Us</h4>
                                        <a href="mailto:connect@cyberwhisper.tech" className="text-gray-600 hover:text-[#6b46e5] transition-colors">connect@cyberwhisper.tech</a>
                                        <p className="text-xs text-gray-400 mt-1">(or your designated privacy contact)</p>
                                    </div>

                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                                        <Phone className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Call Us</h4>
                                        <a href="tel:+919220946887" className="text-gray-600 hover:text-[#6b46e5] transition-colors">+91 92209 46887</a>
                                    </div>

                                    <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all md:col-span-2">
                                        <MapPin className="w-8 h-8 text-[#6b46e5] mb-4" />
                                        <h4 className="font-bold text-[#1a1a2e] mb-1">Registered Address</h4>
                                        <p className="text-gray-600">A/62 Suraj Nagar, Azadpur, Model Town, Delhi - 110033, India</p>
                                    </div>
                                </div>

                                <p className="mt-6 p-4 bg-purple-50 rounded-xl text-sm border-l-4 border-purple-500">
                                    If you contact us, please include your name, preferred contact method, and a brief description of your request.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
