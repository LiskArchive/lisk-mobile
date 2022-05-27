import {
  useEffect, useRef, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionsLoaded, transactionsReset } from 'modules/Transactions/actions/transactions';
import { account as accountAPI } from 'utilities/api';
import { loadMore, resetTxAndFetch } from '../../utils';

const useTransactionList = ({ address, activeToken }) => {
  const [loading, setIsLoading] = useState(false);
  const transactions = useSelector(state => state.transactions);
  const [account, setAccount] = useState(null);
  let refreshing = useRef(false).current;
  const dispatch = useDispatch();

  const fetchInitialData = async () => {
    setIsLoading(true);
    resetTxAndFetch({
      transactionsReset: () => dispatch(transactionsReset()),
      transactionsLoaded: (data) => {
        dispatch(transactionsLoaded(data));
      },
      address,
      activeToken
    });
    const details = await accountAPI.getSummary(activeToken, { address });
    setAccount(details);
    setIsLoading(false);
  };

  const fetchMore = async () => {
    try {
      if (!refreshing) {
        loadMore({
          address,
          transactionsLoaded: (data) => {
            refreshing = false;
            dispatch(transactionsLoaded(data));
          },
          transactions
        });
        refreshing = true;
      }
    } catch (error) {
      refreshing = false;
    }
  };

  useEffect(() => {
    if (address) {
      fetchInitialData();
    }
  }, [address]);

  return {
    loading,
    loadMore: fetchMore,
    account,
    refresh: fetchInitialData,
    transactions,
    refreshing,
  };
};

export default useTransactionList;
