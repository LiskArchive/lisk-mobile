import { useMutation } from '@tanstack/react-query';
import i18next from 'i18next';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import DropDownHolder from 'utilities/alert';

/**
 * Broadcast signed transactions to a blockchain application
 * @param {Object} options - Options to pass to the mutation hook.
 * @returns The mutation to trigger the API call.
 */
export default function useBroadcastTransactionMutation(options = {}) {
  return useMutation(
    ({ transaction }) => {
      const config = {
        url: `${API_URL}/transactions`,
        method: 'post',
        event: 'post.transactions',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onError: (error) => {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('transactions.errors.broadcastErrorDescription')
        );

        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
