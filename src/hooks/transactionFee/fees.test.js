import * as Lisk from '@liskhq/lisk-client';
import { getBytes } from '../../utilities/api/lisk/utils';
import computeMinFee from './fees';

describe('fee', () => {
  const passphrase1 = 'trim elegant oven term access apple obtain error grain excite lawn neck';
  const { publicKey: publicKey1 } = Lisk.cryptography
    .getAddressAndPublicKeyFromPassphrase(passphrase1);
  const validTransaction = {
    moduleID: 2,
    assetID: 0,
    // eslint-disable-next-line no-undef
    nonce: BigInt('1'),
    senderPublicKey: publicKey1,
    asset: {
      recipientAddress: Buffer.from('3a971fd02b4a07fc20aad1936d3cb1d263b96e0f', 'hex'),
      // eslint-disable-next-line no-undef
      amount: BigInt('4008489300000000'),
      data: '',
    },
  };
  const baseFees = [
    {
      moduleID: 2,
      assetID: 0,
      baseFee: '10000000',
    },
    {
      moduleID: 5,
      assetID: 0,
      baseFee: '1',
    },
    {
      moduleID: 3,
      assetID: 0,
      baseFee: '1',
    },
  ];

  describe('computeMinFee', () => {
    it('should return minimum fee required to send to network', () => {
      // Arrange
      const minFee = computeMinFee(validTransaction);

      // Assert
      expect(minFee).not.toBeUndefined();
      expect(minFee).toMatchSnapshot();
    });

    it('should calculate minimum fee for given minFeePerByte', () => {
      // Arrange
      const options = { minFeePerByte: 2000, baseFees, numberOfSignatures: 1 };
      const minFee = computeMinFee(validTransaction, options);

      // Assert
      expect(minFee).not.toBeUndefined();
      expect(minFee).toMatchSnapshot();
    });

    it('should calculate minimum fee for transaction from multisignature account', () => {
      // Arrange
      const options = { minFeePerByte: 2000, baseFees, numberOfSignatures: 64 };
      const minFee = computeMinFee(validTransaction, options);

      // Assert
      expect(minFee).not.toBeUndefined();
      expect(minFee).toMatchSnapshot();
    });

    it('should calculate minimum fee for transaction from multisignature account which has lower number of signatures than registered public keys', () => {
      // Arrange
      const options = {
        minFeePerByte: 1000,
        baseFees: [],
        numberOfSignatures: 2,
        numberOfEmptySignatures: 3,
      };
      const transaction = {
        ...validTransaction,
        signatures: [
          Buffer.alloc(64),
          Buffer.alloc(0),
          Buffer.alloc(0),
          Buffer.alloc(0),
          Buffer.alloc(64),
        ],
      };
      const minFee = computeMinFee(transaction, options);
      const txBytes = getBytes({ ...transaction, fee: minFee });

      // Assert
      // eslint-disable-next-line no-undef
      expect(minFee.toString()).toEqual(BigInt(txBytes.length * 1000).toString());
    });
  });
});
