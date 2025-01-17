import * as crypto from 'node:crypto';
import { OFPEPE, TOKEN } from '@src/helpers/env.js';

const checkAuth = async (_password, userController, c) => {
  const users = await userController.getAllRaw(c);
  const user = users[0];
  const hash = crypto.pbkdf2Sync(_password + OFPEPE, user.Salt, 100000, 64, 'sha512').toString('hex');
  if (hash !== user.Pass)
    return { exist: false };

  return {
    exist: true,
    user: { _id: user.UserId, role: user.Role, name: user.Name },
  };
};

const handleAuth = async ({ c, userCtrl }) => {
  const { password } = c.req.query();
  if (!password)
    return c.json({ message: 'Please provide password' }, 400);
  const { exist, user } = await checkAuth(password, userCtrl, c);
  if (!exist)
    return c.json({ message: 'Invalid credentials' }, 401);
  return c.json({ message: 'You are loged', token: `${TOKEN}`, user }, 200);
};

export { handleAuth };
