import { themes } from './styleGuide';

import accountInitializationLight from '../assets/images/txDetail/account-initialization-light.png';
import accountInitializationDark from '../assets/images/txDetail/account-initialization-dark.png';

import setSecondPassphraseLight from '../assets/images/txDetail/second-passphrase-light.png';
import setSecondPassphraseDark from '../assets/images/txDetail/second-passphrase-dark.png';

import registerDelegateLight from '../assets/images/txDetail/delegate-registration-light.png';
import registerDelegateDark from '../assets/images/txDetail/delegate-registration-dark.png';

import voteLight from '../assets/images/txDetail/vote-light.png';
import voteDark from '../assets/images/txDetail/vote-dark.png';

import txUnlockLight from '../assets/images/txDetail/tx-unlock.png';
import txUnlockDark from '../assets/images/txDetail/tx-unlock-dark.png';

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
const t = str => str;

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
  send: {
    moduleAssetId: '2:0',
    fee: 1e7,
    title: t('Transfer'),
    image: () => null,
  },
  accountInitialization: {
    moduleAssetId: '2:0',
    fee: 1e7,
    title: t('Account initialization'),
    image: theme =>
      theme === themes.light
        ? accountInitializationLight
        : accountInitializationDark,
  },
  setSecondPassphrase: {
    moduleAssetId: '4:0',
    fee: 5e8,
    title: t('Second passphrase registration'),
    image: theme =>
      theme === themes.light
        ? setSecondPassphraseLight
        : setSecondPassphraseDark,
  },
  registerDelegate: {
    moduleAssetId: '5:0',
    fee: 25e8,
    title: t('Delegate registration'),
    image: theme =>
      theme === themes.light ? registerDelegateLight : registerDelegateDark,
  },
  vote: {
    moduleAssetId: '5:1',
    fee: 1e8,
    title: t('Vote'),
    image: theme => (theme === themes.light ? voteLight : voteDark),
  },
  unlock: {
    moduleAssetId: '5:2',
    fee: 1e8,
    title: t('Unlock'),
    image: theme => (theme === themes.light ? txUnlockLight : txUnlockDark),
  },
};

export const getTxConstant = ({ moduleAssetId }) =>
  Object.values(transactions).find(cons => cons.moduleAssetId === moduleAssetId);

export const isTransfer = ({ moduleAssetId }) =>
  moduleAssetId === transactions.send.moduleAssetId;

export const isRegistration = ({ moduleAssetId }) =>
  moduleAssetId === transactions.registerDelegate.moduleAssetId;

export const isVote = ({ moduleAssetId }) =>
  moduleAssetId === transactions.vote.moduleAssetId;

export default transactions;
