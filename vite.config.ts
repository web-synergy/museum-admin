import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env.VITE_SERVER_URL);
  const config = {
    plugins: [react()],
    base: '/',
    server: {
      port: 5174,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#root': resolve(__dirname),
      },
    },
  };

  if (command !== 'serve') {
    config.base = '/museum-admin/';
  }

  return config;
});
