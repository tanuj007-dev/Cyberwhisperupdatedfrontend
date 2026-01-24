import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 text-center max-w-lg w-full mx-auto flex flex-col items-center">
                <div className="relative mb-6 group w-48 h-48 sm:w-64 sm:h-64">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                    <Image
                        src="/assets/cyber_robot_404.png"
                        alt="Cyber Robot 404"
                        fill
                        className="object-contain rounded-2xl drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                        priority
                    />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-blue-200 mb-3 pb-2 animate-in slide-in-from-bottom-4 duration-700">
                    Page Not Found
                </h1>

                <p className="text-slate-400 text-sm md:text-base mb-6 max-w-sm mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100 leading-relaxed">
                    Looks like you've ventured into the unknown digital void. This page doesn't exist in our database.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-8 duration-700 delay-200"
                >
                    <span>Return Home</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />
        </div>
    );
}
