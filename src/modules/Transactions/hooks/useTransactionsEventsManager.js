import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import apiClient from 'utilities/api/APIClient';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { spliceArray } from 'utilities/helpers';
import {
  GET_ACCOUNT_TOKENS_FULL_DATA_QUERY,
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
    async (event) => {
      const currentAccountNewTransactions = event.data.filter(
        (newTransaction) =>
          newTransaction.sender.address === currentAccount?.metadata?.address ||
          Object.values(newTransaction.params).includes(currentAccount?.metadata?.address)
      );

      if (currentAccountNewTransactions.length === 0) {
        return null;
      }

      setTimeout(async () => {
        await queryClient.invalidateQueries([GET_AUTH_QUERY, currentAccount?.metadata?.address]);
        await queryClient.refetchQueries({ queryKey: [GET_ACCOUNT_TOKENS_FULL_DATA_QUERY] });

        queryClient.setQueriesData(
          [GET_ACCOUNT_TRANSACTIONS_QUERY, currentAccount?.metadata?.address],
          (prevQuery) => {
            const prevTransactions = prevQuery.pages[0].data;

            const newPage = {
              ...prevQuery.pages[0],
              data: [...currentAccountNewTransactions, ...prevTransactions],
            };

            const newPages = spliceArray(prevQuery.pages, 0, 1, newPage);

            return { ...prevQuery, pages: newPages };
          }
        );
      }, 3000);

      return event;
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
