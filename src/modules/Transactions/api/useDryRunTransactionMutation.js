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
export default function useDryRunTransactionMutation({ onSuccess, onError, ...options } = {}) {
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
      onSuccess: ({ data }) => {
        if (data.result === 1) {
          if (onSuccess) {
            onSuccess(data);
          }
        } else if (data.result === -1) {
          DropDownHolder.error('Invalid transaction', data.errorMessage);
        } else {
          // @TODO: Prepare error message by parsing the events based on each transaction type.s
          const errorMessage = data.events.map((e) => e.name).join(', ');

          DropDownHolder.error('Failed transaction', errorMessage);
        }
      },
      onError: (error) => {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('transactions.errors.dryRunRequestErrorDescription')
        );

        if (onError) {
          onError(error);
        }
      },
      ...options,
    }
  );
}
