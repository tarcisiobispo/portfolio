import React from 'react';
import { Trans as I18nTrans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

interface TransProps {
  i18nKey: string;
  components?: Record<string, React.ReactNode>;
  values?: Record<string, any>;
  children?: React.ReactNode;
}

/**
 * Enhanced Trans component that provides better error handling and fallback
 * for missing translation keys.
 */
export const Trans: React.FC<TransProps> = ({ 
  i18nKey, 
  components, 
  values,
  children 
}) => {
  const { t, i18n } = useTranslation();
  
  // Check if the key exists
  const keyExists = i18n.exists(i18nKey);
  
  // If key doesn't exist and we're in development, show a warning
  if (!keyExists && import.meta.env.DEV) {
    console.warn(`Translation key not found: ${i18nKey}`);
    
    // Return a visually distinct element in development to highlight missing keys
    return (
      <span 
        style={{ 
          backgroundColor: 'rgba(255, 0, 0, 0.2)', 
          border: '1px dashed red',
          padding: '0 4px',
          borderRadius: '2px',
          color: 'red',
          fontWeight: 'bold'
        }}
        title={`Missing translation key: ${i18nKey}`}
      >
        {i18nKey}
      </span>
    );
  }
  
  // Use the standard Trans component
  return (
    <I18nTrans
      i18nKey={i18nKey}
      components={components}
      values={values}
    >
      {children}
    </I18nTrans>
  );
};

export default Trans;