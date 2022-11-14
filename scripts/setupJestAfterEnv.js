// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';

import { MSWServer } from '../services/msw/MSWServer';
import apiClient from '../src/utilities/api/APIClient';

const mswTestServer = new MSWServer('test', setupServer);

// Establish API mocking before all tests.
beforeAll(() => {
  mswTestServer.init({ onUnhandledRequest: 'error' });

  apiClient.create({ ws: 'wss://localhost', http: 'http://localhost' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mswTestServer.server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mswTestServer.server.close());
