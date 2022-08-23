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
  registerkeys: 'registerkeys'
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
