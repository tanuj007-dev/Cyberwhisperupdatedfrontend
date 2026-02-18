'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { isTokenExpired, clearAdminSessionAndRedirect } from '@/lib/adminAuth';
import { Loader2 } from 'lucide-react';

function AdminDataLoader() {
    const { loading } = useAdmin();
    if (!loading) return null;
    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
            <Loader2 className="w-5 h-5 text-violet-600 animate-spin shrink-0" aria-hidden />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading…</span>
        </div>
    );
}

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (isAuth !== 'true') {
            router.push('/admin/login');
        } else {
            const token = localStorage.getItem('adminToken');
            if (isTokenExpired(token)) {
                clearAdminSessionAndRedirect();
                return;
            }
            setIsAuthenticated(true);
        }
    }, [router]);

    // Proactive session expiry check: re-check token periodically and on window focus
    useEffect(() => {
        if (!isAuthenticated || typeof window === 'undefined') return;
        const checkExpiry = () => {
            const token = localStorage.getItem('adminToken');
            if (isTokenExpired(token)) clearAdminSessionAndRedirect();
        };
        const interval = setInterval(checkExpiry, 60 * 1000); // every 60s
        window.addEventListener('focus', checkExpiry);
        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', checkExpiry);
        };
    }, [isAuthenticated]);

    // Role-based route protection: Student = blogs + profile only; Instructor = blogs, batches, courses, enrollments, profile; Admin = all
    useEffect(() => {
        if (!isAuthenticated || typeof window === 'undefined') return;
        const role = localStorage.getItem('adminRole');
        const path = (pathname || '').replace(/\/$/, '');
        if (role === 'STUDENT') {
            const allowed = path.startsWith('/admin/blogs') || path === '/admin/profile' || path.startsWith('/admin/users/edit');
            if (!allowed) router.replace('/admin/blogs');
        } else if (role === 'INSTRUCTOR') {
            const allowed =
                path.startsWith('/admin/blogs') ||
                path.startsWith('/admin/batches') ||
                path.startsWith('/admin/courses') ||
                path.startsWith('/admin/course-enrollments') ||
                path.startsWith('/admin/upcoming-enrollments') ||
                path.startsWith('/admin/deploy-team-training') ||
                path === '/admin/profile' ||
                path.startsWith('/admin/users/edit');
            if (!allowed) router.replace('/admin/blogs');
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <AdminProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
                {/* Background Pattern */}
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent pointer-events-none" />
                <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                {/* Global loader when context is fetching data (e.g. users, blogs) */}
                <AdminDataLoader />

                {/* Main Content Area */}
                <div className="lg:ml-72 min-h-screen flex flex-col relative">
                    {/* Header */}
                    {/* <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}

                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-8">
                        {children}
                    </main>


                </div>
            </div>
        </AdminProvider>
    );
};

export default AdminLayout;
