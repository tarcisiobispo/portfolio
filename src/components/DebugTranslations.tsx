import React from 'react';
import { useTranslation } from 'react-i18next';

const DebugTranslations: React.FC = () => {
  const { t, i18n } = useTranslation();

  if (import.meta.env.PROD) {
    return null; // Não mostrar em produção
  }

  // Check for common translation keys that might be problematic
  const testKeys = [
    'profile.greeting',
    'profile.jobTitle',
    'profile.location',
    'profile.phone',
    'tooltips.language.switch',
    'navigation.profile'
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      overflow: 'auto',
      maxHeight: '80vh'
    }}>
      <h4>🐛 Debug Translations</h4>
      <p><strong>Language:</strong> {i18n.language}</p>
      <p><strong>Ready:</strong> {i18n.isInitialized ? '✅' : '❌'}</p>
      <p><strong>Resources Loaded:</strong> {Object.keys(i18n.options.resources || {}).join(', ')}</p>
      
      <h5 style={{ marginTop: '10px', borderTop: '1px solid #444', paddingTop: '5px' }}>Test Keys:</h5>
      {testKeys.map(key => (
        <div key={key} style={{ marginBottom: '5px' }}>
          <strong>{key}:</strong> 
          <span style={{ 
            color: t(key) === key ? 'red' : 'lightgreen',
            marginLeft: '5px'
          }}>
            {t(key) === key ? '❌ ' + key : '✅ ' + t(key)}
          </span>
        </div>
      ))}
      
      <button 
        onClick={() => i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR')}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          background: '#4a5568',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Toggle Language
      </button>
    </div>
  );
};

export default DebugTranslations;
