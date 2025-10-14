import { useEffect, useState, useCallback, useRef, useMemo, useLayoutEffect } from 'react';

interface SectionConfig {
  id: string;
  className: string;
  threshold: number;
  element?: HTMLElement | null;
  top?: number;
  height?: number;
  isInView?: boolean;
}

// Memoizar a configuração das seções para evitar recriação
const SECTIONS: SectionConfig[] = [
  { id: 'perfil', className: 'section-profile', threshold: 0.3 },
  { id: 'projetos', className: 'section-projects', threshold: 0.3 },
  { id: 'backlog', className: 'section-backlog', threshold: 0.3 },
  { id: 'contato', className: 'section-contact', threshold: 0.3 },
];

// Cache para elementos de seção
const sectionElementsCache = new Map<string, HTMLElement | null>();

// Função de debounce para otimizar eventos de scroll
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useFluidGradient = () => {
  const [currentSection, setCurrentSection] = useState<string>('section-profile');
  const sectionsRef = useRef<SectionConfig[]>([]);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  const lastSectionChange = useRef<number>(0);
  const sectionChangeCooldown = 300; // ms de cooldown entre mudanças de seção

  // Usar useLayoutEffect para sincronização síncrona do layout
  useLayoutEffect(() => {
    // Função para obter elementos com cache
    const getSectionElement = (id: string): HTMLElement | null => {
      if (sectionElementsCache.has(id)) {
        return sectionElementsCache.get(id) || null;
      }
      const element = document.getElementById(id);
      sectionElementsCache.set(id, element);
      return element;
    };

    // Inicializar seções com elementos em cache
    sectionsRef.current = SECTIONS.map(section => ({
      ...section,
      element: getSectionElement(section.id),
      top: 0,
      height: 0
    }));
    
    // Atualizar dimensões iniciais com requestIdleCallback se disponível
    const updateDims = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(updateSectionDimensions, { timeout: 500 });
      } else {
        updateSectionDimensions();
      }
    };
    
    updateDims();
    
    // Otimizar o manipulador de redimensionamento
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      // Limpar timeout anterior
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      // Usar um timeout para agrupar múltiplos eventos de redimensionamento
      resizeTimeout = setTimeout(() => {
        updateDims();
        // Limpar cache de elementos em caso de redimensionamento
        sectionElementsCache.clear();
      }, 150);
    };
    
    // Usar o manipulador de redimensionamento passivo para melhor desempenho
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Atualizar dimensões das seções de forma otimizada com batelamento
  const updateSectionDimensions = useCallback(() => {
    if (typeof window === 'undefined' || !sectionsRef.current.length) return;
    
    // Usar requestAnimationFrame para agrupar leituras de layout
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      // Usar um elemento temporário para forçar sincronização de layout
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.visibility = 'hidden';
      document.body.appendChild(tempDiv);
      tempDiv.offsetHeight; // Forçar reflow
      
      // Obter todas as medidas necessárias em um único frame
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Usar um array temporário para armazenar as novas seções
      const newSections: SectionConfig[] = [];
      let hasChanges = false;
      
      sectionsRef.current.forEach(section => {
        // Usar o cache de elementos
        const element = sectionElementsCache.get(section.id) || document.getElementById(section.id);
        if (!element) {
          newSections.push(section);
          return;
        }
        
        // Armazenar em cache
        if (!sectionElementsCache.has(section.id)) {
          sectionElementsCache.set(section.id, element);
        }
        
        // Usar getBoundingClientRect uma única vez
        const rect = element.getBoundingClientRect();
        const top = rect.top + scrollY;
        const height = rect.height;
        const isInView = (
          rect.top <= viewportHeight * 0.8 && 
          rect.bottom >= viewportHeight * 0.2
        );
        
        // Verificar se houve mudanças significativas
        if (
          Math.abs((section.top || 0) - top) > 5 ||
          Math.abs((section.height || 0) - height) > 5 ||
          section.element !== element
        ) {
          hasChanges = true;
          newSections.push({
            ...section,
            element,
            top,
            height,
            isInView
          });
        } else {
          newSections.push(section);
        }
      });
      
      // Atualizar as seções apenas se houver mudanças
      if (hasChanges) {
        sectionsRef.current = newSections;
      }
      
      // Limpar o elemento temporário
      document.body.removeChild(tempDiv);
    });
  }, []);

  // Detectar seção ativa de forma otimizada com throttle e cooldown
  const detectActiveSection = useCallback(() => {
    if (typeof window === 'undefined') return 'section-profile';
    
    // Aplicar cooldown para evitar mudanças muito rápidas
    const now = Date.now();
    if (now - lastSectionChange.current < sectionChangeCooldown) {
      return currentSection;
    }
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Se não houve scroll significativo, não recalcular
    if (Math.abs(scrollY - lastScrollY.current) < windowHeight * 0.1) {
      return currentSection;
    }
    
    // Atualizar cache da posição do scroll
    lastScrollY.current = scrollY;
    
    // Se estiver no topo da página, sempre mostrar perfil
    if (scrollY < windowHeight * 0.2) {
      return 'section-profile';
    }
    
    // Usar Intersection Observer se disponível para melhor performance
    if ('IntersectionObserver' in window) {
      const viewportMiddle = window.innerHeight / 2;
      const elementAtCenter = document.elementFromPoint(
        window.innerWidth / 2, 
        viewportMiddle
      );
      
      if (elementAtCenter) {
        const sectionElement = elementAtCenter.closest('[data-section]') as HTMLElement;
        if (sectionElement?.dataset?.section) {
          const sectionId = sectionElement.dataset.section;
          const section = SECTIONS.find(s => s.id === sectionId);
          if (section) {
            lastSectionChange.current = now;
            return section.className;
          }
        }
      }
    }
    
    // Fallback para cálculo manual se o IntersectionObserver não estiver disponível
    let closestSection = currentSection;
    let minDistance = Infinity;
    
    for (const section of sectionsRef.current) {
      if (!section.element) continue;
      
      const elementCenter = (section.top || 0) + ((section.height || 0) / 2);
      const viewportCenter = scrollY + (windowHeight / 2);
      const distance = Math.abs(elementCenter - viewportCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section.className;
      }
    }
    
    if (closestSection !== currentSection) {
      lastSectionChange.current = now;
    }
    
    return closestSection;
  }, [currentSection]);

  // Gerenciador de scroll otimizado com throttle
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      
      const frameId = requestAnimationFrame(() => {
        const newSection = detectActiveSection();
        if (newSection !== currentSection) {
          // Usar requestAnimationFrame para agrupar atualizações de estado
          requestAnimationFrame(() => {
            setCurrentSection(newSection);
            // Forçar sincronização de layout para evitar repaints desnecessários
            document.body.getBoundingClientRect();
          });
        }
        ticking.current = false;
      });
      
      // Armazenar o ID do frame para possível cancelamento
      rafId.current = frameId;
    }
  }, [currentSection, detectActiveSection]);

  // Aplicar classe ao container de gradiente de forma otimizada
  const applyGradientClass = useCallback((sectionClass: string) => {
    const container = document.querySelector('.fluid-gradient-container');
    if (!container) return;

    // Usar requestAnimationFrame para agrupar as mudanças de classe
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    const frameId = requestAnimationFrame(() => {
      // Usar classList.toggle com force para melhor performance
      // e evitar repaints desnecessários
      const classList = container.classList;
      let needsUpdate = false;
      
      // Verificar se a classe atual já está aplicada
      const currentActive = SECTIONS.find(s => classList.contains(s.className));
      if (currentActive?.className === sectionClass) return;
      
      // Usar um DocumentFragment para manipulação em lote
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.visibility = 'hidden';
      document.body.appendChild(tempDiv);
      
      // Primeiro remover todas as classes de seção
      SECTIONS.forEach(section => {
        if (classList.contains(section.className)) {
          classList.remove(section.className);
          needsUpdate = true;
        }
      });
      
      // Depois adicionar apenas a classe ativa
      if (sectionClass) {
        classList.add(sectionClass);
        needsUpdate = true;
      }
      
      // Forçar sincronização de layout apenas se necessário
      if (needsUpdate) {
        // Usar um método de baixo custo para forçar sincronização
        tempDiv.offsetHeight;
      }
      
      // Remover o elemento temporário
      document.body.removeChild(tempDiv);
    });
    
    // Armazenar o ID do frame para possível cancelamento
    rafId.current = frameId;
  }, []);

  // Configurar listeners de forma otimizada com suporte a IntersectionObserver
  useEffect(() => {
    // Usar IntersectionObserver para detecção de seção visível
    let observer: IntersectionObserver | null = null;
    
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9]
      };
      
      let lastVisibleSection: string | null = null;
      
      observer = new IntersectionObserver((entries) => {
        // Encontrar a seção mais visível
        let maxVisibility = 0;
        let mostVisibleSection: string | null = null;
        
        entries.forEach(entry => {
          const sectionElement = entry.target as HTMLElement;
          const sectionId = sectionElement.dataset.section;
          
          if (sectionId && entry.isIntersecting) {
            // Calcular a visibilidade da seção
            const visibility = entry.intersectionRatio;
            
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleSection = sectionId;
            }
          }
        });
        
        // Atualizar apenas se a seção visível mudou
        if (mostVisibleSection && mostVisibleSection !== lastVisibleSection) {
          lastVisibleSection = mostVisibleSection;
          const section = SECTIONS.find(s => s.id === mostVisibleSection);
          
          if (section) {
            // Usar requestAnimationFrame para agrupar atualizações
            const frameId = requestAnimationFrame(() => {
              setCurrentSection(section.className);
            });
            
            // Armazenar o ID do frame para possível cancelamento
            return () => cancelAnimationFrame(frameId);
          }
        }
      }, observerOptions);
      
      // Registrar observador nas seções
      SECTIONS.forEach(section => {
        const element = document.getElementById(section.id);
        console.log(`🎨 FluidGradient: Looking for section ${section.id}, found:`, !!element);
        if (element) {
          // Adicionar atributo de dados para identificação
          element.setAttribute('data-section', section.id);
          observer?.observe(element);
          console.log(`🎨 FluidGradient: Observing section ${section.id}`);
        }
      });
    }
    
    // Configurar fallback para navegadores sem suporte a IntersectionObserver
    const debouncedScroll = debounce(handleScroll, 100);
    const scrollOptions = { passive: true, capture: true };
    
    // Usar o evento de scroll apenas como fallback
    const scrollHandler = observer ? () => {} : debouncedScroll;
    
    window.addEventListener('scroll', scrollHandler, scrollOptions);
    
    // Usar requestIdleCallback para atualização inicial
    const init = () => {
      console.log('🎨 FluidGradient: Starting initialization...');

      // Verificar novamente se os elementos existem
      const elementsFound = SECTIONS.filter(section => {
        const element = document.getElementById(section.id);
        console.log(`🎨 FluidGradient: Section ${section.id} element:`, !!element);
        return !!element;
      });

      console.log(`🎨 FluidGradient: Found ${elementsFound.length}/${SECTIONS.length} sections`);

      if (elementsFound.length === 0) {
        console.log('🎨 FluidGradient: No sections found, trying again...');
        // Tentar novamente após um tempo maior
        setTimeout(() => {
          const initialSection = detectActiveSection();
          setCurrentSection(initialSection);
          console.log('🎨 FluidGradient: Second attempt, section:', initialSection);
        }, 500);
        return;
      }

      if ('requestIdleCallback' in window) {
        const idleId = (window as any).requestIdleCallback(
          () => {
            const initialSection = detectActiveSection();
            setCurrentSection(initialSection);
            console.log('🎨 FluidGradient: Initial section detected:', initialSection);
          },
          { timeout: 1000 }
        );

        return () => (window as any).cancelIdleCallback(idleId);
      } else {
        const initialSection = detectActiveSection();
        setCurrentSection(initialSection);
        console.log('🎨 FluidGradient: Initial section (no idle callback):', initialSection);
      }
    };
    
    // Inicializar com um pequeno atraso para permitir que o layout seja concluído
    const initTimeout = setTimeout(init, 100); // Aumentado para 100ms
    console.log('🎨 FluidGradient: Initialization timeout set');
    
    return () => {
      // Limpar recursos
      clearTimeout(initTimeout);
      observer?.disconnect();
      window.removeEventListener('scroll', scrollHandler, scrollOptions);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, detectActiveSection]);

  // Aplicar classes CSS quando a seção atual mudar
  useEffect(() => {
    applyGradientClass(currentSection);
  }, [currentSection, applyGradientClass]);

  // Função para forçar mudança de seção (navegação)
  const setSection = useCallback((sectionId: string) => {
    const sectionConfig = SECTIONS.find(s => s.id === sectionId);
    if (sectionConfig) {
      setCurrentSection(sectionConfig.className);
      
      // Usar requestAnimationFrame para garantir que o DOM esteja pronto
      requestAnimationFrame(() => {
        // Rolar suavemente para a seção
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, []);

  // Obter informações da seção atual
  const getCurrentSectionInfo = useCallback(() => {
    const config = SECTIONS.find(s => s.className === currentSection);
    return {
      id: config?.id || 'perfil',
      className: currentSection,
      displayName: getSectionDisplayName(config?.id || 'perfil')
    };
  }, [currentSection]);

  // Memoizar o valor de retorno para evitar recriação desnecessária
  const result = useMemo(() => ({
    currentSection,
    setSection,
    getCurrentSectionInfo,
    isScrolling: false
  }), [currentSection, getCurrentSectionInfo]);
  
  return result;
};

// Função auxiliar para nomes de exibição
const getSectionDisplayName = (sectionId: string): string => {
  const names: Record<string, string> = {
    'perfil': 'Perfil',
    'projetos': 'Projetos',
    'backlog': 'Backlog Estratégico',
    'contato': 'Contato'
  };
  return names[sectionId] || sectionId;
};

// Hook para criar o container de gradiente
export const useGradientContainer = () => {
  useEffect(() => {
    console.log('🎨 useGradientContainer: Hook executed');

    // Verificar se já existe
    if (document.querySelector('.fluid-gradient-container')) {
      console.log('🎨 useGradientContainer: Container already exists, skipping creation');
      return;
    }

    console.log('🎨 useGradientContainer: Creating new container...');

    // Criar container de gradiente
    const gradientContainer = document.createElement('div');
    gradientContainer.className = 'fluid-gradient-container section-profile';
    gradientContainer.setAttribute('aria-hidden', 'true');
    gradientContainer.setAttribute('role', 'presentation');
    gradientContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
      will-change: transform, opacity;
    `;

    // Inserir no início do body
    document.body.insertBefore(gradientContainer, document.body.firstChild);
    console.log('🎨 useGradientContainer: Container created and inserted');

    // Cleanup
    return () => {
      const container = document.querySelector('.fluid-gradient-container');
      if (container) {
        console.log('🎨 useGradientContainer: Cleaning up container');
        container.remove();
      }
    };
  }, []);
};

// Hook combinado para facilitar uso
export const useFluidGradientSystem = () => {
  useGradientContainer();
  const gradientControls = useFluidGradient();
  
  return gradientControls;
};

// Função utilitária para transições manuais (navegação)
export const triggerSectionTransition = (sectionId: string) => {
  const container = document.querySelector('.fluid-gradient-container');
  if (!container) return;

  const sectionConfig = SECTIONS.find(s => s.id === sectionId);
  if (!sectionConfig) return;

  // Remover todas as classes
  SECTIONS.forEach(section => {
    container.classList.remove(section.className);
  });

  // Adicionar nova classe
  container.classList.add(sectionConfig.className);
};

export default useFluidGradient;
