/* eslint-disable max-statements */
import * as Lisk from '@liskhq/lisk-client';

export const baseTransactionSchema = {
  $id: 'lisk/base-transaction',
  type: 'object',
  required: ['moduleID', 'assetID', 'nonce', 'fee', 'senderPublicKey', 'asset'],
  properties: {
    moduleID: {
      dataType: 'uint32',
      fieldNumber: 1,
    },
    assetID: {
      dataType: 'uint32',
      fieldNumber: 2,
    },
    nonce: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    fee: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    senderPublicKey: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    asset: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    signatures: {
      type: 'array',
      items: {
        dataType: 'bytes',
      },
      fieldNumber: 7,
    },
  },
};

export const getSigningBytes = (
  assetSchema,
  transactionObject,
) => {
  if (typeof transactionObject.asset !== 'object' || transactionObject.asset === null) {
    throw new Error('Asset must be of type object and not null');
  }
  const assetBytes = Lisk.codec.codec.encode((assetSchema), transactionObject.asset);
  const transactionBytes = Lisk.codec.codec.encode(baseTransactionSchema, {
    ...transactionObject,
    asset: assetBytes,
    signatures: [],
  });

  return transactionBytes;
};

export const signTransaction = (
  assetSchema,
  transactionObject,
  networkIdentifier,
  passphrase,
) => {
  if (!networkIdentifier.length) {
    throw new Error('Network identifier is required to sign a transaction');
  }

  if (!passphrase) {
    throw new Error('Passphrase is required to sign a transaction');
  }
  const { publicKey } = Lisk.cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);

  if (
    !Buffer.isBuffer(transactionObject.senderPublicKey)
    || !transactionObject.senderPublicKey.equals(publicKey)
  ) {
    throw new Error('Transaction senderPublicKey does not match public key from passphrase');
  }

  const transactionWithNetworkIdentifierBytes = Buffer.concat([
    networkIdentifier,
    getSigningBytes(assetSchema, transactionObject),
  ]);

  const signature = Lisk.cryptography.signData(transactionWithNetworkIdentifierBytes, passphrase);
  // eslint-disable-next-line no-param-reassign
  transactionObject.signatures = [signature];
  return {
    ...transactionObject,
    id: Lisk.cryptography.hash(Lisk.transactions.getBytes(assetSchema, transactionObject))
  };
};
