const actionTypes = {
  // Account
  accountUpdated: 'ACCOUNT_UPDATED',
  accountSignedOut: 'ACCOUNT_SIGNED_OUT',
  accountSignedIn: 'ACCOUNT_SIGNED_IN',
  accountFollowed: 'ACCOUNT_FOLLOWED',
  accountEdited: 'ACCOUNT_EDITED',
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
  pendingTransactionAdded: 'PENDING_TRANSACTIONS_ADDED',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
  // Settings
  settingsUpdated: 'SETTINGS_UPDATED',
  settingsRetrieved: 'SETTINGS_RETRIEVED',
  // Service
  pricesRetrieved: 'PRICES_RETRIEVED',
  dynamicFeesRetrieved: 'DYNAMIC_FEES_RETRIEVED',
};

export default actionTypes;
