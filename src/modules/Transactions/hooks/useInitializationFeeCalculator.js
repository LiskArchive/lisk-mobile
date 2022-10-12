/* eslint-disable no-undef */
import { useTransactionsQuery } from 'modules/Transactions/api/useTransactionsQuery';

// TODO: Implement real calculation business logic.
export default function useInitializationFeeCalculator({ recipientAccountAddress }) {
  // TODO: Fetch this data from service once endpoint is available.
  const initializationFeeData = BigInt(0);
  const isInitializationFeeLoading = false;
  const isInitializationFeeSuccess = true;
  const errorOnInitializationFee = undefined;

  const {
    data: transactionsData,
    isLoading: isTransactionsLoading,
    isSuccess: isTransactionsSuccess,
    error: errorOnTransactions,
  } = useTransactionsQuery({ config: { params: { recipientAddress: recipientAccountAddress } } });

  const isInitializationFee = transactionsData?.data.length === 0;

  return {
    data: isInitializationFee ? initializationFeeData : BigInt(0),
    isLoading: isInitializationFeeLoading || isTransactionsLoading,
    isSuccess: isInitializationFeeSuccess && isTransactionsSuccess,
    error: errorOnInitializationFee || errorOnTransactions,
  };
}
