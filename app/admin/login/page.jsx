'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (isAuth === 'true') {
            router.push('/admin/blogs');
        }
    }, [router]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (id === 'admin' && password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            // Redirect to the dashboard or previous page
            router.push('/admin/blogs');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
                    <p className="text-gray-600 mt-2">Please login to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Admin ID
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter login ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
