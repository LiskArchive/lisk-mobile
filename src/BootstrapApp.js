/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useBootstrapCurrentApplication } from 'modules/BlockchainApplication/hooks/useBootstrapCurrentApplication';
import apiClient from 'utilities/api/APIClient';
import {
  GET_ACCOUNT_TOKENS_QUERY,
  GET_AUTH_QUERY,
  GET_ACCOUNT_TRANSACTIONS_QUERY,
} from 'utilities/api/queries';
import ErrorFallbackScreen from 'components/screens/ErrorFallbackScreen';
import LoadingFallbackScreen from 'components/screens/LoadingFallbackScreen/LoadingFallbackScreen';
import useWalletConnectEventsManager from '../libs/wcm/hooks/useConnectionEventsManager';
import { queuePush } from './utilities/helpers';

/**
 * Bootstrap the app by calling all previous business logic to load the required data.
 * @param {React.ReactNode} children - Components tree to provide the loaded data.
 */
export default function BootstrapApp({ children }) {
  const queryClient = useQueryClient();

  const [currentApplication] = useCurrentApplication();
  const [currentAccount] = useCurrentAccount();

  const isLoading = currentApplication.status === 'loading';
  const isError = currentApplication.status === 'error';
  const error = currentApplication.error;

  // Bootstrap API client with current application.
  const retryBootstrapCurrentApplication = useBootstrapCurrentApplication();

  const handleRetry = () => retryBootstrapCurrentApplication();

  // Bootstrap WS connections for re-fetching account transactions and tokens data when
  // new transactions events occur.
  useEffect(() => {
    const handleNewTransactionsEvent = (event) => {
      queryClient.invalidateQueries([GET_AUTH_QUERY]);
      queryClient.invalidateQueries([GET_ACCOUNT_TOKENS_QUERY]);

      queryClient.setQueriesData(
        [GET_ACCOUNT_TRANSACTIONS_QUERY, currentAccount?.metadata?.address],
        (prevQuery) => {
          const newTransactions = event.data;
          const prevTransactions = prevQuery.pages[0].data;

          const newPage = {
            ...prevQuery.pages[0],
            data: queuePush(prevTransactions, newTransactions),
          };

          const newPages = queuePush(prevQuery.pages, [newPage]);

          return { ...prevQuery, pages: newPages };
        }
      );
    };

    if (currentApplication.data && apiClient?.ws) {
      apiClient.ws.on('new.transactions', handleNewTransactionsEvent);
    }

    return () => {
      if (apiClient?.ws) {
        apiClient.ws.off('new.transactions');
      }
    };
  }, [queryClient, currentApplication.data, currentAccount?.metadata?.address]);

  // Bootstrap WC.
  useWalletConnectEventsManager();

  if (isLoading) {
    return <LoadingFallbackScreen />;
  }

  if (isError) {
    return <ErrorFallbackScreen onRetry={handleRetry} error={error} />;
  }

  return children;
}
