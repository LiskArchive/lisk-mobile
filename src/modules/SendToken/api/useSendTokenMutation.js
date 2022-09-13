import { useMutation } from '@tanstack/react-query';

import {
  METHOD,
  LIMIT,
  API_VERSION,
} from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

import { sendTokenMockHandler } from '../mocks';

export default function useSendTokenMutation(options = {}) {
  const [currentBlockchainApplication] = useCurrentBlockchainApplication();

  function handleSendToken(variables) {
    const config = {
      baseURL: currentBlockchainApplication?.serviceURLs[0][METHOD]
        ?? currentBlockchainApplication?.serviceURLs[0].http,
      path: `/api/${API_VERSION}/transactions`,
      method: 'post',
      params: { limit: LIMIT, ...variables },
    };

    // TODO: Implement real API call when update to service v3 API is done.
    // return API_METHOD[METHOD](config);
    console.log({ config });

    return sendTokenMockHandler;
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
    ...options
  });

  return mutation;
}
