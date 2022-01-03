import * as Lisk from '@liskhq/lisk-client';
import {
  signTransaction,
  getSigningBytes,
  baseTransactionSchema,
} from '../utils';

describe('sign', () => {
  const validAssetSchema = {
    $id: 'lisk/transfer-transaction',
    title: 'Transfer transaction asset',
    type: 'object',
    required: ['amount', 'recipientAddress', 'data'],
    properties: {
      amount: {
        dataType: 'uint64',
        fieldNumber: 1,
      },
      recipientAddress: {
        dataType: 'bytes',
        fieldNumber: 2,
        minLength: 20,
        maxLength: 20,
      },
      data: {
        dataType: 'string',
        fieldNumber: 3,
        minLength: 0,
        maxLength: 64,
      },
    },
  };

  const networkIdentifier = Buffer.from(
    'e48feb88db5b5cf5ad71d93cdcd1d879b6d5ed187a36b0002cc34e0ef9883255',
    'hex',
  );
  const passphrase1 = 'trim elegant oven term access apple obtain error grain excite lawn neck';
  const { publicKey: publicKey1 } = Lisk
    .cryptography.getAddressAndPublicKeyFromPassphrase(passphrase1);

  const validTransaction = {
    moduleID: 2,
    assetID: 0,
    // eslint-disable-next-line no-undef
    nonce: BigInt('1'),
    // eslint-disable-next-line no-undef
    fee: BigInt('10000000'),
    senderPublicKey: publicKey1,
    asset: {
      recipientAddress: Buffer.from('3a971fd02b4a07fc20aad1936d3cb1d263b96e0f', 'hex'),
      // eslint-disable-next-line no-undef
      amount: BigInt('4008489300000000'),
      data: '',
    },
  };

  describe('getSigningBytes', () => {
    it('should throw error for invalid asset object', () => {
      const invalidAssets = [
        { ...validTransaction, asset: { ...validTransaction.asset, amount: 1000 } },
        {
          ...validTransaction,
          asset: { ...validTransaction.asset, recipientAddress: 'dummyAddress' },
        },
      ];
      return invalidAssets.forEach(transactionObject =>
        // eslint-disable-next-line max-nested-callbacks
        expect(() => getSigningBytes(validAssetSchema, transactionObject)).toThrow(),);
    });

    it('should return transaction bytes for given asset', () => {
      const signingBytes = getSigningBytes(validAssetSchema, { ...validTransaction });
      expect(signingBytes).toMatchSnapshot();
      const decodedTransaction = Lisk.codec.codec.decode(baseTransactionSchema, signingBytes);
      const decodedAsset = Lisk.codec.codec.decode(
        validAssetSchema,
        (decodedTransaction).asset
      );
      return expect({ ...decodedTransaction, asset: { ...decodedAsset } }).toEqual({
        ...validTransaction,
        signatures: [],
      });
    });
  });

  describe('signTransaction', () => {
    it('should throw error for invalid network identifier', () => {
      expect(() =>
        signTransaction(validAssetSchema, validTransaction, Buffer.alloc(0), passphrase1),).toThrow('Network identifier is required to sign a transaction');
    });

    it('should throw error for invalid passphrase', () => {
      expect(() =>
        signTransaction(validAssetSchema, validTransaction, networkIdentifier, ''),).toThrow('Passphrase is required to sign a transaction');
    });

    it('should throw error for invalid asset object', () => {
      const invalidAssets = [
        { ...validTransaction, asset: { ...validTransaction.asset, amount: 1000 } },
        {
          ...validTransaction,
          asset: { ...validTransaction.asset, recipientAddress: 'dummyAddress' },
        },
      ];
      return invalidAssets.forEach(transactionObject =>
        // eslint-disable-next-line max-nested-callbacks
        expect(() =>
          signTransaction(validAssetSchema, transactionObject, networkIdentifier, passphrase1))
          .toThrow());
    });

    it('should throw error when transaction senderPublicKey does not match public key from passphrase', () => {
      return expect(() =>
        signTransaction(
          validAssetSchema,
          validTransaction,
          networkIdentifier,
          'this is incorrect passphrase',
        ))
        .toThrow('Transaction senderPublicKey does not match public key from passphrase');
    });

    it('should return signed transaction for given asset schema', () => {
      const signedTransaction = signTransaction(
        validAssetSchema,
        { ...validTransaction },
        networkIdentifier,
        passphrase1,
      );
      expect((signedTransaction.signatures)[0].length).toBeGreaterThan(0);
      expect(signedTransaction.signatures).toHaveLength(1);
      return expect(signedTransaction).toMatchSnapshot();
    });
  });
});
