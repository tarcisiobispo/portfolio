import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useContextualToast } from '@/hooks/useContextualToast';

interface SimpleThemeToggleProps {
  className?: string;
}

export const SimpleThemeToggle: React.FC<SimpleThemeToggleProps> = ({ className = '' }) => {
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
          duration: 1500, // Duração reduzida para maior proximidade
        });
      }
    } catch (error) {
      console.error('Erro ao alterar tema:', error);
    }
  };

  // Determina qual ícone mostrar
  const Icon = resolvedTheme === 'dark' ? Sun : Moon;
  const tooltipKey = resolvedTheme === 'dark' ? 'tooltips.theme.light' : 'tooltips.theme.dark';

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={t(tooltipKey)}
      title={t(tooltipKey)}
      className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-110 hover:rotate-12 overflow-hidden"
      style={{ color: 'var(--color-primary)' }}
    >
      <span className="sr-only">{t('theme.toggle')}</span>

      {/* Efeito de brilho para o sol */}
      {resolvedTheme === 'dark' && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      )}

      {/* Efeito de lua cheia para a lua */}
      {resolvedTheme === 'light' && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}

      <Icon
        className={`w-5 h-5 transition-all duration-300 relative z-10 ${
          resolvedTheme === 'dark'
            ? 'group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] group-hover:translate-y-[-2px] group-hover:rotate-12'
            : 'group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] group-hover:translate-y-[-2px] group-hover:-rotate-12'
        }`}
        aria-hidden="true"
      />


      {/* Partículas de estrelas para modo escuro */}
      {resolvedTheme === 'light' && (
        <>
          <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
          <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-indigo-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
          <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"></div>
        </>
      )}

      {/* Raios de sol para modo claro */}
      {resolvedTheme === 'dark' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-yellow-400 transform -translate-x-1/2 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-yellow-400 transform -translate-x-1/2 rounded-full"></div>
          <div className="absolute left-0 top-1/2 w-1 h-0.5 bg-yellow-400 transform -translate-y-1/2 rounded-full"></div>
          <div className="absolute right-0 top-1/2 w-1 h-0.5 bg-yellow-400 transform -translate-y-1/2 rounded-full"></div>
        </div>
      )}
    </button>
  );
};

export default SimpleThemeToggle;
