import React from 'react';
import { User, Folder, Repeat, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigationSounds } from '@/hooks/useSound';
import { motion } from 'framer-motion';

// Itens de navegação principal
const navItems = [
  { href: '#perfil', icon: User, sectionId: 'perfil', i18nKey: 'navigation.profile' },
  { href: '#projetos', icon: Folder, sectionId: 'projetos', i18nKey: 'navigation.projects' },
  { href: '#backlog', icon: Repeat, sectionId: 'backlog', i18nKey: 'navigation.backlog' },
  { href: '#contato', icon: Mail, sectionId: 'contato', i18nKey: 'navigation.contact' },
];

interface BottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeSection,
  setActiveSection
}) => {
  const { t } = useTranslation();
  const { trackNavigation } = useAnalytics();
  const { playButtonHover, playPageTransition } = useNavigationSounds();
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar se estamos em uma página de projeto
  const isProjectPage = location.pathname.startsWith('/projetos/');

  // Scroll suave para a seção ou navegação para página principal
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
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

      // Scroll para a seção (ajustado para compensar o bottom nav)
      window.scrollTo({
        top: el.offsetTop - 72, // Header height
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
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bottom-nav-blur border-t border-[var(--color-border)] shadow-2xl"
      role="navigation"
      aria-label={t('navigation.bottomMenu')}
    >
      <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.sectionId;
          
          return (
            <motion.button
              key={item.href}
              onClick={(e) => handleNavClick(e, item.sectionId)}
              onMouseEnter={() => playButtonHover()}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[64px] min-h-[64px]
                ${isActive 
                  ? 'text-[var(--color-primary)]' 
                  : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
              `}
              aria-current={isActive ? 'page' : undefined}
              aria-label={t(item.i18nKey)}
            >
              {/* Background ativo */}
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Ícone */}
              <Icon 
                className={`w-6 h-6 mb-1 transition-all duration-300 relative z-10 ${
                  isActive ? 'text-[var(--color-primary)] scale-110' : ''
                }`} 
                aria-hidden="true" 
              />
              
              {/* Label */}
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'
              }`}>
                {t(item.i18nKey)}
              </span>
              
              {/* Indicador ativo */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-[var(--color-primary)] rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Safe area para dispositivos com home indicator */}
      <div className="h-safe-area-inset-bottom bg-[var(--color-surface)]" />
    </motion.nav>
  );
};

export default BottomNavigation;
