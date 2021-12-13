import * as Lisk from '@liskhq/lisk-client';
import { apiClient } from './apiClient';

export const getSummary = params =>
  apiClient.getAccount(params.address);

export const getNetworkInfo = () =>
  apiClient.getNetworkInfo();

export const extractAddress = passphrase =>
  Lisk.cryptography.getBase32AddressFromPassphrase(passphrase);

export const extractPublicKey = passphrase =>
  Lisk.cryptography.getKeys(passphrase).publicKey.toString('hex');
