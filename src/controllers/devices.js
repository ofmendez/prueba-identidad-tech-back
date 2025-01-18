import { validateDevice, validatePartialDevice } from '@src/schemas/devices.js';
import * as Papa from 'papaparse';
import { myAtob } from '@src/helpers/utils.js';

export class DeviceController {
  constructor ({ model }) {
    this.deviceModel = model;
  }

  getAll = async (c) => {
    const res = await this.deviceModel.getAll({ c });
    return c.json(res.results);
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
    const body = await c.req.json();
    const result = validateDevice(body);
    if (!result.success)
      return c.json({ error: JSON.parse(result.error.message) }, 422);
    const createdDevice = await this.deviceModel.create({ i: result.data, c });
    return c.json({ id: createdDevice.results.lastInsertRowid }, 201);
  };

  createManyByFile = async (c) => {
    const { file } = await c.req.json();
    const all = myAtob(file.split(',')[1]);
    const results = Papa.parse(all, { header: true });
    const rawData = results.data;
    const promises = rawData.map(async (i) => {
      const result = validateDevice(i);
      if (!result.success)
        return { error: JSON.parse(result.error.message) };
      return await this.deviceModel.create({ i: result.data, c });
    });
    const createdDevices = await Promise.all(promises);
    return c.json({ promises: 'done', size: createdDevices.length }, 201);
  };

  delete = async (c) => {
    const { id } = c.req.param();
    const result = await this.deviceModel.delete({ id, c });
    return c.json({ message: result ? 'Device deleted' : 'Device not found' }, result ? 200 : 404);
  };

  deleteAll = async (c) => {
    const result = await this.deviceModel.deleteAll({ c });
    return c.json({ message: result ? 'Devices deleted' : 'Devices not found' }, result ? 200 : 404);
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
