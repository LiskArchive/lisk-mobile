
import accountInitialization from '../assets/images/txDetail/accountInitialization2x.png';
import registerDelegate from '../assets/images/txDetail/registerDelegate2x.png';
import setSecondPassphrase from '../assets/images/txDetail/setSecondPassphrase2x.png';
import vote from '../assets/images/txDetail/vote2x.png';

export default {
  send: {
    type: 0,
    fee: 1e7,
    title: 'Transfer',
    image: null,
  },
  accountInitialization: {
    type: 0,
    fee: 1e7,
    title: 'Account initialization',
    image: accountInitialization,
  },
  setSecondPassphrase: {
    type: 1,
    fee: 5e8,
    title: 'Second passphrase registration',
    image: setSecondPassphrase,
  },
  registerDelegate: {
    type: 2,
    fee: 25e8,
    title: 'Delegate registration',
    image: registerDelegate,
  },
  vote: {
    type: 3,
    fee: 1e8,
    title: 'Vote',
    image: vote,
  },
};
