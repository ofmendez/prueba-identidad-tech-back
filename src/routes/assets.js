export const createAssetsRouter = ({ route }) => {
  route.post('/config', async (c) => {
    const body = await c.req.json();
    // await c.env.KV.put(`ENV_${body.name.trim()}`, body.value);
    return c.json({ data: body.value });
  });

  route.post('/', async (c) => {
    const body = await c.req.json();
    // await c.env.KV.put(body.name.trim(), body.image);
    return c.json({ data: body.image });
  });

  route.get('/:id', async (c) => {
    const { id } = c.req.param();
    // const result = await c.env.KV.get(id);
    return c.json({ data: 'result' });
  });
};
