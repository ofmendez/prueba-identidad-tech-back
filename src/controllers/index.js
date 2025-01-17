import { UserController } from '@src/controllers/users.js';
import { DeviceController } from '@src/controllers/devices.js';
import { models } from '@src/models/index.js';

const controllers = {
  user: new UserController({ model: models.user }),
  device: new DeviceController({ model: models.device }),
};

export { controllers };
