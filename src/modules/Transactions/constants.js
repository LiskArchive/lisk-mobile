import { t } from 'locales/helpers';

export const MODULE_COMMANDS_NAMES = {
  'auth:registerMultisignature': 'Register Multisignature',
  'interoperability:submitMainchainCrossChainUpdate': 'Submit Mainchain CrossChain Update',
  'interoperability:submitSidechainCrossChainUpdate': 'Submit Sidechain CrossChain Update',
  'interoperability:initializeMessageRecovery': 'Initialize Message Recovery',
  'interoperability:recoverMessage': 'Recover Message',
  'interoperability:registerSidechain': 'Register Sidechain',
  'interoperability:recoverState': 'Recover State',
  'interoperability:terminateSidechainForLiveness': 'Terminate Sidechain for Liveness',
  'legacy:legacyReclaimLSK': 'Reclaim LSK',
  'legacy:legacyRegisterKeys': 'Legacy Register Keys',
  'pos:registerValidator': 'Register Validator',
  'pos:reportMisbehavior': 'Report Misbehavior',
  'pos:unlock': 'Unlock',
  'pos:updateGeneratorKey': 'Update Generator Key',
  'pos:stake': 'Stake',
  'pos:changeCommission': 'Change Commission',
  'pos:claimRewards': 'Claim Rewards',
  'token:transfer': 'Token Transfer',
  'token:transferCrossChain': 'Token Cross Chain Transfer',
};

export const TRANSACTION_STATUS_NAMES = {
  successful: t('transactions.statusText.success'),
  failed: t('transactions.statusText.fail'),
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
