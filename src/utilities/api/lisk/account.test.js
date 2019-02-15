import { getSummary, extractAddress, extractPublicKey } from './account';
import LiskAPIClient from './apiClient';

const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';
const account = {
  address: '5092448154042807473L',
  balance: '10000',
  publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
  unconfirmedBalance: '10000',
  initialized: true,
};

describe('api/lisk/account', () => {
  beforeAll(() => {
    LiskAPIClient.accounts.get = jest.fn();
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
    it('calls accounts.get method correctly', async () => {
      LiskAPIClient.accounts.get.mockResolvedValueOnce({ data: [account] });
      const result = await getSummary(account.address);
      expect(result).toEqual(account);
    });

    it('handles empty results coming from accounts.get method', async () => {
      LiskAPIClient.accounts.get.mockResolvedValueOnce({ data: [], success: false });
      const result = await getSummary(account.address);
      expect(result).toEqual({
        address: account.address,
        balance: 0,
        initialized: false,
      });
    });

    it('handles rejections', async () => {
      const errorMessage = { message: 'Error!' };
      LiskAPIClient.accounts.get.mockRejectedValueOnce(errorMessage);

      try {
        await getSummary(account.address);
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });
});
