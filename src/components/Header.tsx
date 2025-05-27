import { useEffect, useState, useCallback } from 'react';
import { User, Folder, Repeat, Mail, MessageCircle } from 'lucide-react';
import SimpleThemeToggle from './ui/SimpleThemeToggle';
import SoundToggle from './ui/SoundToggle';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import AccessibilityButton from './accessibility/AccessibilityButton';
import FeedbackModal from './FeedbackModal';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigationSounds } from '@/hooks/useSound';

const navItems = [
  { href: '#perfil', icon: User, sectionId: 'perfil', i18nKey: 'navigation.profile' },
  { href: '#projetos', icon: Folder, sectionId: 'projetos', i18nKey: 'navigation.projects' },
  { href: '#backlog', icon: Repeat, sectionId: 'backlog', i18nKey: 'navigation.backlog' },
  { href: '#contato', icon: Mail, sectionId: 'contato', i18nKey: 'navigation.contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('perfil');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { t } = useTranslation();
  const { trackNavigation } = useAnalytics();
  const { playButtonHover, playButtonClick, playPageTransition } = useNavigationSounds();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      // Detecta a seção ativa com base no scroll
      let found = 'perfil';
      for (const item of navItems) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = item.sectionId;
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

  // Removido o toggle de tema mock, agora usando o componente ThemeToggle

  // Scroll suave para a seção
  const handleNavClick = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70, // Compensa altura do header
        behavior: 'smooth',
      });
      setActiveSection(sectionId);

      // Track navigation event
      trackNavigation(sectionId);
    }
  }, [trackNavigation]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[var(--color-border)]
        ${scrolled ? 'bg-[var(--color-surface)] shadow-md' : 'bg-[var(--color-surface)]/80 backdrop-blur'}
      `}
      role="banner"
    >
      <nav
        id="navigation"
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2"
        aria-label="Menu principal"
      >
        {/* Logo TBA */}
        <a href="#perfil" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[var(--color-primary-dark)]" aria-label={t('navigation.home')}>
          <span className="rounded bg-[#1d4ed8] text-white px-2 py-1 text-lg font-black shadow-sm">TBA</span>
        </a>
        {/* Navegação central */}
        <ul className="flex gap-8 items-end">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.sectionId;
            return (
              <li key={item.href} className="group relative flex flex-col items-center justify-end">
                <a
                  href={item.href}
                  onClick={e => {
                    handleNavClick(e, item.sectionId);
                    playPageTransition();
                  }}
                  onMouseEnter={() => playButtonHover()}
                  className={`relative flex flex-col items-center px-3 py-2 outline-none transition-all duration-300 ease-out
                    ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'}
                    focus-visible:text-[var(--color-primary)]`
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`mb-1 w-5 h-5 transition-all duration-300 ease-out
                      ${isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)] group-hover:transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}
                    `}
                    aria-hidden="true"
                  />
                  <span className={`text-sm font-medium transition-colors duration-300 ease-out ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-gray-900 dark:text-gray-100 group-hover:text-[var(--color-primary)]'
                  }`}>{t(item.i18nKey)}</span>

                  {/* Linha animada no hover - implementação controlada */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-[var(--color-primary)]"></div>
                  )}
                  {!isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300 ease-out"></div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        {/* Ações à direita */}
        <div className="flex gap-2 sm:gap-3 items-center">
          <LanguageSwitcher />
          <SimpleThemeToggle />
          <SoundToggle />
          <AccessibilityButton />

          {/* Botão de Feedback */}
          <button
            onClick={() => {
              setFeedbackOpen(true);
              playButtonClick();
            }}
            onMouseEnter={() => playButtonHover()}
            className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-110 overflow-hidden"
            style={{ color: 'var(--color-primary)' }}
            aria-label={t('feedback.openFeedback')}
            title={t('feedback.openFeedback')}
          >
            {/* Efeito de ondas de comunicação */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Bolhas de conversa flutuantes */}
            <div className="absolute top-0 right-1 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:animate-bounce"></div>
            <div className="absolute top-1 left-0 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 group-hover:animate-pulse"></div>
            <div className="absolute bottom-0 left-1 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-ping"></div>

            <MessageCircle
              className="w-5 h-5 transition-all duration-300 relative z-10 group-hover:text-green-500 group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)] group-hover:rotate-12 group-hover:translate-y-[-2px] group-hover:translate-x-[1px]"
              aria-hidden="true"
            />

            {/* Anel pulsante para indicar interatividade */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400/30 scale-0 group-hover:scale-110 transition-transform duration-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
          </button>
        </div>
      </nav>

      {/* Modal de Feedback */}
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        section={activeSection}
      />
    </header>
  );
}