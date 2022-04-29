import { cleanup, init } from 'detox';
import adapter from 'detox/runners/jest/adapter';

const config = require('../.detoxrc.json');

beforeAll(async () => {
  await init(config, { initGlobals: false });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
