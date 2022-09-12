import { cryptography } from '@liskhq/lisk-client';

export const decryptAccount = async (encryptedPassphrase, password) => {
  try {
    const { encrypt } = cryptography;
    const plainText = await encrypt.decryptMessageWithPassword(encryptedPassphrase, password);
    const { recoveryPhrase } = JSON.parse(plainText);
    return recoveryPhrase;
  } catch (error) {
    throw new Error(error);
  }
};
