import { createUserRouter } from '@src/routes/users.js';
import { createDeviceRouter } from '@src/routes/devices.js';

function createRouter ({ app, controllers }) {
  createUserRouter({ route: app.route('/users'), ctrl: controllers.user });
  createDeviceRouter({ route: app.route('/devices'), ctrl: controllers.device });
}

export { createRouter };
