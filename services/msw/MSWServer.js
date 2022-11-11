import { mswHandlers } from './handlers';

export class MSWServer {
  mode = null;

  server = null;

  setupHandler = null;

  constructor(mode, setupHandler) {
    this.mode = mode;
    this.setupHandler = setupHandler;
  }

  init(options = {}) {
    if (this.setupHandler) {
      const handlers = this._getHandlers();

      this.server = this.setupHandler(...handlers);

      this.server.listen(options);
    }
  }

  _getHandlers() {
    if (this.mode === 'test') {
      return [...Object.values(mswHandlers)];
    }

    if (!process.env.MOCKED_SERVICE_ENDPOINTS) return [];

    const endpointsToMock = process.env.MOCKED_SERVICE_ENDPOINTS.split(';').map(
      (endpointName) => `${endpointName}MockHandler`
    );

    const handlers = Object.entries(mswHandlers).reduce((acc, [handlerKey, handlerValue]) => {
      if (endpointsToMock.includes(handlerKey)) return [...acc, handlerValue];

      return acc;
    }, []);

    return handlers;
  }
}
