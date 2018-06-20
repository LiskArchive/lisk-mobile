const actionTypes = {
  // Account
  accountUpdated: 'ACCOUNT_UPDATED',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountFollowed: 'ACCOUNT_FOLLOWED',
  accountUnFollowed: 'ACCOUNT_UN_FOLLOWED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountsStored: 'ACCOUNTS_STORED',
  // Peers
  activePeerSet: 'ACTIVE_PEER_SET',
  activePeerUpdated: 'ACTIVE_PEER_UPDATED',
  // Loading
  loadingStarted: 'LOADING_STARTED',
  loadingFinished: 'LOADING_FINISHED',
  // Transactions
  transactionsLoaded: 'TRANSACTIONS_LOADED',
  transactionAdded: 'TRANSACTIONS_ADDED',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
};

export default actionTypes;
