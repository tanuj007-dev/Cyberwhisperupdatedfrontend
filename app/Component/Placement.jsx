'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gridImage from './assets/grid.webp';

// Import images from the people folder
import img1 from './assets/people/0c0c6eff176f94e2b6434557d4851c28698038ba.webp';
import img2 from './assets/people/16fb0a80f4751303be175bc69571e4e113a0f378.webp';
import img3 from './assets/people/2a81a256468c886be234e6b47b89f495d49d57c0.webp';
import img4 from './assets/people/2e065837623aca3bbab7d78e0db99ce0f08fb5e6.webp';
import img5 from './assets/people/3eb722ada9706815c52e177b990093ffb3652ba5.webp';
import img6 from './assets/people/4de258ab9e2fd76e0f938c041dc76be769934fd8.webp';
import img7 from './assets/people/61653c3deb47eccb79fb4ec492d6a80c9981534b.webp';
import img8 from './assets/people/780dde118751a786c91a2380f6549d8bc2e8fef4.webp';
import img9 from './assets/people/84f873944daa4d26e2da8e280524852537a9dc21.webp';
import img10 from './assets/people/8af80c194e23f9f7c0141316a23021c213f44671.webp';
import img11 from './assets/people/97d80a247fb5ac7e5ae5563d107fb3a21a9fda2c.webp';
import img12 from './assets/people/be232e00d0aea743f44c4cdaac3bb50f32c7e3e3.webp';
import img13 from './assets/people/c4cf36b1b38bee63f79d4693f4205b6b099090dd.webp';
import img14 from './assets/people/d858286ce4a38f3b78afeeb454a520f6219a326f.webp';
import img15 from './assets/people/e2d039e86864d4a8bdfd1b5df26b5280dd803f93.webp';
import img16 from './assets/people/e9916a167953d9bc0368deb59106fbf8db9fbe11.webp';




const students = [
    {
        name: 'Aditi Sharma (India)',
        role: 'SOC Analyst (L1)',
        review: '“The training didn’t feel like lectures. We worked like a real SOC—alerts, evidence, notes, and closure. That structure helped me stay calm in interviews.”',

        image: img1
    },
    {
        name: 'Rohan Mehta (India)',
        role: 'Security Analyst Intern',
        review: '“Mentor feedback changed everything for me. I learned how to explain my thinking instead of just giving answers. The labs made me faster at triage.”',

        image: img2
    },
    {
        name: 'Sneha Iyer (India)',
        role: 'Junior SOC Analyst',
        review: '“I finally understood what to do after an alert comes in. The workflow practice and reporting style made my profile stronger and more professional.”',

        image: img3
    },
    {
        name: 'Kunal Verma (India)',
        role: 'Cloud Security Trainee',
        review: '“Live sessions were very interactive. Whenever I got stuck, the mentor corrected my approach immediately. The labs helped me connect cloud basics with security.”',

        image: img4
    },
    {
        name: 'Priya Nair (India)',
        role: 'SOC Analyst Intern',
        review: '“Weekly checkpoints kept me consistent. By the end, I was confident reading logs, validating alerts, and writing clean investigation notes.”',

        image: img5
    },
    {
        name: 'Daniel Kim (USA)',
        role: 'Security Operations Associate',
        review: '“The best part was the practical investigation method. It improved how I validate alerts and document decisions. It felt job-focused, not theoretical.”',

        image: img6
    },
    {
        name: 'Emily Carter (UK)',
        role: 'Entry-Level SOC Analyst',
        review: '“I liked that it’s mentor-led. You can ask questions anytime and get real guidance. The labs made me confident in interviews because I had proof of work.”',

        image: img7
    },
    {
        name: 'Lucas Schneider (Germany)',
        role: 'Junior Security Analyst',
        review: '“Solid hands-on learning. The labs taught me how to reduce false positives and think clearly under pressure. It built real discipline.”',

        image: img8
    },
    {
        name: 'Sofia Martinez (Spain)',
        role: 'Cybersecurity Analyst Intern',
        review: '“It’s not one-way teaching. The live sessions and corrections helped me learn faster. I started understanding the ‘why’ behind each step.”',

        image: img9
    },
    {
        name: 'Ahmed Hassan (UAE)',
        role: 'SOC Analyst (L1)',
        review: '“The training is practice-first. I learned how to communicate findings clearly and present investigations properly. That was the key improvement for me.”',

        image: img10
    }
];

export default function Placement() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-gray-50 dark:bg-black font-sans overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
            <div className="relative w-full max-w-7xl h-[400px] flex items-center justify-center overflow-visible">
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
                    <div className="w-full max-w-[320px] md:max-w-[340px] z-20 scale-100 transition-all duration-500 ease-in-out">
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
            relative flex flex-col items-center text-center rounded-[1.5rem] p-6 transition-all duration-500 min-h-[380px] border
            ${isActive
                ? 'bg-gradient-to-b from-[#854CE6] to-[#6b35c5] text-white shadow-[0_20px_50px_rgba(133,76,230,0.4)] scale-105 border-transparent z-10'
                : 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-100 dark:border-white/10 shadow-xl opacity-90 hover:opacity-100'
            }
        `}>
            {/* Cyber Grid Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[1.5rem] overflow-hidden">
                <Image src={gridImage} alt="Grid" fill className="object-cover" />
            </div>

            {/* Glowing noise texture overlay */}
            {isActive && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            )}

            {/* Profile Image */}
            <div className={`mb-4 relative transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
                <div className={`
                    w-20 h-20 rounded-full p-1 shadow-lg
                    ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100 dark:bg-zinc-800'}
                 `}>
                    <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white dark:border-zinc-800">
                        <Image src={student.image} alt={student.name} fill className="object-cover" />
                    </div>
                </div>
                {/* Status Indicator */}
                <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
            </div>

            {/* Name */}
            <h3 className={`text-lg font-bold mb-0.5 ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {student.name}
            </h3>

            {/* Role */}
            <p className={`text-[9px] font-bold tracking-[0.2em] uppercase mb-3 ${isActive ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`}>
                {student.role}
            </p>

            {/* Quote */}
            <div className={`mb-auto text-[11px] italic leading-relaxed px-2 ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                {student.review}
            </div>


        </div>
    );
}
