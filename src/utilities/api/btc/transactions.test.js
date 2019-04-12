import bitcoin from 'bitcoinjs-lib';
import fetchMock from 'fetch-mock';
import * as transactions from './transactions';
import config from '../../../../btc.config';

const passphrase = 'say width dwarf confirm rule party pact iron edge dignity wish direct';

const address = {
  mainnet: '18Ev7MgYe9qPrXy6CKSvphhoeyTg6m8Nve',
  testnet: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
  testnetRecipient: 'mgKwQFVCEN2enQtzgqrzCxWv5WH6VAyLXa',
};

const response = {
  getTransaction: {
    data: {
      tx_raw: '02000000010701c2516a8374c0ef5e04154868949951115c33b99a127ca7948ec038b0b486010000006a47304402206ef553185610d6fb57ab7e841b64094c93443dd017a90c62d4526f3c6675b52e02204a508443ec4bad8c62aaf34a6605a1795dd11b96e3c90d0b30f79651e34f440701210288a7e893e8fa0c0ff0c83c4137ae331f0216a93cb3eecb79a5274aa0964d67e6ffffffff02e01b1800000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac90400c00000000001976a914c57eaf552742752e4d3887a7a341714df670667388ac00000000',
      tx: {
        txid: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
        version: 2,
        locktime: 0,
        inputs: [
          {
            txid: '86b4b038c08e94a77c129ab9335c11519994684815045eefc074836a51c20107',
            n: 1,
            script: '304402206ef553185610d6fb57ab7e841b64094c93443dd017a90c62d4526f3c6675b52e02204a508443ec4bad8c62aaf34a6605a1795dd11b96e3c90d0b30f79651e34f440701 0288a7e893e8fa0c0ff0c83c4137ae331f0216a93cb3eecb79a5274aa0964d67e6',
            sequence: 4294967295,
            txDetail: {
              satoshi: 2383996,
              value: '0.02383996',
              n: 1,
              scriptPubKey: {
                asm: 'OP_DUP OP_HASH160 c57eaf552742752e4d3887a7a341714df6706673 OP_EQUALVERIFY OP_CHECKSIG',
                hex: '76a914c57eaf552742752e4d3887a7a341714df670667388ac',
                addresses: [
                  'myXDB4jvDaLqStdeSBKJwhVbVHWuynQiY5',
                ],
              },
            },
          },
        ],
        outputs: [
          {
            satoshi: 1580000,
            value: '0.01580000',
            n: 0,
            scriptPubKey: {
              asm: 'OP_DUP OP_HASH160 f201b8d17483229dc8198e6baf05ddff94213238 OP_EQUALVERIFY OP_CHECKSIG',
              hex: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
              addresses: [
                'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
              ],
            },
          },
          {
            satoshi: 802960,
            value: '0.00802960',
            n: 1,
            scriptPubKey: {
              asm: 'OP_DUP OP_HASH160 c57eaf552742752e4d3887a7a341714df6706673 OP_EQUALVERIFY OP_CHECKSIG',
              hex: '76a914c57eaf552742752e4d3887a7a341714df670667388ac',
              addresses: [
                'myXDB4jvDaLqStdeSBKJwhVbVHWuynQiY5',
              ],
            },
          },
        ],
      },
      timestamp: 1550570887,
      confirmations: 10611,
      feeSatoshi: 1036,
      inputTotalSatoshi: 2383996,
      outputTotalSatoshi: 2382960,
    },
  },
  getTransactions: {
    data: [
      {
        tx_raw: '02000000010701c2516a8374c0ef5e04154868949951115c33b99a127ca7948ec038b0b486010000006a47304402206ef553185610d6fb57ab7e841b64094c93443dd017a90c62d4526f3c6675b52e02204a508443ec4bad8c62aaf34a6605a1795dd11b96e3c90d0b30f79651e34f440701210288a7e893e8fa0c0ff0c83c4137ae331f0216a93cb3eecb79a5274aa0964d67e6ffffffff02e01b1800000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac90400c00000000001976a914c57eaf552742752e4d3887a7a341714df670667388ac00000000',
        tx: {
          txid: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
          version: 2,
          locktime: 0,
          inputs: [
            {
              txid: '86b4b038c08e94a77c129ab9335c11519994684815045eefc074836a51c20107',
              n: 1,
              script: '304402206ef553185610d6fb57ab7e841b64094c93443dd017a90c62d4526f3c6675b52e02204a508443ec4bad8c62aaf34a6605a1795dd11b96e3c90d0b30f79651e34f440701 0288a7e893e8fa0c0ff0c83c4137ae331f0216a93cb3eecb79a5274aa0964d67e6',
              sequence: 4294967295,
              txDetail: {
                satoshi: 2383996,
                value: '0.02383996',
                n: 1,
                scriptPubKey: {
                  asm: 'OP_DUP OP_HASH160 c57eaf552742752e4d3887a7a341714df6706673 OP_EQUALVERIFY OP_CHECKSIG',
                  hex: '76a914c57eaf552742752e4d3887a7a341714df670667388ac',
                  addresses: [
                    'myXDB4jvDaLqStdeSBKJwhVbVHWuynQiY5',
                  ],
                },
              },
            },
          ],
          outputs: [
            {
              satoshi: 1580000,
              value: '0.01580000',
              n: 0,
              scriptPubKey: {
                asm: 'OP_DUP OP_HASH160 f201b8d17483229dc8198e6baf05ddff94213238 OP_EQUALVERIFY OP_CHECKSIG',
                hex: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
                addresses: [
                  'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
                ],
              },
            },
            {
              satoshi: 802960,
              value: '0.00802960',
              n: 1,
              scriptPubKey: {
                asm: 'OP_DUP OP_HASH160 c57eaf552742752e4d3887a7a341714df6706673 OP_EQUALVERIFY OP_CHECKSIG',
                hex: '76a914c57eaf552742752e4d3887a7a341714df670667388ac',
                addresses: [
                  'myXDB4jvDaLqStdeSBKJwhVbVHWuynQiY5',
                ],
              },
            },
          ],
        },
        timestamp: 1550570887,
        confirmations: 10609,
        height: 1478119,
        block: {
          version: 536870912,
          prev_block_hash: '00000000000007a4def048fff841cb1826e6fadfc46992b2eed4d1b4ee56a9d5',
          merkle_root: '904f8d2a7b48493deb0265a18199ed56f6ab04301be9c9bbda728a30641e79c8',
          timestamp: 1550570887,
          bits: 437239872,
          nonce: 237766340,
          block_height: 1478119,
        },
        feeSatoshi: 1036,
        inputTotalSatoshi: 2383996,
        outputTotalSatoshi: 2382960,
      },
      {
        tx_raw: '0200000001c156742387e44c7906091bc08d382951bfe1c9dc703856010e08ef803f90dafe000000006b483045022100d1dde0fe78b5e20d570348eca954336ccdfd8b25cb150203977e690b3dbc71eb02205f45fde27ded53dec38ca96530722f11bd4c0da96acd698e3d826395a57cfcac012102cd9e67acba4950837bb773b6d05f54ba0594aa4863b9dcb0dfe0bb94d14c56c2ffffffff029e000000000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac180d1800000000001976a914f201b8d17483229dc8198e6baf05ddff9421323888ac00000000',
        tx: {
          txid: 'd12774214858c1332b5c263700cb792ce5a814cb4596661c418644eff03cc007',
          version: 2,
          locktime: 0,
          inputs: [
            {
              txid: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
              n: 0,
              script: '3045022100d1dde0fe78b5e20d570348eca954336ccdfd8b25cb150203977e690b3dbc71eb02205f45fde27ded53dec38ca96530722f11bd4c0da96acd698e3d826395a57cfcac01 02cd9e67acba4950837bb773b6d05f54ba0594aa4863b9dcb0dfe0bb94d14c56c2',
              sequence: 4294967295,
              txDetail: {
                satoshi: 1580000,
                value: '0.01580000',
                n: 0,
                scriptPubKey: {
                  asm: 'OP_DUP OP_HASH160 f201b8d17483229dc8198e6baf05ddff94213238 OP_EQUALVERIFY OP_CHECKSIG',
                  hex: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
                  addresses: [
                    'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
                  ],
                },
              },
            },
          ],
          outputs: [
            {
              satoshi: 158,
              value: '0.00000158',
              n: 0,
              scriptPubKey: {
                asm: 'OP_DUP OP_HASH160 f201b8d17483229dc8198e6baf05ddff94213238 OP_EQUALVERIFY OP_CHECKSIG',
                hex: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
                addresses: [
                  'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
                ],
              },
            },
            {
              satoshi: 1576216,
              value: '0.01576216',
              n: 1,
              scriptPubKey: {
                asm: 'OP_DUP OP_HASH160 f201b8d17483229dc8198e6baf05ddff94213238 OP_EQUALVERIFY OP_CHECKSIG',
                hex: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
                addresses: [
                  'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
                ],
              },
            },
          ],
        },
        timestamp: 1550653562,
        confirmations: 9499,
        height: 1479229,
        block: {
          version: 536870912,
          prev_block_hash: '0000000000000abed1641f96f7b32b4829b2baf259ded5acc4c0dd88ab1dd3d3',
          merkle_root: '0284ed79690dcaac5bed6adde65fe865aa6c4bd8553039219e76d52b96b531a0',
          timestamp: 1550653562,
          bits: 437239872,
          nonce: 1618048865,
          block_height: 1479229,
        },
        feeSatoshi: 3626,
        inputTotalSatoshi: 1580000,
        outputTotalSatoshi: 1576374,
      },
    ],
    meta: {
      count: 2,
      offset: 0,
      total: 45,
    },
  },
  getUnspentTransactionOutputs: {
    unspent_outputs: [
      {
        tx_hash: 'c156742387e44c7906091bc08d382951bfe1c9dc703856010e08ef803f90dafe',
        tx_hash_big_endian: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
        tx_index: 289209213,
        tx_output_n: 0,
        script: '76a914f201b8d17483229dc8198e6baf05ddff9421323888ac',
        value: 1580000,
        value_hex: '181be0',
        confirmations: 1044,
      },
    ],
  },
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
      fetchMock.once('*', response.getTransaction);
      const result = await transactions.get({ address: address.testnet, id: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1' });
      expect(result).toEqual({
        data: [
          {
            id: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
            timestamp: 1550570887000,
            confirmations: NaN, // @TODO: fix this after bitcoin-bridge implements confirmations
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
      transactions.getLatestBlockHeight.mockResolvedValueOnce(0);
      fetchMock.once('*', response.getTransactions);
      const result = await transactions.get({ address: address.testnet });
      expect(result).toEqual({
        data: [
          {
            id: 'feda903f80ef080e01563870dcc9e1bf5129388dc01b0906794ce487237456c1',
            timestamp: 1550570887000,
            confirmations: 1478119,
            fee: 1036,
            senderAddress: 'Unparsed Address',
            recipientAddress: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
            amount: 1580000,
            type: 0,
            data: '',
          },
          {
            id: 'd12774214858c1332b5c263700cb792ce5a814cb4596661c418644eff03cc007',
            timestamp: 1550653562000,
            confirmations: 1479229,
            fee: 3626,
            senderAddress: 'n3aZt7uZhnBeC9quq6btKyC8qXvskEiE1B',
            recipientAddress: 'Unparsed Address',
            amount: 158,
            type: 0,
            data: '',
          },
        ],
        meta: {
          count: 2,
          offset: 0,
          total: 45,
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

    // @TODO: Fix before merge.
    it.skip('resolves correctly', async () => {
      fetchMock.once('*', response.getUnspentTransactionOutputs);
      const result = await transactions.getUnspentTransactionOutputs(address.mainnet);
      expect(result).toEqual(response.getUnspentTransactionOutputs.unspent_outputs);
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
      config.network = bitcoin.networks.testnet;

      transactions.getUnspentTransactionOutputs = jest.fn();
      transactions.getUnspentTransactionOutputs
        .mockResolvedValue(response.getUnspentTransactionOutputs.unspent_outputs);
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

    // @TODO: Fix before merge.
    it.skip('creates a valid transaction', async () => {
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
      expect(transactions.getTransactionExplorerURL('1')).toBe('https://www.blockchain.com/btctest/tx/1');
    });

    it('works properly for mainnet', () => {
      config.transactionExplorerURL = 'https://www.blockchain.com/btc/tx';
      expect(transactions.getTransactionExplorerURL('1')).toBe('https://www.blockchain.com/btc/tx/1');
    });
  });
});
