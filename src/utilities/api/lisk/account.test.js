import { getAccount, extractAddress, extractPublicKey } from './account';

const activePeer = {
  accounts: {
    get: jest.fn(),
  },
};

const passphrase = 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together';

const account = {
  address: '5092448154042807473L',
  balance: '10000',
  publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
  unconfirmedBalance: '10000',
  initialized: true,
};

describe('api/lisk/account', () => {
  describe('extractAddress', () => {
    it('extracts address from passphrase', () => {
      expect(extractAddress(passphrase)).toBe(account.address);
    });

    it('extracts address from public key', () => {
      expect(extractAddress(account.publicKey)).toBe(account.address);
    });
  });

  describe('extractPublicKey', () => {
    it('extracts publicKey from passphrase', () => {
      expect(extractPublicKey(passphrase)).toBe(account.publicKey);
    });
  });

  describe('getAccount', () => {
    it('calls activePeer.accounts.get method correctly', async () => {
      activePeer.accounts.get.mockResolvedValueOnce({ data: [account] });
      const result = await getAccount(activePeer, account.address);
      expect(result).toEqual(account);
    });

    it('handles empty results coming from activePeer.accounts.get method', async () => {
      activePeer.accounts.get.mockResolvedValueOnce({ data: [], success: false });
      const result = await getAccount(activePeer, account.address);
      expect(result).toEqual({
        address: account.address,
        balance: 0,
      });
    });

    it('handles rejections', async () => {
      const errorMessage = { message: 'Error!' };
      activePeer.accounts.get.mockRejectedValueOnce(errorMessage);

      try {
        await getAccount(activePeer, account.address);
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });
});
