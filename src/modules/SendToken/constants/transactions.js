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

import txUnknownLight from 'assets/images/txDetail/tx-unknown-light.png';
import txUnknownDark from 'assets/images/txDetail/tx-unknown-dark.png';

const modules = {
  token: 2,
  dpos: 5,
  multiSignature: 4,
  legacyAccount: 1000,
};

const commands = {
  transfer: 0,
  registerDelegate: 0,
  voteDelegate: 1,
  unlockToken: 2,
  registerMultisignatureGroup: 0,
  reclaimLSK: 0,
  reportDelegateMisbehavior: 3,
};

export const DEFAULT_PRIORITY = [
  { title: 'Low', amount: 0 },
  { title: 'Medium', amount: 0 },
  { title: 'High', amount: 0 },
];

export const moduleCommandNameIdMap = {
  transfer: `${modules.token}:${commands.transfer}`,
  unlockToken: `${modules.dpos}:${commands.unlockToken}`,
  voteDelegate: `${modules.dpos}:${commands.voteDelegate}`,
  registerDelegate: `${modules.dpos}:${commands.registerDelegate}`,
  reportDelegateMisbehavior: `${modules.dpos}:${commands.reportDelegateMisbehavior}`,
  registerMultisignatureGroup: `${modules.multiSignature}:${commands.registerMultisignatureGroup}`,
  reclaimLSK: `${modules.legacyAccount}:${commands.reclaimLSK}`,
};

export const moduleAssetMap = {
  [moduleCommandNameIdMap.transfer]: {
    maxFee: 1e7,
    icon: 'txDefault',
  },
  [moduleCommandNameIdMap.unlockToken]: {
    maxFee: 1e7,
    icon: 'unlockToken',
  },
  [moduleCommandNameIdMap.voteDelegate]: {
    maxFee: 1e8,
    icon: 'vote',
  },
  [moduleCommandNameIdMap.registerDelegate]: {
    maxFee: 25e8,
    icon: 'registerDelegate',
  },
  [moduleCommandNameIdMap.reportDelegateMisbehavior]: {
    maxFee: 1e7,
    icon: 'reportDelegateMisbehavior',
  },
  [moduleCommandNameIdMap.registerMultisignatureGroup]: {
    maxFee: 5e8,
    icon: 'multisignatureTransaction',
  },
  [moduleCommandNameIdMap.reclaimLSK]: {
    maxFee: 1e7,
    icon: 'txDefault',
  },
};

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

export const transferAssetSchema = {
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

export const transactions = {
  [moduleCommandNameIdMap.transfer]: {
    moduleAssetId: '2:0',
    fee: 1e7,
    title: t('Transfer'),
    image: (theme) => (theme === themes.light ? transferLight : transferDark),
  },
  [moduleCommandNameIdMap.registerMultisignatureGroup]: {
    moduleAssetId: '4:0',
    fee: 5e8,
    title: t('Register multisignature group'),
    image: (theme) => (theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark),
  },
  [moduleCommandNameIdMap.registerDelegate]: {
    moduleAssetId: '5:0',
    fee: 25e8,
    title: t('Delegate registration'),
    image: (theme) => (theme === themes.light ? registerDelegateLight : registerDelegateDark),
  },
  [moduleCommandNameIdMap.voteDelegate]: {
    moduleAssetId: '5:1',
    fee: 1e8,
    title: t('Vote'),
    image: (theme) => (theme === themes.light ? voteLight : voteDark),
  },
  [moduleCommandNameIdMap.unlockToken]: {
    moduleAssetId: '5:2',
    fee: 1e8,
    title: t('Unlock'),
    image: (theme) => (theme === themes.light ? txUnlockLight : txUnlockDark),
  },
};

export const getTxConstant = ({ moduleAssetId }) => {
  const result = transactions[moduleAssetId] ?? {};
  return {
    ...result,
    title: result?.title ?? t('Transaction'),
    image: result?.image
      ? result?.image
      : (theme) => (theme === themes.light ? txUnknownLight : txUnknownDark),
  };
};

export const isTransfer = ({ moduleAssetId }) => moduleAssetId === moduleCommandNameIdMap.transfer;

export const isRegistration = ({ moduleAssetId }) =>
  moduleAssetId === moduleCommandNameIdMap.registerDelegate;

export const isVote = ({ moduleAssetId }) => moduleAssetId === moduleCommandNameIdMap.voteDelegate;

export const isUnlock = ({ moduleAssetId }) => moduleAssetId === moduleCommandNameIdMap.unlockToken;
