"use client"
import Image from 'next/image';
import { Shield, Briefcase, MousePointer2, Search } from 'lucide-react';
import { MdOutlineElectricBolt } from "react-icons/md";
import path from "./assets/path.webp";
import { GrWorkshop } from "react-icons/gr";
export default function WorkshopSection() {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background overflow-hidden font-sans transition-colors duration-300">

            {/* Background Image Layer (path.webp) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-100 select-none min-h-screen">
                <Image
                    src={path}
                    alt="Background Pattern"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Corner Gradients */}
            <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-purple-300/30 blur-[100px] md:blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-purple-300/30 blur-[100px] md:blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />


            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-xs sm:text-sm md:text-[15px] font-semibold text-foreground">
                            WHY CYPHER WHISPER
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold text-foreground mb-4 sm:mb-6 leading-tight">
                        Why Learners and Organizations Choose <br className="hidden sm:block" /> <span className="text-[#6B46E5]">Cyber Whisper</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-5xl mx-auto leading-relaxed">
                        We combine real-world cybersecurity experience, hands-on platforms, and practical training to deliver outcomes—not just courses.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4">
                    {[
                        {
                            title: "Built by Practitioners",
                            desc: "Our programs and labs are designed by professionals who have worked in real SOCs, incident response, and enterprise security environments.",
                            icon: Briefcase
                        },
                        {
                            title: "Learn by Doing, Not Watching",
                            desc: "Every learner and team works on real scenarios, tools, and attack simulations—not slides or recorded demos.",
                            icon: MdOutlineElectricBolt
                        },
                        {
                            title: "Designed for Real SOC Roles",
                            desc: "From fundamentals to advanced threat hunting, our training mirrors how modern Security Operations Centers actually operate.",
                            icon: GrWorkshop
                        },
                        {
                            title: "From Basics to Advanced",
                            desc: "We support the full journey—from cybersecurity fundamentals to advanced SOC and cloud security—under one platform.",
                            icon: Search
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="group relative border border-[#7B2CFF] bg-card rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(107,70,229,0.08)] md:hover:shadow-[0_30px_60px_rgba(107,70,229,0.08)] hover:-translate-y-1 md:hover:-translate-y-1.5"
                        >
                            {/* Icon Container */}
                            <div className="mb-4 sm:mb-5 md:mb-6 relative inline-block">
                                <div className="absolute inset-0 bg-[#6b46e5] rounded-full blur-lg md:blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#6b46e5] rounded-full flex items-center justify-center shadow-lg shadow-purple-200 transition-transform group-hover:scale-110">
                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                <h3 className="text-lg sm:text-xl md:text-xl text-[#6B46E5] font-semibold tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-card-foreground text-sm sm:text-[15px] leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}