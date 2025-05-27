import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContextualToast } from '@/hooks/useContextualToast';

const LANGUAGES = [
  { code: 'pt-BR', label: 'Português', nativeName: 'Português' },
  { code: 'en-US', label: 'English', nativeName: 'English' },
  { code: 'es-ES', label: 'Español', nativeName: 'Español' },
];

export const LanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { i18n, t } = useTranslation();
  const { showToast } = useContextualToast();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Acessibilidade: navegação por teclado
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          setOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % LANGUAGES.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => prev <= 0 ? LANGUAGES.length - 1 : prev - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleSelect(LANGUAGES[focusedIndex].code);
          }
          break;
      }
    }

    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, focusedIndex]);

  // Troca de idioma com feedback e animação
  function handleSelect(languageCode: string) {
    // Animação de seleção no botão principal
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1.05)';
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.style.transform = 'scale(1)';
            }
          }, 150);
        }
      }, 100);
    }

    i18n.changeLanguage(languageCode);
    setOpen(false);

    // Feedback visual com toast contextual abaixo do botão
    const selectedLang = LANGUAGES.find(l => l.code === languageCode);
    if (selectedLang && buttonRef.current) {
      showToast(buttonRef.current, {
        message: selectedLang.nativeName,
        description: t('language.changed'),
        type: 'success',
        duration: 2000,
      });
    }
  }

  const currentLanguage = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];
  const currentCode = currentLanguage.code.split('-')[0].toUpperCase();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('tooltips.language.switch')}
        title={t('tooltips.language.switch')}
        onClick={() => {
          setOpen(v => !v);
          setFocusedIndex(-1);
        }}
        tabIndex={0}
        className="group relative transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-w-[56px] text-[#1d4ed8] dark:text-[#60a5fa] hover:scale-105 overflow-hidden"
      >
        {/* Efeito de ondas ao redor do globo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Partículas flutuantes representando conexões globais */}
        <div className="absolute top-1 left-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce"></div>
        <div className="absolute bottom-1 right-8 w-0.5 h-0.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
        <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 group-hover:animate-ping"></div>

        <Globe
          className="w-5 h-5 transition-all duration-500 relative z-10 group-hover:rotate-180 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)] group-hover:translate-y-[-2px] group-hover:translate-x-[1px]"
          aria-hidden="true"
        />
        <span className="font-semibold text-sm uppercase select-none relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{currentCode}</span>
        <svg
          className={`ml-1 w-3 h-3 transition-transform duration-200 relative z-10 ${open ? 'rotate-180' : ''} group-hover:text-blue-500`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.293l3.71-3.06a.75.75 0 1 1 .96 1.15l-4.25 3.5a.75.75 0 0 1-.96 0l-4.25-3.5a.75.75 0 0 1 .02-1.06z" />
        </svg>
      </button>
      {open && (
        <ul
          ref={menuRef}
          className="absolute right-0 mt-1 w-48 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-50 py-2 animate-fade-in backdrop-blur-sm"
          role="listbox"
          tabIndex={-1}
          style={{
            animation: 'slideDown 0.2s ease-out'
          }}
        >
          {LANGUAGES.map((l, index) => (
            <li key={l.code}>
              <button
                className={`group w-full flex items-center justify-between px-4 py-3 text-left rounded-lg mx-1 transition-all duration-300 focus:outline-none relative overflow-hidden ${
                  i18n.language === l.code
                    ? 'font-bold text-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-link)] hover:bg-gradient-to-r hover:from-[var(--color-primary)]/8 hover:to-[var(--color-primary)]/4 hover:text-[var(--color-primary)] hover:scale-[1.02] hover:shadow-sm'
                } ${
                  focusedIndex === index ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] scale-[1.02]' : ''
                }`}
                role="option"
                aria-selected={i18n.language === l.code}
                onClick={() => handleSelect(l.code)}
                tabIndex={-1}
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <div className="flex items-center justify-between w-full relative z-10">
                  <span className="font-medium transition-all duration-200 group-hover:font-semibold">{l.nativeName}</span>
                  <span className={`text-xs uppercase font-mono transition-all duration-200 ${
                    i18n.language === l.code
                      ? 'text-[var(--color-primary)]/80 font-bold'
                      : 'text-[var(--color-muted)] group-hover:text-[var(--color-primary)]/70 group-hover:font-semibold'
                  }`}>
                    {l.code.split('-')[0]}
                  </span>
                </div>

                {/* Indicador de seleção */}
                {i18n.language === l.code && (
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[var(--color-primary)] rounded-full"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
