import { defineConfig, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import type { PluginOption } from 'vite';

// Configuração base do Vite
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const isPreview = command === 'serve' && process.argv.includes('preview');
  const baseArgIndex = process.argv.findIndex(arg => arg.startsWith('--base='));
  const explicitBase = baseArgIndex >= 0 ? process.argv[baseArgIndex].split('=')[1] : null;
  const base = explicitBase || (command === 'serve' && !isPreview ? '/' : '/portfolio/');
  
  const plugins: PluginOption[] = [
    react({
      plugins: process.env.NODE_ENV === 'production' ? [
        ['@swc/plugin-remove-console', { exclude: ['error', 'warn'] }]
      ] : []
    })
  ];

  return {
    // Configuração base
    base,
    plugins,
    
    // Configuração de resolução de módulos
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
    },

    // Configuração de build
    build: {
      // Target moderno para evitar polyfills desnecessários
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      minify: 'terser',
      sourcemap: true,
      
      // Configurações de chunk
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
      
      // CSS otimizado
      cssCodeSplit: true,
      cssMinify: true,
      cssTarget: ['chrome61', 'safari11', 'firefox60', 'edge18'],
      
      // Geração de manifest para melhor cache
      manifest: true,
      
      // Configurações do Rollup
      rollupOptions: {
        // Excluir polyfills desnecessários
        external: (id: string) => {
          const deps = [
            'core-js',
            'core-js-pure',
            'core-js-global',
            '@babel/runtime'
          ];
          return deps.some(dep => id.includes(dep));
        },

        // Configurações de saída
        output: {
          // Nomeação de chunks
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          
          // Nomeação de assets com hash para cache de longo prazo
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1]?.toLowerCase() || '';
            
            if (['png', 'jpeg', 'jpg', 'svg', 'gif', 'webp', 'avif'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            
            return 'assets/[name]-[hash][extname]';
          },
          
          // Agrupamento de módulos por pacote
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              // Agrupar por pacote
              const packageName = id.match(/node_modules\/([^\/]+)/)?.[1];
              if (packageName) {
                return `vendor-${packageName.replace('@', '')}`;
              }
              return 'vendor';
            }
          }
        },
        
        // Otimização de tree-shaking
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      },
      
      // Configurações do Terser para minificação
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.debug'],
          passes: 1,
          unsafe: false,
          conditionals: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          reduce_vars: true,
          side_effects: true,
          unused: true
        },
        mangle: {
          safari10: true,
          toplevel: false
        },
        format: {
          comments: false
        }
      }
    },
    
    // Configurações do servidor de desenvolvimento
    server: {
      fs: {
        strict: false
      },
      // Configurações para melhorar o HMR
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
        clientPort: 443,
        path: '/hmr',
        timeout: 30000,
        overlay: false
      },
      // Headers de cache para desenvolvimento
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    },
    
    // Configurações do servidor de preview
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
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
        'core-js-global',
        '@babel/runtime',
        '@babel/runtime-corejs3'
      ]
    },
    
    // Configurações globais
    define: {
      global: 'globalThis',
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    }
  };
});
