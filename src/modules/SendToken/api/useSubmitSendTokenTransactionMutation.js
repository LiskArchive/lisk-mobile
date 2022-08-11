import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

export default function useBroadcastTransactionMutation({ onSuccess, onError }) {
  const timer = useRef();

  function handleBroadcastTransaction(variables) {
    console.log({ variables: variables.transaction });

    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        resolve({
          data: {
            message: 'Transaction payload was successfully passed to the network node',
            transactionID: 'bfd3521aeddd586f43931b6972b5771e9919e18f2cc91e940a15eacb588ecc6c'
          },
        });
      }, 250);
    });
  }

  const broadcastTransactionMutation = useMutation(handleBroadcastTransaction, {
    onSuccess: (data) => {
      // TODO: Apply txs cache update when query is cached by react-query.
      // queryClient.setQueryData(['transactions', { id: data.transactionID }], data)

      if (onSuccess) onSuccess(data);
    },
    onError
  });

  return broadcastTransactionMutation;
}
