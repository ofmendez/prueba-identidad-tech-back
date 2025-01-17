import { Resend } from 'resend';

export const createMailRouter = ({ route, userController }) => {
  const getRandomPassword = () => {
    return Math.random().toString(36).slice(2, 17);
  };
  route.get('/recovery', async (c) => {
    const resend = new Resend(c.env.RESEND_API_KEY);
    let mail = await c.req.queries('mail');
    mail = mail[0];
    if (!mail)
      return c.json({ error: 'Mail is required' }, 400);

    const newPass = getRandomPassword();
    const result = await userController.updatePass(mail.toLowerCase(), newPass, c);
    if (result.error)
      return c.json({ error: result.error }, 404);

    const { data, error } = await resend.emails.send({
      from: 'Contacto <contacto@reddesignsystems.com>',
      to: [`${mail}`],
      subject: `Recuperación de contraseña ${new Date().toISOString()}`,
      html: `<p>Tu nueva contraseña es: <b>${newPass}</b></p>`,
      // react: EmailTemplate({ firstName: 'Vitor' }),
    });
    if (error)
      return new Response(JSON.stringify({ error }));

    return c.json({ message: 'Recovery mail sent', data });
  });
  route.get('/', async (_) => { });
  route.get('/:id', async (_) => { });
};
