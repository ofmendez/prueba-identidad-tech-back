import { validateDevice, validatePartialDevice } from '@src/schemas/devices.js';
import * as Papa from 'papaparse';

export class DeviceController {
  constructor ({ model }) {
    this.deviceModel = model;
  }

  // TODO: Finalize the implementation of the getAll method
  getAll = async (c) => {
    const res = await this.deviceModel.getAll({ c });
    res.results = res.results.map((device) => {
      const { DeviceId } = device; // Destructuring
      return { DeviceId }; // Return a new object with desired properties
    });
    return c.json(res.done ? res.results : res.error, res.done ? 200 : 417);
  };

  getAllRaw = async (c) => {
    const res = await this.deviceModel.getAll({ c });
    return res.results;
  };

  getById = async (c) => {
    const { id } = c.req.param();
    const res = await this.deviceModel.getById({ id, c });
    return c.json(res.done ? res.results : res.error, res.done ? 200 : 404);
  };

  // TODO: Implement the create method
  create = async (c) => {
    return c.json({ message: 'Not implemented' }, 501);
  };

  // TODO: Implement the create method
  createManyByFile = async (c) => {
    return c.json({ message: 'Not implemented' }, 501);
  };

  delete = async (c) => {
    const { id } = c.req.param();
    const result = await this.deviceModel.delete({ id, c });
    return c.json({ message: result ? 'Device deleted' : 'Device not found' }, result ? 200 : 404);
  };

  update = async (c) => {
    const body = await c.req.json();
    let result = validatePartialDevice(body);
    if (!result.success)
      return c.json({ error: JSON.parse(result.error.message) }, 400);
    const { id } = c.req.param();
    const actualDevice = await this.deviceModel.getById({ id, c });
    if (!actualDevice.done)
      return c.json({ error: 'Device not found' }, 404);
    result = result.data;
    const updatedDevice = await this.deviceModel.update({ id, i: result, c });

    return c.json(updatedDevice);
  };
}
