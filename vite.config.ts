import { defineConfig, type ConfigEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// More robust way to determine if we're in preview mode and get the base path
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // Check if we're in preview mode
  const isPreview = command === 'serve' && process.argv.includes('preview');
  
  // Check if base is explicitly set via command line
  const baseArgIndex = process.argv.findIndex(arg => arg.startsWith('--base='));
  const explicitBase = baseArgIndex >= 0 ? process.argv[baseArgIndex].split('=')[1] : null;
  
  // Use different base paths for development and production
  const base = explicitBase || (command === 'serve' && !isPreview ? '/' : '/portfolio/');
  
  return {
  // Use determined base path
  base,
  plugins: [
    react({
      // SWC optimizations for production
      plugins: process.env.NODE_ENV === 'production' ? [
        ['@swc/plugin-remove-console', { exclude: ['error', 'warn'] }]
      ] : []
    }),
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
  // Ensure public directory is properly served
  publicDir: resolve(__dirname, 'public'),
  build: {
    // Otimizações de bundle - target moderno para evitar polyfills antigos
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    minify: 'terser',
    sourcemap: true, // Habilitar source maps para debugging

    // Configurações de chunk otimizadas para carregamento crítico
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    
    // CSS otimizado para performance
    cssCodeSplit: true, // Usando valor booleano para compatibilidade
    cssMinify: true,

    rollupOptions: {
      // Evitar polyfills desnecessários - mais agressivo
      external: (id: string) => {
        // Excluir todos os tipos de core-js
        if (id.includes('core-js')) return true;
        if (id.includes('core-js-pure')) return true;
        if (id.includes('core-js-global')) return true;
        if (id.includes('@babel/runtime')) return true;
        return false;
      },

      output: {
        // Estratégia de chunking otimizada para carregamento crítico
        manualChunks: (id: string) => {
          // Identificar módulos críticos que devem ser carregados primeiro
          if (id.includes('src/main') || id.includes('src/App')) {
            return 'critical';
          }
          
          // Separar o CSS crítico
          if (id.includes('index.css') || id.includes('global.css')) {
            return 'critical-css';
          }
          
          // React core - manter junto para evitar problemas de contexto
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Roteamento
          if (id.includes('node_modules/react-router-dom/')) {
            return 'router';
          }
          
          // Animações - pode ser separado e carregado depois
          if (id.includes('node_modules/framer-motion/')) {
            return 'animation';
          }
          
          // UI Libraries - carregar depois do conteúdo crítico
          if (id.includes('node_modules/@headlessui/') || 
              id.includes('node_modules/@radix-ui/') || 
              id.includes('node_modules/@floating-ui/')) {
            return 'ui';
          }
          
          // Query - pode ser carregado depois
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query';
          }
          
          // i18n
          if (id.includes('node_modules/react-i18next/') || 
              id.includes('node_modules/i18next/') || 
              id.includes('node_modules/i18next-browser-languagedetector/')) {
            return 'i18n';
          }
          
          // Icons
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
          
          // Forms
          if (id.includes('node_modules/react-hook-form/')) {
            return 'forms';
          }
          
          // Analytics
          if (id.includes('node_modules/@microsoft/clarity/') || 
              id.includes('node_modules/logrocket/')) {
            return 'analytics';
          }
        },

        // Nomeação de chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },

        // Nomeação de assets com hash para cache eficiente
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1]?.toLowerCase() || '';
          
          // Mapeamento de extensões para pastas
          const assetDirs: Record<string, string> = {
            'css': 'assets/css',
            'js': 'assets/js',
            'jpg': 'assets/images',
            'jpeg': 'assets/images',
            'png': 'assets/images',
            'svg': 'assets/images',
            'webp': 'assets/images',
            'gif': 'assets/images',
            'woff': 'assets/fonts',
            'woff2': 'assets/fonts',
            'ttf': 'assets/fonts',
            'eot': 'assets/fonts',
            'json': 'assets/data'
          };
          
          const assetDir = assetDirs[ext] || 'assets';
          
          // Para arquivos com hash, usar [hash] no nome para cache de longo prazo
          const includeHash = [
            'js', 'css', 'woff', 'woff2', 'ttf', 'eot',
            'jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'
          ].includes(ext);
          
          const hash = includeHash ? '.[hash]' : '';
          return `${assetDir}/[name]${hash}[extname]`;
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

  // Configurações específicas para resolver problemas de React em produção
  // As otimizações de desenvolvimento foram movidas para baixo no arquivo

  // Configuração do servidor de desenvolvimento
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
      'X-Frame-Options': 'DENY',
      // Otimizações de carregamento
      'Link': '</assets/css/critical.css>; rel=preload; as=style',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    // Pré-carregamento de módulos críticos
    open: true,
    cors: true,
    // Habilita compressão para melhor performance
    proxy: {},
    // Otimizações de desempenho
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  
  // Configuração do servidor de preview
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Otimizações de carregamento
      'Link': [
        '</assets/css/critical.css>; rel=preload; as=style',
        '</js/critical.js>; rel=preload; as=script'
      ]
    },
    // Configurações de desempenho
    open: true,
    cors: true,
    // Habilita compressão para melhor performance
    proxy: {}
  },
  
  // Otimizações adicionais
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
