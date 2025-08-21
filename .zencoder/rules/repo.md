---
description: Repository Information Overview
alwaysApply: true
---

# Portfolio Information

## Summary
A personal portfolio website built with React, TypeScript, and Vite. The project uses modern web technologies including Tailwind CSS, Radix UI components, and various React libraries for animations, internationalization, and UI enhancements.

## Structure
- **src/**: Main source code containing React components, pages, and utilities
- **public/**: Static assets including images, localization files, and web manifest
- **dist/**: Build output directory for production deployment
- **docs/**: GitHub Pages deployment directory
- **scripts/**: Utility scripts for build and deployment processes

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.8.3
**Build System**: Vite 6.3.5
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.3.1
- React Router 6.26.2
- Tailwind CSS 3.4.17
- Radix UI (various components)
- i18next 25.2.0 (Internationalization)
- Framer Motion 12.10.5 (Animations)
- GSAP 3.13.0 (Advanced animations)
- React Hook Form 7.53.0 (Form handling)
- Zod 3.23.8 (Schema validation)

**Development Dependencies**:
- TypeScript 5.8.3
- ESLint 9.26.0
- PostCSS 8.5.3
- Vite 6.3.5
- SWC (Speedy Web Compiler)

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Main Files & Resources
**Entry Point**: src/main.tsx
**Main Component**: src/App.tsx
**Page Components**: src/pages/
**UI Components**: src/components/
**Styling**: src/styles/ (CSS files) and Tailwind CSS
**Configuration**: 
- vite.config.ts (Build configuration)
- tsconfig.json (TypeScript configuration)
- tailwind.config.ts (Tailwind CSS configuration)
- postcss.config.js (PostCSS configuration)

## Deployment
**Platform**: GitHub Pages
**Base URL**: /portfolio/
**Deployment Commands**:
```bash
# Standard deployment
npm run deploy

# Force deployment
npm run deploy:force

# Direct deployment
npm run deploy:direct
```

## Internationalization
**Framework**: i18next
**Locales**: Located in public/locales/
**Implementation**: src/i18n/ directory with configuration and components