import { useInfiniteQuery } from '@tanstack/react-query';

import {
  API_BASE_URL,
  METHOD,
  LIMIT,
  API_VERSION,
  API_METHOD
} from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY } from '../../../utilities/api/queries';
import { useAccountInfo } from '../../Accounts/hooks/useAccounts/useAccountInfo';

export function useGetTransactionsQuery({ config: customConfig = {}, options = {} } = {}) {
  const account = useAccountInfo();

  const config = {
    baseURL: API_BASE_URL,
    path: `/api/${API_VERSION}/transactions`,
    method: 'get',
    params: {
      limit: LIMIT,
      senderAddress: account.summary.address,
    },
    ...customConfig,
  };

  async function handleGetTransactions({ pageParam = 1 }) {
    return API_METHOD[METHOD]({
      ...config,
      params: {
        ...config.params,
        ...pageParam,
      },
    });
  }

  const query = useInfiniteQuery([GET_TRANSACTIONS_QUERY, config], handleGetTransactions, {
    ...options,
    select: (data) => data.pages.reduce((prevPages, page) => {
      const newData = page?.data || [];
      return {
        ...page,
        data: prevPages.data ? [...prevPages.data, ...newData] : newData,
      };
    }),
    getNextPageParam: (lastPage) => {
      const offset = lastPage.meta.count + lastPage.meta.offset;
      const hasMore = offset < lastPage.meta.total;
      return !hasMore ? undefined : { offset };
    },
  });

  return query;
}
