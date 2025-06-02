import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    playButtonClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => playButtonHover()}
      className={`back-to-top fixed bottom-6 right-0 p-2 rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 md:right-6 md:p-3 hidden md:block ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label={t('tooltips.actions.backToTop')}
      title={t('tooltips.actions.backToTop')}
    >
      <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
};

export default BackToTop;