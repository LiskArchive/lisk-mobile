import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import { useMemo } from 'react';

/**
 * Verifies if a transaction is valid or not based on its params and schema.
 * Useful before broadcasting it to the network.
 * @param {Object} options - Options to pass to the mutation hook.
 * @returns The mutation to trigger the API call.
 */
export default function useDryRunTransactionMutation({ onSuccess, onError, ...options } = {}) {
  const mutation = useMutation(
    ({ transaction }) => {
      const config = {
        url: `${API_URL}/transactions/dryrun`,
        method: 'post',
        event: 'post.transactions.dryrun',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onSuccess: ({ data }) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
      ...options,
    }
  );

  // @TODO: Calculate properly the error message and integrate it with UI.
  // See https://github.com/LiskHQ/lisk-mobile/issues/1578 for details.
  const error = useMemo(() => {
    if (mutation.data?.data.result === -1) {
      const errorMessage = mutation.data.data.events.map((e) => e.name).join(', ');

      return { message: `Invalid transaction: ${errorMessage}` };
    }

    if (mutation.data?.data.result === 0) {
      const errorMessage = mutation.data.data.events.map((e) => e.name).join(', ');

      return { message: `Failed transaction: ${errorMessage}` };
    }

    return mutation.error;
  }, [mutation.data?.data.events, mutation.data?.data.result, mutation.error]);

  const isError = useMemo(() => error || mutation.isError, [error, mutation.isError]);

  const isSuccess = useMemo(() => !isError && mutation.isSuccess, [isError, mutation.isSuccess]);

  return { ...mutation, isError, error, isSuccess };
}
