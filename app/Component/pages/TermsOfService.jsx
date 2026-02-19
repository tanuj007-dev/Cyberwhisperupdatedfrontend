"use client"
import React, { useEffect, useState } from 'react';
import { Gavel, ArrowRight, HelpCircle, FileText, CheckCircle2, Shield, AlertTriangle, Scale, Lock, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'description', title: '2. Description of Services' },
    { id: 'eligibility', title: '3. Eligibility & Accounts' },
    { id: 'payments', title: '4. Payments & Billing' },
    { id: 'refunds', title: '5. Refunds & Cancellations' },
    { id: 'conduct', title: '6. User Conduct' },
    { id: 'lab-rules', title: '7. Cyber Range / Lab Rules' },
    { id: 'intellectual', title: '8. Intellectual Property' },
    { id: 'confidentiality', title: '9. Confidentiality' },
    { id: 'third-party', title: '10. Third-Party Services' },
    { id: 'disclaimers', title: '11. Disclaimers' },
    { id: 'liability', title: '12. Limitation of Liability' },
    { id: 'indemnification', title: '13. Indemnification' },
    { id: 'termination', title: '14. Termination' },
    { id: 'governing', title: '15. Governing Law' },
    { id: 'changes', title: '16. Changes to Terms' },
    { id: 'contact', title: '17. Contact Us' },
];

