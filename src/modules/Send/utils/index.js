/* eslint-disable max-statements */
/* eslint-disable max-len */
import { Platform } from 'react-native';
import { transactions } from '@liskhq/lisk-client';
import * as transactionsConstants from 'modules/Send/constants';
import { fromRawLsk, toRawLsk } from 'utilities/conversions';
import computeMinFee from './fees';

export const createTransactionObject = (nonce, amount = 0, message = '') => ({
  moduleID: 2,
  assetID: 0,
  // eslint-disable-next-line no-undef
  nonce: BigInt(nonce),
  // eslint-disable-next-line no-undef
  fee: BigInt(0),
  senderPublicKey: Buffer.alloc(32),
  asset: {
    // eslint-disable-next-line no-undef
    amount: BigInt(toRawLsk(Number(amount))),
    recipientAddress: Buffer.alloc(20),
    data: message
  },
  signatures: []
});

export const getTransactionFee = async ({
  transaction,
  selectedPriority,
  selectedPriorityIndex
}) => {
  const feePerByte = selectedPriority.value ?? 0;
  const schema = transactionsConstants.transferAssetSchema;
  const maxAssetFee = transactionsConstants.moduleAssetMap[transactionsConstants.moduleAssetNameIdMap.transfer]
    .maxFee;
  const transactionObject = createTransactionObject(
    transaction.nonce,
    transaction.amount,
    transaction.data
  );
  let minFee;
  if (Platform.OS === 'android') {
    minFee = computeMinFee(transactionObject, {
      baseFees: transactionsConstants.BASE_FEES
    });
  } else {
    minFee = transactions.computeMinFee(schema, transactionObject, {
      baseFees: transactionsConstants.BASE_FEES
    });
  }

  // tie breaker is only meant for medium and high processing speeds
  const tieBreaker = selectedPriorityIndex === 0
    ? 0
    : transactionsConstants.MIN_FEE_PER_BYTE * feePerByte * Math.random();

  const size = transactions.getBytes(schema, transactionObject).length;
  const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
  const cappedFee = Math.min(calculatedFee, maxAssetFee);
  const feeInLsk = fromRawLsk(cappedFee.toString());
  const roundedValue = Number(feeInLsk).toFixed(7).toString();

  const feedback = transaction.amount === '' ? '-' : `${roundedValue ? '' : 'Invalid amount'}`;
  return {
    value: roundedValue,
    error: !!feedback,
    feedback
  };
};