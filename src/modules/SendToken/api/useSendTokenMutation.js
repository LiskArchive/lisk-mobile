import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

export default function useSendTokenMutation(options = {}) {
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
      // TODO: Apply txs cache update when query is cached by react-query.
      // queryClient.setQueryData(['transactions', { id: data.transactionID }], data)

      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options,
  });

  return mutation;
}
