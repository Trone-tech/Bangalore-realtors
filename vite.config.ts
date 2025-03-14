import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/database'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: {
      'firebase': resolve(__dirname, 'node_modules/firebase')
    }
  },
  build: {
    rollupOptions: {
      external: [
        '@firebase/util',
        '@firebase/component',
        '@firebase/logger'
      ]
    }
  }
});
