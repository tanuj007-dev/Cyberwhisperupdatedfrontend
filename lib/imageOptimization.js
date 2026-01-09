import Image from 'next/image';

/**
 * OptimizedImage Component - Wrapper around Next.js Image with best practices
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      sizes={sizes}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}

/**
 * Get responsive image sizes
 */
export const getResponsiveImageSizes = (defaultWidth) => {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${defaultWidth}px`;
};

/**
 * Image quality optimization for different screen sizes
 */
export const getOptimizedImageQuality = (size = 'medium') => {
  const qualities = {
    thumbnail: 60,
    small: 70,
    medium: 80,
    large: 85,
    hero: 90,
  };
  return qualities[size] || 80;
};

/**
 * Convert image URLs to use Next.js image optimization
 */
export const optimizeImageUrl = (src) => {
  if (!src) return '';
  
  // Already an optimized image, return as is
  if (src.startsWith('/')) return src;
  
  return src;
};
