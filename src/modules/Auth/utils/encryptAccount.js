/* eslint-disable max-statements */
import { cryptography } from '@liskhq/lisk-client';

import { defaultDerivationPath } from 'utilities/explicitBipKeyDerivation';
import { extractKeyPair, extractAddressFromPublicKey } from './accountKeys';

export const encryptAccount = async ({
  recoveryPhrase,
  password,
  name,
  derivationPath,
  enableCustomDerivationPath = false,
}) => {
  try {
    const { encrypt } = cryptography;
    const options = {
      recoveryPhrase,
      enableCustomDerivationPath: derivationPath && enableCustomDerivationPath,
      derivationPath,
    };
    const { privateKey, publicKey, isValid } = await extractKeyPair(options);
    if (!isValid) {
      throw new Error('Failed to extract keypair for given recovery phrase.');
    }
    const address = extractAddressFromPublicKey(publicKey);
    const plainText = JSON.stringify({ privateKey, recoveryPhrase });
    const crypto = await encrypt.encryptMessageWithPassword(plainText, password);
    return {
      crypto,
      metadata: {
        name,
        pubkey: publicKey,
        path: derivationPath ?? defaultDerivationPath,
        address,
        creationTime: new Date().toISOString(),
      },
      version: 1,
    };
  } catch (error) {
    throw new Error(error);
  }
};
