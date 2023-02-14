import { mockTokens } from './mockTokens';

export const mockGetAccountTokensQuery = {
  data: mockTokens,
  meta: {
    count: 2,
    offset: 0,
    total: mockTokens.length,
  },
};
