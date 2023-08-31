import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

/**
 * Verifies if a transaction is valid or not based on its params and schema.
 * Useful before broadcasting it to the network.
 * @param {Object} options - Options to pass to the mutation hook.
 * @returns The mutation to trigger the API call.
 */
export default function useDryRunTransactionMutation({ onSuccess, onError, ...options } = {}) {
  return useMutation(
    ({ transaction, strict, skipVerify }) => {
      const config = {
        url: `${API_URL}/transactions/dryrun`,
        method: 'POST',
        event: 'post.transactions.dryrun',
        data: { transaction, strict, skipVerify },
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
}
