import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const base = isBuild ? '/portfolio/' : '/';

  console.log(`Running in ${command} mode with base: ${base}`);

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@contexts': resolve(__dirname, 'src/contexts'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@services': resolve(__dirname, 'src/services'),
        '@types': resolve(__dirname, 'src/types'),
        '@public': resolve(__dirname, 'public')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.scss']
    },
    server: {
      port: 5176,
      strictPort: true,
      open: true,
      cors: true
    },
    publicDir: 'public',
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: !isBuild,
      chunkSizeWarningLimit: 1000, // Aumenta o limite de aviso para 1MB
      rollupOptions: {
        output: {
          // Simplified chunking: put all dependencies from node_modules into a single vendor chunk to avoid
            // circular dependencies between multiple vendor_* chunks that caused runtime errors like
            // "Cannot access 't' before initialization" in the browser.
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            },
          // Otimiza o hashing dos arquivos para melhor cache
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: ({ name }) => {
              // Preserve original extension including dot (e.g. .css, .webp)
              const ext = name?.substring(name.lastIndexOf('.')) || '';
              return `assets/[name].[hash]${ext}`;
            }
        },
        // Melhora a árvore de dependências
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      }
    }
  };
});
