import { UserModel } from '@src/models/sqlite/user.js';
import { DeviceModel } from '@src/models/sqlite/device.js';
import { db } from '@src/db/db.js';

const models = {
  user: new UserModel(),
  device: new DeviceModel(),
};
Object.values(models).forEach((model) => model.setEnv({ db }));

export { models };
