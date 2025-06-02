import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:right-0 focus-within:z-50 focus-within:bg-[var(--color-background)] focus-within:border-b focus-within:border-[var(--color-border)] focus-within:shadow-sm">
      <a
        href="#main-content"
        className="block px-4 py-2 text-center text-[var(--color-primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 transition-all duration-200"
        tabIndex={0}
      >
        Pular para conteúdo principal
      </a>
    </div>
  );
};

export default SkipLink;