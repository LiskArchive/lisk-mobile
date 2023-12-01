import apiClient from 'utilities/api/APIClient';
import { mockTokens, mockTokensMeta, mockTokensFullData } from 'modules/Transactions/__fixtures__';

import { defaultDerivationPath } from 'modules/Auth/constants/recoveryPhrase.constants';
import { addTokensMetaData, validateDerivationPath } from './accounts.utils';

jest.spyOn(apiClient, 'call').mockImplementation(() => Promise.resolve({ data: mockTokensMeta }));

describe('accounts utils', () => {
  describe('addTokensMetaData util', () => {
    it('returns tokens full data properly', async () => {
      const tokensFullData = await addTokensMetaData(mockTokens);

      expect(tokensFullData).toStrictEqual(mockTokensFullData);
    });

    it('returns empty array if no tokens in common', async () => {
      const tokensFullData = await addTokensMetaData([]);

      expect(tokensFullData).toStrictEqual([]);
    });
  });

  describe('validateDerivationPath util', () => {
    it('should throw error for invalid derivation path', () => {
      expect(validateDerivationPath('invalid-path')).toStrictEqual(
        'Invalid key derivation path format'
      );
    });
    it('should return undefined for valid derivation path', () => {
      expect(validateDerivationPath(defaultDerivationPath)).toBeUndefined();
    });
  });
});
