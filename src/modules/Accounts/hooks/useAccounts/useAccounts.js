import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAccount, deleteAccount } from '../../store/actions';
import { selectAccounts } from '../../store/selectors';

export const useAccounts = () => {
  const dispatch = useDispatch();
  const accountsObject = useSelector(selectAccounts);
  const setAccount = useCallback((account) => dispatch(addAccount(account)), []);
  const deleteAccountByAddress = useCallback(
    (address) => dispatch(deleteAccount(address)),
    [],
  );
  const getAccountByAddress = (address) => accountsObject[address];
  const accounts = useMemo(
    () => Object.values(accountsObject),
    [accountsObject],
  );

  return {
    accounts,
    setAccount,
    deleteAccountByAddress,
    getAccountByAddress,
  };
};
