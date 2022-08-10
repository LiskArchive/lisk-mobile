import { useGetFeesByPriorityQuery } from '../api/useGetFeesByPriorityQuery';
import { getPriorityFee } from '../helpers';

export default function useTransactionPriorities(amount, message) {
  const feesByPriorityQuery = useGetFeesByPriorityQuery();

  let data;

  if (feesByPriorityQuery.data) {
    data = Object.entries(feesByPriorityQuery.data).map(
      ([priorityCode, priorityBaseFee]) => (
        {
          code: priorityCode,
          fee: getPriorityFee({
            amount, priorityCode, priorityBaseFee, message
          })
        }
      )
    );
  }

  return {
    ...feesByPriorityQuery,
    data
  };
}
