import { server } from '../services/msw/server';
import apiClient from '../src/utilities/api/APIClient';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  apiClient.create({ rpc: 'wss://localhost', rest: 'http://localhost' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
