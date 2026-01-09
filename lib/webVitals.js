// Web Vitals Performance Monitoring
export function reportWebVitals(metric) {
  // Only report in production
  if (process.env.NODE_ENV === 'production') {
    // Send metrics to your analytics service
    const body = JSON.stringify(metric);
    
    // Use `navigator.sendBeacon()` if available, fall back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', body);
    } else {
      fetch('/api/metrics', { 
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
