'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Star, Quote } from 'lucide-react';
import gridImage from './assets/grid.webp';

// Import images from the students folder
import img1 from './assets/students/Adit.webp';
import img2 from './assets/students/rohan.webp';
import img3 from './assets/students/Sneha.webp';
import img4 from './assets/students/Kunal.webp';
import img5 from './assets/students/Priya.webp';
import img6 from './assets/students/Danie.webp';
import img7 from './assets/students/Emily.webp';
import img8 from './assets/students/Lucas.webp';
import img9 from './assets/students/Sofia.webp';
import img10 from './assets/students/Ahmed.webp';

// Import logos from Brands folder
import logo1 from './assets/E&.png';
import logo2 from './assets/BAE_Systems_logo.svg.png';
import accentureLogo from './assets/Accenture.png';
import deloitteLogo from './assets/deloitte.png';
import eyLogo from './assets/ey.png';
import ibmLogo from './assets/ibm.png';
import sapLogo from './assets/sap.png';
import telefonicaLogo from './assets/teleforinia.png';
import kpmgLogo from './assets/Brands/83470d2a3495d0a8b2dbf74d52eb4fd7b488bf4b.webp';
import pwcLogo from './assets/Brands/b5083774b6690c1b65eee321c218a6645b1556eb.webp';

const students = [
    {
        name: 'Aditi Sharma (India)',
        role: 'SOC Analyst (L1)',
        review: '"The training didnt feel like lectures.We worked like a real SOC—alerts, evidence, notes, and closure.That structure helped me stay calm in interviews."',
        placedAt: 'Deloitte',
        image: img1,
        logo: deloitteLogo
    },
    {
        name: 'Rohan Mehta (India)',
        role: 'Security Analyst Intern',
        review: '"Mentor feedback changed everything for me. I learned how to explain my thinking instead of just giving answers. The labs made me faster at triage."',
        placedAt: 'PwC (Big 4)',
        image: img2,
        logo: pwcLogo
    },
    {
        name: 'Sneha Iyer (India)',
        role: 'Junior SOC Analyst',
        review: '"I finally understood what to do after an alert comes in. The workflow practice and reporting style made my profile stronger and more professional."',
        placedAt: 'EY (Big 4)',
        image: img3,
        logo: eyLogo
    },
    {
        name: 'Kunal Verma (India)',
        role: 'Cloud Security Trainee',
        review: '"Live sessions were very interactive. Whenever I got stuck, the mentor corrected my approach immediately. The labs helped me connect cloud basics with security."',
        placedAt: 'KPMG (Big 4)',
        image: img4,
        logo: kpmgLogo
    },
    {
        name: 'Priya Nair (India)',
        role: 'SOC Analyst Intern',
        review: '"Weekly checkpoints kept me consistent. By the end, I was confident reading logs, validating alerts, and writing clean investigation notes."',
        placedAt: 'Accenture',
        image: img5,
        logo: accentureLogo
    },
    {
        name: 'Daniel Kim (USA)',
        role: 'Security Operations Associate',
        review: '"The best part was the practical investigation method. It improved how I validate alerts and document decisions. It felt job-focused, not theoretical."',
        placedAt: 'IBM',
        image: img6,
        logo: ibmLogo
    },
    {
        name: 'Emily Carter (UK)',
        role: 'Entry-Level SOC Analyst',
        review: '"I liked that its mentor- led.You can ask questions anytime and get real guidance.The labs made me confident in interviews because I had proof of work."',
        placedAt: 'BAE Systems',
        image: img7,
        logo: logo2
    },
    {
        name: 'Lucas Schneider (Germany)',
        role: 'Junior Security Analyst',
        review: '"Solid hands-on learning. The labs taught me how to reduce false positives and think clearly under pressure. It built real discipline."',
        placedAt: 'SAP',
        image: img8,
        logo: sapLogo
    },
    {
        name: 'Sofia Martinez (Spain)',
        role: 'Cybersecurity Analyst Intern',
        review: '"Its not one - way teaching.The live sessions and corrections helped me learn faster.I started understanding the why behind each step."',
        placedAt: 'Telefónica',
        image: img9,
        logo: telefonicaLogo
    },
    {
        name: 'Ahmed Hassan (UAE)',
        role: 'SOC Analyst (L1)',
        review: '"The training is practice-first. I learned how to communicate findings clearly and present investigations properly. That was the key improvement for me."',
        placedAt: 'e& (Etisalat Group)',
        image: img10,
        logo: logo1
    }
];

