/* eslint-disable max-statements */
/* eslint-disable max-len */
import { useEffect, useReducer } from 'react';
import { Platform } from 'react-native';
import { transactions } from '@liskhq/lisk-client';
import { actionTypes, reducer, getInitialState } from './reducer';
import * as transactionsConstants from '../../constants/transactions';
import { fromRawLsk, toRawLsk } from '../../utilities/conversions';
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

/**
 * Custom hook to define tx fee
 *
 * @param {object} data
 * @param {string} data.token - Option of LSK and BTC
 * @param {object} data.account - Active account info
 * @param {object} data.selectedPriority - Selected priority info
 * @param {object} data.transaction - Raw transaction payload
 * @param {array} data.priorityOptions - Array of priority configs for High, Mid, Low
 * @returns {object}
 */
const useTransactionFeeCalculation = ({
  token,
  account,
  selectedPriority,
  transaction,
  priorityOptions,
  selectedPriorityIndex
}) => {
  const [state, dispatch] = useReducer(reducer, account, getInitialState);
  const calculateTransactionFees = async (params) => {
    const fee = await getTransactionFee(params);
    dispatch({ type: actionTypes.setFee, payload: { response: fee, account, token } });

    const minFee = await getTransactionFee(
      {
        ...params,
        selectedPriority: priorityOptions[0],
        selectedPriorityIndex: 0
      }
    );

    dispatch({ type: actionTypes.setMinFee, payload: { response: minFee, account, token } });
    const maxAmountFee = await getTransactionFee(
      {
        ...params,
        transaction: { ...params.transaction, amount: account.balance },
        selectedPriorityIndex
      }
    );

    dispatch({
      type: actionTypes.setMaxAmount,
      payload: { response: maxAmountFee, account, token }
    });
  };

  useEffect(() => {
    calculateTransactionFees({
      token,
      account,
      transaction,
      selectedPriority,
      selectedPriorityIndex
    });
  }, [
    transaction.amount,
    transaction.data,
    transaction.recipientAddress,
    transaction.username,
    selectedPriority.value,
    transaction.mandatoryKeys,
    transaction.optionalKeys,
    selectedPriorityIndex
  ]);

  return state;
};

export default useTransactionFeeCalculation;
