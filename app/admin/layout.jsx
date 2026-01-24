'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function AdminLayoutPage({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return <AdminLayout>{children}</AdminLayout>;
}
