import React from 'react';

/**
 * Critical Bio Component - Optimized for LCP
 * This component renders immediately without waiting for i18n or other dependencies
 * to improve Largest Contentful Paint performance
 */

interface CriticalBioProps {
  className?: string;
}

const CriticalBio: React.FC<CriticalBioProps> = ({ className = '' }) => {
  // Static bio text for immediate rendering - no i18n dependency
  const staticBio = "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio.";

  return (
    <div className={`mb-8 ${className}`}>
      <p className="critical-bio-text">
        {staticBio}
      </p>
    </div>
  );
};

export default CriticalBio;
