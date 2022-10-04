import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_AUTH_QUERY, GET_TRANSACTIONS_QUERY } from 'utilities/api/queries';
import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import { useAuthQuery } from '../../Auth/api/useAuthQuery';
import { useCurrentAccount } from '../../Accounts/hooks/useAccounts/useCurrentAccount';

export default function useBroadcastTransactionMutation(options = {}) {
  const queryClient = useQueryClient();

  const [currentAccount] = useCurrentAccount();

  const { data: authData } = useAuthQuery({
    config: { params: { address: currentAccount.metadata.address } },
  });

  function handleSendToken({ transaction }) {
    const config = {
      url: `${API_URL}/transactions`,
      method: 'post',
      data: { transaction },
    };

    return apiClient[METHOD](config);
  }

  const mutation = useMutation(handleSendToken, {
    onSuccess: (data) => {
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

  return mutation;
}
