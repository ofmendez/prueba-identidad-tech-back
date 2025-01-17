export const logMiddleware = async (c, next) => {
  const headers = Object.fromEntries(c.req.raw.headers);
  const isSpeedTest = headers['x-speed-test'] === 'true';
  if (!isSpeedTest)
    console.log(`[${c.req.method}] ${c.req.url} <------`);
  await next();
};
