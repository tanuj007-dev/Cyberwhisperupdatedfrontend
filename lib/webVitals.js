import { API_BASE_URL } from '@/lib/apiConfig';

// Web Vitals Performance Monitoring
export function reportWebVitals(metric) {
  // Only report in production
  if (process.env.NODE_ENV === 'production') {
    const base = (API_BASE_URL || '').replace(/\/$/, '');
    const url = base ? `${base}/api/metrics` : '/api/metrics';
    const body = JSON.stringify(metric);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { 
        body, 
        method: 'POST', 
        keepalive: true,
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {
        // Silently fail if analytics fails
      });
    }
  }

  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}

export function getCoreWebVitals() {
  // VisibilityChangeListener
  let hidden;
  let visibilityChange;

  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  }

  return { hidden, visibilityChange };
}

// Optimize performance by deferring non-critical JavaScript
export function deferNonCriticalCode(callback, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, timeout);
  }
}
