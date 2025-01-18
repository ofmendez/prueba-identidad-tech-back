import { cors } from 'hono/cors';

export const corsMiddleware = () =>
  cors({
    origin: (o) => {
      let result = 'http://localhost:5173';
      if (o.endsWith('.pages.dev') || o.startsWith('https://localhost'))
        result = o;
      return result;
    }
  });
