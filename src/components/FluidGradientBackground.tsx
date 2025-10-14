import React, { useEffect, useRef, useCallback, useMemo, CSSProperties } from 'react';
import { useFluidGradientSystem } from '@/hooks/useFluidGradient';

interface FluidGradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Componente otimizado que gerencia o sistema de gradientes fluidos
 * Utiliza técnicas de otimização para reduzir repaints e melhorar performance
 */
const FluidGradientBackground: React.FC<FluidGradientBackgroundProps> = React.memo(({ 
  children, 
  className = '' 
}) => {
  // Usar refs para armazenar valores que não devem causar re-renderizações
  const lastLogRef = useRef<string>('');

  // Inicializar sistema de gradientes
  const { currentSection, getCurrentSectionInfo, setSection } = useFluidGradientSystem();
  console.log('🎨 FluidGradientBackground: Hook initialized, currentSection:', currentSection);
  
  // Usar useMemo para valores derivados que não mudam frequentemente
  const sectionInfo = useMemo(() => getCurrentSectionInfo(), [getCurrentSectionInfo]);

  // Debug em desenvolvimento - otimizado para evitar logs desnecessários
  useEffect(() => {
    if (import.meta.env.DEV) {
      const logMessage = `🎨 Fluid Gradient: ${sectionInfo.displayName} (${currentSection})`;
      
      // Só loga se a mensagem for diferente da anterior
      if (logMessage !== lastLogRef.current) {
        console.log(logMessage, {
          section: sectionInfo.displayName,
          className: currentSection,
          timestamp: new Date().toISOString()
        });
        lastLogRef.current = logMessage;
      }
    }
  }, [currentSection, sectionInfo]);

  // Usar useMemo para o container dos filhos para evitar re-renderizações desnecessárias
  const childrenContainer = useMemo(() => {
    if (!children) return null;
    
    return (
      <div 
        className={`relative z-10 ${className}`}
        // Adiciona atributos para melhor acessibilidade e SEO
        role="main"
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>
    );
  }, [children, className]);

  return (
    <>
      {/* O container é criado pelo hook useGradientContainer */}
      {childrenContainer}
    </>
  );
});

// Adicionar displayName para melhor debugging
FluidGradientBackground.displayName = 'FluidGradientBackground';

// Adicionar propriedades estáticas para documentação
if (process.env.NODE_ENV === 'development') {
  // Adicionando propriedade para debug apenas em desenvolvimento
  const WhyDidYouRender = {
    logOnDifferentValues: false,
    trackHooks: true
  };
  
  // @ts-ignore - Propriedade para debug
  FluidGradientBackground.whyDidYouRender = WhyDidYouRender;
}

/**
 * Componente indicador visual da seção atual (opcional)
 * Útil para debug ou como indicador de navegação
 */
// Componente otimizado para mostrar a seção atual (apenas em desenvolvimento)
export const GradientSectionIndicator: React.FC = React.memo(() => {
  const { getCurrentSectionInfo } = useFluidGradientSystem();
  
  // Usar useMemo para evitar recálculos desnecessários
  const sectionInfo = useMemo(() => getCurrentSectionInfo(), [getCurrentSectionInfo]);

  // Não renderizar em produção
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div 
      className="fixed top-20 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono backdrop-blur-sm"
      style={{
        // Otimizações para melhor desempenho
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <div className="text-xs opacity-70">Seção Atual:</div>
      <div className="font-semibold">{sectionInfo.displayName}</div>
      <div className="text-xs opacity-50">{sectionInfo.className}</div>
      <div className="mt-1 pt-1 border-t border-white/10 text-2xs opacity-50">
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
});

// Adicionar displayName para melhor debugging
GradientSectionIndicator.displayName = 'GradientSectionIndicator';

/**
 * Hook para componentes que precisam reagir às mudanças de seção
 */
// Hook otimizado para acessar informações da seção atual
export const useCurrentSection = () => {
  const { getCurrentSectionInfo } = useFluidGradientSystem();
  
  // Usar useMemo para evitar recálculos desnecessários
  return useMemo(() => getCurrentSectionInfo(), [getCurrentSectionInfo]);
};

// Tipos das seções disponíveis
type SectionId = 'perfil' | 'projetos' | 'backlog' | 'contato';

/**
 * Componente wrapper para seções que precisam de gradientes específicos
 */
interface GradientSectionProps {
  sectionId: SectionId;
  children: React.ReactNode;
  className?: string;
}

// Componente wrapper otimizado para seções com gradientes específicos
export const GradientSection: React.FC<GradientSectionProps> = React.memo(({
  sectionId,
  children,
  className = ''
}) => {
  return (
    <section 
      id={sectionId}
      className={`relative ${className}`}
      data-gradient-section={sectionId}
    >
      {children}
    </section>
  );
});

/**
 * Componente para transições manuais de gradiente
 * Útil para navegação ou botões que mudam seção
 */
interface GradientTriggerProps {
  targetSection: SectionId;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Componente otimizado para disparar mudanças de gradiente
export const GradientTrigger: React.FC<GradientTriggerProps> = React.memo(({
  targetSection,
  children,
  className = '',
  onClick
}) => {
  const { setSection } = useFluidGradientSystem();

  const handleClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setSection(targetSection);
    if (onClick) {
      onClick();
    }
  }, [setSection, targetSection, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }, [handleClick]);

  return (
    <div 
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Ir para a seção ${targetSection}`}
    >
      {children}
    </div>
  );
});

export default FluidGradientBackground;
