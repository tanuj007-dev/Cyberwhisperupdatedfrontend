/**
 * Simple in-memory cache for API responses
 */
class CacheManager {
  constructor(maxSize = 50, maxAge = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.maxAge = maxAge;
  }

  set(key, value) {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if cache has expired
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.get(key) !== null;
  }
}

// Global cache instance
const globalCache = new CacheManager();

/**
 * Fetch with caching
 */
export async function cachedFetch(url, options = {}) {
  const { 
    cacheTime = 5 * 60 * 1000,
    cacheable = true,
    ...fetchOptions 
  } = options;

  // Check cache for GET requests
  if (cacheable && fetchOptions.method !== 'POST') {
    const cached = globalCache.get(url);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    // Cache successful responses
    if (cacheable && response.ok) {
      const cacheEntry = {
        data,
        timestamp: Date.now(),
      };
      globalCache.set(url, cacheEntry);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * React hook for cached data fetching
 */
import React from 'react';

export function useCachedFetch(url, options = {}) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await cachedFetch(url, options);
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, loading, error };
}

/**
 * Local storage cache with expiration
 */
export class LocalStorageCache {
  constructor(prefix = 'app_cache_') {
    this.prefix = prefix;
  }

  set(key, value, expiresIn = 24 * 60 * 60 * 1000) {
    const item = {
      value,
      expires: Date.now() + expiresIn,
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  get(key) {
    const item = localStorage.getItem(this.prefix + key);
    
    if (!item) {
      return null;
    }

    try {
      const parsed = JSON.parse(item);
      
      // Check if expired
      if (parsed.expires && Date.now() > parsed.expires) {
        this.remove(key);
        return null;
      }

      return parsed.value;
    } catch (e) {
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Export singleton instance
export const localStorageCache = new LocalStorageCache();

/**
 * Session storage cache (cleared when tab closes)
 */
export class SessionStorageCache {
  constructor(prefix = 'session_cache_') {
    this.prefix = prefix;
  }

  set(key, value) {
    sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  get(key) {
    const item = sessionStorage.getItem(this.prefix + key);
    return item ? JSON.parse(item) : null;
  }

  remove(key) {
    sessionStorage.removeItem(this.prefix + key);
  }

  clear() {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

// Export singleton instance
export const sessionStorageCache = new SessionStorageCache();

/**
 * Clear all caches
 */
export function clearAllCaches() {
  globalCache.clear();
  localStorageCache.clear();
  sessionStorageCache.clear();
}
