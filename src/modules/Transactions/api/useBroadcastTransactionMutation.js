import { useMutation } from '@tanstack/react-query';
import i18next from 'i18next';
import Toast from 'react-native-toast-message';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

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
        method: 'POST',
        event: 'post.transactions',
        data: { transaction },
      };

      return apiClient[METHOD](config);
    },
    {
      onError: (error) => {
        Toast.show({
          type: 'error',
          text2: i18next.t('transactions.errors.broadcastErrorDescription'),
        });

        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
