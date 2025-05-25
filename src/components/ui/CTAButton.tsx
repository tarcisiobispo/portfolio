import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  target,
  rel
}) => {
  // Estilos agora controlados pelo CSS centralizado

  // Classes CSS centralizadas
  const baseClasses = `cta-button variant-${variant} size-${size} ${className}`.trim();

  // Conteúdo do botão
  const buttonContent = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}

      <span className="relative">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : (
          children
        )}
      </span>

      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        aria-label={ariaLabel}
        style={{ textDecoration: 'none' }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
};

export default CTAButton;
