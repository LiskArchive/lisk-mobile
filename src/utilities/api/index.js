import * as liskAccount from './lisk/account';
import * as btcAccount from './btc/account';

export const tokenTypes = {
  LSK: 'LSK',
  BTC: 'BTC',
};

const mapper = {
  [tokenTypes.LSK]: {
    account: liskAccount,
  },
  [tokenTypes.BTC]: {
    account: btcAccount,
  },
};

export const getMappedFunction = (tokenType, map) => {
  const [resource, method] = map.split('.');

  try {
    const fn = mapper[tokenType][resource][method];

    if (typeof fn === 'function') {
      return fn;
    }

    throw new Error(`${tokenType} doesn't match a function for ${map}.`);
  } catch (error) {
    throw new Error(`Invalid mapper path for ${tokenType} - ${map}.`);
  }
};

export const account = {
  getSummary: (tokenType, ...rest) => getMappedFunction(tokenType, 'account.getSummary')(...rest),
  extractPublicKey: (tokenType, ...rest) => getMappedFunction(tokenType, 'account.extractPublicKey')(...rest),
  extractAddress: (tokenType, ...rest) => getMappedFunction(tokenType, 'account.extractAddress')(...rest),
};

export const transactions = {
};
