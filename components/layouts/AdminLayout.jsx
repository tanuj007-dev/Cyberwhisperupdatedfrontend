'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AdminProvider } from '@/contexts/AdminContext';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                    <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-8">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/80 py-4 px-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <p className="text-sm text-gray-600">
                                © 2026 <span className="font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">CyberWhisper</span>. All rights reserved.
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                Built with <span className="text-rose-500">❤</span> using Next.js & Tailwind CSS
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </AdminProvider>
    );
};

export default AdminLayout;
