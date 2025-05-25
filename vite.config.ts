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
        // Manual chunks simplificado para evitar problemas de bundling
        manualChunks: {
          // React core - manter junto para evitar problemas de contexto
          'react-core': ['react', 'react-dom'],

          // Bibliotecas de UI
          'ui-libs': ['framer-motion', 'lucide-react'],

          // Roteamento
          'routing': ['react-router-dom'],

          // Internacionalização
          'i18n': ['react-i18next', 'i18next'],

          // Query e estado
          'state-management': ['@tanstack/react-query'],

          // Outros vendors grandes
          'vendor-misc': ['sonner', 'react-hook-form']
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

      // Otimizações de tree-shaking
      treeshake: {
        moduleSideEffects: (id) => {
          // Permitir side effects para i18n e CSS
          return id.includes('i18n') || id.includes('.css') || id.includes('react-fix');
        },
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },

    // Configurações do Terser para minificação
    terserOptions: {
      compress: {
        drop_console: false, // Manter console.logs para debug em produção
        drop_debugger: true,
        pure_funcs: ['console.debug']
      },
      mangle: {
        safari10: true
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
