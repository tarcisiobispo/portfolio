import React, { useState, useRef, useEffect } from 'react';
import { Accessibility, Type, Eye, BookOpen, MousePointer } from 'lucide-react';

type AccessibilityOption = {
  id: string;
  label: string;
  icon: React.ElementType;
  i18nKey: string;
  action: () => void;
};

export const AccessibilityButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  // Removido reduceMotion - não é adequado para um site já animado



  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Acessibilidade: fecha com ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Aplicar alto contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Aplicar texto grande
  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add('large-text');
      // Aumenta o tamanho da fonte em 25%
      document.body.style.fontSize = '125%';
    } else {
      document.documentElement.classList.remove('large-text');
      document.body.style.fontSize = '';
    }
  }, [largeText]);

  // Implementar leitor de tela COMPLETO
  useEffect(() => {
    if (voiceOver) {
      // Função para ler qualquer elemento clicado
      const readText = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          const textToRead = target.getAttribute('aria-label') ||
                           target.getAttribute('title') ||
                           target.getAttribute('alt') ||
                           target.textContent ||
                           target.innerText || '';

          if (textToRead.trim() && 'speechSynthesis' in window) {
            // Cancela qualquer fala anterior
            window.speechSynthesis.cancel();

            // Identifica o tipo de elemento
            const elementType = target.tagName.toLowerCase();
            let prefix = '';

            switch (elementType) {
              case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                prefix = 'Título: ';
                break;
              case 'p':
                prefix = 'Parágrafo: ';
                break;
              case 'button':
                prefix = 'Botão: ';
                break;
              case 'a':
                prefix = 'Link: ';
                break;
              case 'img':
                prefix = 'Imagem: ';
                break;
              case 'li':
                prefix = 'Item: ';
                break;
              default:
                prefix = 'Texto: ';
            }

            // Cria uma nova instância de fala
            const utterance = new SpeechSynthesisUtterance(prefix + textToRead);
            utterance.lang = document.documentElement.lang || 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
          }
        }
      };

      // Função para ler texto ao passar o mouse (hover)
      const readOnHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target && target.textContent && target.textContent.trim()) {
          // Só lê se não for um elemento focável (para evitar duplicação)
          if (!target.matches('button, a, input, select, textarea, [tabindex]')) {
            const textToRead = target.textContent.trim();
            if (textToRead.length > 3 && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(textToRead);
              utterance.lang = document.documentElement.lang || 'pt-BR';
              utterance.rate = 1.1;
              utterance.volume = 0.7;
              window.speechSynthesis.speak(utterance);
            }
          }
        }
      };

      // Função para ler página inteira com Ctrl+R
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'r') {
          e.preventDefault();
          const mainContent = document.querySelector('main') || document.body;
          const allText = Array.from(mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span'))
            .map(el => el.textContent?.trim())
            .filter(text => text && text.length > 3)
            .join('. ');

          if (allText && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance('Lendo página inteira. ' + allText);
            utterance.lang = document.documentElement.lang || 'pt-BR';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
          }
        }

        // Ctrl+S para parar
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          window.speechSynthesis.cancel();
        }
      };

      // Adiciona eventos
      document.addEventListener('click', readText);
      document.addEventListener('mouseenter', readOnHover, true);
      document.addEventListener('keydown', handleKeyDown);

      // Anunciar ativação
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Leitor de tela ativado. Clique em qualquer texto para ouvir. Use Ctrl + R para ler tudo, Ctrl + S para parar.');
        utterance.lang = document.documentElement.lang || 'pt-BR';
        window.speechSynthesis.speak(utterance);
      }

      return () => {
        document.removeEventListener('click', readText);
        document.removeEventListener('mouseenter', readOnHover, true);
        document.removeEventListener('keydown', handleKeyDown);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [voiceOver]);

  // Aplicar modo de dislexia
  useEffect(() => {
    if (dyslexiaMode) {
      document.documentElement.classList.add('dyslexia-friendly');
      // Adiciona uma folha de estilo para texto amigável para dislexia
      const style = document.createElement('style');
      style.id = 'dyslexia-style';
      style.textContent = `
        body, p, h1, h2, h3, h4, h5, h6, span, button, a, li {
          font-family: 'Arial', sans-serif !important;
          letter-spacing: 0.05em !important;
          word-spacing: 0.1em !important;
          line-height: 1.5 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.documentElement.classList.remove('dyslexia-friendly');
      const style = document.getElementById('dyslexia-style');
      if (style) {
        document.head.removeChild(style);
      }
    }
  }, [dyslexiaMode]);

  // Removido useEffect do reduceMotion - não é adequado para um site já animado

  const accessibilityOptions: AccessibilityOption[] = [
    {
      id: 'contrast',
      label: 'Alto Contraste',
      icon: Eye,
      i18nKey: 'alto-contraste',
      action: () => setHighContrast(prev => !prev)
    },
    {
      id: 'text-size',
      label: 'Aumentar Fonte',
      icon: Type,
      i18nKey: 'aumentar-fonte',
      action: () => setLargeText(prev => !prev)
    },
    {
      id: 'voice-over',
      label: 'Ler Conteúdo',
      icon: BookOpen,
      i18nKey: 'ler-conteudo',
      action: () => setVoiceOver(prev => !prev)
    },
    {
      id: 'dyslexia',
      label: 'Modo Dislexia',
      icon: Type,
      i18nKey: 'modo-dislexia',
      action: () => setDyslexiaMode(prev => !prev)
    },
    // Removido opção "reduce-motion" - não é adequado para um site já animado
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Opções de acessibilidade"
        title="Opções de acessibilidade"
        data-i18n-attr="opcoes-acessibilidade"
        data-i18n-target="title"
        onClick={() => setOpen(v => !v)}
        className="transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-105"
        style={{ color: 'var(--color-primary)' }}
      >
        <Accessibility className="w-5 h-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg z-50 py-1 animate-fade-in"
          role="menu"
        >
          {accessibilityOptions.map(option => (
            <button
              key={option.id}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-md transition-colors duration-200 focus:outline-none focus:bg-[var(--color-primary)]/10 focus:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] ${option.id === 'contrast' && highContrast ? 'font-bold text-[var(--color-primary)]' : ''} ${option.id === 'text-size' && largeText ? 'font-bold text-[var(--color-primary)]' : ''} ${option.id === 'voice-over' && voiceOver ? 'font-bold text-[var(--color-primary)]' : ''} ${option.id === 'dyslexia' && dyslexiaMode ? 'font-bold text-[var(--color-primary)]' : ''}`}
              onClick={() => {
                option.action();
                // Mantém o menu aberto para permitir múltiplas seleções
              }}
              role="menuitem"
            >
              <span className="flex items-center gap-2">
                {React.createElement(option.icon, { className: "w-4 h-4" })}
                <span className="text-sm" data-i18n={option.i18nKey}>{option.label}</span>
              </span>
              {((option.id === 'contrast' && highContrast) ||
                (option.id === 'text-size' && largeText) ||
                (option.id === 'voice-over' && voiceOver) ||
                (option.id === 'dyslexia' && dyslexiaMode)) && (
                <span className="ml-auto text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full" data-i18n="ativo">
                  Ativo
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;