/**
 * @deprecated - Use useGetTransactionsQuery instead.
 * TODO: Remove when wallet module is refactored and stop using it.
 */
export default function useTransactionList() {
  return {
    loading: true,
    loadMore: () => {},
    account: null,
    refresh: () => {},
    transactions: [],
    refreshing: false,
  }
}
