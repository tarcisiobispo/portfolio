import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, Folder, Repeat, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigationSounds } from '@/hooks/useSound';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from '@/components/ui/drawer';

// Mesmos itens de navegação do Header principal
const navItems = [
  { href: '#perfil', icon: User, sectionId: 'perfil', i18nKey: 'navigation.profile' },
  { href: '#projetos', icon: Folder, sectionId: 'projetos', i18nKey: 'navigation.projects' },
  { href: '#backlog', icon: Repeat, sectionId: 'backlog', i18nKey: 'navigation.backlog' },
  { href: '#contato', icon: Mail, sectionId: 'contato', i18nKey: 'navigation.contact' },
];

interface MobileMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  resolvedTheme: string | undefined;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  activeSection,
  setActiveSection
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { trackNavigation } = useAnalytics();
  const { playButtonHover, playButtonClick, playPageTransition } = useNavigationSounds();
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Detectar se estamos em uma página de projeto
  const isProjectPage = location.pathname.startsWith('/projetos/');

  // Fechar o menu ao pressionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Focar no primeiro item quando o menu abre
  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 100);
    }
  }, [isMenuOpen]);

  // Scroll suave para a seção ou navegação para página principal
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Fechar o menu primeiro

    // Se estamos em uma página de projeto, navegar para a página principal + âncora
    if (isProjectPage) {
      navigate(`/#${sectionId}`);
      return;
    }

    // Se estamos na página principal, fazer scroll normal
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        // Define flag para evitar detecção durante scroll programático
        window.isScrollingProgrammatically = true;

        // Atualiza imediatamente a seção ativa
        setActiveSection(sectionId);

        window.scrollTo({
          top: el.offsetTop - 50, // Ajustado para o header ainda menor
          behavior: 'smooth',
        });

        // Track navigation event
        trackNavigation(sectionId);
        playPageTransition();

        // Remove a flag após o scroll terminar
        setTimeout(() => {
          window.isScrollingProgrammatically = false;
        }, 1000);
      }
    }, 100); // Pequeno delay para garantir que o menu fechou antes de rolar
  };

  return (
    <div className="md:hidden">
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerTrigger asChild>
          <button
            ref={menuButtonRef}
            onClick={() => {
              setIsMenuOpen(true);
              playButtonClick();
            }}
            onMouseEnter={() => playButtonHover()}
            className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-8 h-8 text-[var(--color-primary)] hover:scale-110 overflow-hidden"
            aria-label={t('navigation.openMenu')}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            <Menu
              className="w-4 h-4 transition-all duration-300 relative z-10 group-hover:text-blue-500"
              aria-hidden="true"
            />
          </button>
        </DrawerTrigger>
        
        <DrawerContent 
          style={{
            width: '200px',
            height: '100vh',
            left: 'auto',
            right: 0,
            bottom: 'auto',
            top: 0,
            borderRadius: 0,
            animation: 'slideInRight 0.3s ease-out',
            touchAction: 'pan-y',
            position: 'fixed',
            zIndex: 100
          }}
          className="touch-pan-y"
        >
          {/* Indicador de arraste */}
          <div 
            className="h-1 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 mt-2"
            style={{ touchAction: 'none' }}
          ></div>
          
          <DrawerHeader className="border-b border-[var(--color-border)] pb-2 pt-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-medium">
                Menu
              </DrawerTitle>
              <DrawerClose asChild>
                <button 
                  className="rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] hover:bg-[var(--color-surface-hover)]"
                  aria-label={t('navigation.closeMenu')}
                  onClick={() => playButtonClick()}
                  onMouseEnter={() => playButtonHover()}
                >
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="p-4 overflow-y-auto touch-pan-y" style={{ touchAction: 'pan-y' }}>
            <nav aria-label={t('navigation.menu')}>
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.sectionId;
                  return (
                    <li key={item.href}>
                      <a
                        ref={index === 0 ? firstItemRef : undefined}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.sectionId)}
                        onMouseEnter={() => playButtonHover()}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' 
                            : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--color-primary)]' : ''}`} />
                        <span>{t(item.i18nKey)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;