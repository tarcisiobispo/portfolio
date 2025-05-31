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

    // Calculate element position
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Position directly below the triggering button with consistent 8px margin
    const position: ToastPosition = {
      top: rect.bottom + scrollTop + 8, // 8px margin for consistent spacing
      left: rect.left + scrollLeft + (rect.width / 2)
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
    `;

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
      toast.style.top = `${rect.top + scrollTop - toastRect.height - 8}px`; // 8px margin for consistency
    }

    // Auto-remove after specified duration
    const duration = options.duration || 2000;
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'fade-out 200ms ease-out forwards';
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 200);
      }
    }, duration);

    // Remove on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (!toast.contains(event.target as Node)) {
        toast.remove();
        document.removeEventListener('click', handleClickOutside);
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
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-8px); }
    }

    [data-contextual-toast] {
      animation: slide-in-from-top 300ms cubic-bezier(0.16, 1, 0.3, 1);
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
  `;

  if (!document.head.querySelector('[data-contextual-toast-styles]')) {
    style.setAttribute('data-contextual-toast-styles', 'true');
    document.head.appendChild(style);
  }
}
