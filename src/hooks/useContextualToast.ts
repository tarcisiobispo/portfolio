import { useCallback } from 'react';

interface ToastOptions {
  message: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastPosition {
  top: number;
  left: number;
}

export const useContextualToast = () => {  
  const showToast = useCallback((element: HTMLElement | null, options: ToastOptions) => {
    if (!element) return;

    // Remove existing toast if present
    const existingToast = document.querySelector('[data-contextual-toast]');
    if (existingToast) {
      existingToast.remove();
    }

    // Calculate element position relative to viewport
    const rect = element.getBoundingClientRect();
    
    // Position directly below the triggering button with consistent 8px margin
    const position: ToastPosition = {
      top: rect.bottom + 8, // 8px margin for consistent spacing
      left: rect.left + (rect.width / 2)
    };

    // Create toast element
    const toast = document.createElement('div');
    toast.setAttribute('data-contextual-toast', 'true');
    toast.className = `
      fixed z-[10000] pointer-events-auto
      bg-[var(--color-surface)] border border-[var(--color-border)]
      rounded-lg shadow-xl backdrop-blur-sm
      px-3 py-2 max-w-xs text-sm
      transform -translate-x-1/2
      animate-in slide-in-from-top-2 duration-300
      transition-all ease-out
    `;
    
    // Add a subtle glow effect to make it more visible
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 20px rgba(0, 0, 0, 0.05)';

    // Apply colors based on type
    const typeClasses = {
      success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100',
      error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-100',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100',
      info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100'
    };

    if (options.type && typeClasses[options.type]) {
      toast.className += ` ${typeClasses[options.type]}`;
    }

    // Position the toast
    toast.style.top = `${position.top}px`;
    toast.style.left = `${position.left}px`;

    // Compact toast content
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm leading-tight">
            ${options.message}
          </div>
          ${options.description ? `
            <div class="text-xs opacity-75 mt-0.5 leading-tight">
              ${options.description}
            </div>
          ` : ''}
        </div>
        <button
          class="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
          onclick="this.parentElement.parentElement.remove()"
          aria-label="Close notification"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Adjust position if outside viewport
    const toastRect = toast.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust horizontally if needed
    if (toastRect.right > viewportWidth - 16) {
      toast.style.left = `${viewportWidth - toastRect.width - 16}px`;
      toast.style.transform = 'none';
    } else if (toastRect.left < 16) {
      toast.style.left = '16px';
      toast.style.transform = 'none';
    }

    // Adjust vertically if needed (show above element with consistent 8px margin)
    if (toastRect.bottom > viewportHeight - 16) {
      toast.style.top = `${rect.top - toastRect.height - 8}px`; // 8px margin for consistency
    }
    
    // Add a scroll event listener to keep the toast with the button
    const updateToastPosition = () => {
      if (!toast.parentElement) {
        window.removeEventListener('scroll', updateToastPosition);
        return;
      }
      
      // Get the current position of the element
      const updatedRect = element.getBoundingClientRect();
      
      // Update toast position
      if (toast.style.top.includes(`${rect.top - toastRect.height - 8}px`)) {
        // If toast is above the button
        toast.style.top = `${updatedRect.top - toastRect.height - 8}px`;
      } else {
        // If toast is below the button
        toast.style.top = `${updatedRect.bottom + 8}px`;
      }
      
      // Update horizontal position
      if (!toast.style.transform.includes('none')) {
        toast.style.left = `${updatedRect.left + (updatedRect.width / 2)}px`;
      }
    };
    
    window.addEventListener('scroll', updateToastPosition, { passive: true });

    // Auto-remove after specified duration
    const duration = options.duration || 2000;
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'fade-out 200ms ease-out forwards';
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
            window.removeEventListener('scroll', updateToastPosition);
          }
        }, 200);
      }
    }, duration);

    // Remove on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (!toast.contains(event.target as Node)) {
        toast.remove();
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('scroll', updateToastPosition);
      }
    };

    // Add listener after small delay to prevent immediate removal
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return toast;
  }, []);

  return { showToast };
};

// Additional CSS for animations (added via JavaScript)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-out {
      from { opacity: 1; transform: translateX(-50%) translateY(0); }
      to { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    }

    [data-contextual-toast] {
      animation: slide-in-from-top 300ms cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;
    }

    @keyframes slide-in-from-top {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    
    /* Add a subtle pulse animation to make the toast more noticeable */
    [data-contextual-toast]::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      border: 2px solid transparent;
      opacity: 0;
      animation: pulse 2s ease-out infinite;
      pointer-events: none;
    }
    
    @keyframes pulse {
      0% { opacity: 0; transform: scale(1); }
      15% { opacity: 0.15; }
      50% { opacity: 0; transform: scale(1.08); }
      100% { opacity: 0; }
    }
  `;

  if (!document.head.querySelector('[data-contextual-toast-styles]')) {
    style.setAttribute('data-contextual-toast-styles', 'true');
    document.head.appendChild(style);
  }
}
