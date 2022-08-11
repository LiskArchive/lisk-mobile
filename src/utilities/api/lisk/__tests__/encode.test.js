import * as Lisk from '@liskhq/lisk-client';
import { transferAssetSchema } from 'modules/Transactions/constants';
import { baseTransactionSchema } from '../utils';
import { encodeTransaction, encodeTransferAsset } from '../utils/encode';

const transactionObject = {
  asset: {
    // eslint-disable-next-line no-undef
    amount: BigInt(100000000),
    data: '',
    recipientAddress: Buffer.from('lskw7488a9nqy6m3zkg68x6ynsp6ohg4y7wazs3mw'),
  },
  moduleID: 2,
  assetID: 0,
  // eslint-disable-next-line no-undef
  fee: BigInt(14100),
  // eslint-disable-next-line no-undef
  nonce: BigInt(80),
  senderPublicKey: Buffer.from('lskw7488a9nqy6m3zkg68x6ynsp6ohg4y7wazs3mw')
};

describe.skip('encode', () => {
  describe('encodeTransferAsset', () => {
    it('should encode transfer asset correctly', () => {
      const result = encodeTransferAsset(transactionObject.asset);
      expect(Lisk.codec.codec.decode(transferAssetSchema, result)).toEqual(transactionObject.asset);
    });

    it('should throw error is recipient address is not passed', () => {
      return expect(() => encodeTransferAsset({
        ...transactionObject.asset, recipientAddress: null
      })).toThrow('recipientAddress must be Buffer');
    });

    it('should throw error is recipient address is of type Buffer', () => {
      return expect(() => encodeTransferAsset({
        ...transactionObject.asset, recipientAddress: 'wrong address'
      })).toThrow('recipientAddress must be Buffer');
    });

    it('should throw error is data is of type string', () => {
      return expect(() => encodeTransferAsset({
        ...transactionObject.asset, data: undefined
      })).toThrow('data must be defined');
    });
  });

  describe('encodeTransaction', () => {
    it('should throw error is moduleAssetId is not passed', () => {
      return expect(() => encodeTransaction({ ...transactionObject, moduleID: null })).toThrow('moduleID must be defined');
    });

    it('should throw error is assetId is not passed', () => {
      return expect(() => encodeTransaction({ ...transactionObject, assetID: null })).toThrow('commandID must be defined');
    });

    it('should throw error is nonce is not passed', () => {
      return expect(() => encodeTransaction({ ...transactionObject, nonce: null })).toThrow('nonce must be defined');
    });

    it('should throw error is fee is not passed', () => {
      return expect(() => encodeTransaction({ ...transactionObject, fee: null })).toThrow('fee must be defined');
    });

    it('should encode transaction correctly', () => {
      const encodedTxAsset = encodeTransferAsset(transactionObject.asset);
      const result = encodeTransaction({ ...transactionObject, asset: encodedTxAsset });
      const coreEncodeAsset = Lisk.codec.codec.encode(transferAssetSchema, transactionObject.asset);
      const coreEncodedTx = Lisk.codec.codec.encode(
        baseTransactionSchema,
        {
          ...transactionObject, asset: coreEncodeAsset, signatures: [],
        }
      );
      expect(coreEncodedTx).toEqual(result);
    });
  });
});
