import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import apiClient from 'utilities/api/APIClient';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { queuePush } from 'utilities/helpers';
import {
  GET_ACCOUNT_TOKENS_QUERY,
  GET_AUTH_QUERY,
  GET_ACCOUNT_TRANSACTIONS_QUERY,
} from 'utilities/api/queries';
import { TRANSACTION_EVENTS } from '../utils/constants';

/**
 * Handles all business logic necessary to execute when a WS transaction event is received.
 */
export function useTransactionsEventsManager() {
  const queryClient = useQueryClient();

  const [currentAccount] = useCurrentAccount();
  const [currentApplication] = useCurrentApplication();

  const handleNewTransactionsEvent = useCallback(
    (event) => {
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
    },
    [queryClient, currentAccount?.metadata?.address]
  );

  useEffect(() => {
    if (currentApplication.data && apiClient?.ws) {
      apiClient.ws.on(TRANSACTION_EVENTS.newTransactions, handleNewTransactionsEvent);
    }

    return () => {
      if (apiClient?.ws) {
        apiClient.ws.off(TRANSACTION_EVENTS.newTransactions);
      }
    };
  }, [handleNewTransactionsEvent, currentApplication.data]);
}
