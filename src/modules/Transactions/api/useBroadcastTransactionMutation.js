import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthQueryParams } from 'modules/Auth/api/useAuthQuery';
import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

export default function useBroadcastTransactionMutation(options = {}) {
  const queryClient = useQueryClient();

  const { keys: authQueryKeys } = useAuthQueryParams();

  return useMutation(
    ({ transaction }) => {
      const config = {
        url: `${API_URL}/transactions`,
        method: 'post',
        event: 'post.transactions',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onSuccess: (data) => {
        const [authQueryCache] = queryClient.getQueriesData(authQueryKeys);

        const authQueryData = authQueryCache[1];

        if (authQueryData) {
          queryClient.setQueryData(authQueryKeys, {
            ...authQueryData,
            data: {
              ...authQueryData.data,
              nonce: `${(parseFloat(authQueryData.data.nonce) || 0) + 1}`,
            },
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