export default function TermsOfService() {
    const { openEnquiry } = useEnquiry();
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
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-[#1a1a2e] mb-6">Terms & Services</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        Clear, fair rules designed to protect our learners, clients, and community.
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
                                <h4 className="font-bold mb-2">Legal Query?</h4>
                                <p className="text-sm text-purple-200/80 mb-4">Reach out to our compliance department for any legal clarifications.</p>

                                <button onClick={openEnquiry} className="w-full py-2.5 bg-white text-[#1a0b2e] rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors">
                                    Contact Legal
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content Sections */}
                    <div className="lg:col-span-8 space-y-24 pb-20">

                        {/* 1. Acceptance */}
                        <div id="acceptance" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                1. Acceptance of Terms
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>By accessing or using Cyber Whisper’s website, training programs, cyber range/CTF platforms, consulting services, or any related offerings (collectively, the “Services”), you agree to be bound by these Terms & Services (“Terms”). If you do not agree, please do not use the Services.</p>
                                <p>If you are using the Services on behalf of an organization (e.g., a corporate client, college, or government entity), you represent that you have authority to bind that organization. If there is a signed Master Service Agreement (MSA), Statement of Work (SOW), or other written contract with Cyber Whisper, those documents will govern in case of any conflict.</p>
                            </div>
                        </div>

                        {/* 2. Description of Services */}
                        <div id="description" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                2. Description of Services
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-[17px]">
                                <p>Cyber Whisper provides practical, hands-on cybersecurity learning and professional services for individuals, colleges, and corporate teams. Services may be delivered in-person, online, or hybrid, and may be available Pan-India or remotely, depending on the engagement.</p>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.1 Training & Certification Preparation</h3>
                                    <ul className="list-disc pl-5 space-y-2 marker:text-[#6b46e5]">
                                        <li>Cybersecurity training tracks (SOC L1/L2/L3, blue-team operations, incident response, threat hunting, and defensive engineering).</li>
                                        <li>Hands-on labs using tools such as Wazuh, ELK/SIEM, Sysmon, Suricata, and MITRE ATT&CK aligned use-cases.</li>
                                        <li>Cyber Range and CTF-based learning (attack simulation in controlled environments, challenges, and guided practice).</li>
                                        <li>Certification preparation and mentoring (e.g., CCNA, CEH, CompTIA Security+) and custom skill-building programs.</li>
                                        <li>AI Security / GenAI Security awareness and hands-on modules (secure AI use, prompt safety, model & data risks, and safe deployment practices).</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#2d124d]">2.2 Corporate & Institutional Services</h3>
                                    <ul className="list-disc pl-5 space-y-2 marker:text-[#6b46e5]">
                                        <li>SOC advisory and deployment support (use-case design, alert tuning, log onboarding strategy, dashboards, and operational playbooks).</li>
                                        <li>VAPT and security assessments (web/app/network assessments, reporting, and remediation guidance).</li>
                                        <li>Threat Intelligence Monitoring and exposure tracking (keywords, brand/asset monitoring, and actionable reporting).</li>
                                        <li>Cybersecurity workshops, guest lectures, faculty enablement, and cyber lab / cyber range enablement for colleges and institutions.</li>
                                    </ul>
                                </div>
                                <p className='text-sm italic'>Specific scope, outcomes, timelines, and deliverables vary by plan, batch, or contract and will be communicated in program pages, proposals, invoices, or SOWs.</p>
                            </div>
                        </div>

                        {/* 3. Eligibility */}
                        <div id="eligibility" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                3. Eligibility & Accounts
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>You must provide accurate, current information when registering for any Services. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>Age: If you are under 18, you may use the Services only with parent/guardian consent and supervision.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>Account sharing is not permitted unless explicitly allowed in a written agreement.</span></li>
                                    <li className="flex gap-3"><span className="text-[#6b46e5] font-bold shrink-0">●</span><span>We may suspend or terminate accounts that violate these Terms or applicable law.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. Payments */}
                        <div id="payments" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                4. Payments, Billing & Taxes
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Fees for training, subscriptions, and services are displayed on our website or shared via proposal/invoice. Unless stated otherwise, payments are due in advance. Applicable taxes (including GST) may be charged as per law.</p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-[#6b46e5]">
                                    <li>Pricing may vary by batch, delivery mode (online/offline), number of participants, and scope.</li>
                                    <li>For corporate engagements, payment milestones may be defined in the SOW or invoice.</li>
                                    <li>We may use third-party payment processors. Payment details are handled by those providers under their policies.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 5. Refunds */}
                        <div id="refunds" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                5. Refunds & Cancellations
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Refunds and cancellations are governed by our Refund & Cancellation Policy (published on our website). Where the Refund & Cancellation Policy conflicts with these Terms, the policy will prevail for refund-related matters.</p>
                                <p>In general, access to digital content, lab environments, and downloadable materials may be non-refundable once provisioned. For in-person programs/workshops, timelines and deductions may apply based on scheduling and resource commitments.</p>
                            </div>
                        </div>

                        {/* 6. User Conduct */}
                        <div id="conduct" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                6. User Conduct & Acceptable Use
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Cyber Whisper supports ethical learning. You agree to use the Services responsibly, safely, and in compliance with all applicable laws. You must not misuse our infrastructure or content, or attempt to harm others.</p>
                                <p>You agree not to:</p>
                                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Use the Services to attack, scan, exploit, or disrupt any third-party system or network without explicit written authorization from the owner.</p></li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Upload, distribute, or execute malware or exploit code outside of authorized training environments.</p></li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Attempt to bypass access controls, reverse engineer the platform, scrape content at scale, or compromise other users’ accounts.</p></li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Share or resell course content, lab credentials, recordings, or proprietary materials without written permission.</p></li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Engage in harassment, hate speech, or abusive conduct towards learners, instructors, staff, or community members.</p></li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0"></div><p>Use the Services for illegal activities, including fraud, unauthorized surveillance, or intellectual property infringement.</p></li>
                                    </ul>
                                </div>
                                <p>We may investigate suspected misuse and may suspend or terminate access without notice where required to protect our users, infrastructure, or legal obligations.</p>
                            </div>
                        </div>

                        {/* 7. Cyber Range Rules */}
                        <div id="lab-rules" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 bg-[#6b46e5] rounded-full"></span>
                                7. Cyber Range / Lab Rules
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>Our cyber range and CTF environments are designed for controlled simulations. You must follow instructor guidance and platform rules at all times.</p>
                                <ul className="grid gap-3">
                                    {[
                                        'Work only within the scope of the lab or challenge provided. Do not pivot to external targets.',
                                        'Do not attempt denial-of-service, crypto-mining, or resource abuse activities (unless explicitly permitted in a lab).',
                                        'Do not share flags, solutions, or credentials publicly. Collaboration is allowed only when explicitly stated.',
                                        'We may monitor activity in lab environments for safety, troubleshooting, and academic integrity.',
                                        'Lab access time windows may be limited based on the plan or batch schedule.'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <AlertTriangle className="w-5 h-5 text-orange-400 mt-1 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-medium text-[#2d124d]">If you believe a lab environment exposes sensitive data or can impact third parties, report it immediately to Cyber Whisper and do not exploit it further.</p>
                            </div>
                        </div>

                        {/* 8. Intellectual Property */}
                        <div id="intellectual" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                8. Intellectual Property
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>All content, curricula, lab scenarios, software, branding, logos, website materials, and platform features provided through the Services are owned by Cyber Whisper or its licensors and are protected by applicable intellectual property laws.</p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-[#6b46e5]">
                                    <li>We grant you a limited, non-exclusive, non-transferable license to access the Services for your personal learning or your organization’s internal training (as applicable).</li>
                                    <li>You may not copy, reproduce, distribute, publicly display, sell, or create derivative works from our materials without written permission.</li>
                                    <li>Any feedback you provide may be used by Cyber Whisper to improve the Services without restriction, unless prohibited by law.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 9. Confidentiality */}
                        <div id="confidentiality" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                9. Confidentiality
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="flex gap-4 items-start p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <Lock className='w-6 h-6 text-[#6b46e5] shrink-0' />
                                    <p>During engagements, you may receive non-public information about our methods, lab designs, or client work, and we may receive non-public information from you. Both parties agree to keep such information confidential and to use it only for the intended purpose of the engagement.</p>
                                </div>
                            </div>
                        </div>

                        {/* 10. Third-Party Services */}
                        <div id="third-party" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                10. Third-Party Services
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>The Services may integrate or link to third-party tools, platforms, or websites (e.g., payment processors, communication tools, learning resources). Cyber Whisper is not responsible for third-party services, and your use of those services is governed by their own terms and policies.</p>
                            </div>
                        </div>

                        {/* 11. Disclaimers */}
                        <div id="disclaimers" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                11. Disclaimers
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>The Services are provided on an “as is” and “as available” basis. While we strive for high-quality training and secure platforms, we do not guarantee that the Services will be uninterrupted, error-free, or free of vulnerabilities.</p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-[#6b46e5]">
                                    <li>Training outcomes vary by learner and context. We do not guarantee employment, promotions, or certification results unless explicitly stated in a written agreement.</li>
                                    <li>Any security guidance is educational and should be validated within your environment and compliance requirements.</li>
                                    <li>Cybersecurity content may become outdated due to evolving threats, tools, and standards; we may update materials without notice.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 12. Limitation of Liability */}
                        <div id="liability" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                12. Limitation of Liability
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>To the maximum extent permitted by law, Cyber Whisper will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, or business interruption, arising from or related to your use of the Services.</p>
                                <p>Our total liability for any claim arising out of or relating to the Services will not exceed the amount paid by you to Cyber Whisper for the specific Service giving rise to the claim during the three (3) months prior to the event.</p>
                            </div>
                        </div>

                        {/* 13. Indemnification */}
                        <div id="indemnification" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                13. Indemnification
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>You agree to indemnify and hold harmless Cyber Whisper, its directors, employees, trainers, and partners from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising out of: (a) your misuse of the Services, (b) your violation of these Terms, or (c) your violation of any law or third-party rights.</p>
                            </div>
                        </div>

                        {/* 14. Termination */}
                        <div id="termination" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                14. Termination
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We may suspend or terminate your access to the Services immediately if we reasonably believe you have violated these Terms, misused the cyber range, engaged in fraud, or created risk to other users or systems.</p>
                                <p>Upon termination, your right to use the Services will cease, and we may disable accounts, revoke access, and remove content as needed. Refund eligibility, if any, will be handled as per the Refund & Cancellation Policy or applicable contract.</p>
                            </div>
                        </div>

                        {/* 15. Governing Law */}
                        <div id="governing" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                15. Governing Law & Dispute Resolution
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <div className="flex gap-4 items-start">
                                    <Scale className='w-12 h-12 text-[#6b46e5] p-2 bg-purple-50 rounded-xl shrink-0' />
                                    <p>These Terms are governed by the laws of India. Any disputes arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of courts located in Delhi, India, unless otherwise agreed in writing.</p>
                                </div>
                            </div>
                        </div>

                        {/* 16. Changes to Terms */}
                        <div id="changes" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                16. Changes to These Terms
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[17px]">
                                <p>We may update these Terms from time to time to reflect changes in our Services, legal requirements, or operational practices. When we make material changes, we will update the “Last updated” date and may provide additional notice on our website or via email where appropriate.</p>
                            </div>
                        </div>

                        {/* 17. Contact */}
                        <div id="contact" className="scroll-mt-24 space-y-6 group">
                            <h2 className="text-3xl font-black text-[#1a1a2e] flex items-center gap-4 transition-all group-hover:translate-x-2">
                                <span className="w-10 h-1 h-px bg-[#6b46e5] rounded-full"></span>
                                17. Contact
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
