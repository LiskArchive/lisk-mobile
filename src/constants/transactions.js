import { themes } from './styleGuide';

import accountInitializationLight from '../assets/images/txDetail/account-initialization-light.png';
import accountInitializationDark from '../assets/images/txDetail/account-initialization-dark.png';

import setSecondPassphraseLight from '../assets/images/txDetail/second-passphrase-light.png';
import setSecondPassphraseDark from '../assets/images/txDetail/second-passphrase-dark.png';

import registerDelegateLight from '../assets/images/txDetail/delegate-registration-light.png';
import registerDelegateDark from '../assets/images/txDetail/delegate-registration-dark.png';

import voteLight from '../assets/images/txDetail/vote-light.png';
import voteDark from '../assets/images/txDetail/vote-dark.png';

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

export default {
  send: {
    type: 0,
    fee: 1e7,
    title: t('Transfer'),
    image: () => null,
  },
  accountInitialization: {
    type: 0,
    fee: 1e7,
    title: t('Account initialization'),
    image: theme => (
      theme === themes.light ?
        accountInitializationLight :
        accountInitializationDark
    ),
  },
  setSecondPassphrase: {
    type: 1,
    fee: 5e8,
    title: t('Second passphrase registration'),
    image: theme => (theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark),
  },
  registerDelegate: {
    type: 2,
    fee: 25e8,
    title: t('Delegate registration'),
    image: theme => (theme === themes.light ? registerDelegateLight : registerDelegateDark),
  },
  vote: {
    type: 3,
    fee: 1e8,
    title: t('Vote'),
    image: theme => (theme === themes.light ? voteLight : voteDark),
  },
};
