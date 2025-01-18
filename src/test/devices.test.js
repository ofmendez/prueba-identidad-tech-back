import { test, expect } from 'bun:test';
import { TOKEN } from '@src/helpers/env.js';
import { app } from '@src/index';
import Bun from 'bun';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  'x-speed-test': 'true'
};

let sizeDevices = 0;

let DeviceCreated = {};

const device = {
  Name: 'Phone test',
  State: 'Active',
  Battery: '1000 mAh',
  Storage: '16 GB',
  Price: '100 USD',
  MainCamera: '8 MP',
  FrontCamera: '5 MP'
};

test('[POST] Create Device', async () => {
  const res = await app.request('api/devices', {
    method: 'POST',
    body: JSON.stringify(device),
    headers
  });
  DeviceCreated = await res.json();
  expect(res.status).toBe(201);
});

test('[GET] Read Device', async () => {
  const res = await app.request(`api/devices/${DeviceCreated.id}`, {
    method: 'GET',
    headers
  });
  const deviceGet = await res.json();
  expect(res.status).toBe(200);
  expect(deviceGet[0].DeviceId).toEqual(DeviceCreated.id);
});

test('[PATCH] Update Device', async () => {
  const resPatch = await app.request(`api/devices/${DeviceCreated.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ Name: 'device updated' }),
    headers
  });
  expect(resPatch.status).toBe(200);
  const resGet = await app.request(`api/devices/${DeviceCreated.id}`, {
    method: 'GET',
    headers
  });
  const deviceGet = await resGet.json();
  expect(deviceGet[0].Name).toEqual('device updated');
});

test('[DELETE] Delete Device', async () => {
  const res3 = await app.request(`api/devices/${DeviceCreated.id}`, {
    method: 'DELETE',
    headers
  });
  expect(res3.status).toBe(200);
});

test('should get all devices', async () => {
  const res = await app.request('api/devices', {
    method: 'GET',
    headers
  });
  const devices = await res.json();
  expect(res.status).toBe(200);
  expect(devices).toBeInstanceOf(Array);
});

test('Should NOT create a device with invalid data', async () => {
  const res = await app.request('api/devices', {
    method: 'POST',
    body: JSON.stringify({}),
    headers
  });
  expect(res.status).toBe(422);
});

test('Delete all devices', async () => {
  const response = await app.request('api/devices/all', {
    method: 'DELETE',
    headers
  });
  expect(response.status).toBe(200);
});

test('Submit  .csv file', async () => {
  const file = Bun.file('src/test/devices.csv', { type: 'text/csv;charset=utf-8' });
  const byteArray = await file.arrayBuffer();
  const body = {
    name: 'devices.csv',
    file: `text/csv;base64,${new Uint8Array(byteArray).toBase64()}`
  };
  const response = await app.request('api/devices/file', {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  });
  const result = await response.json();
  sizeDevices = result.size;
  expect(result.promises).toEqual('done');
  expect(response.status).toBe(201);
});

test('Get new all devices', async () => {
  const response = await app.request('api/devices', {
    headers
  });
  const devices = await response.json();
  expect(devices.length).toEqual(sizeDevices);
  expect(response.status).toBe(200);
});
