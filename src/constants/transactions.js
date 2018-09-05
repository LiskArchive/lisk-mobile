export default {
  send: {
    type: 0,
    fee: 1e7,
    title: 'Transfer',
  },
  accountInitialization: {
    type: 0,
    fee: 1e7,
    title: 'Account initialization',
  },
  setSecondPassphrase: {
    type: 1,
    fee: 5e8,
    title: 'Second passphrase registration',
  },
  registerDelegate: {
    type: 2,
    fee: 25e8,
    title: 'Delegate registration',
  },
  vote: {
    type: 3,
    fee: 1e8,
    title: 'Vote',
  },
};
