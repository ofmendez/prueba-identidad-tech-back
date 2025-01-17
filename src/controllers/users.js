import { validateUser, validatePartialUser } from '@src/schemas/users.js';
import { OFPEPE } from '@src/helpers/env.js';

import * as crypto from 'node:crypto';

export class UserController {
  constructor ({ model }) {
    this.userModel = model;
  }

  getAll = async (c) => {
    const res = await this.userModel.getAll({ c });
    res.results = res.results.map((user) => {
      const { UserId, Name, Role, State } = user; // Destructuring
      return { UserId, Name, Role, State }; // Return a new object with desired properties
    });
    return c.json(res.done ? res.results : res.error, res.done ? 200 : 417);
  };

  getAllRaw = async (c) => {
    const res = await this.userModel.getAll({ c });
    return res.results;
  };

  getById = async (c) => {
    const { id } = c.req.param();
    const res = await this.userModel.getById({ id, c });
    return c.json(res.done ? res.results : res.error, res.done ? 200 : 404);
  };

  create = async (c) => {
    const body = await c.req.json();
    let result = validateUser(body);
    if (!result.success)
      return c.json({ error: 'unprocessable A', message: JSON.parse(result.error.message) }, 422);
    result = result.data;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(result.Pass.toString() + OFPEPE, salt, 100000, 64, 'sha512').toString('hex');
    result.Pass = hash;
    result.Salt = salt;
    result.UserId = crypto.randomUUID().toString();
    const resultsUser = await this.userModel.create({ i: result, c });
    if (!resultsUser.done)
      return c.json({ error: 'unprocessable B', message: resultsUser.error }, 422);
    return c.json({ id: result.UserId }, 201);
  };

  delete = async (c) => {
    const { id } = c.req.param();
    const result = await this.userModel.delete({ id, c });
    return c.json({ message: result ? 'User deleted' : 'User not found' }, result ? 200 : 404);
  };

  update = async (c) => {
    const body = await c.req.json();
    let result = validatePartialUser(body);
    if (!result.success)
      return c.json({ error: JSON.parse(result.error.message) }, 400);
    const { id } = c.req.param();
    const actualUser = await this.userModel.getById({ id, c });
    if (!actualUser.done)
      return c.json({ error: 'User not found' }, 404);
    result = result.data;
    const updatedUser = await this.userModel.update({ id, i: result, c });

    return c.json(updatedUser);
  };
}
