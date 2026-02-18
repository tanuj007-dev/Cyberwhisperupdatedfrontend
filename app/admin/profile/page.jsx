'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserIdFromToken } from '@/lib/jwt';
import { API_BASE_URL } from '@/lib/apiConfig';
import { adminFetch } from '@/lib/adminFetch';

export default function ProfilePage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('adminToken');
        let userId = token ? getUserIdFromToken(token) : null;

        const tryRedirect = (id) => {
            if (id != null) {
                router.replace(`/admin/users/edit/${id}`);
                return true;
            }
            return false;
        };

        if (tryRedirect(userId)) return;

        // Fallback: try GET /api/users/me to get current user id (adminFetch handles 401 → login)
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        adminFetch(`${base}/api/users/me`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                const id = data?.data?.id ?? data?.id ?? data?.user?.id;
                if (tryRedirect(id)) return;
                router.replace('/admin/blogs');
            })
            .catch(() => router.replace('/admin/blogs'));
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-violet-600 border-t-transparent" />
        </div>
    );
}
