import { mockTransactions } from './mockTransactions'

export const mockGetTransactionsQuery = {
  data: mockTransactions,
  meta: {
    count: 2,
    offset: 0,
    total: mockTransactions.length,
  },
}
