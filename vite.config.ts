import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    // sitemap({
    //   hostname: 'https://tarcisiobispo.github.io',
    //   basePath: '/portfolio',
    //   routes: [
    //     '/',
    //     '/privacy-policy',
    //     '/#projetos',
    //     '/#backlog',
    //     '/#contato'
    //   ],
    //   changefreq: 'weekly',
    //   priority: 0.8,
    //   lastmod: '2025-01-15'
    // }),

  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // Otimizações de bundle - target moderno para evitar polyfills antigos
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    minify: 'terser',
    sourcemap: false,

    // Configurações de chunk - otimizadas para LCP
    chunkSizeWarningLimit: 800, // Reduzido para chunks menores

    // CSS otimizado para performance crítica
    cssCodeSplit: true,
    cssMinify: true, // Use default esbuild minifier

    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline pequenos assets
    reportCompressedSize: false, // Acelera build

    rollupOptions: {
      // Evitar polyfills desnecessários
      external: (id) => {
        // Excluir core-js se detectado
        if (id.includes('core-js')) return true;
        return false;
      },

      output: {
        // Manual chunks simplificados para evitar problemas de inicialização
        manualChunks: {
          // React core - manter junto para evitar problemas de contexto
          'react-vendor': ['react', 'react-dom'],

          // Roteamento
          'router': ['react-router-dom'],

          // Animações
          'animation': ['framer-motion'],

          // UI Libraries
          'ui': ['@headlessui/react', '@radix-ui/react-tooltip', '@floating-ui/react'],

          // Query
          'query': ['@tanstack/react-query'],

          // i18n
          'i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],

          // Icons
          'icons': ['lucide-react'],

          // Forms
          'forms': ['react-hook-form'],

          // Analytics
          'analytics': ['@microsoft/clarity', 'logrocket']
        },

        // Nomeação de chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },

        // Nomeação de assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];

          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash][extname]`;
          }

          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash][extname]`;
          }

          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        // Entry file naming
        entryFileNames: 'js/[name]-[hash].js'
      },

      // Tree-shaking mais conservador para evitar problemas de inicialização
      treeshake: {
        moduleSideEffects: true, // Permitir todos os side effects
        propertyReadSideEffects: true, // Mais conservador
        unknownGlobalSideEffects: true // Mais conservador para evitar problemas
      }
    },

    // Configurações do Terser mais conservadoras
    terserOptions: {
      compress: {
        drop_console: false, // Manter console.logs para debug
        drop_debugger: true,
        pure_funcs: ['console.debug'],
        passes: 1, // Uma passada apenas
        unsafe: false, // Otimizações seguras apenas
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        side_effects: true, // Preservar side effects
        unused: true
      },
      mangle: {
        safari10: true,
        toplevel: false, // Não mangle nomes de nível superior
      },
      format: {
        comments: false
      }
    }
  },

  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-i18next',
      'i18next'
    ],
    exclude: [
      '@vite/client',
      '@vite/env',
      'core-js',
      'core-js-pure',
      'core-js-global'
    ]
  },

  // Configurações específicas para resolver problemas de React em produção
  define: {
    // Garantir que o React está disponível globalmente
    global: 'globalThis',
  },

  // Configure server middleware to ensure CSP is applied
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Apply security headers to all requests
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com https://google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://clarity.ms https://www.clarity.ms https://api.logrocket.io https://ingest.logrocket.io https://r.logrocket.io https://cdn.logrocket.io https://cdn.logrocket.com https://region1.google-analytics.com https://region1.analytics.google.com; worker-src 'self' blob: data: https://cdn.logrocket.com; object-src 'none';");
      next();
    });
  },

  // Configurações de servidor para desenvolvimento - SECURITY HARDENED
  server: {
    // Security: Restrict file system access
    fs: {
      strict: true,
      // Only allow serving files from specific directories
      allow: ['..', 'src', 'public', 'node_modules']
    },
    // Security: Configure CORS properly
    cors: {
      origin: process.env.NODE_ENV === 'development'
        ? ['http://localhost:5173', 'http://127.0.0.1:5173']
        : false,
      credentials: false
    },
    // Security: Restrict host access
    host: process.env.NODE_ENV === 'development' ? 'localhost' : false,
    // Security: Configure headers for development (backup)
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com https://google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://clarity.ms https://www.clarity.ms https://api.logrocket.io https://ingest.logrocket.io https://r.logrocket.io https://cdn.logrocket.io https://cdn.logrocket.com https://region1.google-analytics.com https://region1.analytics.google.com https://api.emailjs.com https://emailjs.com; worker-src 'self' blob: data: https://cdn.logrocket.com; object-src 'none';"
    }
  },

  // Security: Preview server configuration
  preview: {
    // Security: Restrict host access for preview
    host: 'localhost',
    cors: false,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com https://google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://clarity.ms https://www.clarity.ms https://api.logrocket.io https://ingest.logrocket.io https://r.logrocket.io https://cdn.logrocket.io https://cdn.logrocket.com https://region1.google-analytics.com https://region1.analytics.google.com https://api.emailjs.com https://emailjs.com; worker-src 'self' blob: data: https://cdn.logrocket.com; object-src 'none';"
    }
  }
});
