/**
 * Since react-navigation doesn't support i18n
 * I've created this dummy function to help i18n scanner
 * understand about these titles.
 * We can remove this as soon as react-navigation supports i18n or
 * we change the router to another lib with i18n support.
 *
 * @param {String} str
 * @returns {String} same as the input string
 */
const t = (str) => str;

const MODULES = {
  token: 'token',
  auth: 'auth',
  dpos: 'dpos',
  legacy: 'legacy',
};

const COMMANDS = {
  transfer: 'transfer',
  crossChaintransfer: 'crossChaintransfer',
  registerMultisignatureGroup: 'registerMultisignatureGroup',
  registerDelegate: 'registerDelegate',
  reportDelegateMisbehavior: 'reportDelegateMisbehavior',
  unlockToken: 'unlockToken',
  updateGeneratorKey: 'updateGeneratorKey',
  voteDelegate: 'voteDelegate',
  reclaimLSK: 'reclaimLSK',
  registerkeys: 'registerkeys',
};

export const MODULE_COMMAND_NAMES = {
  tokenTransfer: `${MODULES.token}:${COMMANDS.transfer}`,
  tokenCrossChaintransfer: `${MODULES.token}:${COMMANDS.crossChaintransfer}`,
  registerMultisignatureGroup: `${MODULES.auth}:${COMMANDS.registerMultisignatureGroup}`,
  registerDelegate: `${MODULES.dpos}:${COMMANDS.registerDelegate}`,
  reportDelegateMisbehavior: `${MODULES.dpos}:${COMMANDS.reportDelegateMisbehavior}`,
  unlockToken: `${MODULES.dpos}:${COMMANDS.unlockToken}`,
  updateGeneratorKey: `${MODULES.dpos}:${COMMANDS.updateGeneratorKey}`,
  voteDelegate: `${MODULES.dpos}:${COMMANDS.voteDelegate}`,
  reclaimLSK: `${MODULES.legacy}:${COMMANDS.reclaimLSK}`,
  registerkeys: `${MODULES.legacy}:${COMMANDS.registerkeys}`,
};

export const TRANSACTION_STATUS_NAMES = {
  success: t('transactions.statusText.success'),
  fail: t('transactions.statusText.fail'),
  pending: t('transactions.statusText.pending'),
};

export const TRANSACTION_PARAMS_NAMES = {
  tokenID: t('transactions.transactionDetails.tokenIDParamsLabel'),
  amount: t('transactions.transactionDetails.amountParamsLabel'),
  recipientAddress: t('transactions.transactionDetails.recipientAddressParamsLabel'),
  data: t('transactions.transactionDetails.dataParamsLabel'),
  receivingChainID: t('transactions.transactionDetails.receivingChainIDParamsLabel'),
  messageFee: t('transactions.transactionDetails.messageFeeParamsLabel'),
  numberOfSignatures: t('transactions.transactionDetails.numberOfSignaturesParamsLabel'),
  generatorKey: t('transactions.transactionDetails.generatorKeyParamsLabel'),
  blsKey: t('transactions.transactionDetails.blsKeyParamsLabel'),
  proofOfPossession: t('transactions.transactionDetails.proofOfPossessionParamsLabel'),
  header1: t('transactions.transactionDetails.header1ParamsLabel'),
  header2: t('transactions.transactionDetails.header2ParamsLabel'),
};
