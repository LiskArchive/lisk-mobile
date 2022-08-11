import { useMutation } from '@tanstack/react-query';
import { broadcastTransactionMockHandler } from '../mocks/handlers';

export default function useBroadcastTransactionMutation(options = {}) {
  function handleBroadcastTransaction(variables) {
    console.log({ variables });

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
