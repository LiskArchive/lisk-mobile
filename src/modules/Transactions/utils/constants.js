import i18next from 'i18next';

import { themes } from 'constants/styleGuide';

import setSecondPassphraseLight from 'assets/images/txDetail/second-passphrase-light.png';
import setSecondPassphraseDark from 'assets/images/txDetail/second-passphrase-dark.png';

import registerDelegateLight from 'assets/images/txDetail/delegate-registration-light.png';
import registerDelegateDark from 'assets/images/txDetail/delegate-registration-dark.png';

import voteLight from 'assets/images/txDetail/vote-light.png';
import voteDark from 'assets/images/txDetail/vote-dark.png';

import transferDark from 'assets/images/txDetail/transfer-dark.png';
import transferLight from 'assets/images/txDetail/transfer-light.png';

import txUnlockLight from 'assets/images/txDetail/tx-unlock.png';
import txUnlockDark from 'assets/images/txDetail/tx-unlock-dark.png';

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

// TODO: Use from service endpoint/elements
export const BASE_TRANSACTION_SCHEMA = {
  $id: '/lisk/baseTransaction',
  type: 'object',
  required: ['module', 'command', 'nonce', 'fee', 'senderPublicKey', 'params'],
  properties: {
    module: {
      dataType: 'string',
      fieldNumber: 1,
    },
    command: {
      dataType: 'string',
      fieldNumber: 2,
    },
    nonce: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    fee: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    senderPublicKey: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    params: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    signatures: {
      type: 'array',
      items: {
        dataType: 'bytes',
      },
      fieldNumber: 7,
    },
  },
};

const TRANSACTION_MODULES = {
  token: 2,
  dpos: 5,
  multiSignature: 4,
  legacyAccount: 1000,
};

const TRANSACTION_COMMANDS = {
  transfer: 0,
  registerDelegate: 0,
  voteDelegate: 1,
  unlockToken: 2,
  registerMultisignatureGroup: 0,
  reclaimLSK: 0,
  reportDelegateMisbehavior: 3,
};

export const MODULE_COMMAND_MAP = {
  transfer: `${TRANSACTION_MODULES.token}:${TRANSACTION_COMMANDS.transfer}`,
  unlockToken: `${TRANSACTION_MODULES.dpos}:${TRANSACTION_COMMANDS.unlockToken}`,
  voteDelegate: `${TRANSACTION_MODULES.dpos}:${TRANSACTION_COMMANDS.voteDelegate}`,
  registerDelegate: `${TRANSACTION_MODULES.dpos}:${TRANSACTION_COMMANDS.registerDelegate}`,
  reportDelegateMisbehavior: `${TRANSACTION_MODULES.dpos}:${TRANSACTION_COMMANDS.reportDelegateMisbehavior}`,
  registerMultisignatureGroup: `${TRANSACTION_MODULES.multiSignature}:${TRANSACTION_COMMANDS.registerMultisignatureGroup}`,
  reclaimLSK: `${TRANSACTION_MODULES.legacyAccount}:${TRANSACTION_COMMANDS.reclaimLSK}`,
};

export const TRANSACTIONS = {
  [MODULE_COMMAND_MAP.transfer]: {
    moduleAssetId: '2:0',
    fee: 1e7,
    title: i18next.t('Transfer'),
    image: (theme) => (theme === themes.light ? transferLight : transferDark),
  },
  [MODULE_COMMAND_MAP.registerMultisignatureGroup]: {
    moduleAssetId: '4:0',
    fee: 5e8,
    title: i18next.t('Register multisignature group'),
    image: (theme) => (theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark),
  },
  [MODULE_COMMAND_MAP.registerDelegate]: {
    moduleAssetId: '5:0',
    fee: 25e8,
    title: i18next.t('Delegate registration'),
    image: (theme) => (theme === themes.light ? registerDelegateLight : registerDelegateDark),
  },
  [MODULE_COMMAND_MAP.voteDelegate]: {
    moduleAssetId: '5:1',
    fee: 1e8,
    title: i18next.t('Vote'),
    image: (theme) => (theme === themes.light ? voteLight : voteDark),
  },
  [MODULE_COMMAND_MAP.unlockToken]: {
    moduleAssetId: '5:2',
    fee: 1e8,
    title: i18next.t('Unlock'),
    image: (theme) => (theme === themes.light ? txUnlockLight : txUnlockDark),
  },
};

export const PRIORITY_NAMES_MAP = {
  low: t('sendToken.tokenSelect.lowPriorityLabel'),
  medium: t('sendToken.tokenSelect.mediumPriorityLabel'),
  high: t('sendToken.tokenSelect.highPriorityLabel'),
};
