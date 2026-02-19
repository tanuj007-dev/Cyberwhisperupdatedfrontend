"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-white/10 last:border-0">
            <button
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={onClick}
            >
                <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-[#6B46E5]' : 'text-gray-900 dark:text-white group-hover:text-[#6B46E5]'}`}>
                    {question}
                </span>
                <span className={`ml-4 p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#6B46E5] text-white rotate-180' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-[#6B46E5]/10 group-hover:text-[#6B46E5]'}`}>
                    <ChevronDown size={20} />
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed pr-8">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function B2BFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Do you provide onsite and remote delivery?",
            answer: "Yes, we offer flexible delivery models. We can conduct training and workshops onsite at your facility for hands-on team building, or deliver them 100% remotely via our secure cloud-based cyber range platform."
        },
        {
            question: "Can the cyber range be customized for our environment?",
            answer: "Absolutely. Our cyber range can be tailored to mirror your specific network architecture, security stack (SIEM, EDR, Firewall brands), and industry-specific threat scenarios to ensure maximum relevance."
        },
        {
            question: "Is the cyber range cloud-based or can it be on-prem?",
            answer: "Our standard deployment is a secure, zero-footprint cloud platform. However, for organizations with strict data sovereignty or air-gapped requirements, we offer on-premise deployment options."
        },
        {
            question: "What is the typical duration for workshops and programs?",
            answer: "Durations vary by objective. Standalone workshops typically run 1-3 days. Comprehensive workforce development programs or 'Zero-to-Hero' bootcamps can span 2-12 weeks, depending on the depth of skills required."
        },
        {
            question: "Do you provide certificates and completion reports?",
            answer: "Yes. Participants receive industry-recognized certificates upon successful completion. We also provide detailed management reports highlighting skill gains, assessment scores, and areas for further improvement."
        },
        {
            question: "What information is needed to get a quote?",
            answer: "To provide an accurate quote, we typically need to know: the size of your team, the type of training or service required (e.g., Red Team, Blue Team, general awareness), your preferred delivery mode, and any specific customization needs."
        },
        {
            question: "Can training be mapped to SOC L1/L2/L3 or specific roles?",
            answer: "Yes, our curriculum is role-based. We have distinct tracks for SOC Analysts (L1-L3), Incident Responders, Threat Hunters, and Penetration Testers, all aligned with the NICE Cybersecurity Workforce Framework."
        },
        {
            question: "How do you handle data privacy and NDA requirements?",
            answer: "We take privacy seriously. We standardly operate under strict NDAs. Our platforms comply with major data protection regulations, and we are happy to review and sign your organization's specific confidentiality agreements."
        }
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="relative py-24 bg-gray-50 dark:bg-[#150833] overflow-hidden transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>
            <div className="absolute -left-20 top-40 w-80 h-80 bg-[#6B46E5]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    
                    <h1 className="text-3xl md:text-5xl font-semibold mb-4">
                        <span className="text-gray-900 dark:text-white">Frequently Asked </span>
                        <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">Questions</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Everything you need to know about our enterprise training and cyber range solutions.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#0B0420] rounded-2xl p-6 md:p-10 shadow-xl border border-gray-200 dark:border-white/5">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>


            </div>
        </section>
    );
}
