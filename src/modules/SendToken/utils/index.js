/* eslint-disable max-statements, max-len */
import { Platform } from 'react-native';
import { transactions, cryptography } from '@liskhq/lisk-client';
import * as transactionsConstants from 'modules/SendToken/constants';
import { fromRawLsk, toRawLsk } from 'utilities/conversions';
import computeMinFee from './fees';

export const createTransactionObject = (nonce, amount = 0, message = '', publicKey) => ({
  moduleID: cryptography.utils.intToBuffer('2', 4),
  commandID: cryptography.utils.intToBuffer('0', 4),
  // eslint-disable-next-line no-undef
  nonce: BigInt(nonce),
  // eslint-disable-next-line no-undef
  baseFees: BigInt(0),
  params: {
    // eslint-disable-next-line no-undef
    amount: BigInt(toRawLsk(Number(amount))),
    recipientAddress: Buffer.from(''),
    data: message,
  },
  signatures: [],
  senderPublicKey: Buffer.from(publicKey, 'hex'),
});

export const getTransactionFee = ({
  account,
  transaction,
  selectedPriority,
  selectedPriorityIndex,
}) => {
  try {
    const feePerByte = selectedPriority.fee ?? 0;
    const schema = transactionsConstants.transferAssetSchema;
    const maxAssetFee =
      transactionsConstants.moduleAssetMap[transactionsConstants.moduleCommandNameIdMap.transfer]
        .maxFee;

    const transactionObject = createTransactionObject(
      account.nonce,
      transaction.amount,
      transaction.data,
      account.publicKey
    );
    let minFee;
    if (Platform.OS === 'android') {
      minFee = computeMinFee(transactionObject, {
        baseFees: transactionsConstants.BASE_FEES,
      });
    } else {
      minFee = transactions.computeMinFee(transactionObject, schema, {
        baseFees: transactionsConstants.BASE_FEES,
      });
    }
    const tieBreaker =
      selectedPriorityIndex === 0
        ? 0
        : transactionsConstants.MIN_FEE_PER_BYTE * feePerByte * Math.random();
    const size = transactions.getBytes(transactionObject, schema).length;
    const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
    const cappedFee = Math.min(calculatedFee, maxAssetFee);
    const feeInLsk = fromRawLsk(cappedFee.toString());
    const roundedValue = Number(feeInLsk).toFixed(7).toString();

    const feedback = transaction.amount === '' ? '-' : `${roundedValue ? '' : 'Invalid amount'}`;
    return {
      value: roundedValue,
      error: !!feedback,
      feedback,
    };
  } catch (error) {
    return { value: 0, error: false, feedback: '' };
  }
};
