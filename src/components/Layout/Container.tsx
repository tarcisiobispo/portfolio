import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container que:
 * - Tem max-width de 1200px em desktop
 * - Em telas <1200px, ocupa 90% da viewport (via px responsivo)
 * - Padding lateral: 16px (mobile), 24px (tablet), 32px (desktop)
 * - Centraliza todo o conteúdo
 * - Implementa o sistema de 8px para espaçamentos consistentes
 */
const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        w-full
        max-w-[1200px] /* largura máxima em desktop */
        mx-auto /* centraliza a 1200px */
        px-4 /* 16px em <640px */
        sm:px-6 /* 24px em ≥640px */
        lg:px-8 /* 32px em ≥1024px */
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;