import apiClient from 'utilities/api/APIClient';
import { mockTokens, mockTokensMeta, mockTokensFullData } from 'modules/Transactions/__fixtures__';

import { addTokensMetaData } from './accounts.utils';

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
});
