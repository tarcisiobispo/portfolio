import React, { useState } from 'react';
import { MessageCircle, Globe, X } from 'lucide-react';
import SimpleThemeToggle from './ui/SimpleThemeToggle';
import SoundToggle from './ui/SoundToggle';
import AccessibilityButton from './accessibility/AccessibilityButton';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';

interface MobileControlsProps {
  setFeedbackOpen: (open: boolean) => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ setFeedbackOpen }) => {
  const { t, i18n } = useTranslation();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <div 
      className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:hidden z-40"
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      <div className="flex flex-col gap-3 pr-2">
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            onMouseEnter={() => playButtonHover()}
            className="flex items-center justify-center rounded-full w-10 h-10 text-[var(--color-primary)] hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-md bg-[var(--color-surface)] border border-[var(--color-border)]"
            aria-label={t('language.select')}
            title={t('language.select')}
            aria-expanded={langMenuOpen}
          >
            <Globe className="w-5 h-5" />
          </button>
          
          {langMenuOpen && (
            <div 
              className="absolute right-12 top-0 w-40 rounded-lg shadow-lg z-50 bg-[var(--color-surface)] border border-[var(--color-border)]"
              style={{ animation: 'fadeIn 0.2s ease-out' }}
            >
              <div className="flex items-center justify-between p-3 border-b border-[var(--color-border)]">
                <span>
                  {i18n.language === 'pt-BR' && 'Idioma'}
                  {i18n.language === 'en-US' && 'Language'}
                  {i18n.language === 'es-ES' && 'Idioma'}
                </span>
                <button 
                  onClick={() => setLangMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={t('common.close')}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-2 flex flex-col">
                <button 
                  onClick={() => changeLanguage('pt-BR')}
                  className={`py-2 px-3 text-left rounded-md transition-colors ${i18n.language === 'pt-BR' ? 'bg-[var(--color-primary)] text-white font-medium' : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'}`}
                >
                  {t('language.portuguese')}
                </button>
                <button 
                  onClick={() => changeLanguage('en-US')}
                  className={`py-2 px-3 text-left rounded-md transition-colors ${i18n.language === 'en-US' ? 'bg-[var(--color-primary)] text-white font-medium' : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'}`}
                >
                  {t('language.english')}
                </button>
                <button 
                  onClick={() => changeLanguage('es-ES')}
                  className={`py-2 px-3 text-left rounded-md transition-colors ${i18n.language === 'es-ES' ? 'bg-[var(--color-primary)] text-white font-medium' : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'}`}
                >
                  {t('language.spanish')}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <SimpleThemeToggle />
        <SoundToggle />
        <AccessibilityButton />
        
        <button
          onClick={() => {
            setFeedbackOpen(true);
            playButtonClick();
          }}
          onMouseEnter={() => playButtonHover()}
          className="flex items-center justify-center rounded-full w-10 h-10 text-[var(--color-primary)] hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-md bg-[var(--color-surface)] border border-[var(--color-border)]"
          aria-label={t('feedback.openFeedback')}
          title={t('feedback.openFeedback')}
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobileControls;