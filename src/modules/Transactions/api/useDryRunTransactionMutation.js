import { useMutation } from '@tanstack/react-query';
import i18next from 'i18next';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';
import DropDownHolder from 'utilities/alert';

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
          'Error validation your transaction. Please try again later.'
        );

        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
