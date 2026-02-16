/**
 * Global API base URL for all backend requests (client and server).
 * Server: BACKEND_API_URL or ADMIN_BACKEND_URL in .env
 * Client: NEXT_PUBLIC_BACKEND_API_URL in .env.local
 */
const DEFAULT_API_BASE = 'https://darkred-mouse-801836.hostingersite.com';
export const API_BASE_URL =
  typeof process !== 'undefined' && process.env
    ? (process.env.BACKEND_API_URL ||
       process.env.ADMIN_BACKEND_URL ||
       process.env.NEXT_PUBLIC_BACKEND_API_URL ||
       DEFAULT_API_BASE)
    : DEFAULT_API_BASE;
