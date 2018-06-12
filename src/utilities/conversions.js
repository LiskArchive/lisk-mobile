import { BigNumber } from 'bignumber.js';

BigNumber.config({ ERRORS: false });

export const fromRawLsk = (value) => {
  const bgValue = new BigNumber(value || 0);
  const factor = new BigNumber(10).pow(8);
  return bgValue.dividedBy(factor).toFixed();
};

export const toRawLsk = (value) => {
  const factor = new BigNumber(10).pow(8);
  const bgRaw = new BigNumber(value * factor);
  return parseInt(bgRaw.toFixed(0), 10);
};
