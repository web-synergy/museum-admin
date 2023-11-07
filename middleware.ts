import { rewrite } from '@vercel/edge';

export default function proxySettings(request: Request) {
  const url = new URL(request.url);
  const serverUrl = process.env.VITE_SERVER_URL_API;

  if (url.pathname.startsWith('/api')) {
    return rewrite(new URL(`${serverUrl}`, request.url));
  }
}
