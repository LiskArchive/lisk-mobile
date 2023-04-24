/* eslint-disable max-statements */
import { BigNumber } from 'bignumber.js';
import i18next from 'i18next';

import { countDecimals } from './helpers';

BigNumber.config({ ERRORS: false });

/**
 * Parses from base-denomination to display-denomination an amount of a given token.
 * @param {string} amount - Amount to convert (in base denomination).
 * @param {string} displayDenom - Display denomination ID.
 * @param {Array.<{denom: string, decimals: number}>} denomUnits - Denominations equivalence configs.
 * @param {string} symbol - Symbol of the token. Is added as suffix in the result if the param withSymbol=true.
 * @param {boolean} withSymbol - Flag that indicates if the response should or not include the symbol of the
 * token (optional, default: false).
 * @returns {string} Converted value in string format.
 */
export function fromBaseToDisplayDenom({
  amount,
  displayDenom,
  denomUnits,
  symbol,
  withSymbol = false,
  formatAmount = false,
}) {
  const bigAmount = new BigNumber(amount);

  const conversionUnit = denomUnits?.find((unit) => unit.denom === displayDenom);

  if (!conversionUnit) {
    return '';
  }

  const conversionFactor = new BigNumber(10).pow(conversionUnit.decimals);

  let convertedAmount = bigAmount.dividedBy(conversionFactor).toFixed();

  if (formatAmount) {
    convertedAmount = Number(convertedAmount).toLocaleString();
  }

  if (withSymbol) {
    convertedAmount += ` ${symbol}`;
  }

  return convertedAmount;
}

/**
 * Parses from display-denomination to base-denomination an amount of a given token.
 * @param {string} amount - Amount to convert (in display denomination).
 * @param {string} displayDenom - Display denomination ID.
 * @param {Array.<{denom: string, decimals: number}>} denomUnits - Denominations equivalence configs.
 * @returns {string} Converted value in string format.
 */
export function fromDisplayToBaseDenom({ amount, displayDenom, denomUnits }) {
  const bigAmount = new BigNumber(amount);

  const conversionUnit = denomUnits.find((unit) => unit.denom === displayDenom);

  if (!conversionUnit) {
    throw new Error(i18next.t('tokens.errors.displayDenomNotFoundMessage'));
  }

  const conversionDecimals = conversionUnit.decimals;

  if (countDecimals(amount) > conversionDecimals) {
    throw new Error(
      i18next.t('tokens.errors.maxDecimalPointExceededMessage', { conversionDecimals })
    );
  }

  const conversionFactor = new BigNumber(10).pow(conversionDecimals);

  const convertedAmount = bigAmount.multipliedBy(conversionFactor).toFixed();

  return convertedAmount;
}

/**
 * Parses from base-denomination to display-denomination an amount of LSK.
 * @param {string} amount - Amount to convert (in beddows).
 * @param {boolean} withSymbol - Flag that indicates if the response should or not include the symbol of the
 * token (optional, default: false).
 * @returns {string} Converted value in LSK.
 */
export function fromBeddowsToLsk(amount, withSymbol = false) {
  return fromBaseToDisplayDenom({
    amount,
    displayDenom: 'lsk',
    denomUnits: [{ decimals: 8, denom: 'lsk' }],
    symbol: 'LSK',
    withSymbol,
  });
}

/**
 * Parses from display-denomination to base-denomination an amount of LSK.
 * @param {string} amount - Amount to convert (in LSK).
 * @returns {string} Converted value in beddows.
 */
export function fromLskToBeddows(amount) {
  return fromDisplayToBaseDenom({
    amount,
    displayDenom: 'lsk',
    denomUnits: [{ decimals: 8, denom: 'lsk' }],
  });
}

export const includeFee = (value, fee, asRawLsk = false) => {
  const factor = new BigNumber(10).pow(8);
  const bigValue = new BigNumber(value);
  const rawValue = bigValue.multipliedBy(factor);
  const bigFee = new BigNumber(fee);
  const result = rawValue.plus(bigFee);
  // eslint-disable-next-line no-undef
  return asRawLsk ? result : fromBeddowsToLsk(BigInt(result ?? 0));
};
