/* eslint-disable max-statements */
/* eslint-disable max-len */
import { useEffect, useReducer } from 'react';
import { fromRawLsk } from 'utilities/conversions';
import { actionTypes, reducer, getInitialState } from './reducer';
import { getTransactionFee } from '../../utils';

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
export const useTransactionFeeCalculation = ({
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
        transaction: { ...params.transaction, amount: fromRawLsk(account.balance) },
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
