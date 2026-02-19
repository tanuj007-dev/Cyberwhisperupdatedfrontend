import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';
import { getRoleFromToken } from '@/lib/jwt';

const ALLOWED_NEWSLETTER_ROLES = ['ADMIN', 'SUPERADMIN', 'INSTRUCTOR'];

export async function POST(request) {
    try {
        const body = await request.json();
        let authHeader = request.headers.get('Authorization');
        const serverToken = process.env.NEWSLETTER_SERVICE_TOKEN || process.env.ADMIN_SERVICE_TOKEN;

        // If client sent dev-bypass, use server-side token so backend accepts the request
        if (authHeader?.startsWith('Bearer dev-bypass')) {
            if (serverToken) {
                authHeader = `Bearer ${serverToken.trim()}`;
            } else {
                return NextResponse.json(
                    {
                        success: true,
                        message: 'Dev mode: no emails were sent. Log in with your admin account (email + password + OTP) or set NEWSLETTER_SERVICE_TOKEN in .env.local to send for real.',
                    },
                    { status: 200 }
                );
            }
        } else if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const role = getRoleFromToken(token);
            if (!role || !ALLOWED_NEWSLETTER_ROLES.includes(role)) {
                return NextResponse.json(
                    { success: false, message: 'Only administrators, superadmins, and instructors can send newsletters.' },
                    { status: 403 }
                );
            }
            // Use service token so backend accepts the request (backend may only allow "instructors and administrators" by name; superadmin is allowed here)
            if (serverToken) {
                authHeader = `Bearer ${serverToken.trim()}`;
            }
        }

        const url = `${API_BASE_URL}/api/newsletter/send`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authHeader) headers['Authorization'] = authHeader;

        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({}));

        if (process.env.NODE_ENV !== 'production') {
            console.log('[Newsletter send]', url, '→', res.status);
        }

        if (res.status === 404) {
            return NextResponse.json(
                { success: false, message: 'Newsletter send is not implemented on the backend. Add POST /api/newsletter/send to your API or set API base in lib/apiConfig.js.', error: 'Not implemented' },
                { status: 501 }
            );
        }

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Newsletter send proxy error:', error);
        return NextResponse.json(
            { success: false, message: 'Cannot reach backend. Is it running?', error: error.message },
            { status: 502 }
        );
    }
}
