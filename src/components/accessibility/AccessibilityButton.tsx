import React, { useState, useEffect, useRef } from 'react';
import {
  Accessibility,
  X,
  Type,
  Eye,
  Pause,
  Focus,
  Keyboard,
  Volume2,
  Moon,
  Sun,
  Settings,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContextualHelp from '@/components/ui/ContextualHelp';
import { useTranslation } from 'react-i18next';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  focusMode: boolean;
  screenReader: boolean;
}

const AccessibilityButton: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    focusMode: false,
    screenReader: false,
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  // Salvar configurações no localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Aplicar configurações ao DOM
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Tamanho da fonte
    root.style.fontSize = `${newSettings.fontSize}%`;

    // Alto contraste
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Removido movimento reduzido - não é adequado para um site já animado

    // Modo foco
    if (newSettings.focusMode) {
      root.classList.add('focus-mode');
    } else {
      root.classList.remove('focus-mode');
    }

    // Removido modo escuro - já existe botão dedicado no header
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atalho Shift + A para abrir menu
      if (e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleMenu();
      }

      // ESC para fechar menu
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    // Foco automático no primeiro item quando abre
    if (!isOpen) {
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 100);
    }

    // Feedback háptico em mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
    message: string
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    // Toast de confirmação
    toast({
      title: "Configuração atualizada",
      description: message,
      duration: 2000,
    });

    // Feedback háptico
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    // Anunciar mudança para leitores de tela
    if (key === 'screenReader' && value) {
      announceToScreenReader(message);
    }
  };

  // Função para anunciar texto para leitores de tela
  const announceToScreenReader = (text: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;

    document.body.appendChild(announcement);

    // Remover após anúncio
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Função para ler texto em voz alta
  const speakText = (text: string) => {
    if ('speechSynthesis' in window && settings.screenReader) {
      // Parar qualquer fala anterior
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      window.speechSynthesis.speak(utterance);
    }
  };

  // Efeito para ativar/desativar leitor de tela COMPLETO
  useEffect(() => {
    if (settings.screenReader) {
      // Adicionar classe visual ao body
      document.body.classList.add('voice-over-active');
      // Função para ler qualquer elemento clicado ou focado
      const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          const textToRead = getElementText(target);
          if (textToRead.trim()) {
            speakText(textToRead);
          }
        }
      };

      // Função para ler qualquer elemento clicado (incluindo textos não clicáveis)
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          const textToRead = getElementText(target);
          if (textToRead.trim()) {
            // Identificar tipo de elemento para contexto
            const elementType = getElementType(target);
            speakText(`${elementType}: ${textToRead}`);
          }
        }
      };

      // Função para ler texto ao passar o mouse (hover)
      const handleMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target && target.textContent && target.textContent.trim()) {
          // Só lê se não for um elemento focável (para evitar duplicação)
          if (!target.matches('button, a, input, select, textarea, [tabindex]')) {
            const textToRead = getElementText(target);
            if (textToRead.trim() && textToRead.length > 3) {
              const elementType = getElementType(target);
              speakText(`${elementType}: ${textToRead}`);
            }
          }
        }
      };

      // Função para navegar e ler com teclas de seta
      const handleKeyDown = (e: KeyboardEvent) => {
        // Ctrl + Seta para navegar e ler elementos
        if (e.ctrlKey && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          navigateAndRead(e.key);
        }

        // Ctrl + R para ler página inteira
        if (e.ctrlKey && e.key === 'r') {
          e.preventDefault();
          readEntirePage();
        }

        // Ctrl + S para parar leitura
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          window.speechSynthesis.cancel();
          speakText('Leitura pausada');
        }
      };

      document.addEventListener('focusin', handleFocus);
      document.addEventListener('click', handleClick);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('keydown', handleKeyDown);

      // Anunciar ativação com instruções
      speakText('Leitor de tela ativado. Clique em qualquer texto para ouvir. Use Ctrl + R para ler a página inteira, Ctrl + S para pausar, ou Ctrl + setas para navegar.');

      return () => {
        document.removeEventListener('focusin', handleFocus);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('mouseenter', handleMouseEnter, true);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('voice-over-active');
      };
    } else {
      // Remover classe visual e parar qualquer fala quando desativado
      document.body.classList.remove('voice-over-active');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [settings.screenReader]);

  // Função para extrair texto de qualquer elemento
  const getElementText = (element: HTMLElement): string => {
    // Prioridade: aria-label > title > alt > textContent
    return element.getAttribute('aria-label') ||
           element.getAttribute('title') ||
           element.getAttribute('alt') ||
           element.textContent ||
           element.innerText ||
           '';
  };

  // Função para identificar tipo de elemento
  const getElementType = (element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();

    if (element.getAttribute('role')) {
      return element.getAttribute('role') || '';
    }

    switch (tagName) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
        return 'Título';
      case 'p':
        return 'Parágrafo';
      case 'button':
        return 'Botão';
      case 'a':
        return 'Link';
      case 'img':
        return 'Imagem';
      case 'li':
        return 'Item de lista';
      case 'span':
        return 'Texto';
      case 'div':
        return element.className.includes('card') ? 'Card' : 'Seção';
      default:
        return 'Elemento';
    }
  };

  // Função para navegar e ler elementos com teclas
  const navigateAndRead = (direction: string) => {
    const allElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, li, span, div'))
      .filter(el => {
        const element = el as HTMLElement;
        return element.textContent &&
               element.textContent.trim().length > 3 &&
               element.offsetParent !== null; // Elemento visível
      }) as HTMLElement[];

    const currentFocus = document.activeElement as HTMLElement;
    const currentIndex = allElements.indexOf(currentFocus);

    let nextIndex = 0;

    switch (direction) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex < allElements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : allElements.length - 1;
        break;
    }

    const nextElement = allElements[nextIndex];
    if (nextElement) {
      nextElement.focus();
      const textToRead = getElementText(nextElement);
      const elementType = getElementType(nextElement);
      speakText(`${elementType}: ${textToRead}`);
    }
  };

  // Função para ler página inteira
  const readEntirePage = () => {
    const mainContent = document.querySelector('main') || document.body;
    const allTextElements = Array.from(mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span'))
      .filter(el => {
        const element = el as HTMLElement;
        return element.textContent &&
               element.textContent.trim().length > 3 &&
               element.offsetParent !== null &&
               !element.closest('.accessibility-menu, .toast, .modal');
      }) as HTMLElement[];

    let fullText = 'Lendo página inteira. ';
    allTextElements.forEach(element => {
      const text = getElementText(element);
      const type = getElementType(element);
      if (text.trim()) {
        fullText += `${type}: ${text}. `;
      }
    });

    speakText(fullText);
  };

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 25, 200);
    updateSetting('fontSize', newSize, `${t('accessibility.fontSize.label')}: ${newSize}%`);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 25, 75);
    updateSetting('fontSize', newSize, `${t('accessibility.fontSize.label')}: ${newSize}%`);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
      highContrast: false,
      focusMode: false,
      screenReader: false,
    };

    setSettings(defaultSettings);
    toast({
      title: t('accessibility.reset.success'),
      description: t('accessibility.reset.action'),
      duration: 2000,
    });
  };

  return (
    <div className="relative">
      {/* Botão Principal - Mesmo padrão dos outros botões */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label={isOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t('accessibility.openMenu')}
        className="transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-105"
        style={{ color: 'var(--color-primary)' }}
      >
        <Accessibility className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Menu de Acessibilidade */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            absolute top-full right-0 mt-2 z-50
            bg-[var(--color-surface)]
            rounded-xl shadow-2xl border border-[var(--color-border)]
            p-6 w-80 max-w-[calc(100vw-3rem)]
            transition-opacity duration-300
          `}
          role="dialog"
          aria-label={t('accessibility.menuLabel')}
        >
            {/* Cabeçalho */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <Settings size={20} />
                  {t('accessibility.title')}
                </h2>
                <ContextualHelp
                  title={t('accessibility.menuLabel')}
                  content={`${t('accessibility.description')} ${t('accessibility.instructions')} ${t('accessibility.shortcut')}`}
                  position="bottom"
                />
              </div>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {t('accessibility.subtitle')}
              </p>
            </div>

            {/* Controles */}
            <div className="space-y-4">
              {/* Tamanho da Fonte */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Type size={16} />
                  {t('accessibility.fontSize.label')}: {settings.fontSize}%
                </label>
                <div className="flex gap-2">
                  <button
                    ref={firstItemRef}
                    onClick={decreaseFontSize}
                    disabled={settings.fontSize <= 75}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t('accessibility.fontSize.decreaseLabel')}
                  >
                    {t('accessibility.fontSize.decrease')}
                  </button>
                  <button
                    onClick={increaseFontSize}
                    disabled={settings.fontSize >= 200}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t('accessibility.fontSize.increaseLabel')}
                  >
                    {t('accessibility.fontSize.increase')}
                  </button>
                </div>
              </div>

              {/* Alto Contraste */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Eye size={16} />
                  {t('accessibility.contrast.label')}
                </label>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast,
                    settings.highContrast ? t('accessibility.contrast.disabled') : t('accessibility.contrast.enabled'))}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${settings.highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                  aria-label={`${settings.highContrast ? t('accessibility.contrast.disable') : t('accessibility.contrast.enable')}`}
                  aria-pressed={settings.highContrast}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Removido "Reduzir Movimento" - não é adequado para um site já animado */}

              {/* Modo Foco */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Focus size={16} />
                  {t('accessibility.readingMode.label')}
                </label>
                <button
                  onClick={() => updateSetting('focusMode', !settings.focusMode,
                    settings.focusMode ? t('accessibility.readingMode.disabled') : t('accessibility.readingMode.enabled'))}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${settings.focusMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                  aria-label={`${settings.focusMode ? t('accessibility.readingMode.disable') : t('accessibility.readingMode.enable')}`}
                  aria-pressed={settings.focusMode}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      settings.focusMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Removido "Modo Escuro" - já existe botão dedicado no header */}

              {/* Leitor de Tela */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Volume2 size={16} />
                  {t('accessibility.screenReader.label')}
                </label>
                <button
                  onClick={() => updateSetting('screenReader', !settings.screenReader,
                    settings.screenReader ? t('accessibility.screenReader.disabled') : t('accessibility.screenReader.enabled'))}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${settings.screenReader ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                  aria-label={`${settings.screenReader ? t('accessibility.screenReader.disable') : t('accessibility.screenReader.enable')}`}
                  aria-pressed={settings.screenReader}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      settings.screenReader ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Botão Reset */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={resetSettings}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t('accessibility.reset.action')}
              >
                {t('accessibility.reset.label')}
              </button>
            </div>

            {/* Instruções de teclado */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Keyboard size={14} />
                {t('accessibility.shortcut')}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default AccessibilityButton;
