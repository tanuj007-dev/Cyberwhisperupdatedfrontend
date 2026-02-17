'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { AdminProvider } from '@/contexts/AdminContext';

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
            setIsAuthenticated(true);
        }
    }, [router]);

    // Role-based route protection: Student = blogs + view batches (no add/edit); Instructor = blogs + batches; Admin = all
    useEffect(() => {
        if (!isAuthenticated || typeof window === 'undefined') return;
        const role = localStorage.getItem('adminRole');
        const path = pathname || '';
        if (role === 'STUDENT') {
            const allowedBlogs = path.startsWith('/admin/blogs');
            const allowedBatchesList = path === '/admin/batches';
            const blockedBatchesModify = path.startsWith('/admin/batches/add') || path.startsWith('/admin/batches/edit');
            if (!allowedBlogs && !allowedBatchesList) {
                router.replace('/admin/blogs');
            } else if (blockedBatchesModify) {
                router.replace('/admin/batches');
            }
        } else if (role === 'INSTRUCTOR' && !path.startsWith('/admin/blogs') && !path.startsWith('/admin/batches') && !path.startsWith('/admin/courses') && !path.startsWith('/admin/course-enrollments') && !path.startsWith('/admin/upcoming-enrollments') && !path.startsWith('/admin/deploy-team-training')) {
            router.replace('/admin/blogs');
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
