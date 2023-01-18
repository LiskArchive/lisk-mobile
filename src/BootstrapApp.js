/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView, Text } from 'react-native';

import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import apiClient from 'utilities/api/APIClient';
import {
  GET_ACCOUNT_TRANSACTIONS_QUERY,
  GET_ACCOUNT_TOKENS_QUERY,
  GET_AUTH_QUERY,
} from 'utilities/api/queries';
import ErrorFallbackScreen from 'components/screens/ErrorFallbackScreen';
import useWalletConnectEventsManager from '../libs/wcm/hooks/useConnectionEventsManager';
import { useBootstrapCurrentApplication } from './modules/BlockchainApplication/hooks/useBootstrapCurrentApplication';

/**
 * Bootstrap the app by calling all previous business logic to load the required data.
 * @param {React.ReactNode} children - Components tree to provide the loaded data.
 */
export default function BootstrapApp({ children }) {
  const queryClient = useQueryClient();

  const [currentApplication] = useCurrentApplication();

  const isLoading = currentApplication.status === 'loading';
  const isError = currentApplication.status === 'error';
  const error = currentApplication.error;

  // Bootstrap API client with current application.
  const retryBootstrapCurrentApplication = useBootstrapCurrentApplication();

  const handleRetry = () => retryBootstrapCurrentApplication();

  // Bootstrap WS connections for re-fetching account transactions and tokens data when
  // new and delete transactions events occur.
  useEffect(() => {
    const invalidateQueries = () => {
      queryClient.invalidateQueries([GET_ACCOUNT_TRANSACTIONS_QUERY], { exact: false });
      queryClient.invalidateQueries([GET_ACCOUNT_TOKENS_QUERY], { exact: false });
      queryClient.invalidateQueries([GET_AUTH_QUERY], { exact: false });
    };

    if (currentApplication.data && apiClient?.ws) {
      apiClient.ws.on('new.transactions', invalidateQueries);
      apiClient.ws.on('delete.transactions', invalidateQueries);
    }

    return () => {
      if (apiClient?.ws) {
        apiClient.ws.off('new.transactions');
        apiClient.ws.off('delete.transactions');
      }
    };
  }, [queryClient, currentApplication.data]);

  // Bootstrap WC.
  useWalletConnectEventsManager();

  if (isLoading) {
    // TODO: Replace with <LoadingFallbackScreen /> component when
    // working on https://github.com/LiskHQ/lisk-mobile/issues/1587.
    return (
      <SafeAreaView>
        <Text>Loading app...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <ErrorFallbackScreen onRetry={handleRetry} error={error} />;
  }

  return children;
}
