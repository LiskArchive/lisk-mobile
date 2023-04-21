/* eslint-disable max-statements */
import { useSelector } from 'react-redux';

import { usePriceTickerQuery } from 'modules/Accounts/api/usePriceTickerQuery';

export function useTokenAmountInCurrency({ tokenAmount, tokenSymbol }) {
  const { data } = usePriceTickerQuery();

  const prices = data?.data ?? [];

  const accountSettings = useSelector((state) => state.settings);

  const priceRate = prices.find(
    (price) => price.to === accountSettings.currency && price.from === tokenSymbol
  );

  let rawAmountInCurrency;

  if (tokenAmount && priceRate) {
    rawAmountInCurrency = (parseFloat(tokenAmount) * Number(priceRate.rate)).toFixed(2);
  } else {
    rawAmountInCurrency = null;
  }

  function localizeAmount(amount) {
    return Number(amount).toLocaleString(
      `${accountSettings.language}-${accountSettings.language?.toUpperCase()}`,
      {
        maximumFractionDigits: 20,
      }
    );
  }

  const tokenAmountInCurrency = rawAmountInCurrency && localizeAmount(rawAmountInCurrency);

  return { amount: tokenAmountInCurrency, currency: accountSettings.currency };
}
