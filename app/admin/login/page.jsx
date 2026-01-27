'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (isAuth === 'true') {
            router.push('/admin/blogs');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate a brief network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === 'admin' && password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            router.push('/admin/blogs');
        } else {
            setError('Invalid credentials');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030014] relative overflow-hidden font-sans">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md p-4"
            >
                {/* Glassmorphism Card */}
                <div className="relative bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
                    {/* Top Decorative Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <motion.div
                            initial={{ rotate: -10, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-16 h-16 bg-linear-to-br from-purple-600 to-indigo-600 rounded-2xl rotate-3 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6 group transition-all duration-300 hover:rotate-6"
                        >
                            <ShieldCheck className="w-8 h-8 text-white -rotate-3 group-hover:-rotate-6 transition-all duration-300" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white tracking-tight text-center">
                            CyberWhisper
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide uppercase opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                            Admin Console
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-400 font-medium ml-1">Admin ID</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                    placeholder="Enter identifier"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-400 font-medium ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Access Dashboard
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-[10px] text-gray-600 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Secure System Encrypted
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
