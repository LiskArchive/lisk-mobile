import { useQuery } from '@tanstack/react-query';
import {
  METHOD,
  API_METHOD,
  API_URL,
  API_BASE_URL
} from 'utilities/api/constants';

export function useBlockchainApplicationStats() {
  const query = useQuery(['application-stats'], () => API_METHOD[METHOD]({
    baseURL: API_BASE_URL,
    url: `${API_URL}/blockchain/apps/statistics`,
    method: 'get',
  }));

  return {
    ...query,
    data: query.data?.data ?? {},
  };
}
