import { cors } from 'hono/cors';

export const corsMiddleware = () =>
  cors({
    origin: (o) => {
      let result = 'http://localhost:5173';
      if (o.startsWith('https://identidad-tech-front.pages.dev') || o.startsWith('https://localhost'))
        result = o;
      return result;
    }
  });
