import { useQuery } from '@tanstack/react-query';

import {
  API_BASE_URL,
  METHOD,
  LIMIT,
  API_VERSION,
  API_METHOD
} from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY } from '../../../utilities/api/queries';

export function useGetTransactionsQuery({ params = {}, options = {} } = {}) {
  const config = {
    baseURL: API_BASE_URL,
    path: `/api/${API_VERSION}/transactions`,
    method: 'get',
    params: { limit: LIMIT, ...params },
  };

  async function handleGetTransactions() {
    return API_METHOD[METHOD](config);
  }

  const query = useQuery([GET_TRANSACTIONS_QUERY, config], handleGetTransactions, options);

  return query;
}
