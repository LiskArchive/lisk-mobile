import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import apiClient from 'utilities/api/APIClient';
import {
  GET_ACCOUNT_TRANSACTIONS_QUERY,
  GET_ACCOUNT_TOKENS_QUERY,
  GET_AUTH_QUERY,
} from 'utilities/api/queries';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';

/**
 * Bootstrap the app by calling all previous business logic to load the required data.
 * @param {ReactNode} children - Components tree to provide the loaded data.
 */
export default function AppBootstrapper({ children }) {
  const queryClient = useQueryClient();

  const [currentApplication] = useCurrentApplication();

  // Bootstrap API client with current application.
  useEffect(() => {
    if (currentApplication?.serviceURLs) {
      apiClient.create(currentApplication.serviceURLs[0]);
    }
  }, [currentApplication]);

  // Bootstrap WS connections for re-fetching account transactions and tokens data when
  // new and delete transactions events occur.
  useEffect(() => {
    const invalidateQueries = () => {
      queryClient.invalidateQueries([GET_ACCOUNT_TRANSACTIONS_QUERY], { exact: false });
      queryClient.invalidateQueries([GET_ACCOUNT_TOKENS_QUERY], { exact: false });
      queryClient.invalidateQueries([GET_AUTH_QUERY], { exact: false });
    };

    if (currentApplication && apiClient?.ws) {
      apiClient.ws.on('new.transactions', invalidateQueries);
      apiClient.ws.on('delete.transactions', invalidateQueries);
    }

    return () => {
      if (apiClient?.ws) {
        apiClient.ws.off('new.transactions');
        apiClient.ws.off('delete.transactions');
      }
    };
  }, [queryClient, currentApplication]);

  return children;
}
