import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

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
      onSuccess: (data) => {
        console.log({ onSuccessData: data });

        if (options.onSuccess) options.onSuccess(data);
      },
      onError: (error) => {
        console.log({ onError: error });

        if (options.onError) options.onError(error);
      },
      ...options,
    }
  );
}
