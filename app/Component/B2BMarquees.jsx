'use client';
import React from 'react';

export default function B2BMarquees() {
    const capabilities = [
        "SOC Enablement",
        "Cyber Range Labs",
        "Purple Team Simulations",
        "Attack Emulation",
        "Role-Based Tracks",
        "Detection Engineering",
        "Threat Hunting",
        "Incident Response Drills",
        "CTI Monitoring",
        "Playbooks & Runbooks",
        "SIEM Use-Case Tuning",
        "Readiness Assessments",
        "Executive Reporting"
    ];

    const outcomes = [
        "Faster Triage",
        "Cleaner Investigations",
        "Reduced False Positives",
        "Better Escalation Quality",
        "Repeatable Response",
        "Improved MTTD/MTTR",
        "Analyst Readiness",
        "Tool Adoption",
        "Audit Support",
        "Leadership Visibility"
    ];

    const tools = [
        "Elastic/ELK",
        "Splunk",
        "QRadar",
        "Microsoft Sentinel",
        "Wazuh",
        "Google Chronicle",
        "Defender for Endpoint",
        "CrowdStrike",
        "SentinelOne",
        "Cortex XDR",
        "SOAR Integrations",
        "ServiceNow",
        "Jira",
        "Sysmon",
        "osquery",
        "Suricata",
        "Zeek",
        "Wireshark",
        "Sigma",
        "YARA",
        "STIX/TAXII",
        "MISP/OpenCTI",
        "AWS/Azure/GCP Logs",
        "Kubernetes",
        "Docker",
        "Sandbox Isolation",
        "AI Triage Copilot",
        "LLM Enrichment",
        "Auto Case Notes",
        "Report Drafts",
        "Detection Gap Insights"
    ];

    const MarqueeItem = ({ text }) => (
        <div className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/80 dark:to-gray-800/60 border border-gray-300/70 dark:border-purple-500/30 rounded-full backdrop-blur-md whitespace-nowrap shadow-sm hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:border-purple-400 dark:hover:border-purple-400">
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

            {/* Glowing dot */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 dark:from-cyan-300 dark:to-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover:shadow-[0_0_20px_rgba(34,211,238,1)] transition-shadow duration-300 animate-pulse" />

            {/* Text with gradient on hover */}
            <span className="relative text-sm font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-purple-800 dark:group-hover:from-purple-300 dark:group-hover:to-purple-100 transition-all duration-300">
                {text}
            </span>
        </div>
    );

    const MarqueeRow = ({ items, duration, reverse, label }) => {
        const animationStyle = {
            animation: reverse
                ? `marqueeReverse ${duration}s linear infinite`
                : `marquee ${duration}s linear infinite`
        };

        return (
            <div className="mb-8">
                {/* Section Label with gradient */}
                <div className="max-w-7xl mx-auto px-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                        <h3 className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                            {label}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                    </div>
                </div>

                {/* Marquee with fade edges */}
                <div className="relative overflow-hidden">
                    {/* Left fade */}
                   
                    {/* Marquee content */}
                    <div className="flex gap-6" style={animationStyle}>
                        {items.map((item, idx) => (
                            <MarqueeItem key={`${label}-${idx}`} text={item} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full bg-gradient-to-b from-gray-50 via-gray-100/50 to-gray-50 dark:from-[#0a0015] dark:via-[#150833]/30 dark:to-[#0a0015] py-16 overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10">
                {/* Main heading */}
                <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent mb-3">
                        Enterprise Cyber Defense Ecosystem
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
                        Comprehensive capabilities, measurable outcomes, and seamless integrations
                    </p>
                </div>

                {/* Marquee Rows */}
                <MarqueeRow
                    items={[...capabilities, ...capabilities, ...capabilities, ...capabilities]}
                    duration={10}
                    reverse={false}
                    label="CAPABILITIES"
                />

                <MarqueeRow
                    items={[...outcomes, ...outcomes, ...outcomes, ...outcomes]}
                    duration={10}
                    reverse={true}
                    label="OUTCOMES"
                />

                <MarqueeRow
                    items={[...tools, ...tools, ...tools, ...tools]}
                    duration={10}
                    reverse={false}
                    label="TOOLS & TECH + AI"
                />
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-25%);
                    }
                }

                @keyframes marqueeReverse {
                    0% {
                        transform: translateX(-25%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}
