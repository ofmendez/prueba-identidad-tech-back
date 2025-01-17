import { test, expect } from 'bun:test';
import { HEALTH, TOKEN } from '@src/helpers/env.js';
import { app } from '@src/index';

const user = {
  Name: 'test',
  Pass: 'test1234',
  Role: 'Admin',
  State: 'Active',
};
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  'x-speed-test': 'true'
};

test('HealthCheck ', async () => {
  console.log(HEALTH);
  const res = await app.request('/api', { method: 'GET' });
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body).toEqual({ healt: HEALTH, code: '001' });
});

test('Should be Unauthorized ', async () => {
  const res = await app.request('api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json', 'x-speed-test': 'true' },
  });
  expect(res.status).toBe(401);
  expect(await res.text()).toBe('Unauthorized');
});

test('Should create and delete an element', async () => {
  const res = await app.request('api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers
  });
  const User = await res.json();
  expect(res.status).toBe(201);

  const res2 = await app.request(`api/users/${User.id}`, {
    method: 'DELETE',
    headers
  });
  expect(res2.status).toBe(200);
});
