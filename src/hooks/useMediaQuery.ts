import { useState, useEffect } from 'react';

/**
 * Hook para detectar media queries de forma responsiva
 * @param query - A media query string (ex: '(max-width: 768px)')
 * @returns boolean - true se a media query corresponder
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Verifica se estamos no browser
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Define o estado inicial
    setMatches(media.matches);

    // Função para atualizar o estado quando a media query mudar
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Adiciona o listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

/**
 * Hook específico para detectar se estamos em mobile
 * @returns boolean - true se a tela for menor ou igual a 768px
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 768px)');
};

/**
 * Hook específico para detectar se estamos em tablet
 * @returns boolean - true se a tela estiver entre 769px e 1024px
 */
export const useIsTablet = (): boolean => {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
};

/**
 * Hook específico para detectar se estamos em desktop
 * @returns boolean - true se a tela for maior que 1024px
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1025px)');
};
