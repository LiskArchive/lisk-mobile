import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as apiClient from 'utilities/api/lisk/apiClient';
import { resetAccountSummary, setAccountSummary } from '../../store/actions';
import { selectAccountSummary } from '../../store/selectors';
import { useCurrentAccount } from './useCurrentAccount';

// eslint-disable-next-line
export function useAccountInfo() {
  const [account] = useCurrentAccount();
  const dispatch = useDispatch();

  const address = account?.metadata?.address;

  const getAccount = (add) => apiClient.apiClient.getAccount(add);

  useEffect(() => {
    if (address) {
      dispatch(resetAccountSummary());
      getAccount(address).then(data => {
        dispatch(setAccountSummary(data));
      });
    }
  }, [address]);

  const summary = useSelector(selectAccountSummary);

  return { summary, getAccount };
}
