import { networks } from 'bitcoinjs-lib';
import fetchMock from 'fetch-mock';
import response from 'constants/btcTransactionMock';
import * as transactions from './transactions';
import config from '../../../../btc.config';

const passphrase = 'say width dwarf confirm rule party pact iron edge dignity wish direct';

const address = {
  mainnet: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
  testnet: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
  testnetRecipient: 'mgKwQFVCEN2enQtzgqrzCxWv5WH6VAyLXa',
};

describe('api/btc/transactions', () => {
  describe('get', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly for single transaction', async () => {
      fetchMock.once('*', response.getTransaction);
      const result = await transactions.get({
        address: address.testnet,
        id: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
      });
      expect(result).toEqual({
        data: [
          {
            id:
              'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
            timestamp: 1550570887000,
            confirmations: 10611,
            fee: 1036,
            recipientAddress: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
            senderAddress: 'Unparsed Address',
            amount: 1580000,
            data: '',
            type: 0,
          },
        ],
        meta: {},
      });
    });

    it('resolves correctly for multiple transactions', async () => {
      fetchMock.once('*', response.getTransactions);
      const result = await transactions.get({ address: address.testnet });
      expect(result).toEqual({
        data: [
          {
            id:
              'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
            timestamp: 1550570887000,
            confirmations: 10609,
            fee: 1036,
            senderAddress: 'Unparsed Address',
            recipientAddress: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
            amount: 1580000,
            type: 0,
            data: '',
          },
          {
            id:
              'd12774214858c1332b5c263700cb792ce5a814cb4596661c418644eff03cc007',
            timestamp: 1550653562000,
            confirmations: 9499,
            fee: 3626,
            senderAddress: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
            recipientAddress: 'Unparsed Address',
            amount: 158,
            type: 0,
            data: '',
          },
        ],
        meta: {
          count: 45,
        },
      });
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await transactions.get({ address, limit: 10, offset: 0 });
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await transactions.get({ address, limit: 10, offset: 0 });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('getUnspentTransactionOutputs', () => {
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      fetchMock.once('*', response.getUnspentTransactionOutputs);
      const result = await transactions.getUnspentTransactionOutputs(
        address.testnet
      );
      expect(result).toEqual(response.getUnspentTransactionOutputs.data);
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Error' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await transactions.getUnspentTransactionOutputs(address.mainnet);
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await transactions.getUnspentTransactionOutputs(address.mainnet);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('create', () => {
    beforeAll(() => {
      config.network = networks.testnet;

      transactions.getUnspentTransactionOutputs = jest.fn();
      transactions.getUnspentTransactionOutputs.mockResolvedValue(
        response.getUnspentTransactionOutputs.data
      );
    });

    it('throws error for insufficient balance', async () => {
      try {
        await transactions.create({
          passphrase,
          recipientAddress: address.testnetRecipient,
          amount: 1000000000,
          dynamicFeePerByte: 40,
        });
      } catch (error) {
        expect(error.message).toBe('Insufficient (estimated) balance');
      }
    });

    it('creates a valid transaction', async () => {
      const tx = await transactions.create({
        passphrase,
        recipientAddress: address.testnetRecipient,
        amount: 1000000,
        dynamicFeePerByte: 40,
      });

      expect(tx).toBeTruthy();
    });
  });

  describe('broadcast', () => {
    const txHex = '0200000001c156742387e44c7906091bc08d382951bfe1c9dc703856010e08ef803f90dafe000000006b483045022100d1dde0fe78b5e20d570348eca954336ccdfd8b25cb150203977e690b3dbc71eb02205f45fde27ded53dec38ca96530722f11bd4c0da96acd698e3d826395a57cfcac012102cd9e67acba4950837bb773b6d05f54ba0594aa4863b9dcb0dfe0bb94d14c56c2ffffffff029e000000000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac180d1800000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac00000000';
    beforeEach(() => fetchMock.reset());

    it('resolves correctly', async () => {
      const successResponse = { message: 'Transaction Submitted' };
      fetchMock.once('*', successResponse);
      const result = await transactions.broadcast(txHex);
      expect(result).toEqual(successResponse);
    });

    it('handles non-500 errors', async () => {
      const errorResponse = { message: 'Transaction already exists' };
      fetchMock.once('*', { status: 400, body: errorResponse });

      try {
        await transactions.broadcast(txHex);
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }
    });

    it('handles errors', async () => {
      fetchMock.once('*', { throws: new TypeError('Failed to fetch') });

      try {
        await transactions.broadcast(txHex);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('getTransactionExplorerURL method', () => {
    it('works properly for testnet', () => {
      config.transactionExplorerURL = 'https://www.blockchain.com/btctest/tx';
      expect(transactions.getTransactionExplorerURL('1')).toBe(
        'https://www.blockchain.com/btctest/tx/1'
      );
    });

    it('works properly for mainnet', () => {
      config.transactionExplorerURL = 'https://www.blockchain.com/btc/tx';
      expect(transactions.getTransactionExplorerURL('1')).toBe(
        'https://www.blockchain.com/btc/tx/1'
      );
    });
  });
});
