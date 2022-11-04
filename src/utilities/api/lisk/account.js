import * as Lisk from '@liskhq/lisk-client';
import { apiClient } from './apiClient';

export const getSummary = (params) => apiClient.getAccount(params.address);

export const extractAddress = (passphrase) => {
  const { publicKey } = Lisk.cryptography.legacy.getKeys(passphrase);
  return Lisk.cryptography.address.getLisk32AddressFromPublicKey(publicKey).toString('hex');
};

export const extractPublicKey = (passphrase) =>
  Lisk.cryptography.legacy.getKeys(passphrase).publicKey.toString('hex');
