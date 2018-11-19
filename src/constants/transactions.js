import { themes } from './styleGuide';

import accountInitializationLight from '../assets/images/txDetail/accountInitialization3xLight.png';
import accountInitializationDark from '../assets/images/txDetail/accountInitialization3xDark.png';

import setSecondPassphraseLight from '../assets/images/txDetail/setSecondPassphrase3xLight.png';
import setSecondPassphraseDark from '../assets/images/txDetail/setSecondPassphrase3xDark.png';

import registerDelegateLight from '../assets/images/txDetail/registerDelegate3xLight.png';
import registerDelegateDark from '../assets/images/txDetail/registerDelegate3xDark.png';

import voteLight from '../assets/images/txDetail/vote3xLight.png';
import voteDark from '../assets/images/txDetail/vote3xDark.png';

export default {
  send: {
    type: 0,
    fee: 1e7,
    title: 'Transfer',
    image: () => null,
  },
  accountInitialization: {
    type: 0,
    fee: 1e7,
    title: 'Account initialization',
    image: theme => (
      theme === themes.light ?
        accountInitializationLight :
        accountInitializationDark
    ),
  },
  setSecondPassphrase: {
    type: 1,
    fee: 5e8,
    title: 'Second passphrase registration',
    image: theme => (theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark),
  },
  registerDelegate: {
    type: 2,
    fee: 25e8,
    title: 'Delegate registration',
    image: theme => (theme === themes.light ? registerDelegateLight : registerDelegateDark),
  },
  vote: {
    type: 3,
    fee: 1e8,
    title: 'Vote',
    image: theme => (theme === themes.light ? voteLight : voteDark),
  },
};
