import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import apiClient from 'utilities/api/APIClient';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TRANSACTIONS_QUERY, GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';

export function useAccountTransactionsQueryParams({ config: customConfig = {} } = {}) {
  const [currentAccount] = useCurrentAccount();

  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      senderAddress: currentAccount.metadata.address,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([
    GET_ACCOUNT_TRANSACTIONS_QUERY,
    currentAccount.metadata.address,
    config,
  ]);

  return { config, keys };
}

/**
 * Fetch user account transactions in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useAccountTransactionsQuery({
  config: customConfig = {},
  options = {},
  client = apiClient,
} = {}) {
  const queryClient = useQueryClient();

  const { config, keys } = useAccountTransactionsQueryParams({ config: customConfig });

  useEffect(() => {
    function invalidateQuery() {
      queryClient.invalidateQueries([GET_ACCOUNT_TRANSACTIONS_QUERY], { exact: false });
      queryClient.invalidateQueries([GET_ACCOUNT_TOKENS_QUERY], { exact: false });
    }

    client?.ws?.on('new.transactions', invalidateQuery);

    client?.ws?.on('delete.transactions', invalidateQuery);
  }, [client, queryClient]);

  return useCustomInfiniteQuery({ config, options, keys, client });
}
