import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const config = {
    plugins: [react()],
    server: {
      port: 5174,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: false,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#root': resolve(__dirname),
      },
    },
    rewrite: {},
  };

  return config;
});
