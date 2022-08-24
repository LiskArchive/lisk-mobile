import { apiClient } from './apiClient';

describe('apiClient', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNetworkState', () => {
    const data = {
      height: 2912982123,
      blockTime: 10
    };

    it('Retrieve a transaction by id', async () => {
      global.fetch.mockReturnValue(
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => ({
            data: {
              height: 2912982123,
              blockTime: 10
            }
          })
        })
      );
      const result = await apiClient.getNetworkInfo();
      expect(result).toEqual(data);
      expect(fetch).toHaveBeenCalledWith(
        'https://service.lisk.com/api/v3/network/status',
        expect.anything()
      );
    });

    it('Throw error for all other errors', async () => {
      global.fetch.mockReturnValue(
        Promise.resolve({
          ok: false,
          status: 500
        })
      );
      try {
        await apiClient.getNetworkInfo();
      } catch (e) {
        expect(e.message).toEqual('Failed to request network info from server.');
      }
    });
  });

  describe('getLatestBlock', () => {
    const data = {
      height: 2912982123,
    };

    it('should get latest blocks', async () => {
      global.fetch.mockReturnValue(
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => ({
            data: [{
              height: 2912982123,
            }]
          })
        })
      );
      const result = await apiClient.getLatestBlock();
      expect(result).toEqual(data);
      expect(fetch).toHaveBeenCalledWith(
        'https://service.lisk.com/api/v3/blocks',
        expect.anything()
      );
    });

    it('should throw error when failed to fetch latest blocks', async () => {
      global.fetch.mockReturnValue(
        Promise.resolve({
          ok: false,
          status: 500
        })
      );
      try {
        await apiClient.getLatestBlock();
      } catch (e) {
        expect(e.message).toEqual('Failed to retrieve the latest block from server.');
      }
    });
  });
});
