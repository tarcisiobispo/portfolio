import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  opacity?: number;
  size?: number;
  color?: string;
  interactive?: boolean;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  className = '',
  particleCount = 50,
  speed = 1,
  opacity = 0.5,
  size = 3,
  color = '#3b82f6',
  interactive = true
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('🎨 Particles loaded successfully');
  }, []);

  const options = useMemo(() => ({
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: interactive,
          mode: 'push',
        },
        onHover: {
          enable: interactive,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: color,
        distance: 150,
        enable: true,
        opacity: opacity * 0.4,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce' as const,
        },
        random: false,
        speed: speed,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: particleCount,
      },
      opacity: {
        value: opacity,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: size },
      },
    },
    detectRetina: true,
    reduceDuplicatedMessages: true,
  }), [particleCount, speed, opacity, size, color, interactive]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground;
