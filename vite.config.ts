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
        // Manual chunks para otimizar o bundle
        manualChunks: (id) => {
          // Vendor chunks - bibliotecas externas
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
              return 'form-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            if (id.includes('react-i18next') || id.includes('i18next')) {
              return 'i18n-vendor';
            }
            if (id.includes('sonner')) {
              return 'toast-vendor';
            }
            // Outros vendors
            return 'vendor';
          }

          // Chunks específicos do app
          if (id.includes('src/components/accessibility/')) {
            return 'accessibility';
          }
          if (id.includes('src/components/providers/')) {
            return 'providers';
          }
          if (id.includes('src/utils/')) {
            return 'utils';
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

      // Otimizações de tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },

    // Configurações do Terser para minificação
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
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
  }
});
