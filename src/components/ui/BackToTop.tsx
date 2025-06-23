import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface BackToTopProps {
  showAfter?: number;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  showAfter = 300,
  className = ''
}) => {
  // Detectar se é dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Verificar inicialmente
    checkMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);
    
    // Limpar listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter);
    };

    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          className={`
            fixed z-40
            ${isMobile 
              ? 'bottom-4 right-4 p-2 shadow-md' 
              : 'bottom-8 right-8 md:bottom-20 md:right-20 p-3 md:p-5 shadow-lg hover:shadow-xl'
            }
            rounded-full 
            bg-[var(--color-primary)] text-white
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            back-to-top
            ${className}
          `}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
        >
          <ChevronUp className={isMobile ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6"} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
