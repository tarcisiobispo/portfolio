import { useEffect, useState } from 'react';
import { AnimationControls, useAnimation } from 'framer-motion';

/**
 * Custom animation hooks for the portfolio project
 * These hooks provide reusable animation logic for components
 */

/**
 * Hook to create a fade-in animation when an element enters the viewport
 * @param threshold - Visibility threshold (0-1) to trigger the animation
 * @param delay - Delay in ms before starting the animation
 * @returns Animation controls and ref to attach to the element
 */
export const useFadeInAnimation = (threshold = 0.1, delay = 0) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            controls.start('visible');
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, threshold, delay, isVisible]);

  return { controls, ref: setRef, isVisible };
};

/**
 * Hook to create a staggered animation for a list of items
 * @param itemCount - Number of items to animate
 * @param staggerDelay - Delay between each item's animation
 * @returns Animation controls and variants for the container and items
 */
export const useStaggerAnimation = (itemCount: number, staggerDelay = 0.1) => {
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return { controls, containerVariants, itemVariants };
};

/**
 * Hook to create a scroll-triggered animation
 * @param direction - Direction of the animation ('up', 'down', 'left', 'right')
 * @param distance - Distance to animate in pixels
 * @returns Animation controls and ref to attach to the element
 */
export const useScrollAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 50
) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref]);

  return { controls, ref: setRef, variants };
};

/**
 * Hook to create a hover animation for interactive elements
 * @returns Hover animation props to spread on a motion component
 */
export const useHoverAnimation = () => {
  return {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };
};

/**
 * Hook to create a pulse animation that repeats
 * @param duration - Duration of each pulse in seconds
 * @param scale - Maximum scale during the pulse
 * @returns Animation variants to use with a motion component
 */
export const usePulseAnimation = (duration = 2, scale = 1.05) => {
  return {
    animate: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };
};

export default {
  useFadeInAnimation,
  useStaggerAnimation,
  useScrollAnimation,
  useHoverAnimation,
  usePulseAnimation,
};