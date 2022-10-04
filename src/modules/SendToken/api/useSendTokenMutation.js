import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_AUTH_QUERY } from 'utilities/api/queries';
import { METHOD, API_URL } from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import apiClient from 'utilities/api/APIClient';
import { useAuthQuery } from '../../Auth/api/useAuthQuery';
import { useCurrentAccount } from '../../Accounts/hooks/useAccounts/useCurrentAccount';

export default function useSendTokenMutation(options = {}) {
  const queryClient = useQueryClient();

  const [currentAccount] = useCurrentAccount();

  const { data: authData } = useAuthQuery({
    config: { params: { address: currentAccount.metadata.address } },
  });

  const [{ chainID }] = useCurrentBlockchainApplication();

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
      const authQueryConfig = {
        url: `${API_URL}/auth`,
        method: 'get',
        event: 'get.auth',
        params: { address: currentAccount.metadata.address },
      };

      const authQueryKeys = [GET_AUTH_QUERY, METHOD, chainID, authQueryConfig];

      const updatedAuthQueryData = {
        ...authData?.data,
        nonce: (authData?.nonce || 0) + 1,
      };

      queryClient.setQueryData(authQueryKeys, updatedAuthQueryData);

      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options,
  });

  return mutation;
}
