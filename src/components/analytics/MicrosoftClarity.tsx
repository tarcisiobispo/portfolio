import { useEffect } from 'react';

const MicrosoftClarityInit: React.FC = () => {
  useEffect(() => {
    // Inicializar Microsoft Clarity apenas em produção
    if (import.meta.env.PROD) {
      try {
        // Usar script inline em vez da biblioteca para evitar problemas de CORS
        const clarityScript = document.createElement('script');
        clarityScript.type = 'text/javascript';
        clarityScript.innerHTML = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "rp64ayubme");

          // Identificar o usuário/portfolio
          clarity("identify", "tarcisio-portfolio", "Tarcísio Bispo Portfolio");
          
          // Adicionar tags personalizadas para contexto
          clarity("set", "portfolio_owner", "Tarcisio Bispo de Araujo");
          clarity("set", "portfolio_type", "UX/Product Designer");
          clarity("set", "portfolio_version", "2024");
          clarity("set", "site_language", "multi");
          
          // Registrar evento de inicialização do portfolio
          clarity("event", "portfolio_initialized");
        `;
        
        document.head.appendChild(clarityScript);
        console.log('Microsoft Clarity initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    } else {
      console.log('Microsoft Clarity disabled in development mode');
    }
  }, []);

  return null; // Este componente não renderiza nada
};

export default MicrosoftClarityInit;