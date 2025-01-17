import { test, expect, mock } from 'bun:test';
import { TOKEN } from '@src/helpers/env.js';
import { app } from '@src/index';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  'x-speed-test': 'true'
};

const sizeDevices = 0;
