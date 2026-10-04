// Accessibility Utilities

// Announce to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  let announcer = document.getElementById('a11y-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = '';
  setTimeout(() => {
    announcer!.textContent = message;
  }, 100);
};

// Focus management
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.dispatchEvent(new CustomEvent('close'));
    }
  };
  
  element.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if user prefers dark mode
export const prefersDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Check if user prefers high contrast
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Keyboard navigation helper
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  handlers: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) => {
  switch (event.key) {
    case 'Enter':
      handlers.onEnter?.();
      break;
    case ' ':
      event.preventDefault();
      handlers.onSpace?.();
      break;
    case 'Escape':
      handlers.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      handlers.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      handlers.onArrowDown?.();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      handlers.onArrowLeft?.();
      break;
    case 'ArrowRight':
      event.preventDefault();
      handlers.onArrowRight?.();
      break;
  }
};

// Generate accessible ID from text
export const generateAccessibleId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Check color contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

// Check if color combination meets WCAG AA standards
export const meetsWCAGAA = (foreground: string, background: string): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5; // Normal text
};

// Check if color combination meets WCAG AAA standards
export const meetsWCAGAAA = (foreground: string, background: string): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 7; // Normal text
};

// Skip to main content
export const setupSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-700 focus:text-white focus:rounded';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.setAttribute('tabindex', '-1');
  }
};
