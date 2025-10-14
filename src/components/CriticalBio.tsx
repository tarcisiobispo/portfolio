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
    <div className={`space-y-8 ${className}`}>
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="mb-8 text-base leading-relaxed">
          {t('profile.bio')}
        </p>
        <div className="mt-8 space-y-5">
          <div className="flex gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-base leading-relaxed mt-1 flex-shrink-0">•</span>
            <div className="flex-1">
              <p className="text-sm font-medium m-0">
                <strong className="text-gray-900 dark:text-white">Especialista em design de produtos digitais</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                Foco em experiência do usuário e impacto de negócio mensurável
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-base leading-relaxed mt-1 flex-shrink-0">•</span>
            <div className="flex-1">
              <p className="text-sm font-medium m-0">
                <strong className="text-gray-900 dark:text-white">Background em Marketing Digital, SEO e IA</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                Integração estratégica com processos de melhoria contínua
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-base leading-relaxed mt-1 flex-shrink-0">•</span>
            <div className="flex-1">
              <p className="text-sm font-medium m-0">
                <strong className="text-gray-900 dark:text-white">Experiência em estratégia, design e usabilidade</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                Desenvolvimento de produtos inovadores centrados no usuário
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalBio;
