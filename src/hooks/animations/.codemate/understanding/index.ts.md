This module provides a set of custom React hooks that encapsulate reusable animation logic using the Framer Motion library. These hooks are designed to simplify adding common animation effects in a portfolio project:

1. **useFadeInAnimation**: Triggers a fade-in animation when an element enters the viewport. It uses an Intersection Observer to detect visibility based on a configurable threshold and delay.

2. **useStaggerAnimation**: Creates staggered animations for a list of items, providing animation controls and predefined variants for container and item elements to animate their opacity and position with a spring effect.

3. **useScrollAnimation**: Animates an element into view from a specified direction ('up', 'down', 'left', or 'right') when it scrolls into the viewport. It uses Intersection Observer to toggle between hidden and visible states with smooth transitions.

4. **useHoverAnimation**: Provides simple scale-based animations for hover and tap interactions, returning props to be spread onto motion components for interactive feedback.

5. **usePulseAnimation**: Defines a repeating pulse animation that scales an element up and down continuously, with configurable duration and scale intensity.

The module exports all these hooks individually and as a default object for convenient import and usage in React components to enhance UI with smooth, declarative animations.