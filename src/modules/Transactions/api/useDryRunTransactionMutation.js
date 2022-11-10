import { useMutation } from '@tanstack/react-query';
import i18next from 'i18next';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import DropDownHolder from 'utilities/alert';

/**
 * Verifies if a transaction is valid or not based on its params and schema.
 * Useful before broadcasting it to the network.
 * @param {Object} options - Options to pass to the mutation hook.
 * @returns The mutation to trigger the API call.
 */
export default function useDryRunTransactionMutation(options = {}) {
  return useMutation(
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
      onError: (error) => {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('transactions.errors.dryRunRequestErrorDescription')
        );

        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
