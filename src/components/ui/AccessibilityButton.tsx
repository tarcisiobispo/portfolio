import React, { useState, useRef, useEffect } from 'react';
import { Accessibility, Type, BookOpen, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

export const AccessibilityButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [voiceOver, setVoiceOver] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [dyslexiaIntensity, setDyslexiaIntensity] = useState<'off' | 'weak' | 'medium' | 'strong'>('off');

  const handleDyslexiaClick = (value: 'off' | 'weak' | 'medium' | 'strong') => {
    // Aplicar efeito imediatamente
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('dyslexia-weak', 'dyslexia-medium', 'dyslexia-strong');

    if (value !== 'off') {
      htmlElement.classList.add(`dyslexia-${value}`);
    }

    // Atualizar estado React
    setDyslexiaIntensity(value);
  };

  const { t } = useTranslation();
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setFontSize(parsed.fontSize || 100);
      setVoiceOver(parsed.screenReader || false);
      setDyslexiaIntensity(parsed.dyslexiaIntensity || 'off');
    }
  }, []);

  // Salvar configurações no localStorage
  useEffect(() => {
    const settings = {
      fontSize,
      screenReader: voiceOver,
      dyslexiaIntensity
    };
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [fontSize, voiceOver, dyslexiaIntensity]);

  // Aplicar tamanho da fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Fechar menu ao clicar fora
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
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Fechar com ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Implementar leitor de tela
  useEffect(() => {
    if (voiceOver) {
      const readText = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) {
          const textToRead = target.getAttribute('aria-label') ||
                           target.getAttribute('title') ||
                           target.getAttribute('alt') ||
                           target.textContent ||
                           target.innerText || '';

          if (textToRead.trim() && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(textToRead.trim());
            utterance.lang = document.documentElement.lang || 'pt-BR';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
          }
        }
      };

      document.addEventListener('click', readText);
      
      // Anunciar ativação
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Leitor de tela ativado. Clique em qualquer texto para ouvir.');
        utterance.lang = document.documentElement.lang || 'pt-BR';
        window.speechSynthesis.speak(utterance);
      }

      return () => {
        document.removeEventListener('click', readText);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [voiceOver]);

 // Aplicar estilos para dislexia
 const applyDyslexiaStyles = (intensity: 'weak' | 'medium' | 'strong') => {
   // Remover estilos anteriores
   const existingStyle = document.getElementById('dyslexia-style');
   if (existingStyle) {
     document.head.removeChild(existingStyle);
   }

   const style = document.createElement('style');
   style.id = 'dyslexia-style';

   // Configurações específicas por intensidade
   const configs = {
     weak: { letterSpacing: '0.03em', wordSpacing: '0.08em', lineHeight: '1.4' },
     medium: { letterSpacing: '0.08em', wordSpacing: '0.15em', lineHeight: '1.6' },
     strong: { letterSpacing: '0.12em', wordSpacing: '0.25em', lineHeight: '1.8' }
   };

   const config = configs[intensity];

   style.textContent = `
     body.dyslexia-${intensity}, body.dyslexia-${intensity} p, body.dyslexia-${intensity} h1, body.dyslexia-${intensity} h2, body.dyslexia-${intensity} h3, body.dyslexia-${intensity} h4, body.dyslexia-${intensity} h5, body.dyslexia-${intensity} h6, body.dyslexia-${intensity} span, body.dyslexia-${intensity} button, body.dyslexia-${intensity} a, body.dyslexia-${intensity} li, body.dyslexia-${intensity} div {
       font-family: 'Arial', 'Helvetica', sans-serif !important;
       letter-spacing: ${config.letterSpacing} !important;
       word-spacing: ${config.wordSpacing} !important;
       line-height: ${config.lineHeight} !important;
       font-style: normal !important;
       font-weight: 400 !important;
     }
     body.dyslexia-${intensity} {
       background-color: #FAFAFA !important;
       color: #2C2C2C !important;
     }
   `;

   document.head.appendChild(style);
 };

 // Aplicar estilos quando a intensidade mudar
 useEffect(() => {
   if (dyslexiaIntensity !== 'off') {
     applyDyslexiaStyles(dyslexiaIntensity);
   }
 }, [dyslexiaIntensity]);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 130);
    setFontSize(newSize);
    toast({
      title: t('accessibility.title') || 'Acessibilidade',
      description: `${t('accessibility.fontSize.label') || 'Tamanho da fonte'}: ${newSize}%`,
      duration: 2000,
    });
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 90);
    setFontSize(newSize);
    toast({
      title: t('accessibility.title') || 'Acessibilidade',
      description: `${t('accessibility.fontSize.label') || 'Tamanho da fonte'}: ${newSize}%`,
      duration: 2000,
    });
  };

  const resetFontSize = () => {
    setFontSize(100);
    toast({
      title: t('accessibility.title') || 'Acessibilidade',
      description: `${t('accessibility.fontSize.label') || 'Tamanho da fonte'}: 100%`,
      duration: 2000,
    });
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t('accessibility.openMenu') || 'Opções de acessibilidade'}
        title={t('accessibility.menuTooltip') || 'Opções de acessibilidade'}
        onClick={() => setOpen(v => !v)}
        className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-110 hover:rotate-12 overflow-hidden"
        style={{ color: 'var(--color-primary)' }}
      >
        {/* Efeito de gradiente no hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Partículas flutuantes */}
        <div className="absolute top-1 left-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce"></div>
        <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-pulse"></div>
        <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-300 group-hover:animate-pulse"></div>

        {/* Ícone principal */}
        <Accessibility
          className="w-5 h-5 transition-all duration-300 relative z-10 group-hover:text-blue-600 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] group-hover:translate-y-[-2px] group-hover:rotate-12"
          aria-hidden="true"
        />

        {/* Anel pulsante */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 scale-0 group-hover:scale-110 transition-transform duration-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
      </button>

      <div
        ref={menuRef}
        className={`absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-4 transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        role="dialog"
        aria-labelledby="accessibility-menu-title"
        style={{ visibility: open ? 'visible' : 'hidden' }}
      >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 id="accessibility-menu-title" className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              {t('accessibility.title') || 'Acessibilidade'}
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('accessibility.closeMenu') || 'Fechar menu'}
            >
              <X size={16} />
            </button>
          </div>

          {/* Controles de Fonte */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
              <Type className="w-4 h-4" />
              {t('accessibility.fontSize.label') || 'Tamanho da fonte'}: {fontSize}%
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 90}
                className="group relative flex items-center justify-center w-10 h-8 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all duration-300 text-sm font-bold hover:scale-105 overflow-hidden"
                title={t('accessibility.fontSize.decrease') || 'Diminuir fonte'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">A⁻</span>
              </button>
              <button
                onClick={resetFontSize}
                className="group relative flex items-center justify-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-all duration-300 font-bold hover:scale-105 hover:shadow-lg overflow-hidden"
                title={t('accessibility.fontSize.reset') || 'Resetar fonte'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">A</span>
              </button>
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 130}
                className="group relative flex items-center justify-center w-10 h-8 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all duration-300 text-sm font-bold hover:scale-105 overflow-hidden"
                title={t('accessibility.fontSize.increase') || 'Aumentar fonte'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">A⁺</span>
              </button>
            </div>
          </div>

          {/* Outras opções */}
          <div className="space-y-2">
            <button
              onClick={() => setVoiceOver(prev => !prev)}
              className="group w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              role="menuitem"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-300" />
                <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{t('accessibility.screenReader.label') || 'Leitor de tela'}</span>
              </span>
              {voiceOver && (
                <span className="ml-auto text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full animate-pulse">
                  {t('accessibility.status.enabled') || 'Ativo'}
                </span>
              )}
            </button>

            {/* Modo Dislexia - TEMPORARIAMENTE DESATIVADO */}
            {/* Será reativado após implementação completa com fontes especiais e TTS */}
            {/*
            <div className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
                <Type className="w-4 h-4" />
                {t('accessibility.dyslexia.label') || 'Modo Dislexia'}
              </div>

              <div className="space-y-2">

                <div className="flex gap-1">
                  {[
                    { value: 'off', labelKey: 'accessibility.dyslexia.options.off' },
                    { value: 'weak', labelKey: 'accessibility.dyslexia.options.weak' },
                    { value: 'medium', labelKey: 'accessibility.dyslexia.options.medium' },
                    { value: 'strong', labelKey: 'accessibility.dyslexia.options.strong' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleDyslexiaClick(option.value as any)}
                      className={`group relative px-3 py-2 text-sm rounded-md transition-all duration-300 hover:scale-105 flex-1 ${
                        dyslexiaIntensity === option.value
                          ? `bg-${option.value === 'off' ? 'gray' : option.value === 'weak' ? 'blue' : option.value === 'medium' ? 'green' : 'purple'}-600 text-white shadow-md`
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={`Ativar ${t(option.labelKey)}`}
                    >
                      <span className="relative z-10 font-medium">{t(option.labelKey)}</span>
                    </button>
                  ))}
                </div>

                {dyslexiaIntensity !== 'off' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {t('accessibility.dyslexia.status.active', { intensity: t(`accessibility.dyslexia.options.${dyslexiaIntensity}`) })}
                  </div>
                )}

                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="font-medium mb-2">{t('accessibility.dyslexia.status.example')}</div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {t('accessibility.dyslexia.status.exampleText')}
                  </div>
                </div>
              </div>
            </div>
            */}
          </div>
      </div>
    </div>
  );
};

export default AccessibilityButton;
