import { BigNumber } from 'bignumber.js';

BigNumber.config({ ERRORS: false });

export const fromRawLsk = (value) => {
  const bgValue = new BigNumber(value || 0);
  const factor = new BigNumber(10).pow(8);
  const result = bgValue.dividedBy(factor).toFixed();
  return result;
};

export const toRawLsk = (value) => {
  const factor = new BigNumber(10).pow(8);
  const rawValue = new BigNumber(value);
  const bgRaw = rawValue.multipliedBy(factor);
  return bgRaw.toFixed(0);
};

export const includeFee = (value, fee, asRawLsk = false) => {
  const factor = new BigNumber(10).pow(8);
  const bigValue = new BigNumber(value);
  const rawValue = bigValue.multipliedBy(factor);
  const bigFee = new BigNumber(fee);
  const result = rawValue.plus(bigFee);
  // eslint-disable-next-line no-undef
  return asRawLsk ? result : fromRawLsk(BigInt(result ?? 0));
};

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
}) {
  const bigAmount = new BigNumber(amount);

  const conversionUnit = denomUnits.find((unit) => unit.denom === displayDenom);

  if (!conversionUnit) {
    throw new Error('Display denomination not found on units.');
  }

  const conversionDecimals = conversionUnit.decimals;

  const conversionFactor = new BigNumber(10).pow(conversionDecimals);

  let convertedAmount = bigAmount.dividedBy(conversionFactor).toFixed();

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
    throw new Error('Display denomination not found on units.');
  }

  const conversionDecimals = conversionUnit.decimals;

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