export default function Placement() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-gray-50 dark:bg-[#030014] font-sans overflow-hidden transition-colors duration-300">

            {/* Ambient Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-purple-600/20 dark:bg-purple-600/30 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-100 mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 bg-[#6b46e5] shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
                        <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-[0.2em]">
                            Success Stories
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400 leading-tight pb-2">
                        Our Recent Placement Stories
                    </h2>

                    <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Join the league of successful professionals who have transformed their careers with our industry-leading cybersecurity training.
                    </p>
                </div>

                {/* Carousel Container */}
                <Carousel students={students} />
            </div>
        </section>
    );
}

// Internal Carousel Component to handle state
function Carousel({ students }) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
    const autoPlayRef = React.useRef(null);
    const [direction, setDirection] = React.useState(0); // -1 for prev, 1 for next

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % students.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + students.length) % students.length);
    };

    React.useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(nextSlide, 3000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlaying, students.length]);

    // Format for 3 card view: previous, current, next
    const getVisibleIndices = () => {
        const prev = (activeIndex - 1 + students.length) % students.length;
        const next = (activeIndex + 1) % students.length;
        return [prev, activeIndex, next];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <div
            className="flex flex-col items-center justify-center w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="relative w-full max-w-7xl h-[450px] md:h-[480px] flex items-center justify-center overflow-visible">
                {/* 
                  Using Layout Group or AnimatePresence for smooth transitions.
                  We render the 3 cards in valid positions.
                */}
                <div className="flex items-center justify-center gap-4 md:gap-6 w-full perspective-1000">

                    {/* Previous Card */}
                    <div className="hidden md:block flex-1 max-w-[280px] transition-all duration-500 ease-in-out transform scale-90 opacity-100 z-0">
                        <StudentCard student={students[(activeIndex - 1 + students.length) % students.length]} isActive={false} />
                    </div>

                    {/* Active Card */}
                    <div className="w-full max-w-[320px] md:max-w-[360px] z-20 scale-100 transition-all duration-500 ease-in-out">
                        <StudentCard student={students[activeIndex]} isActive={true} />
                    </div>

                    {/* Next Card */}
                    <div className="hidden md:block flex-1 max-w-[280px] transition-all duration-500 ease-in-out transform scale-90 opacity-100 z-0">
                        <StudentCard student={students[(activeIndex + 1) % students.length]} isActive={false} />
                    </div>

                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 transition-all duration-300"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 transition-all duration-300"
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 mt-4">
                {students.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                            ? 'w-4 bg-purple-600'
                            : 'bg-gray-300 dark:bg-gray-700 hover:bg-purple-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

function StudentCard({ student, isActive }) {
    return (
        <div className={`
            relative flex flex-col items-start text-left rounded-3xl p-6 transition-all duration-500 min-h-[400px] border overflow-hidden group
            ${isActive
                ? 'bg-white dark:bg-white/10 backdrop-blur-xl border-purple-200 dark:border-purple-500/50 shadow-2xl dark:shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-100 z-10'
                : 'bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 opacity-70 scale-95 hover:opacity-100 hover:bg-white dark:hover:bg-white/10'
            }
        `}>

            {/* Header: Avatar + Info */}
            <div className="flex items-center gap-4 mb-6 w-full">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className={`w-16 h-16 rounded-full p-0.5 ${isActive ? 'bg-linear-to-tr from-purple-500 to-blue-500' : 'bg-gray-200 dark:bg-gray-700/50'}`}>
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                            <Image src={student.image} alt={student.name} fill className="object-cover" unoptimized />
                        </div>
                    </div>
                </div>

                {/* Name & Role */}
                <div className="flex flex-col">
                    <h3 className={`text-lg font-bold leading-tight ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                        {student.name}
                    </h3>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 mt-1">
                        {student.role}
                    </p>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Quote Icon */}
            <div className="mb-3">
                <Quote className={`w-8 h-8 ${isActive ? 'text-purple-500/20 dark:text-purple-500/30' : 'text-gray-300 dark:text-gray-700'}`} fill="currentColor" />
            </div>

            {/* Review Text */}
            <div className="mb-auto">
                <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                    {student.review}
                </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-5"></div>

            {/* Placed At Footer */}
            <div className="w-full">
                <div className="flex items-end justify-between">
                    <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mb-1">Placed At</p>
                    <div>
                        {student.logo ? (
                            <div className="h-12 max-w-[120px] relative flex items-center justify-end">
                                <Image
                                    src={student.logo}
                                    alt={student.placedAt}
                                    className="object-contain object-right h-full w-auto"
                                    height={50}
                                    width={70}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                <span className={`text-sm font-bold ${isActive ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {student.placedAt}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
