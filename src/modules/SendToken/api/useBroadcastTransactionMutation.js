import { useMutation } from '@tanstack/react-query';

import {
  METHOD,
  LIMIT,
  API_VERSION,
} from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

import { broadcastTransactionMockHandler } from '../mocks/handlers';

export default function useSendTransactionMutation(options = {}) {
  const [currentBlockchainApplication] = useCurrentBlockchainApplication();

  function handleBroadcastTransaction(variables) {
    const config = {
      baseURL: currentBlockchainApplication?.apis[0][METHOD]
        ?? currentBlockchainApplication?.apis[0].rest,
      path: `/api/${API_VERSION}/transactions`,
      method: 'POST',
      params: { limit: LIMIT, ...variables },
    };

    // TODO: Implement real API call when update to service v3 API is done.
    // return API_METHOD[METHOD](config);
    console.log({ config });

    return broadcastTransactionMockHandler;
  }

  const mutation = useMutation(handleBroadcastTransaction, {
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
