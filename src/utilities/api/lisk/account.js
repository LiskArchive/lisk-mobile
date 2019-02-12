import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';

export const getAccount = address => new Promise((resolve, reject) => {
  LiskAPIClient
    .accounts.get({ address })
    .then((res) => {
      if (res.data.length > 0) {
        resolve({
          ...res.data[0],
          initialized: !!res.data[0].publicKey, // @TODO: move this logic away from the utility
        });
      } else {
        // account has no transactions yet, therefore is not saved on the blockchain.
        resolve({
          address,
          balance: 0,
        });
      }
    })
    .catch(reject);
});

export const extractAddress = (data) => {
  if (data.indexOf(' ') < 0) {
    return Lisk.cryptography.getAddressFromPublicKey(data);
  }
  return Lisk.cryptography.getAddressFromPassphrase(data);
};

export const extractPublicKey = passphrase => Lisk.cryptography.getKeys(passphrase).publicKey;
