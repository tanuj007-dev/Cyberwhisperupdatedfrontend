'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MonitorPlay, Users, Building2, Terminal, Cpu, ChevronRight } from 'lucide-react';
import { DeploymentForm } from './DeploymentForm';

// Using suitable existing assets as placeholders for the learning modes
import imgClassroom from './assets/cyber_classroom.png';
import imgOnline from './assets/cyber_online.png';
import imgCorporate from './assets/cyber_corporate.png';

const modes = [
    {
        id: 'classroom',
        title: 'Classroom_Training',
        subtitle: 'IMMERSIVE_OPS',
        description: 'Hands-on instructor-led training with real-time guidance in a controlled lab environment.',
        features: [
            'Real-time mentorship & doubt clearing',
            'Cyber Range lab practice during sessions',
            'Red/Blue team exercises & reporting drills'
        ],
        btnText: 'JOIN_CLASSROOM',
        formType: 'JOIN_CLASSROOM',
        image: imgClassroom,
        icon: Users,
        color: 'border-cyan-500/50 shadow-cyan-500/20',
        textAccent: 'text-cyan-400',
        bgAccent: 'bg-cyan-500/10'
    },
    {
        id: 'online',
        title: 'Online_access',
        subtitle: 'REMOTE_UPLINK',
        description: 'Live virtual sessions with guided labs—train from anywhere without losing interaction.',
        features: [
            'Live mentor-led classes (not recorded-only)',
            'Remote Cyber Range + CTF practice',
            'Flexible batches for students & professionals'
        ],
        btnText: 'START_UPLINK',
        formType: 'START_UPLINK',
        image: imgOnline,
        icon: MonitorPlay,
        color: 'border-purple-500/50 shadow-purple-500/20',
        textAccent: 'text-purple-400',
        bgAccent: 'bg-purple-500/10'
    },
    {
        id: 'corporate',
        title: 'Corporate_Sec',
        subtitle: 'TEAM_DEPLOYMENT',
        description: 'Customized upskilling for corporate teams with role-based learning and measurable outcomes.',
        features: [
            'Custom curriculum mapped to your roles/tools',
            'Skill tracking + assessment reporting',
            'Team exercises, simulations & readiness review'
        ],
        btnText: 'DEPLOY_TEAM',
        formType: 'DEPLOY_TEAM',
        image: imgCorporate,
        icon: Building2,
        color: 'border-emerald-500/50 shadow-emerald-500/20',
        textAccent: 'text-emerald-400',
        bgAccent: 'bg-emerald-500/10'
    },
];

export default function LearningMode() {
    const [activeForm, setActiveForm] = useState(null);

    return (
        <section className="relative w-full py-16 lg:py-24 bg-[#FBF9FF] dark:bg-background text-gray-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">

            {/* Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,30,40,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,30,40,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(30,30,40,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,30,40,0.5)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#FBF9FF]/50 to-[#FBF9FF] dark:via-background/50 dark:to-background" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                   

                    <h1 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight">
                        <span className="text-gray-900 dark:text-white">DEPLOYMENT </span>
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400">OPTIONS</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base  max-w-2xl mx-auto">
                        Choose how you want to train - classroom, online, or team deployment.
                    </p>
                </div>

                {/* Cyber Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modes.map((mode, idx) => {
                        const Icon = mode.icon;
                        return (
                            <motion.div
                                key={mode.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="group relative h-full"
                            >
                                {/* Card Frame */}
                                <div className={`relative h-full bg-white dark:bg-[#13131f] border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-transparent hover:shadow-[0_0_30px_rgba(100,100,111,0.2)] dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${mode.color.split(' ')[1]}`}>

                                    {/* Hover Neon Glow Border */}
                                    <div className={`absolute inset-0 border-2 border-transparent group-hover:${mode.color.split(' ')[0]} transition-colors duration-300 z-20 pointer-events-none`} />

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/30 group-hover:border-white/80 z-20" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/30 group-hover:border-white/80 z-20" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/30 group-hover:border-white/80 z-20" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/30 group-hover:border-white/80 z-20" />

                                    {/* Image Section */}
                                    <div className="relative h-44 overflow-hidden border-b border-gray-100 dark:border-white/5">
                                        <Image
                                            src={mode.image}
                                            alt={mode.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Tech Badge */}

                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex flex-col grow relative">
                                        {/* Background Scanlines */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,29,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] fragment-shader opacity-20 pointer-events-none" />

                                        <div className="relative z-10 mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                                                &gt; {mode.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                                                {mode.description}
                                            </p>
                                        </div>

                                        {/* Cyber Features List */}
                                        <ul className="space-y-2 mb-6 relative z-10">
                                            {mode.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors bg-gray-50 dark:bg-white/5 p-1.5 rounded border border-gray-200 dark:border-white/5">
                                                    <Cpu className={`w-3 h-3 ${mode.textAccent}`} />
                                                    <span className="tracking-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Button */}
                                        <div className="mt-auto relative z-10">
                                            <button
                                                onClick={() => setActiveForm(mode.formType)}
                                                className={`w-full group/btn relative overflow-hidden bg-gray-900 dark:bg-[#0d0d12] border border-gray-800 dark:border-white/10 hover:${mode.color.split(' ')[0]} text-white px-4 py-3  text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all duration-300`}
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    <span className={`${mode.textAccent}`}>[</span> {mode.btnText} <span className={`${mode.textAccent}`}>]</span>
                                                </span>
                                                <ChevronRight className={`w-4 h-4 ${mode.textAccent} group-hover/btn:translate-x-1 transition-transform`} />

                                                {/* Fill Effect */}
                                                <div className={`absolute inset-0 ${mode.bgAccent} -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>

            {/* Render Active Form Modal */}
            {activeForm && (
                <DeploymentForm
                    formType={activeForm}
                    onClose={() => setActiveForm(null)}
                />
            )}
        </section>
    );
}
