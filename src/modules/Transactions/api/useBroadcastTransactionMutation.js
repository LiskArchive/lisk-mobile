import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthQueryParams } from 'modules/Auth/api/useAuthQuery';
import { useAccountTransactionsQueryParams } from 'modules/Accounts/api/useAccountTransactionsQuery';
import { useAccountTokensQueryParams } from 'modules/Accounts/api/useAccountTokensQuery';
import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

export default function useBroadcastTransactionMutation(options = {}) {
  const queryClient = useQueryClient();

  const { keys: authQueryKeys } = useAuthQueryParams();
  const { keys: accountTokensOverviewQueryKeys } = useAccountTokensQueryParams({
    config: {
      params: { limit: 2 },
    },
  });
  const { keys: accountTokensFullQueryKeys } = useAccountTokensQueryParams();
  const { keys: accountTransactionsQueryKeys } = useAccountTransactionsQueryParams();

  return useMutation(
    ({ transaction }) => {
      const config = {
        url: `${API_URL}/transactions`,
        method: 'post',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(accountTokensOverviewQueryKeys);
        queryClient.invalidateQueries(accountTokensFullQueryKeys);
        queryClient.invalidateQueries(accountTransactionsQueryKeys);

        const [authQueryCache] = queryClient.getQueriesData(authQueryKeys);

        const authQueryData = authQueryCache[1];

        if (authQueryData) {
          queryClient.setQueryData(authQueryKeys, {
            ...authQueryData,
            data: { ...authQueryData.data, nonce: `${(parseFloat(authQueryData.nonce) || 0) + 1}` },
          });
        }

        if (options.onSuccess) options.onSuccess(data);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
