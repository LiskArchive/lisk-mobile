import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

/**
 * Estimates a transaction fees.
 * @param {Object} options - Options to pass to the mutation hook.
 * @returns The mutation to trigger the API call.
 */
export default function useTransactionEstimateFeesMutation({
  onSuccess,
  onError,
  ...options
} = {}) {
  return useMutation(
    ({ transaction }) => {
      const config = {
        url: `${API_URL}/transactions/estimate-fees`,
        method: 'POST',
        event: 'post.transactions.estimate-fees',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onSuccess: (res) => {
        if (onSuccess) {
          onSuccess(res);
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
