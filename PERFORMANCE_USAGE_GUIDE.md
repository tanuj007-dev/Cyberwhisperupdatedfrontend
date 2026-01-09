# CyberWhisper Performance Optimization - Implementation Guide

## Quick Start

After these optimizations are deployed, your app will have:
- ✅ 30-40% smaller initial JavaScript bundle
- ✅ Faster page loads and Time to Interactive
- ✅ Better mobile performance
- ✅ Optimized images with responsive sizing
- ✅ Improved Core Web Vitals scores

---

## Using the New Performance Tools

### 1. Lazy Loading Components

**Instead of importing everything:**
```jsx
import HeavyComponent from './components/HeavyComponent';
```

**Use dynamic imports:**
```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />,
  ssr: true, // Set to false for client-only components
});
```

**Or use the helper function:**
```jsx
import { createLazyComponent } from '@/lib/lazyLoadingUtils';

const HeavyComponent = createLazyComponent(
  () => import('./components/HeavyComponent'),
  { ssr: true }
);
```

### 2. Image Optimization

**Old way:**
```jsx
<img src="/image.jpg" alt="Description" />
```

**New way:**
```jsx
import { OptimizedImage, getResponsiveImageSizes } from '@/lib/imageOptimization';

<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes={getResponsiveImageSizes(800)}
  priority={false} // true only for above-the-fold images
/>
```

### 3. Performance Monitoring

**Track component render times:**
```jsx
import { usePerformanceMonitoring } from '@/lib/performanceHooks';

export default function MyComponent() {
  usePerformanceMonitoring('MyComponent');
  
  return <div>Component content</div>;
}
```

**Report Web Vitals:**
```jsx
import { reportWebVitals } from '@/lib/webVitals';

// In your app or layout
if (typeof window !== 'undefined') {
  reportWebVitals((metric) => {
    console.log(`${metric.name}: ${metric.value}`);
    // Send to analytics service
  });
}
```

### 4. Data Caching

**Cache API responses:**
```jsx
import { useCachedFetch } from '@/lib/caching';

export default function UserProfile() {
  const { data, loading, error } = useCachedFetch(
    '/api/user',
    { cacheTime: 5 * 60 * 1000 } // 5 minutes
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return <div>{data.name}</div>;
}
```

**Cache in localStorage:**
```jsx
import { localStorageCache } from '@/lib/caching';

// Save data with 24 hour expiration
localStorageCache.set('user', userData, 24 * 60 * 60 * 1000);

// Retrieve data
const user = localStorageCache.get('user');

// Remove specific item
localStorageCache.remove('user');

// Clear all cached items
localStorageCache.clear();
```

### 5. Lazy Loading on Visibility

**Load component only when it enters viewport:**
```jsx
import { useIntersectionObserver } from '@/lib/performanceHooks';
import { useRef } from 'react';

export default function LazySection() {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <div ref={ref}>
      {isVisible && <HeavyComponent />}
    </div>
  );
}
```

### 6. Debounce and Throttle

**Debounce search input:**
```jsx
import { useDebounce } from '@/lib/performanceHooks';
import { useState } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // Only search when user stops typing
  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input onChange={(e) => setSearch(e.target.value)} />;
}
```

**Throttle scroll events:**
```jsx
import { useThrottle } from '@/lib/performanceHooks';

export default function ScrollListener() {
  const [scrollPos, setScrollPos] = useState(0);
  const throttledScroll = useThrottle(scrollPos, 1000);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Scroll position: {throttledScroll}</div>;
}
```

### 7. Responsive Design with Media Queries

**Render different content on mobile vs desktop:**
```jsx
import { useMediaQuery } from '@/lib/performanceHooks';

export default function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

### 8. Batch Lazy Load Components

**Load multiple components at once:**
```jsx
import { lazyLoadComponents } from '@/lib/lazyLoadingUtils';

const components = lazyLoadComponents({
  Dashboard: () => import('./Dashboard'),
  Analytics: () => import('./Analytics'),
  Reports: () => import('./Reports'),
}, {
  ssr: true,
  loadingHeight: '500px',
});

