import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { validateAmount } from 'utilities/helpers';

export const useCurrencyConverter = (amount) => {
  const { currency, language } = useSelector(state => state.settings);
  const { priceTicker } = useSelector(state => state.service);

  const validator = (str) => {
    if (str === '' || parseFloat(str) === 0) {
      return false;
    }
    if (!validateAmount(str)) {
      return false;
    }
    return true;
  };

  const localizeAmount = (val) => {
    return Number(val).toLocaleString(`${language}-${language?.toUpperCase()}`, {
      maximumFractionDigits: 20
    });
  };

  const amountInCurrency = useMemo(() => {
    let valueInCurrency = 0;
    if (validator(amount) && priceTicker.LSK[currency]) {
      valueInCurrency = (amount * priceTicker.LSK[currency]).toFixed(2);
    }
    return valueInCurrency;
  }, [currency, priceTicker, amount]);

  return localizeAmount(amountInCurrency);
};
