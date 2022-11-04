/* eslint-disable max-statements */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { pricesRetrieved } from '../../../../actions/service';

export function useTokenAmountInCurrency({ tokenAmount, tokenSymbol }) {
  const dispatch = useDispatch();

  const priceTicker = useSelector((state) => state.service.priceTicker);
  const accountSettings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(pricesRetrieved());
  }, [dispatch]);

  if (tokenSymbol !== 'LSK') return null;

  let rawAmountInCurrency = 0;

  if (tokenAmount) {
    rawAmountInCurrency = (
      parseFloat(tokenAmount) * priceTicker[accountSettings.token.active][accountSettings.currency]
    ).toFixed(2);
  }

  function localizeAmount(amount) {
    return Number(amount).toLocaleString(
      `${accountSettings.language}-${accountSettings.language?.toUpperCase()}`,
      {
        maximumFractionDigits: 20,
      }
    );
  }

  const tokenAmountInCurrency = localizeAmount(rawAmountInCurrency);

  return { amount: tokenAmountInCurrency, currency: accountSettings.currency };
}
