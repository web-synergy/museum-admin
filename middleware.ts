import { rewrite } from '@vercel/edge';
import { loadEnv } from 'vite';

export default function proxySettings(request: Request) {
  const url = new URL(request.url);
  const mode = request.mode;
  const env = loadEnv(mode, process.cwd());

  if (url.pathname.startsWith('/api')) {
    return rewrite(new URL(`${env.VITE_SERVER_URL}`, request.url));
  }

  if (url.pathname.startsWith('/')) {
    return rewrite('/index.html');
  }
}
