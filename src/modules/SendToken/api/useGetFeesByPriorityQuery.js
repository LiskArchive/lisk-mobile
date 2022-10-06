import { useMemo } from 'react';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_PRIORITY_FEES } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from '../../../utilities/api/hooks/useQueryKeys';

export function useGetFeesByPriorityQuery() {
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
  };

  const keys = useQueryKeys([GET_PRIORITY_FEES, config]);

  const query = useCustomQuery({
    keys,
    config,
  });

  const result = useMemo(() => {
    return query.data?.data?.feeEstimatePerByte;
  }, [query.data]);

  return {
    ...query,
    data: result,
    isError: !!query.error,
  };
}
