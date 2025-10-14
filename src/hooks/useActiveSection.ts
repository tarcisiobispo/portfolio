import { useState, useEffect, useCallback } from 'react';

// Itens de navegação principal
const navItems = [
  { href: '#perfil', sectionId: 'perfil' },
  { href: '#projetos', sectionId: 'projetos' },
  { href: '#backlog', sectionId: 'backlog' },
  { href: '#contato', sectionId: 'contato' },
];

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('perfil');

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

  return {
    activeSection,
    setActiveSection
  };
};
