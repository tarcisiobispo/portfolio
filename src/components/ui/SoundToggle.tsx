import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { useContextualToast } from '@/hooks/useContextualToast';
import { useNavigationSounds } from '@/hooks/useSound';

interface SoundToggleProps {
  className?: string;
  showVolumeSlider?: boolean;
}

const SoundToggle: React.FC<SoundToggleProps> = ({
  className = '',
  showVolumeSlider = false
}) => {
  const { t } = useTranslation();
  const { isEnabled, volume, setEnabled, setVolume, isSupported, play } = useSound();
  const { showToast } = useContextualToast();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const [showSlider, setShowSlider] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Don't render if sound is not supported
  if (!isSupported) {
    return null;
  }

  // Determine icon based on state
  const getIcon = () => {
    if (!isEnabled) return VolumeX;
    if (volume < 0.3) return Volume1;
    return Volume2;
  };

  const Icon = getIcon();

  // Toggle sound enabled/disabled
  const handleToggle = () => {
    const newEnabled = !isEnabled;
    setEnabled(newEnabled);

    // Play click sound first
    playButtonClick();

    // Play feedback sound if enabling
    if (newEnabled) {
      setTimeout(() => play('toggle'), 100);
    }

    // Show contextual toast
    if (buttonRef.current) {
      showToast(buttonRef.current, {
        message: newEnabled ? t('toasts.success.soundEnabled') : t('toasts.success.soundDisabled'),
        description: newEnabled ? t('toasts.success.soundEnabledDesc') : t('toasts.success.soundDisabledDesc'),
        type: 'success',
        duration: 1500,
      });
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);

    // Play test sound at new volume
    setTimeout(() => play('click', { volume: newVolume }), 50);
  };

  // Handle slider toggle
  const handleSliderToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showVolumeSlider) {
      setShowSlider(!showSlider);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        onMouseEnter={() => playButtonHover()}
        onContextMenu={showVolumeSlider ? handleSliderToggle : undefined}
        aria-label={isEnabled ? t('tooltips.sound.disable') : t('tooltips.sound.enable')}
        title={isEnabled ? t('tooltips.sound.disable') : t('tooltips.sound.enable')}
        className="group relative transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-110 overflow-hidden"
        style={{ color: 'var(--color-primary)' }}
      >
        <span className="sr-only">
          {isEnabled ? t('tooltips.sound.disable') : t('tooltips.sound.enable')}
        </span>

        {/* Efeito de ondas sonoras */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Ondas sonoras animadas */}
        <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:animate-ping"></div>
        <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 group-hover:animate-pulse"></div>
        <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce"></div>

        <motion.div
          key={isEnabled ? 'enabled' : 'disabled'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            className={`w-5 h-5 transition-all duration-300 relative z-10 ${
              isEnabled
                ? 'group-hover:text-green-500 group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)] group-hover:rotate-12 group-hover:translate-y-[-2px] group-hover:translate-x-[1px]'
                : 'group-hover:text-red-500 group-hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] group-hover:rotate-12 group-hover:translate-y-[-2px] group-hover:translate-x-[1px]'
            }`}
            aria-hidden="true"
          />
        </motion.div>

        {/* Anel pulsante para indicar interatividade */}
        <div className={`absolute inset-0 rounded-full border-2 scale-0 group-hover:scale-110 transition-transform duration-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse ${
          isEnabled ? 'border-green-400/30' : 'border-red-400/30'
        }`}></div>
      </button>

      {/* Volume Slider */}
      <AnimatePresence>
        {showVolumeSlider && showSlider && isEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-12 right-0 z-50 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg p-3 min-w-[120px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[var(--color-muted)] text-center">
                {t('sound.volume')}
              </label>

              <div className="flex items-center gap-2">
                <Volume1 className="w-3 h-3 text-[var(--color-muted)]" />

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer slider"
                  aria-label={t('sound.volumeControl')}
                />

                <Volume2 className="w-3 h-3 text-[var(--color-muted)]" />
              </div>

              <div className="text-xs text-center text-[var(--color-muted)]">
                {Math.round(volume * 100)}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-surface);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-surface);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: var(--color-border);
        }

        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: var(--color-border);
        }
      `}</style>
    </div>
  );
};

export default SoundToggle;
