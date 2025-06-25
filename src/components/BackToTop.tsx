import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão quando o usuário rolar a página para baixo
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Rola a página suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-5 right-5 
        md:bottom-8 md:right-8
        w-12 h-12 md:w-14 md:h-14
        bg-[var(--color-primary)] text-white 
        rounded-full shadow-lg 
        flex items-center justify-center 
        transition-all duration-300 ease-in-out
        hover:bg-[var(--color-primary-dark)] hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      aria-label="Voltar ao topo"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {/* Ícone de seta para cima */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;
