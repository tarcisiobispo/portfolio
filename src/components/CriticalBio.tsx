import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Critical Bio Component - Optimized for LCP
 * This component uses i18n for translations while maintaining performance
 */

interface CriticalBioProps {
  className?: string;
}

const CriticalBio: React.FC<CriticalBioProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`mb-8 ${className}`}>
      <p className="critical-bio-text">
        {t('profile.bio')}
      </p>
    </div>
  );
};

export default CriticalBio;
