import React, { useState } from 'react';
import { Settings, X, Globe, MessageCircle, Palette, Volume2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import SimpleThemeToggle from './SimpleThemeToggle';
import SoundToggle from './SoundToggle';
import AccessibilityButton from '../accessibility/AccessibilityButton';

interface SettingsDrawerProps {
  setFeedbackOpen: (open: boolean) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ setFeedbackOpen }) => {
  const { t, i18n } = useTranslation();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const settingsItems = [
    {
      id: 'language',
      icon: Globe,
      label: t('language.select'),
      action: () => setLangMenuOpen(!langMenuOpen),
      hasSubmenu: true
    },
    {
      id: 'theme',
      icon: Palette,
      label: t('theme.toggle'),
      component: <SimpleThemeToggle />,
      isComponent: true
    },
    {
      id: 'sound',
      icon: Volume2,
      label: t('sound.toggle'),
      component: <SoundToggle />,
      isComponent: true
    },
    {
      id: 'accessibility',
      icon: Eye,
      label: t('accessibility.features.title'),
      component: <AccessibilityButton />,
      isComponent: true
    },
    {
      id: 'feedback',
      icon: MessageCircle,
      label: t('feedback.openFeedback'),
      action: () => {
        setFeedbackOpen(true);
        setIsOpen(false);
        playButtonClick();
      }
    }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Settings button clicked');
            setIsOpen(true);
            playButtonClick();
          }}
          onMouseEnter={() => playButtonHover()}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-primary)] hover:scale-105 transition-all duration-200"
          aria-label={t('settings.open')}
          title={t('settings.open')}
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </DrawerTrigger>
      
      <DrawerContent 
        className="h-[70vh] max-h-[500px]"
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}
      >
        {/* Handle para arrastar */}
        <div className="h-1.5 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-3 mb-4" />
        
        <DrawerHeader className="border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-[var(--color-primary)]" />
              {t('settings.title')}
            </DrawerTitle>
            <DrawerClose asChild>
              <button 
                className="rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label={t('common.close')}
                onClick={() => playButtonClick()}
                onMouseEnter={() => playButtonHover()}
              >
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              
              if (item.isComponent) {
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex-shrink-0">
                      {item.component}
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={item.action}
                    onMouseEnter={() => playButtonHover()}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <motion.div
                        animate={{ rotate: langMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[var(--color-muted)]"
                      >
                        ▼
                      </motion.div>
                    )}
                  </button>
                  
                  {/* Submenu de idiomas */}
                  <AnimatePresence>
                    {item.id === 'language' && langMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="mt-2 ml-8 space-y-1 overflow-hidden"
                      >
                        <button 
                          onClick={() => changeLanguage('pt-BR')}
                          className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                            i18n.language === 'pt-BR' 
                              ? 'bg-[var(--color-primary)] text-white font-medium' 
                              : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'
                          }`}
                        >
                          {t('language.portuguese')}
                        </button>
                        <button 
                          onClick={() => changeLanguage('en-US')}
                          className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                            i18n.language === 'en-US' 
                              ? 'bg-[var(--color-primary)] text-white font-medium' 
                              : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'
                          }`}
                        >
                          {t('language.english')}
                        </button>
                        <button 
                          onClick={() => changeLanguage('es-ES')}
                          className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                            i18n.language === 'es-ES' 
                              ? 'bg-[var(--color-primary)] text-white font-medium' 
                              : 'text-[var(--color-text)] hover:bg-[var(--color-primary-light)]'
                          }`}
                        >
                          {t('language.spanish')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
