/* eslint-disable max-statements */
/* eslint-disable max-len */
import { fromRawLsk } from 'utilities/conversions';
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

export const calculateMinimumFee = ({
  account,
  transaction,
  selectedPriority,
}) => {
  const minFee = getTransactionFee(
    {
      account,
      transaction,
      selectedPriority,
      selectedPriorityIndex: 0
    }
  );
  return minFee;
};

export const calculateMaximumFeeAmount = ({ account, transaction, ...params }) => {
  const maxAmountFee = getTransactionFee(
    {
      ...params,
      account,
      transaction: { transaction, amount: fromRawLsk(account.balance) },
    }
  );
  return maxAmountFee;
};

export const calculateTransactionFees = ({
  account,
  selectedPriority,
  transaction,
}) => {
  const minFee = calculateMinimumFee({
    account,
    transaction,
    selectedPriority,
  });
  const maxFee = calculateMaximumFeeAmount({
    account,
    transaction,
    selectedPriority
  });
  const fee = getTransactionFee({
    account,
    selectedPriority,
    transaction,
  });

  if (fee.value < minFee.value) {
    return minFee;
  }
  if (fee.value > maxFee.value) {
    return maxFee;
  }
  return fee;
};
