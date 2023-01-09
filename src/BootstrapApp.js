/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView, Text } from 'react-native';

import apiClient from 'utilities/api/APIClient';
import {
  GET_ACCOUNT_TRANSACTIONS_QUERY,
  GET_ACCOUNT_TOKENS_QUERY,
  GET_AUTH_QUERY,
} from 'utilities/api/queries';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import ErrorFallbackScreen from './components/screens/ErrorFallbackScreen';

/**
 * Bootstrap the app by calling all previous business logic to load the required data.
 * @param {React.ReactNode} children - Components tree to provide the loaded data.
 */
export default function BootstrapApp({ children }) {
  const queryClient = useQueryClient();

  const [currentApplication] = useCurrentApplication();

  const isLoading = currentApplication.isLoading;
  const isError = currentApplication.isError;
  const error = currentApplication.error;
  const refetch = currentApplication.refetch;

  // Bootstrap API client with current application.
  useEffect(() => {
    if (currentApplication.data?.serviceURLs) {
      apiClient.create(currentApplication.data.serviceURLs[0]);
    }
  }, [currentApplication.data]);

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

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading app...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <ErrorFallbackScreen error={error} onRetry={refetch} />;
  }

  return children;
}
