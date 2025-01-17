import { test, expect } from 'bun:test';
import { TOKEN } from '@src/helpers/env.js';
import { app } from '@src/index';

let UserCreated = {};

const user = {
  Name: 'user',
  Pass: 'user1234',
  Role: 'User',
  State: 'Active',
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  'x-speed-test': 'true'
};

test('[POST] Create User', async () => {
  const res = await app.request('api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers
  });
  UserCreated = await res.json();
  expect(res.status).toBe(201);
});

test('[GET] Read User', async () => {
  const res = await app.request(`api/users/${UserCreated.id}`, {
    method: 'GET',
    headers
  });
  const userGet = await res.json();
  expect(res.status).toBe(200);
  expect(userGet[0].UserId).toEqual(UserCreated.id);
});

test('[PATCH] Update User', async () => {
  const resPatch = await app.request(`api/users/${UserCreated.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ Name: 'user updated' }),
    headers
  });
  expect(resPatch.status).toBe(200);
  const resGet = await app.request(`api/users/${UserCreated.id}`, {
    method: 'GET',
    headers
  });
  const userGet = await resGet.json();
  expect(userGet[0].Name).toEqual('user updated');
});

test('[DELETE] Delete User', async () => {
  const res3 = await app.request(`api/users/${UserCreated.id}`, {
    method: 'DELETE',
    headers
  });
  expect(res3.status).toBe(200);
});

test('should get all users', async () => {
  const res = await app.request('api/users', {
    method: 'GET',
    headers
  });
  const users = await res.json();
  expect(res.status).toBe(200);
  expect(users).toBeInstanceOf(Array);
});

test('Should NOT create a user with invalid data', async () => {
  const res = await app.request('api/users', {
    method: 'POST',
    body: JSON.stringify({}),
    headers
  });
  expect(res.status).toBe(422);
});
