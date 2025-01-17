import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { corsMiddleware } from '@src/middlewares/cors.js';
import { logMiddleware } from './middlewares/log';
import { handleAuth } from '@src/helpers/Auth.js';
import { HEALTH, TOKEN } from '@src/helpers/env.js';
import { controllers } from '@src/controllers/index.js';
import { createRouter } from '@src/routes/index.js';

const app = new Hono().basePath('/api');

app.get('/', (c) => c.json({ healt: HEALTH, code: '001' }));
app.use('*', logMiddleware);
app.use('*', corsMiddleware());

app.get('/login', (c) => handleAuth({ c, userCtrl: controllers.user }));
app.use('*', bearerAuth({ verifyToken: async (token, _) => token === TOKEN }));

createRouter({ app, controllers });

export { app };
export default {
  fetch: app.fetch,
  port: 8888,
};
