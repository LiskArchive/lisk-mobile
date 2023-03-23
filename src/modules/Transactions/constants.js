import { t } from 'locales/helpers';

const MODULES = {
  token: 'token',
  auth: 'auth',
  legacy: 'legacy',
  pos: 'pos',
  interoperability: 'interoperability',
};

const COMMANDS = {
  transfer: 'transfer',
  transferCrossChain: 'transferCrossChain',
  registerMultisignatureGroup: 'registerMultisignatureGroup',
  registerDelegate: 'registerDelegate',
  reportDelegateMisbehavior: 'reportDelegateMisbehavior',
  unlockToken: 'unlockToken',
  updateGeneratorKey: 'updateGeneratorKey',
  voteDelegate: 'voteDelegate',
  reclaimLSK: 'reclaimLSK',
  registerkeys: 'registerKeys',
  stake: 'stake',
  registerSidechain: 'registerSidechain',
};

export const MODULE_COMMAND_NAMES = {
  tokenTransfer: `${MODULES.token}:${COMMANDS.transfer}`,
  tokenCrossChainTransfer: `${MODULES.token}:${COMMANDS.transferCrossChain}`,
  registerMultisignatureGroup: `${MODULES.auth}:${COMMANDS.registerMultisignatureGroup}`,
  reclaimLSK: `${MODULES.legacy}:${COMMANDS.reclaimLSK}`,
  registerkeys: `${MODULES.legacy}:${COMMANDS.registerkeys}`,
  stake: `${MODULES.pos}:${COMMANDS.stake}`,
  registerSidechain: `${MODULES.interoperability}:${COMMANDS.registerSidechain}`,
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
