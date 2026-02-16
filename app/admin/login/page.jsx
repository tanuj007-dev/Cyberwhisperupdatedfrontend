'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight, AlertCircle, ShieldCheck, Mail, KeyRound, Info, UserPlus, X, Upload, Loader2 } from 'lucide-react';
import { getRoleFromToken } from '@/lib/jwt';
import { Toast } from '@/components/ui';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function AdminLogin() {
    const [step, setStep] = useState('login'); // 'login' | 'otp'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        first_name: '', last_name: '', email: '', phone: '', password: '',
        title: '', address: '', biography: '', linkedin_url: '', github_url: '',
        role: 'STUDENT', is_instructor: false, profile_image_url: ''
    });
    const [registerErrors, setRegisterErrors] = useState({});
    const [registerSubmitting, setRegisterSubmitting] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [profileImageUploading, setProfileImageUploading] = useState(false);
    const [profileImageError, setProfileImageError] = useState('');
    const [profileDragOver, setProfileDragOver] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (isAuth === 'true') {
            router.push('/admin/blogs');
        }
    }, [router]);

    // Resend OTP cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearInterval(t);
    }, [resendCooldown]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const trimmedEmail = email.trim();
        const trimmedPassword = typeof password === 'string' ? password.trim() : password;

        if (!trimmedEmail) {
            setError('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Please enter a valid email address (e.g. you@example.com).');
            return;
        }
        if (!trimmedPassword) {
            setError('Please enter your password.');
            return;
        }

        setIsLoading(true);
        try {
            const payload = { email: trimmedEmail, password: trimmedPassword };
            const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const serverMsg = data?.message || data?.error || '';
                const msg = res.status === 404
                    ? 'Login endpoint not found (404). Set API base in lib/apiConfig.js or NEXT_PUBLIC_BACKEND_API_URL in .env.local and ensure the backend is running.'
                    : res.status === 401
                        ? serverMsg
                            ? `${serverMsg} Use an account with admin role and the correct password.`
                            : 'Invalid email or password. Use an admin account and ensure the API base in lib/apiConfig.js points to your backend.'
                        : (serverMsg || `Login failed (${res.status})`);
                setError(msg);
                return;
            }

            const token = data?.token ?? data?.accessToken ?? data?.data?.token;
            const needsOtp =
                data?.requiresOtp === true ||
                data?.requiresOTP === true ||
                data?.data?.requiresOTP === true ||
                data?.otp_required === true ||
                (data?.message && /otp|mfa|2fa|verification|sent/i.test(data.message)) ||
                (res.ok && !token && (data?.message || data?.success));

            if (needsOtp) {
                setStep('otp');
                setError('');
            } else if (token) {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminToken', token);
                const role = getRoleFromToken(token);
                if (role) localStorage.setItem('adminRole', role);
                router.push('/admin/blogs');
            } else {
                setError('Invalid response from server. Please try again.');
            }
        } catch (err) {
            setError(err?.message || 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otpCode.trim()) {
            setError('Please enter the OTP code.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email: email.trim(), otp_code: otpCode.trim() }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.message || data?.error || `Verification failed (${res.status})`);
                return;
            }

            const token = data?.token ?? data?.accessToken ?? data?.data?.token;
            if (token) {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminToken', token);
                const role = getRoleFromToken(token);
                if (role) localStorage.setItem('adminRole', role);
                router.push('/admin/blogs');
            } else {
                setError('Invalid response from server. Please try again.');
            }
        } catch (err) {
            setError(err?.message || 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.message || data?.error || 'Failed to resend OTP.');
                return;
            }
            setResendCooldown(60);
            setError('');
            setOtpCode('');
        } catch (err) {
            setError(err?.message || 'Network error.');
        }
    };

    const backToLogin = () => {
        setStep('login');
        setOtpCode('');
        setError('');
    };

    // Development only: skip OTP and enter admin panel (any email that passed Step 1). Backend APIs may require a real token.
    const isDevSkipOtpEnabled =
        typeof window !== 'undefined' &&
        (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ADMIN_SKIP_OTP_DEV === 'true');

    const handleSkipOtpDev = () => {
        if (!isDevSkipOtpEnabled) return;
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminToken', 'dev-bypass');
        localStorage.setItem('adminRole', 'ADMIN');
        router.push('/admin/blogs');
    };

    // Development only: log in without calling the backend (guaranteed access to admin panel UI).
    const isDevLoginEnabled =
        typeof window !== 'undefined' &&
        (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ADMIN_DEV_LOGIN === 'true');

    const handleDevLogin = () => {
        if (!isDevLoginEnabled) return;
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminToken', 'dev-bypass');
        localStorage.setItem('adminRole', 'ADMIN');
        router.push('/admin/blogs');
    };

    const registerChange = (e) => {
        const { name, value, checked, type } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (registerErrors[name]) setRegisterErrors((prev) => ({ ...prev, [name]: '' }));
    };
    
    const uploadProfileImage = async (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setProfileImageError('Please choose an image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setProfileImageError('Image must be under 5MB.');
            return;
        }
        setProfileImageError('');
        setProfileImageUploading(true);
        try {
            const formData = new FormData();
            formData.append('profile', file);
            const res = await fetch('/api/users/upload-profile', { method: 'POST', body: formData });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setProfileImageError(data?.message || data?.error || 'Upload failed');
                return;
            }
            const url = data.profile_image_url || data.url;
            if (url) setRegisterForm((prev) => ({ ...prev, profile_image_url: url }));
        } catch (err) {
            setProfileImageError(err?.message || 'Upload failed');
        } finally {
            setProfileImageUploading(false);
        }
    };
    const handleProfileDrop = (e) => {
        e.preventDefault();
        setProfileDragOver(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) uploadProfileImage(file);
    };
    const handleProfileFileInput = (e) => {
        const file = e.target?.files?.[0];
        if (file) uploadProfileImage(file);
        e.target.value = '';
    };
    const validateRegister = () => {
        const err = {};
        if (!registerForm.first_name.trim()) err.first_name = 'Required';
        if (!registerForm.last_name.trim()) err.last_name = 'Required';
        if (!registerForm.email.trim()) err.email = 'Required';
        if (registerForm.email && !/\S+@\S+\.\S+/.test(registerForm.email)) err.email = 'Invalid email';
        if (!registerForm.phone.trim()) err.phone = 'Required';
        if (!registerForm.password.trim()) err.password = 'Required';
        setRegisterErrors(err);
        return Object.keys(err).length === 0;
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterSuccess('');
        if (!validateRegister()) return;
        setRegisterSubmitting(true);
        try {
            const payload = {
                first_name: registerForm.first_name.trim(),
                last_name: registerForm.last_name.trim(),
                email: registerForm.email.trim(),
                phone: registerForm.phone.trim(),
                password: registerForm.password,
                title: registerForm.title.trim() || undefined,
                address: registerForm.address.trim() || undefined,
                biography: registerForm.biography.trim() || undefined,
                linkedin_url: registerForm.linkedin_url.trim() || undefined,
                github_url: registerForm.github_url.trim() || undefined,
                role: registerForm.role,
                is_instructor: registerForm.is_instructor,
                profile_image_url: registerForm.profile_image_url.trim() || undefined,
                skills: registerForm.skills
            };
            const res = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setRegisterErrors({ submit: data?.message || data?.error || `Failed (${res.status})` });
                setRegisterSubmitting(false);
                return;
            }
            setRegisterForm({
                first_name: '', last_name: '', email: '', phone: '', password: '',
                title: '', address: '', biography: '', linkedin_url: '', github_url: '',
                role: 'STUDENT', is_instructor: false, profile_image_url: '', skills: []
            });
            setRegisterSkillInput('');
            setRegisterErrors({});
            setRegisterSuccess('');
            setToast({ isVisible: true, message: 'Register successfully', type: 'success' });
            setRegisterOpen(false);
            setTimeout(() => {
                setToast((t) => ({ ...t, isVisible: false }));
                router.push('/admin/login');
            }, 2000);
        } catch (err) {
            setRegisterErrors({ submit: err?.message || 'Network error' });
        } finally {
            setRegisterSubmitting(false);
        }
    };

    const inputClass = 'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm';
    const labelClass = 'block text-xs text-gray-400 font-medium mb-1';

    useEffect(() => {
        if (!registerOpen) return;
        const onEscape = (e) => { if (e.key === 'Escape') setRegisterOpen(false); };
        window.addEventListener('keydown', onEscape);
        return () => window.removeEventListener('keydown', onEscape);
    }, [registerOpen]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030014] relative overflow-hidden font-sans">
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
                <div className="relative bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />

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
                        <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide uppercase">
                            Admin Console
                        </p>
                        <div className="flex gap-2 mt-3">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${step === 'login' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500'}`}>
                                Step 1
                            </span>
                            <span className="text-gray-600">→</span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${step === 'otp' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500'}`}>
                                Step 2 OTP
                            </span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'login' && (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25 }}
                                onSubmit={handleLogin}
                                className="space-y-5"
                            >
                                {error && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2"
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </motion.div>
                                         
                                    </>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-400 font-medium ml-1">Email</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                            placeholder="admin@example.com"
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

                                <p className="text-xs text-gray-500 text-center -mb-1">
                                    If MFA is enabled, you’ll get a code by email on the next screen.
                                </p>
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
                                            Sign in
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                                <p className="mt-3 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setRegisterOpen(true)}
                                        className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Register
                                    </button>
                                </p>
                               
                            </motion.form>
                        )}

                        {step === 'otp' && (
                            <motion.form
                                key="otp"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.25 }}
                                onSubmit={handleVerifyOtp}
                                className="space-y-5"
                            >
                                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-2">
                                    <p className="text-xs font-medium text-purple-300 text-center">
                                        Step 2: Enter the OTP sent to your email
                                    </p>
                                </div>
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

                                <p className="text-gray-400 text-sm text-center">
                                    Enter the 6-digit code sent to <span className="text-white font-medium">{email}</span>
                                </p>

                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-400 font-medium ml-1">OTP Code</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-center text-lg tracking-[0.5em] font-mono"
                                            placeholder="000000"
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
                                            Verify OTP
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={resendCooldown > 0}
                                        className="text-sm text-purple-400 hover:text-purple-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                                    </button>
                                    <span className="text-gray-600 hidden sm:inline">·</span>
                                    <button
                                        type="button"
                                        onClick={backToLogin}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Back to login
                                    </button>
                                </div>
                                {isDevSkipOtpEnabled && (
                                    <div className="pt-2 border-t border-white/5">
                                        <button
                                            type="button"
                                            onClick={handleSkipOtpDev}
                                            className="w-full text-xs text-amber-400/90 hover:text-amber-300 transition-colors"
                                        >
                                            Dev: Skip OTP and use any email
                                        </button>
                                    </div>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-[10px] text-gray-600 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Secure System · MFA Enabled
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Register modal */}
            <AnimatePresence>
                {registerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setRegisterOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-purple-400" />
                                    Register new account
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setRegisterOpen(false)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleRegisterSubmit} className="flex flex-col flex-1 min-h-0">
                                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                                    {registerErrors.submit && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {registerErrors.submit}
                                        </div>
                                    )}
                                    {registerSuccess && (
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-sm">
                                            {registerSuccess}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>First name *</label>
                                            <input name="first_name" value={registerForm.first_name} onChange={registerChange} className={inputClass} placeholder="John" />
                                            {registerErrors.first_name && <p className="mt-1 text-xs text-red-400">{registerErrors.first_name}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Last name *</label>
                                            <input name="last_name" value={registerForm.last_name} onChange={registerChange} className={inputClass} placeholder="Doe" />
                                            {registerErrors.last_name && <p className="mt-1 text-xs text-red-400">{registerErrors.last_name}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Title</label>
                                        <input name="title" value={registerForm.title} onChange={registerChange} className={inputClass} placeholder="e.g. Senior Security Engineer" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Email *</label>
                                            <input name="email" type="email" value={registerForm.email} onChange={registerChange} className={inputClass} placeholder="you@example.com" />
                                            {registerErrors.email && <p className="mt-1 text-xs text-red-400">{registerErrors.email}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Phone *</label>
                                            <input name="phone" value={registerForm.phone} onChange={registerChange} className={inputClass} placeholder="+1234567890" />
                                            {registerErrors.phone && <p className="mt-1 text-xs text-red-400">{registerErrors.phone}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Password *</label>
                                        <input name="password" type="password" value={registerForm.password} onChange={registerChange} className={inputClass} placeholder="••••••••" />
                                        {registerErrors.password && <p className="mt-1 text-xs text-red-400">{registerErrors.password}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>Address</label>
                                        <input name="address" value={registerForm.address} onChange={registerChange} className={inputClass} placeholder="123 Cyber Street, Tech City" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Profile image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="register-profile-upload"
                                            onChange={handleProfileFileInput}
                                            disabled={profileImageUploading}
                                        />
                                        {registerForm.profile_image_url ? (
                                            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <img src={registerForm.profile_image_url} alt="Profile" className="w-12 h-12 rounded-full object-cover shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 truncate">Uploaded (saved to CDN)</p>
                                                    <p className="text-xs text-white truncate">{registerForm.profile_image_url}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setRegisterForm((prev) => ({ ...prev, profile_image_url: '' }))}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
                                                    aria-label="Remove photo"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onDragOver={(e) => { e.preventDefault(); setProfileDragOver(true); }}
                                                onDragLeave={() => setProfileDragOver(false)}
                                                onDrop={handleProfileDrop}
                                                onClick={() => document.getElementById('register-profile-upload')?.click()}
                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('register-profile-upload')?.click(); } }}
                                                className={`flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${profileDragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
                                            >
                                                {profileImageUploading ? (
                                                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-gray-500" />
                                                )}
                                                <span className="text-sm text-gray-400">
                                                    {profileImageUploading ? 'Uploading…' : 'Drag & drop or click to upload'}
                                                </span>
                                                <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                            </div>
                                        )}
                                        {profileImageError && <p className="mt-1 text-xs text-red-400">{profileImageError}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>Biography</label>
                                        <textarea name="biography" value={registerForm.biography} onChange={registerChange} rows={3} className={inputClass + ' resize-none'} placeholder="Brief bio" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Skills</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={registerSkillInput}
                                                onChange={(e) => setRegisterSkillInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRegisterSkill())}
                                                className={inputClass + ' flex-1'}
                                                placeholder="Add skill, press Enter"
                                            />
                                            <button type="button" onClick={addRegisterSkill} className="px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium text-white transition-colors">
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {registerForm.skills.map((s, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs">
                                                    {s}
                                                    <button type="button" onClick={() => removeRegisterSkill(s)} className="hover:text-white" aria-label={`Remove ${s}`}><X className="w-3 h-3" /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>LinkedIn URL</label>
                                            <input name="linkedin_url" value={registerForm.linkedin_url} onChange={registerChange} className={inputClass} placeholder="https://linkedin.com/in/..." />
                                        </div>
                                        <div>
                                            <label className={labelClass}>GitHub URL</label>
                                            <input name="github_url" value={registerForm.github_url} onChange={registerChange} className={inputClass} placeholder="https://github.com/..." />
                                        </div>
                                    </div>
                                    <div>
                                        <span className={labelClass}>Role</span>
                                        <div className="flex gap-4 mt-2">
                                            {['STUDENT', 'INSTRUCTOR'].map((r) => (
                                                <label key={r} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="role" value={r} checked={registerForm.role === r} onChange={registerChange} className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm text-gray-300">{r}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        
                                        
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 shrink-0">
                                    <button type="button" onClick={() => setRegisterOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={registerSubmitting}
                                        className="px-5 py-2.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {registerSubmitting ? 'Creating…' : 'Create account'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
            />
        </div>
    );
}
