import { useTransactionFeeEstimateQuery } from '../api/useTransactionFeeEstimateQuery';

/**
 * Gets the priority fees estimate from the network based on demand.
 * @returns {Object} Query result state: data, isLoading, isError, among others.
 */
export function usePriorityFee() {
  const { data: transactionFeeEstimateData, ...queryResult } = useTransactionFeeEstimateQuery();

  const data = transactionFeeEstimateData?.data.feeEstimatePerByte;

  return { data, ...queryResult };
}
