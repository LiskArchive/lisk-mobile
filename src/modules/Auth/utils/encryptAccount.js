import { Platform } from 'react-native';
/* eslint-disable max-statements */
import { cryptography } from '@liskhq/lisk-client';

import { defaultDerivationPath } from '../constants/recoveryPhrase.constants';
import { extractKeyPair, extractAddressFromPublicKey } from './accountKeys';
import { getKeyFromPasswordWithArgon2 } from './getKeyFromArgon';

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
    const encryptOptions = {};
    if (Platform.OS === 'android') {
      encryptOptions.getKey = getKeyFromPasswordWithArgon2;
    }
    const crypto = await encrypt.encryptMessageWithPassword(plainText, password, encryptOptions);
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
