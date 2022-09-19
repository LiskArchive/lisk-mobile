/* eslint-disable max-statements */
import { cryptography } from '@liskhq/lisk-client';
import { extractKeyPair, extractAddressFromPublicKey } from 'modules/Wallet/utils';
import { defaultDerivationPath } from 'utilities/explicitBipKeyDerivation';

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
      passphrase: recoveryPhrase,
      enableCustomDerivationPath,
      derivationPath: enableCustomDerivationPath ? derivationPath : defaultDerivationPath,
    };
    const { privateKey, publicKey, isValid } = await extractKeyPair(options);
    if (!isValid) {
      throw new Error('Failed to extract keypair for given recovery phrase.');
    }
    const address = extractAddressFromPublicKey(publicKey);
    const plainText = JSON.stringify({ privateKey, recoveryPhrase });
    const encryptedPassphrase = await encrypt.encryptMessageWithPassword(plainText, password);
    return {
      encryptedPassphrase,
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
    console.log('error', error);
    throw new Error(error);
  }
};