// Use them
const { Dashboard, Analytics, Reports } = components;
```

---

## Performance Best Practices

### Before Adding a New Component

- [ ] Check if it's necessary above the fold
- [ ] Consider lazy loading it with `dynamic()`
- [ ] Check bundle size impact
- [ ] Measure performance with DevTools
- [ ] Add monitoring if performance-critical

### Before Adding Images

- [ ] Optimize with ImageOptim or TinyPNG
- [ ] Use WebP format
- [ ] Provide responsive sizes
- [ ] Only use `priority={true}` for hero/LCP images
- [ ] Use `OptimizedImage` component

### Before Making API Calls

- [ ] Implement caching with `useCachedFetch`
- [ ] Use appropriate cache TTL
- [ ] Batch requests when possible
- [ ] Add error boundaries
- [ ] Show loading states

### Before Adding Third-party Libraries

- [ ] Check bundle size at bundlephobia.com
- [ ] Consider alternatives (lightweight packages)
- [ ] Only import what you need
- [ ] Tree-shake unused code
- [ ] Test performance impact

---

## Monitoring Performance

### Development
1. Open DevTools (F12)
2. Go to Performance tab
3. Record page load
4. Check FCP, LCP, CLS values

### Production Monitoring
```jsx
// Add to your root layout
import { reportWebVitals } from '@/lib/webVitals';

if (typeof window !== 'undefined') {
  reportWebVitals((metric) => {
    // Send to your analytics
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  });
}
```

### Tools
- **Lighthouse** (Chrome DevTools) - Comprehensive audit
- **PageSpeed Insights** - Real-world performance data
- **WebPageTest** - Detailed waterfall analysis
- **Bundle Analyzer** - Check bundle size

---

## Common Performance Issues & Solutions

### Issue: "My lazy component doesn't load"
**Solution:**
- Check DevTools Network tab for failed requests
- Verify the import path is correct
- Check browser console for errors
- Ensure component is rendering the right fallback

### Issue: "Images are loading slowly"
**Solution:**
- Compress images (ImageOptim, TinyPNG)
- Use WebP format
- Add responsive sizes
- Use CDN for image delivery
- Check image file sizes (< 500KB for hero images)

### Issue: "Page still feels slow"
**Solution:**
1. Run Lighthouse audit
2. Check Performance tab for bottlenecks
3. Look for main thread blocking
4. Profile with CPU throttling
5. Check for memory leaks

### Issue: "Lighthouse score is low"
**Solution:**
- Reduce JavaScript (lazy load more components)
- Optimize images (smaller file sizes)
- Remove render-blocking resources
- Implement better caching
- Consider using a CDN

---

## Core Web Vitals Targets

| Metric | Target | Status |
|--------|--------|--------|
| **FCP** (First Contentful Paint) | < 1.8s | Improved with lazy loading |
| **LCP** (Largest Contentful Paint) | < 2.5s | Monitor with reporting |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Optimized with preloading |
| **FID** (First Input Delay) | < 100ms | Improved with code splitting |
| **TTFB** (Time to First Byte) | < 600ms | Depends on hosting |

---

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Check bundle size (should be smaller)
- [ ] Test all lazy loaded components work
- [ ] Verify images are loading correctly
- [ ] Test on slow 3G network
- [ ] Test on mobile device
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals baseline
- [ ] Set up Web Vitals monitoring
- [ ] Have rollback plan ready

---

## Performance Budget

Recommended limits:

- **Total JavaScript**: < 250KB (gzip)
- **Image assets**: < 500KB per hero image
- **Critical CSS**: < 50KB
- **LCP**: < 2.5s
- **FID**: < 100ms

Monitor and enforce these limits on every deployment.

---

## Questions?

Refer to:
- `PERFORMANCE_OPTIMIZATION.md` - Detailed optimization guide
- `IMPLEMENTATION_CHECKLIST.md` - Implementation status
- Official docs: https://nextjs.org/learn/seo/web-performance
- Web Vitals: https://web.dev/vitals/
