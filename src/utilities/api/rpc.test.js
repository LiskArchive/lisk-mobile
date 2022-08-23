import rpc from './rpc';

jest.mock('./APIClient', () => ({
  socket: {
    emit: jest.fn(),
    disconnected: false,
  },
  http: {
    request: jest.fn(),
  },
  create: jest.fn(),
}));

describe('rpc', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('rpc should rejected on disconnected', async () => {
    const rpcClient = rpc({
      event: 'get.data',
      params: {},
    });

    await expect(rpcClient).rejects.toThrow('socket not connected');
  });
});
