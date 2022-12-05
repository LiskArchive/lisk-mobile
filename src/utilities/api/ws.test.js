import ws from './ws';

jest.mock('./APIClient', () => ({
  ws: {
    emit: jest.fn(),
    disconnected: true,
  },
  http: {
    request: jest.fn(),
  },
  create: jest.fn(),
}));

describe('ws', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('ws should rejected on disconnected', async () => {
    const wsClient = ws({
      event: 'get.data',
      params: {},
    });

    await expect(wsClient).rejects.toThrow('socket not connected');
  });
});
