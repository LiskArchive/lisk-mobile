/* eslint-disable max-statements, max-len */
import { Platform } from 'react-native';
import { transactions } from '@liskhq/lisk-client';
import * as transactionsConstants from 'modules/Transactions/constants';
import { fromRawLsk, toRawLsk } from 'utilities/conversions';
import computeMinFee from './fees';

export const createTransactionObject = (nonce, amount = 0, message = '') => ({
  moduleID: 2,
  commandID: 0,
  // eslint-disable-next-line no-undef
  nonce: BigInt(nonce),
  // eslint-disable-next-line no-undef
  fee: BigInt(0),
  senderPublicKey: Buffer.alloc(32),
  asset: {
    // eslint-disable-next-line no-undef
    amount: BigInt(toRawLsk(Number(amount))),
    recipientAddress: Buffer.alloc(20),
    data: message,
  },
  signatures: [],
});

export const getTransactionFee = async ({
  transaction,
  selectedPriority,
  selectedPriorityIndex,
}) => {
  try {
    const feePerByte = selectedPriority.value ?? 0;
    const schema = transactionsConstants.transferAssetSchema;
    const maxAssetFee = transactionsConstants.moduleAssetMap[
      transactionsConstants.moduleCommandNameIdMap.transfer
    ].maxFee;
    const transactionObject = createTransactionObject(
      transaction.nonce,
      transaction.amount,
      transaction.data
    );
    let minFee;
    if (Platform.OS === 'android') {
      minFee = computeMinFee(transactionObject, {
        baseFees: transactionsConstants.BASE_FEES,
      });
    } else {
      minFee = transactions.computeMinFee(schema, transactionObject, {
        baseFees: transactionsConstants.BASE_FEES,
      });
    }
    const tieBreaker = selectedPriorityIndex === 0
      ? 0
      : transactionsConstants.MIN_FEE_PER_BYTE * feePerByte * Math.random();

    const size = transactions.getBytes(schema, transactionObject).length;
    const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
    const cappedFee = Math.min(calculatedFee, maxAssetFee);
    const feeInLsk = fromRawLsk(cappedFee.toString());
    const roundedValue = Number(feeInLsk).toFixed(7).toString();

    const feedback = transaction.amount === ''
      ? '-'
      : `${roundedValue ? '' : 'Invalid amount'}`;
    return {
      value: roundedValue,
      error: !!feedback,
      feedback,
    };
  } catch (error) {
    return { value: 0, error: false, feedback: '' };
  }

  // tie breaker is only meant for medium and high processing speeds
};
