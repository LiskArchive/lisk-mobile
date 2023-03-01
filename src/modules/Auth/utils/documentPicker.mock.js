import { mockEncryptedAccount } from '../components/AuthMethod/__fixtures__/mockEncryptedAccount';

export const selectEncryptedFile = async () => {
  return JSON.stringify(mockEncryptedAccount);
};
