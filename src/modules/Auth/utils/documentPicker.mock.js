import { encryptedAccountMock } from '../AuthMethod/__fixtures__/account';

export const selectEncryptedFile = async () => {
  return JSON.stringify(encryptedAccountMock);
};
