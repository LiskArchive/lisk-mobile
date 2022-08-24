import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import {
  METHOD,
  API_METHOD,
  API_URL
} from 'utilities/api/constants';

export function useGetFeesByPriorityQuery() {
  const [currApp] = useCurrentBlockchainApplication();

  const query = useQuery([`priorityFees-${currApp.chainID}`], () => API_METHOD[METHOD]({
    url: `${API_URL}/fees`,
    method: 'get',
  }));

  const result = useMemo(() => {
    return query.data?.data?.feeEstimatePerByte;
  }, [query.data]);

  return {
    ...query,
    data: result,
    isError: !!query.error,
  };
}
