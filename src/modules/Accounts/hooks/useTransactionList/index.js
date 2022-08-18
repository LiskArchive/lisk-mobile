import {
  useEffect
} from 'react';

const useTransactionList = ({ address }) => {
  const transactions = {};

  const fetchInitialData = () => { };

  const fetchMore = () => { };

  useEffect(() => {
    if (address) {
      fetchInitialData();
    }
  }, [address]);

  return {
    loading: true,
    loadMore: fetchMore,
    account: null,
    refresh: fetchInitialData,
    transactions,
    refreshing: false,
  };
};

export default useTransactionList;
