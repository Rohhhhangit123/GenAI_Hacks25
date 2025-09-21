import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      // Keep proxy only for development mode
      ...(command === 'serve' && {
        proxy: {
          '/api/analyze': {
            target: 'https://credscore-355089345579.europe-west1.run.app',
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/api\/analyze/, ''),
            configure: (proxy, options) => {
              proxy.on('error', (err, req, res) => {
                console.log('🚨 Proxy error:', err);
              });
              proxy.on('proxyReq', (proxyReq, req, res) => {
                console.log('📤 Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, res) => {
                console.log('📥 Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
        }
      }),
    },
    // Build configuration
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            lucide: ['lucide-react'],
          },
        },
      },
    },
    // Environment variables
    define: {
      __DEV__: JSON.stringify(mode === 'development'),
    },
  };
});
