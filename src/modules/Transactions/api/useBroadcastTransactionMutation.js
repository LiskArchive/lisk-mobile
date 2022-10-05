import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GET_AUTH_QUERY,
  GET_TRANSACTIONS_QUERY,
  GET_ACCOUNT_TOKENS_QUERY,
} from 'utilities/api/queries';
import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';

export default function useBroadcastTransactionMutation(options = {}) {
  const queryClient = useQueryClient();

  const [currentAccount] = useCurrentAccount();

  const { data: authData } = useAuthQuery({
    config: { params: { address: currentAccount.metadata.address } },
  });

  function handleMutate({ transaction }) {
    const config = {
      url: `${API_URL}/transactions`,
      method: 'post',
      data: { transaction },
    };

    return apiClient[METHOD](config);
  }

  return useMutation(handleMutate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_ACCOUNT_TOKENS_QUERY]);

      queryClient.invalidateQueries([GET_TRANSACTIONS_QUERY]);

      queryClient.setQueryData([GET_AUTH_QUERY], {
        ...authData?.data,
        nonce: (authData?.nonce || 0) + 1,
      });

      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options,
  });
}
