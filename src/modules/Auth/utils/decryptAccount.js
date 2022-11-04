import { cryptography } from '@liskhq/lisk-client';

export const decryptAccount = async (encryptedPassphrase, password) => {
  try {
    const { encrypt } = cryptography;
    const plainText = await encrypt.decryptMessageWithPassword(encryptedPassphrase, password);
    const { recoveryPhrase, privateKey } = JSON.parse(plainText);
    return { recoveryPhrase, privateKey };
  } catch (error) {
    throw new Error(error);
  }
};
