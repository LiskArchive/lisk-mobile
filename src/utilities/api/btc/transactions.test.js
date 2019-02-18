import fetchMock from 'fetch-mock';
import * as transactions from './transactions';

const address = '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve';
const response = {
  hash160: '4f6a9f245359d3b3441fcd22117c78466039caba',
  address: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
  n_tx: 2,
  total_received: 401724600,
  total_sent: 401724600,
  final_balance: 0,
  txs: [
    {
      ver: 1,
      inputs: [
        {
          sequence: 4294967295,
          witness: '',
          prev_out: {
            spent: true,
            spending_outpoints: [
              {
                tx_index: 411031256,
                n: 0,
              },
            ],
            tx_index: 409136088,
            type: 0,
            addr: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
            value: 401724600,
            n: 1,
            script: '76a9144f6a9f245359d3b3441fcd22117c78466039caba88ac',
          },
          script: '473044022078ca6d574cb3272fa7dfb28fd31a1acd9099dd521c1d4e7accb2086f60ad484202207b4131d72f6caf3a2c7758771b03e1b071cf0d8ee43f719bae2673ca79a2b7d701210305dbc31667a16d565c6f37da58ec37230f241eacd5950137df7b5a08996e6730',
        },
      ],
      weight: 756,
      block_height: 560808,
      relayed_by: '0.0.0.0',
      out: [
        {
          spent: false,
          tx_index: 411031256,
          type: 0,
          addr: '3AoZ4rm7qZWcCzNHMDhh41zJE5LNfr7Gx2',
          value: 401723000,
          n: 0,
          script: 'a91463f59fff9f9f13075e445d1ee6f864d0f375f91f87',
        },
      ],
      lock_time: 0,
      result: 0,
      size: 189,
      block_index: 1748075,
      time: 1548876059,
      tx_index: 411031256,
      vin_sz: 1,
      hash: 'a146763b49a6181e3fbc611def63af13ac2c08a0d97c80e64c93e8e083110aa9',
      vout_sz: 1,
    },
    {
      ver: 1,
      inputs: [
        {
          sequence: 4294967293,
          witness: '',
          prev_out: {
            spent: true,
            spending_outpoints: [
              {
                tx_index: 409136088,
                n: 0,
              },
            ],
            tx_index: 409075879,
            type: 0,
            addr: '1BrQvwTsDntfBAowYrqKq98MYY3dUNjnU3',
            value: 774865158,
            n: 1,
            script: '76a91477099d9f2157a80c403dcb4c87f20b29f04506f088ac',
          },
          script: '483045022100e06322de8e7fc608084a2b7f83da88b6474cd4b7ef52b8cf53258adc7cb8814b022032dba7068cab1cc7bbb561ca17c61335642627d98bae7798283f75920fe03204012102a9059f4e87767f7e0ea5efceb33fc4cb8f6139a8c251bf8798e873d96105bef2',
        },
      ],
      weight: 904,
      block_height: 559919,
      relayed_by: '0.0.0.0',
      out: [
        {
          spent: true,
          spending_outpoints: [
            {
              tx_index: 411616078,
              n: 1,
            },
          ],
          tx_index: 409136088,
          type: 0,
          addr: '14k18ngzkYcPnriyTNMaSnNgQBCRsKunYM',
          value: 373138298,
          n: 0,
          script: '76a914290a6033f096917b3609621b9407aed043d01c1e88ac',
        },
        {
          spent: true,
          spending_outpoints: [
            {
              tx_index: 411031256,
              n: 0,
            },
          ],
          tx_index: 409136088,
          type: 0,
          addr: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
          value: 401724600,
          n: 1,
          script: '76a9144f6a9f245359d3b3441fcd22117c78466039caba88ac',
        },
      ],
      lock_time: 559918,
      result: -401724600,
      size: 226,
      rbf: true,
      block_index: 1745627,
      time: 1548345462,
      tx_index: 409136088,
      vin_sz: 1,
      hash: 'e85812a1ce720f9bcda387465a7bd2c2bbfa8b62ce5220f2df1a3017cbda70e4',
      vout_sz: 2,
    },
  ],
};

describe('api/btc/transactions', () => {
  describe('getLatestBlockHeight', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      fetchMock.once('*', { height: 1 });
      const result = await transactions.getLatestBlockHeight();
      expect(result).toEqual(1);
    });

    it('handles non-500 errors and resolves 0', async () => {
      fetchMock.once('*', { status: 400, body: { message: 'error' } });
      const result = await transactions.getLatestBlockHeight();
      expect(result).toEqual(0);
    });

    it('handles errors and resolves 0', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });
      const result = await transactions.getLatestBlockHeight();
      expect(result).toEqual(0);
    });
  });

  describe('get', () => {
    beforeAll(() => {
      transactions.getLatestBlockHeight = jest.fn();
    });

    beforeEach(() => fetchMock.reset());

    it('resolves correctly for single transaction', async () => {
      transactions.getLatestBlockHeight.mockResolvedValueOnce(600000);
      fetchMock.once('*', response.txs[0]);
      const id = response.txs[0].hash;
      const result = await transactions.get({ address, id });
      expect(result).toEqual({
        data: [
          {
            id: 'a146763b49a6181e3fbc611def63af13ac2c08a0d97c80e64c93e8e083110aa9',
            timestamp: 1548876059,
            confirmations: (600000 - 560808) + 1,
            fee: 1600,
            senderAddress: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
            recipientAddress: '3AoZ4rm7qZWcCzNHMDhh41zJE5LNfr7Gx2',
            amount: 401723000,
          },
        ],
        meta: {
          count: 1,
        },
      });
    });

    it('resolves correctly for multiple transactions', async () => {
      transactions.getLatestBlockHeight.mockResolvedValueOnce(0);
      fetchMock.once('*', response);
      const result = await transactions.get({ address });
      expect(result).toEqual({
        data: [
          {
            id: 'a146763b49a6181e3fbc611def63af13ac2c08a0d97c80e64c93e8e083110aa9',
            timestamp: 1548876059,
            confirmations: 560808,
            fee: 1600,
            senderAddress: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
            recipientAddress: '3AoZ4rm7qZWcCzNHMDhh41zJE5LNfr7Gx2',
            amount: 401723000,
          },
          {
            id: 'e85812a1ce720f9bcda387465a7bd2c2bbfa8b62ce5220f2df1a3017cbda70e4',
            timestamp: 1548345462,
            confirmations: 559919,
            fee: 2260,
            senderAddress: '1BrQvwTsDntfBAowYrqKq98MYY3dUNjnU3',
            recipientAddress: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
            amount: 401724600,
          },
        ],
        meta: {
          count: 2,
        },
      });
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await transactions.get({ address });
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await transactions.get({ address });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
