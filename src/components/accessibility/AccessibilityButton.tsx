import React, { useState, useEffect, useRef } from 'react';
import {
  Accessibility,
  X,
  Type,
  Volume2,
  Settings,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContextualHelp from '@/components/ui/ContextualHelp';
import { useTranslation } from 'react-i18next';

interface AccessibilitySettings {
  fontSize: number;
  screenReader: boolean;
}

interface AccessibilityButtonProps {
  className?: string;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    screenReader: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    // Tamanho da fonte - aplicar apenas ao elemento html para preservar proporções
    root.style.fontSize = `${newSettings.fontSize}%`;
    
    // Remover classe focus-mode se existir
    root.classList.remove('focus-mode');
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

  // Efeito para ativar/desativar leitor de tela
  useEffect(() => {
    if (settings.screenReader) {
      // Adicionar classe visual ao body
      document.body.classList.add('voice-over-active');
      
      // Função para ler qualquer elemento clicado
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          const textToRead = target.textContent || '';
          if (textToRead.trim()) {
            speakText(textToRead);
          }
        }
      };

      document.addEventListener('click', handleClick);

      // Anunciar ativação
      speakText('Leitor de tela ativado. Clique em qualquer texto para ouvir.');

      return () => {
        document.removeEventListener('click', handleClick);
        document.body.classList.remove('voice-over-active');
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    } else {
      // Remover classe visual e parar qualquer fala quando desativado
      document.body.classList.remove('voice-over-active');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [settings.screenReader]);

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 10, 130);
    updateSetting('fontSize', newSize, `${t('accessibility.fontSize.label')}: ${newSize}%`);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 10, 90);
    updateSetting('fontSize', newSize, `${t('accessibility.fontSize.label')}: ${newSize}%`);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
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
      {/* Botão Principal */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label={isOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t('accessibility.openMenu')}
        className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-110 overflow-hidden"
        style={{ color: 'var(--color-primary)' }}
      >
        <Accessibility
          className="w-5 h-5 transition-all duration-300 relative z-10 group-hover:text-purple-500"
          aria-hidden="true"
        />

      </button>

      {/* Menu de Acessibilidade */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 z-50 bg-[var(--color-surface)] rounded-xl shadow-2xl border border-[var(--color-border)] p-6 w-80 max-w-[calc(100vw-3rem)] transition-opacity duration-300"
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
                    disabled={settings.fontSize <= 90}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t('accessibility.fontSize.decreaseLabel')}
                  >
                    {t('accessibility.fontSize.decrease')}
                  </button>
                  <button
                    onClick={increaseFontSize}
                    disabled={settings.fontSize >= 130}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t('accessibility.fontSize.increaseLabel')}
                  >
                    {t('accessibility.fontSize.increase')}
                  </button>
                </div>
              </div>

              {/* Modo de leitura removido */}

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
          </div>
        )}
    </div>
  );
};

export default AccessibilityButton;