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

  // Troca de idioma com feedback
  function handleSelect(languageCode: string) {
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
        className="transition-colors duration-300 flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-w-[56px] text-[#1d4ed8] dark:text-[#60a5fa]"
      >
        <Globe className="w-5 h-5" aria-hidden="true" />
        <span className="font-semibold text-sm uppercase select-none">{currentCode}</span>
        <svg
          className={`ml-1 w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
          className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg z-50 py-1 animate-fade-in"
          role="listbox"
          tabIndex={-1}
        >
          {LANGUAGES.map((l, index) => (
            <li key={l.code}>
              <button
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors duration-200 focus:outline-none focus:bg-[var(--color-primary)]/10 focus:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] ${
                  i18n.language === l.code ? 'font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'text-[var(--color-link)]'
                } ${
                  focusedIndex === index ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''
                }`}
                role="option"
                aria-selected={i18n.language === l.code}
                onClick={() => handleSelect(l.code)}
                tabIndex={-1}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{l.nativeName}</span>
                  <span className="text-xs uppercase text-[var(--color-muted)] font-mono">{l.code.split('-')[0]}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
