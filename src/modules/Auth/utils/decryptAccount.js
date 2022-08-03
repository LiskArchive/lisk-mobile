import { cryptography } from '@liskhq/lisk-client';

export const decryptAccount = async (encryptedPassphrase, password) => {
  const { encrypt } = cryptography;
  const plainText = await encrypt.decryptPassphraseWithPassword(
    encryptedPassphrase,
    password
  );
  const { recoveryPhrase } = JSON.parse(plainText);
  return recoveryPhrase;
};
