import { Platform } from 'react-native';
import { cryptography } from '@liskhq/lisk-client';
import { getKeyFromPasswordWithArgon2 } from './getKeyFromArgon';

export const decryptAccount = async (crypto, password) => {
  try {
    const { encrypt } = cryptography;
    const options = {};
    if (Platform.OS === 'android') {
      options.getKey = getKeyFromPasswordWithArgon2;
    }
    const plainText = await encrypt.decryptMessageWithPassword(crypto, password, null, options);
    const { recoveryPhrase, privateKey } = JSON.parse(plainText);
    return { recoveryPhrase, privateKey };
  } catch (error) {
    throw new Error(error);
  }
};
