// Performance Optimization Utilities

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.dataset.src;
        
        if (src) {
          image.src = src;
          image.classList.add('loaded');
          observer.unobserve(image);
        }
      }
    });
  });
  
  images.forEach(image => imageObserver.observe(image));
};

// Preload critical resources
export const preloadResource = (url: string, as: 'image' | 'script' | 'style' | 'font') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
};

// Prefetch next page resources
export const prefetchPage = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// Measure performance
export const measurePerformance = (name: string, callback: () => void) => {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
};

// Virtual scroll helper
export const getVisibleRange = (
  scrollTop: number,
  itemHeight: number,
  containerHeight: number,
  totalItems: number,
  overscan: number = 5
) => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalItems,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  return { startIndex, endIndex };
};

// Image optimization
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Compress image
export const compressImage = (
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Could not compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Cache API helper
export const cacheResource = async (cacheName: string, url: string, response: Response) => {
  const cache = await caches.open(cacheName);
  await cache.put(url, response);
};

export const getCachedResource = async (cacheName: string, url: string) => {
  const cache = await caches.open(cacheName);
  return await cache.match(url);
};

// Request idle callback polyfill
export const requestIdleCallback = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(callback);
  }
  return setTimeout(callback, 1);
};

// Memory management
export const cleanupObjectURL = (url: string) => {
  URL.revokeObjectURL(url);
};

// Batch DOM updates
export const batchDOMUpdates = (updates: (() => void)[]) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

// Web Worker helper
export const createWorker = (workerFunction: Function) => {
  const blob = new Blob([
    `self.onmessage = function(e) {
      const result = (${workerFunction.toString()})(e.data);
      self.postMessage(result);
    }`
  ], { type: 'application/javascript' });
  
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  
  return {
    postMessage: (data: any) => worker.postMessage(data),
    onMessage: (callback: (data: any) => void) => {
      worker.onmessage = (e) => callback(e.data);
    },
    terminate: () => {
      worker.terminate();
      URL.revokeObjectURL(url);
    }
  };
};
