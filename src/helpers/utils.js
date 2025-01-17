import { validateProperties, validateDeviceInnovations, validateDeviceSpecials } from '@src/schemas/anys.js';

export const myAtob = (b64txt) => {
  const buff = Buffer.from(b64txt, 'base64');
  const txt = buff.toString('utf-8');
  return txt;
};

export const filterKeysStart = (object, s) => {
  return Object.keys(object).filter(key => key.startsWith(s))
    .reduce((result, key) => {
      result[key] = object[key];
      return result;
    }, {});
};
export const filterKeysIncludes = (object, s) => {
  return Object.keys(object).filter(key => key.includes(s))
    .reduce((result, key) => {
      result[key] = object[key];
      return result;
    }, {});
};

export const callbackProperty = (key) => {
  // The key with the same type
  const type = /\[([^]*)]/.exec(key)[1];
  return type;
};

export const InsertProperties = async (deviceProperties, device, propModel, c) => {
  return Object.entries(deviceProperties).map(async ([k, v]) => {
    const propertyBuilder = {};
    propertyBuilder.propertiesId = k;
    propertyBuilder.DeviceId = device.DeviceId;
    propertyBuilder.fullValue = v[0];
    propertyBuilder.rawValue = v[1];
    let property = validateProperties(propertyBuilder);
    if (!property.success)
      return c.json({ error: 'unprocessable ', message: JSON.parse(device.error.message) }, 422);
    property = property.data;
    property.DevicePropertiesId = crypto.randomUUID().toString();
    const resultsProperty = await propModel.create({ i: property, c, reqModel: 'DeviceProperties' });
    if (!resultsProperty.done)
      return c.json({ error: 'unprocessable ', message: resultsProperty.error }, 422);
  });
};

export const InsertInnovations = async (deviceInnovations, device, innovaModel, c, innovations) => {
  return Object.entries(deviceInnovations).map(async ([fullName, v]) => {
    const innovationBuilder = {};
    innovationBuilder.DeviceId = device.DeviceId;
    const innovation = innovations.find(i => fullName.split('_')[1] === i.iName);
    innovationBuilder.innovationsId = innovation.innovationsId;
    innovationBuilder.value = v === '' ? innovation.defaultValue : v;
    let deviceInnovation = validateDeviceInnovations(innovationBuilder);
    if (!deviceInnovation.success)
      return c.json({ error: 'unprocessable ', message: JSON.parse(device.error.message) }, 422);
    deviceInnovation = deviceInnovation.data;
    deviceInnovation.DeviceInnovationsId = crypto.randomUUID().toString();
    const resultsInnovation = await innovaModel.create({ i: deviceInnovation, c, reqModel: 'DeviceInnovations' });
  });
};

export const InsertSpecials = async (deviceSpecials, device, specialModel, c, specials) => {
  return Object.entries(deviceSpecials).map(async ([k, v]) => {
    const specialBuilder = {};
    specialBuilder.DeviceId = device.DeviceId;
    const special = specials.find(i => k.split('_')[1] === i.iName);
    specialBuilder.specialsId = special.specialsId;
    specialBuilder.value = v === '' ? special.defaultValue : v;
    let deviceSpecial = validateDeviceSpecials(specialBuilder);
    if (!deviceSpecial.success)
      return c.json({ error: 'unprocessable ', message: JSON.parse(device.error.message) }, 422);
    deviceSpecial = deviceSpecial.data;
    deviceSpecial.DeviceSpecialsId = crypto.randomUUID().toString();
    const resultsSpecial = await specialModel.create({ i: deviceSpecial, c, reqModel: 'DeviceSpecials' });
  });
};
