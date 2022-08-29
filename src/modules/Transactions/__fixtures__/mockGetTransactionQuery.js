import { mockTransactions } from './mockTransactions';

export const mockGetTransactionQuery = {
  data: [mockTransactions[0]],
  meta: {
    count: 1,
    offset: 0,
    total: 1
  },
};
