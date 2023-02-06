/* eslint-disable max-statements */
import { useSelector } from 'react-redux';

import { usePriceTickerQuery } from 'modules/Accounts/hooks/usePriceTickerQuery';

export function useTokenAmountInCurrency({ tokenAmount, tokenSymbol }) {
  const { data } = usePriceTickerQuery();

  const prices = data?.data ?? [];

  const accountSettings = useSelector((state) => state.settings);

  if (tokenSymbol !== 'LSK') return null;

  const priceRate = prices.find(
    (price) => price.to === accountSettings.currency && price.from === tokenSymbol
  );

  let rawAmountInCurrency = 0;

  if (tokenAmount && priceRate) {
    rawAmountInCurrency = (parseFloat(tokenAmount) * Number(priceRate.rate)).toFixed(2);
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
