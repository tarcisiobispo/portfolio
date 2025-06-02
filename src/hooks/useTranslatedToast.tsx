import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { ToastActionElement } from '@/components/ui/toast';

interface TranslatedToastOptions {
  titleKey: string;
  descriptionKey?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: ToastActionElement;
}

/**
 * Hook for showing toasts with translated content
 * Automatically handles translation keys and fallbacks
 */
export const useTranslatedToast = () => {
  const { t, i18n } = useTranslation();
  
  const showToast = useCallback(
    ({ titleKey, descriptionKey, ...options }: TranslatedToastOptions) => {
      // Check if keys exist and provide fallbacks
      const title = i18n.exists(titleKey) ? t(titleKey) : titleKey;
      const description = descriptionKey 
        ? (i18n.exists(descriptionKey) ? t(descriptionKey) : descriptionKey)
        : undefined;
      
      // Log missing keys in development
      if (import.meta.env.DEV) {
        if (title === titleKey) {
          console.warn(`Missing toast title translation key: ${titleKey}`);
        }
        if (descriptionKey && description === descriptionKey) {
          console.warn(`Missing toast description translation key: ${descriptionKey}`);
        }
      }
      
      return toast({
        title,
        description,
        ...options,
      });
    },
    [t, i18n]
  );
  
  return { showToast };
};

export default useTranslatedToast;