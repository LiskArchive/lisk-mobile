/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { account as accountAPI, transactions as transactionsAPI } from 'utilities/api';

const useTransactionList = ({ address, activeToken }) => {
  const [loading, setIsLoading] = useState(false);
  const [refreshing, setIsRefreshing] = useState(false);
  const [transactions, setTransactions] = useState({});
  const [account, setAccount] = useState(null);
  const [pending, setPending] = useState([])

  const fetchInitialData = async () => {
    setIsLoading(true);
    const account = await accountAPI.getSummary(activeToken, { address });
    const tx = await transactionsAPI.get(activeToken, {
      address
    });
    setIsLoading(false);
    setAccount(account);
    setTransactions({
      confirmed: tx.data,
      loaded: true,
      count: tx.meta.count
    });
  };

  const refresh = async () => {
    const { confirmed } = transactions;
    setIsRefreshing(true);
    const account = await accountAPI.getSummary(activeToken, { address });
    const data = await transactionsAPI.get(activeToken, {
      address
    });
    const newTransactions = data.data.filter((t) => t.timestamp > confirmed[0].timestamp);
    setAccount(account);
    setTransactions({
      confirmed: [...newTransactions, ...confirmed],
      loaded: true,
      count: data.meta.count
    });
    setIsRefreshing(false);
  };

  const loadMore = async () => {
    const { confirmed } = transactions;
    setIsLoading(true);

    try {
      const transactions = await transactionsAPI.get(activeToken, {
        address,
        offset: confirmed.length
      });

      setIsLoading(false);

      if (transactions.data.length > 0) {
        setTransactions({
          confirmed: [...confirmed, ...transactions.data],
          count: transactions.meta.count,
          loaded: true
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchInitialData();
    }
  }, [address]);

  return {
    loading,
    loadMore,
    account,
    refresh,
    transactions: { ...transactions, pending },
    refreshing,
    addPending: setPending
  };
};

export default useTransactionList;
