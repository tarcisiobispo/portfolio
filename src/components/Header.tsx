import { useCallback, useState, useEffect } from 'react';
import { User, Folder, Repeat, Mail, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleThemeToggle from './ui/SimpleThemeToggle';
import SoundToggle from './ui/SoundToggle';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import AccessibilityButton from './ui/AccessibilityButton';
import { lazyWithRetry } from '../utils/lazyWithRetry';

const LazyFeedbackModal = lazyWithRetry(() => import('./FeedbackModal'));
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTheme } from '@/components/providers/ThemeProvider';
import Container from './Layout/Container'; // Importando o Container
import { useActiveSection } from '@/hooks/useActiveSection';
import { getImagePath } from '@/utils/assetPaths';

// Itens de navegação principal
const navItems = [
  { href: '#perfil', icon: User, sectionId: 'perfil', i18nKey: 'navigation.profile' },
  { href: '#projetos', icon: Folder, sectionId: 'projetos', i18nKey: 'navigation.projects' },
  { href: '#backlog', icon: Repeat, sectionId: 'backlog', i18nKey: 'navigation.backlog' },
  { href: '#contato', icon: Mail, sectionId: 'contato', i18nKey: 'navigation.contact' },
];

interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export default function Header({ activeSection: propActiveSection, setActiveSection: propSetActiveSection }: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Use props if provided, otherwise use the hook
  const hookResult = useActiveSection();
  const activeSection = propActiveSection || hookResult.activeSection;
  const setActiveSection = propSetActiveSection || hookResult.setActiveSection;
  const { t } = useTranslation();
  const { trackNavigation } = useAnalytics();
  const { playButtonHover, playButtonClick, playPageTransition } = useNavigationSounds();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar se estamos em uma página de projeto
  const isProjectPage = location.pathname.startsWith('/projetos/');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Detecta o scroll inicial

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll suave para a seção ou navegação para página principal
  const handleNavClick = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    // Se estamos em uma página de projeto, navegar para a página principal + âncora
    if (isProjectPage) {
      navigate(`/#${sectionId}`);
      return;
    }

    // Se estamos na página principal, fazer scroll normal
    const el = document.getElementById(sectionId);
    if (el) {
      // Define flag para evitar detecção durante scroll programático
      window.isScrollingProgrammatically = true;

      // Atualiza imediatamente a seção ativa
      setActiveSection(sectionId);

      // Scroll para a seção
      window.scrollTo({
        top: el.offsetTop - 64,
        behavior: 'smooth',
      });

      // Track navigation event
      trackNavigation(sectionId);

      // Remove a flag após o scroll terminar
      setTimeout(() => {
        window.isScrollingProgrammatically = false;
      }, 1000); // Tempo estimado para o scroll suave completar
    }
  }, [trackNavigation, isProjectPage, navigate]);



  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-[var(--color-border)]
          ${scrolled ? 'bg-[var(--color-surface)] shadow-md' : 'bg-[var(--color-surface)]/80 backdrop-blur'}
        `}
        style={{ height: '72px' }} /* Aumentado para 72px */
        role="banner"
      >
        <Container className="flex items-center h-full">
          {/* Logo à esquerda - Sempre vai para página inicial */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (isProjectPage) {
                navigate('/');
              } else {
                handleNavClick(e, 'perfil');
              }
              playPageTransition();
            }}
            onMouseEnter={() => playButtonHover()}
            className="flex items-center h-full mr-8"
            aria-label={t('navigation.home')}
          >
            <img
              src={theme === 'dark' ? getImagePath('logo_uxproduct_white.webp') : getImagePath('logo_uxproduct.webp')}
              alt="Logo"
              className="h-[64px] md:h-[72px] w-auto object-contain" // Logo maior e responsiva
            />
          </a>
          
          {/* Menu principal (desktop) */}
          <nav className="hidden md:flex h-full flex-1" aria-label={t('navigation.mainMenu')}>
            <div className="flex space-x-2 items-center h-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.sectionId);
                      playPageTransition();
                    }}
                    onMouseEnter={() => playButtonHover()}
                    className={`
                      relative flex items-center h-full px-4 py-2 transition-all duration-300 rounded-md
                      ${isActive 
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                        : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                      focus-visible:text-[var(--color-primary)] focus-visible:bg-[var(--color-primary)]/10
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon 
                      className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'
                      }`} 
                      aria-hidden="true" 
                    />
                    <span className={`font-medium transition-colors duration-300 ${
                      isActive ? 'text-[var(--color-primary)]' : 'dark:text-gray-100'
                    }`}>
                      {t(item.i18nKey)}
                    </span>
                    
                    {/* Linha animada sob o item ativo/hover */}
                    {isActive ? (
                      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full h-0.5 bg-[var(--color-primary)]" />
                    ) : (
                      <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300" />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
          
          {/* Ações à direita (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <SimpleThemeToggle />
            <SoundToggle />
            <AccessibilityButton />
            
            <button
              onClick={() => {
                setFeedbackOpen(true);
                playButtonClick();
              }}
              onMouseEnter={() => playButtonHover()}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-primary)] hover:scale-110 overflow-hidden"
              aria-label={t('feedback.openFeedback')}
              title={t('feedback.openFeedback')}
              style={{ color: 'var(--color-primary)' }}
            >
              {/* Efeito de ondas ao redor do ícone */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Partículas flutuantes */}
              <div className="absolute top-1 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce"></div>
              <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
              
              <MessageCircle 
                className="w-5 h-5 transition-all duration-300 relative z-10 group-hover:text-purple-500 group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] group-hover:rotate-12 group-hover:translate-y-[-2px]" 
                aria-hidden="true" 
              />
              
              {/* Anel pulsante */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 scale-0 group-hover:scale-110 transition-transform duration-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </button>
          </div>
          
          {/* Theme toggle mobile (sempre renderizado, mas visível apenas abaixo de md) */}
          <div className="md:hidden ml-auto">
            <SimpleThemeToggle />
          </div>
        </Container>
      </header>





      {/* Modal de Feedback */}
      <LazyFeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        section={activeSection}
      />
    </>
  );
}