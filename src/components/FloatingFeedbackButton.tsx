import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { useTranslation } from 'react-i18next';

const LazyFeedbackModal = lazyWithRetry(() => import('./FeedbackModal'));

export const FloatingFeedbackButton: React.FC = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('default');
  const { t } = useTranslation();

  // Detecta a seção atual com base no scroll
  React.useEffect(() => {
    const onScroll = () => {
      const sections = ['perfil', 'projetos', 'backlog', 'contato'];
      let found = 'default';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = section;
            break;
          }
        }
      }

      setActiveSection(found);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        aria-label={t('feedback.send')}
        title={t('feedback.send')}
        onClick={() => setFeedbackOpen(true)}
        className="fixed bottom-28 right-6 z-50 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 w-14 h-14 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
      </button>

      <LazyFeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        section={activeSection}
      />
    </>
  );
};

export default FloatingFeedbackButton;