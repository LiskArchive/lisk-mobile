import { cryptography } from '@liskhq/lisk-client';
import { getKeyFromPasswordWithArgon2 } from './getKeyFromArgon';

export const decryptAccount = async (crypto, password) => {
  try {
    const { encrypt } = cryptography;
    const plainText = await encrypt.decryptMessageWithPassword(crypto, password, null, {
      getKey: getKeyFromPasswordWithArgon2,
    });
    const { recoveryPhrase, privateKey } = JSON.parse(plainText);
    return { recoveryPhrase, privateKey };
  } catch (error) {
    throw new Error(error);
  }
};
