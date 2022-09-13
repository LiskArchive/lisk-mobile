import { getSummary, extractAddress, extractPublicKey } from './account';
import { apiClient } from './apiClient';

jest.mock('./apiClient');

const passphrase =
  'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';
const account = {
  address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
  balance: '10000',
  publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
  unconfirmedBalance: '10000',
  initialized: true,
};

describe('api/lisk/account', () => {
  beforeAll(() => {
    apiClient.getAccount = jest.fn();
  });

  describe('extractAddress', () => {
    it('extracts address from passphrase', () => {
      expect(extractAddress(passphrase)).toBe(account.address);
    });
  });

  describe('extractPublicKey', () => {
    it('extracts publicKey from passphrase', () => {
      expect(extractPublicKey(passphrase)).toBe(account.publicKey);
    });
  });

  describe('getSummary', () => {
    it('calls getAccount method correctly', async () => {
      apiClient.getAccount.mockResolvedValueOnce({ data: [account] });
      const result = await getSummary({ address: account.address });
      expect(result).toEqual({ data: [account] });
    });

    it('handles empty results coming from getAccount method', async () => {
      apiClient.getAccount.mockResolvedValueOnce({
        data: [],
        success: false,
      });
      const result = await getSummary({ address: account.address });
      expect(result).toEqual({
        data: [],
        success: false,
      });
    });

    it('handles rejections', async () => {
      const errorMessage = { message: 'Error!' };
      apiClient.getAccount.mockRejectedValueOnce(errorMessage);

      try {
        await getSummary({ address: account.address });
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });
});
