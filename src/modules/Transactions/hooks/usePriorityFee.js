import { useTransactionFeeEstimateQuery } from '../api/useTransactionFeeEstimateQuery';

export function usePriorityFee() {
  const { data: transactionFeeEstimateData, ...queryResult } = useTransactionFeeEstimateQuery();

  const data = transactionFeeEstimateData?.data.feeEstimatePerByte;

  return { data, ...queryResult };
}
