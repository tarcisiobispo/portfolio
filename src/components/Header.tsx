import { useEffect, useState, useCallback } from 'react';
import { User, Folder, Repeat, Mail, MessageCircle } from 'lucide-react';
import SimpleThemeToggle from './ui/SimpleThemeToggle';
import SoundToggle from './ui/SoundToggle';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import AccessibilityButton from './accessibility/AccessibilityButton';
import FeedbackModal from './FeedbackModal';
import MobileMenu from './ui/MobileMenu';
import MobileControls from './MobileControls';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTheme } from 'next-themes';

// Importar as imagens diretamente
import logoLight from '../../public/images/logo_uxproduct.webp';
import logoDark from '../../public/images/logo_uxproduct_white.webp'; // Logo para modo escuro

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
  const { theme } = useTheme();

  // Função para detectar a seção ativa com base na posição de scroll
  const detectActiveSection = useCallback(() => {
    let found = 'perfil';
    let minDistance = Infinity;
    
    for (const item of navItems) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - 64);
        
        // Encontra a seção mais próxima do topo da viewport
        if (distance < minDistance) {
          minDistance = distance;
          found = item.sectionId;
        }
        
        // Prioriza seções que já estão visíveis na viewport
        if (rect.top <= 64 && rect.bottom > 64) {
          found = item.sectionId;
          break;
        }
      }
    }
    
    return found;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Atualiza a seção ativa apenas durante o scroll natural
      // (não durante o scroll programático de cliques no menu)
      if (window.isScrollingProgrammatically !== true) {
        const newActiveSection = detectActiveSection();
        setActiveSection(newActiveSection);
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Detecta a seção inicial
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [detectActiveSection]);

  // Scroll suave para a seção
  const handleNavClick = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
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
  }, [trackNavigation]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[var(--color-border)]
          ${scrolled ? 'bg-[var(--color-surface)] shadow-md' : 'bg-[var(--color-surface)]/80 backdrop-blur'}
        `}
        role="banner"
        style={{ height: '64px' }}
        // Removendo o atributo aria-hidden que estava causando problemas de acessibilidade
      >
        <nav
          id="navigation"
          className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full"
          aria-label={t('navigation.mainMenu')}
          
        >
          {/* Logo - Sempre à esquerda */}
          <a 
            href="#perfil" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('perfil');
              if (el) {
                // Define flag para evitar detecção durante scroll programático
                window.isScrollingProgrammatically = true;
                
                // Atualiza imediatamente a seção ativa
                setActiveSection('perfil');
                
                window.scrollTo({
                  top: el.offsetTop - 64,
                  behavior: 'smooth',
                });
                
                playPageTransition();
                
                // Remove a flag após o scroll terminar
                setTimeout(() => {
                  window.isScrollingProgrammatically = false;
                }, 1000);
              }
            }}
            onMouseEnter={() => playButtonHover()}
            className="flex items-center text-xl font-bold tracking-tight max-w-[120px] h-full" 
            aria-label={t('navigation.home')}
          >
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="" 
              className="h-[40px] w-auto max-w-[120px] object-contain"
              width="auto"
              height="40"
            />
          </a>
          
          {/* Navegação central - visível apenas em desktop */}
          <ul className="hidden md:flex gap-8 items-center h-full">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.sectionId;
              return (
                <li key={item.href} className="group relative h-full flex items-center">
                  <a
                    href={item.href}
                    onClick={e => {
                      handleNavClick(e, item.sectionId);
                      playPageTransition();
                    }}
                    onMouseEnter={() => playButtonHover()}
                    className={`relative flex flex-col items-center justify-center h-full px-4 py-2 outline-none transition-all duration-300 ease-out rounded-md
                      ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'}
                      focus-visible:text-[var(--color-primary)]`
                    }
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 mb-1 transition-all duration-300 ease-out
                        ${isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}
                      `}
                      aria-hidden="true"
                    />
                    <span className={`text-xs font-medium transition-colors duration-300 ease-out ${
                      isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-gray-900 dark:text-gray-100 group-hover:text-[var(--color-primary)]'
                    }`}>{t(item.i18nKey)}</span>

                    {/* Linha animada no hover - implementação controlada */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 mx-auto w-3/4 h-0.5 bg-[var(--color-primary)]"></div>
                    )}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-3/4 transition-all duration-300 ease-out"></div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          
          {/* Ações à direita - visíveis apenas em desktop */}
          <div className="flex items-center h-full">
            {/* Menu Mobile - Visível apenas em mobile, agora à direita */}
            <MobileMenu 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              resolvedTheme={theme} 
            />
            
            {/* Botões desktop */}
            <div className="hidden md:flex gap-2 items-center h-full">
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
                className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-8 h-8 text-[var(--color-primary)] hover:scale-110 overflow-hidden"
                style={{ color: 'var(--color-primary)' }}
                aria-label={t('feedback.openFeedback')}
                title={t('feedback.openFeedback')}
              >
                <MessageCircle
                  className="w-4 h-4 transition-all duration-300 relative z-10 group-hover:text-green-500"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Controles móveis flutuantes */}
      <MobileControls setFeedbackOpen={setFeedbackOpen} />

      {/* Modal de Feedback */}
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        section={activeSection}
      />
    </>
  );
}