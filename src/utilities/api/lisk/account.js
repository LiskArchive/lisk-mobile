import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';

export const getSummary = address => new Promise((resolve, reject) => {
  LiskAPIClient
    .accounts.get({ address })
    .then((res) => {
      if (res.data.length > 0) {
        resolve({
          ...res.data[0],
          initialized: !!res.data[0].publicKey,
        });
      } else {
        // account has no transactions yet, therefore is not saved on the blockchain.
        resolve({
          address,
          balance: 0,
          initialized: false,
        });
      }
    })
    .catch(reject);
});

export const extractAddress = passphrase => Lisk.cryptography.getAddressFromPassphrase(passphrase);

export const extractPublicKey = passphrase => Lisk.cryptography.getKeys(passphrase).publicKey;
