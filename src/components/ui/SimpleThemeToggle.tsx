import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useContextualToast } from '@/hooks/useContextualToast';

export const SimpleThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme, isLoading } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useContextualToast();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Se ainda está carregando, mostra skeleton
  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
    );
  }

  // Função para alternar entre claro e escuro
  const toggleTheme = () => {
    try {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);

      // Feedback visual com toast contextual abaixo do botão
      const themeLabel = newTheme === 'dark' ? t('theme.dark') : t('theme.light');
      if (buttonRef.current) {
        showToast(buttonRef.current, {
          message: themeLabel,
          description: t('theme.changed'),
          type: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Erro ao alterar tema:', error);
    }
  };

  // Determina qual ícone mostrar
  const Icon = resolvedTheme === 'dark' ? Sun : Moon;
  const label = resolvedTheme === 'dark' ? t('theme.light') : t('theme.dark');

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={`${t('theme.toggle')} - ${label}`}
      title={`${t('theme.toggle')} - ${label}`}
      className="transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-105"
      style={{ color: 'var(--color-primary)' }}
    >
      <span className="sr-only">{t('theme.toggle')}</span>
      <Icon
        className="w-5 h-5 transition-transform duration-300"
        aria-hidden="true"
      />
    </button>
  );
};

export default SimpleThemeToggle;
