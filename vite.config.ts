import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    sitemap({
      hostname: 'https://tarcisiobispo.github.io/portfolio/',
      routes: [
        '/',
        '/privacy-policy'
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // Otimizações de bundle
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,

    // Configurações de chunk
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Manual chunks otimizado para reduzir trabalho da thread principal
        manualChunks: (id) => {
          // React core - crítico, carregado primeiro
          if (id.includes('node_modules/react') && !id.includes('react-router') && !id.includes('react-hook') && !id.includes('react-i18next')) {
            return 'react-core';
          }

          // Framer Motion - grande biblioteca de animação
          if (id.includes('framer-motion') || id.includes('motion-dom')) {
            return 'animation';
          }

          // Lucide Icons - lazy load
          if (id.includes('lucide-react')) {
            return 'icons';
          }

          // React Query - estado assíncrono
          if (id.includes('@tanstack')) {
            return 'query';
          }

          // i18n - pode ser lazy loaded
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }

          // UI Libraries
          if (id.includes('@headlessui') || id.includes('@radix-ui') || id.includes('@floating-ui')) {
            return 'ui';
          }

          // Forms - lazy load
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'forms';
          }

          // Analytics - definitivamente lazy load
          if (id.includes('@microsoft/clarity') || id.includes('logrocket')) {
            return 'analytics';
          }

          // Router
          if (id.includes('react-router')) {
            return 'router';
          }

          // Outros vendors pequenos
          if (id.includes('node_modules')) {
            return 'vendor';
          }
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

      // Tree-shaking mais conservador
      treeshake: {
        moduleSideEffects: true, // Permitir todos os side effects
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },

    // Configurações do Terser para minificação agressiva
    terserOptions: {
      compress: {
        drop_console: true, // Remover todos os console.logs em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Múltiplas passadas de otimização
        unsafe: true, // Otimizações mais agressivas
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        side_effects: false,
        unused: true
      },
      mangle: {
        safari10: true,
        toplevel: true, // Mangle nomes de nível superior
        properties: {
          regex: /^_/ // Mangle propriedades que começam com _
        }
      },
      format: {
        comments: false,
        ascii_only: true
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
    exclude: ['@vite/client', '@vite/env']
  },

  // Configurações específicas para resolver problemas de React em produção
  define: {
    // Garantir que o React está disponível globalmente
    global: 'globalThis',
  },

  // Configurações de servidor para desenvolvimento
  server: {
    fs: {
      strict: false
    }
  }
});
