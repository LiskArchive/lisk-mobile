import { themes } from 'constants/styleGuide';
import { cryptography } from '@liskhq/lisk-client';
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

export const DEFAULT_MIN_FEE_PER_BYTE = 1000;

export const DEFAULT_NUMBER_OF_SIGNATURES = 1;

export const DEFAULT_BASE_FEE = '0';

export const DEFAULT_SIGNATURE_BYTE_SIZE = 64;

export const DEFAULT_MIN_REMAINING_BALANCE = 5000000;

export const MIN_FEE_PER_BYTE = 1000;

export const PRIORITY_NAMES_MAP = {
  low: t('sendToken.tokenSelect.lowPriorityLabel'),
  medium: t('sendToken.tokenSelect.mediumPriorityLabel'),
  high: t('sendToken.tokenSelect.highPriorityLabel'),
};

const MODULES = {
  token: 2,
  dpos: 5,
  multiSignature: 4,
  legacyAccount: 1000,
};

const ASSETS = {
  transfer: 0,
  registerDelegate: 0,
  voteDelegate: 1,
  unlockToken: 2,
  registerMultisignatureGroup: 0,
  reclaimLSK: 0,
  reportDelegateMisbehavior: 3,
};

export const BASE_FEES = [
  Object.freeze({
    moduleID: cryptography.utils.intToBuffer(MODULES.dpos, 4),
    assetID: cryptography.utils.intToBuffer(ASSETS.registerDelegate, 4),
    baseFee: '1000000000',
  }),
];

export const TRANSFER_ASSETS_SCHEMA = {
  $id: 'lisk/transfer-asset',
  title: 'Transfer transaction asset',
  type: 'object',
  required: ['amount', 'recipientAddress', 'data'],
  properties: {
    amount: {
      dataType: 'uint64',
      fieldNumber: 1,
    },
    recipientAddress: {
      dataType: 'bytes',
      fieldNumber: 2,
      minLength: 20,
      maxLength: 20,
    },
    data: {
      dataType: 'string',
      fieldNumber: 3,
      minLength: 0,
      maxLength: 64,
    },
  },
};

export const MODULE_ASSET_NAME_ID_MAP = {
  transfer: `${MODULES.token}:${ASSETS.transfer}`,
  unlockToken: `${MODULES.dpos}:${ASSETS.unlockToken}`,
  voteDelegate: `${MODULES.dpos}:${ASSETS.voteDelegate}`,
  registerDelegate: `${MODULES.dpos}:${ASSETS.registerDelegate}`,
  reportDelegateMisbehavior: `${MODULES.dpos}:${ASSETS.reportDelegateMisbehavior}`,
  registerMultisignatureGroup: `${MODULES.multiSignature}:${ASSETS.registerMultisignatureGroup}`,
  reclaimLSK: `${MODULES.legacyAccount}:${ASSETS.reclaimLSK}`,
};

export const MODULE_ASSET_MAP = {
  [MODULE_ASSET_NAME_ID_MAP.transfer]: {
    maxFee: 1e7,
    icon: 'txDefault',
  },
  [MODULE_ASSET_NAME_ID_MAP.unlockToken]: {
    maxFee: 1e7,
    icon: 'unlockToken',
  },
  [MODULE_ASSET_NAME_ID_MAP.voteDelegate]: {
    maxFee: 1e8,
    icon: 'vote',
  },
  [MODULE_ASSET_NAME_ID_MAP.registerDelegate]: {
    maxFee: 25e8,
    icon: 'registerDelegate',
  },
  [MODULE_ASSET_NAME_ID_MAP.reportDelegateMisbehavior]: {
    maxFee: 1e7,
    icon: 'reportDelegateMisbehavior',
  },
  [MODULE_ASSET_NAME_ID_MAP.registerMultisignatureGroup]: {
    maxFee: 5e8,
    icon: 'multisignatureTransaction',
  },
  [MODULE_ASSET_NAME_ID_MAP.reclaimLSK]: {
    maxFee: 1e7,
    icon: 'txDefault',
  },
};

export const TRANSACTIONS_TYPES = {
  [MODULE_ASSET_NAME_ID_MAP.transfer]: {
    moduleAssetId: '2:0',
    fee: 1e7,
    title: t('Transfer'),
    image: (theme) => (theme === themes.light ? transferLight : transferDark),
  },
  [MODULE_ASSET_NAME_ID_MAP.registerMultisignatureGroup]: {
    moduleAssetId: '4:0',
    fee: 5e8,
    title: t('Register multisignature group'),
    image: (theme) => (theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark),
  },
  [MODULE_ASSET_NAME_ID_MAP.registerDelegate]: {
    moduleAssetId: '5:0',
    fee: 25e8,
    title: t('Delegate registration'),
    image: (theme) => (theme === themes.light ? registerDelegateLight : registerDelegateDark),
  },
  [MODULE_ASSET_NAME_ID_MAP.voteDelegate]: {
    moduleAssetId: '5:1',
    fee: 1e8,
    title: t('Vote'),
    image: (theme) => (theme === themes.light ? voteLight : voteDark),
  },
  [MODULE_ASSET_NAME_ID_MAP.unlockToken]: {
    moduleAssetId: '5:2',
    fee: 1e8,
    title: t('Unlock'),
    image: (theme) => (theme === themes.light ? txUnlockLight : txUnlockDark),
  },
};
