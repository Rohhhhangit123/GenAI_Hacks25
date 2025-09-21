import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/configg/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://credscore-355089345579.europe-west1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
