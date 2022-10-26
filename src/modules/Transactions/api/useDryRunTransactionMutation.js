import { useMutation } from '@tanstack/react-query';

import { METHOD, API_URL } from 'utilities/api/constants';
import apiClient from 'utilities/api/APIClient';

export default function useDryRunTransactionMutation(options = {}) {
  return useMutation(({ transaction }) => {
    const config = {
      url: `${API_URL}/transactions/dryrun`,
      method: 'post',
      event: 'post.transactions.dryrun',
      data: { transaction },
    };

    return apiClient[METHOD](config);
  }, ...options);
}
