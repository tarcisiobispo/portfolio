import { useEffect } from 'react';
import LogRocket from 'logrocket';

const LogRocketInit: React.FC = () => {
  useEffect(() => {
    // Inicializar LogRocket apenas em produção
    if (import.meta.env.PROD) {
      try {
        LogRocket.init('fatqpp/portfolio-kbfin');
        console.log('LogRocket initialized successfully');
      } catch (error) {
        console.error('Failed to initialize LogRocket:', error);
      }
    }
  }, []);

  return null; // Este componente não renderiza nada
};

export default LogRocketInit;
