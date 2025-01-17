import { cors } from 'hono/cors';

export const corsMiddleware = () =>
  cors({
    origin: (o) => {
      let result = 'http://localhost';
      if (o.endsWith('.pages.dev'))
        result = o;
      return result;
    }
  });
