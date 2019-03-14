import accounts, { INITIAL_STATE } from './accounts';
import actionTypes from '../../constants/actions';
import { tokenMap } from '../../constants/tokens';
import { merge } from '../../utilities/helpers';

const data = {
  activeToken: tokenMap.LSK.key,
  passphrase: 'test',
  followed: [
    { address: '1234567890L', label: 'label1' },
    { address: '1234567891L', label: 'label2' },
  ],
  accountA: {
    address: '1234567890L',
    publicKey: 'sample_key_A',
    balance: 1200000000,
  },
  accountB: {
    address: '1234567891L',
    publicKey: 'sample_key_B',
    balance: 2100000000,
  },
};

describe('Reducers: Accounts', () => {
  let state;

  beforeEach(() => {
    state = INITIAL_STATE;
  });

  it('should create the empty state initially', () => {
    expect(accounts()).toEqual(state);
  });

  it('should set accounts info and passphrase in case of accountSignedIn', () => {
    const action = {
      type: actionTypes.accountSignedIn,
      data: {
        passphrase: data.passphrase,
        info: { LSK: data.accountA.address },
      },
    };

    expect(accounts(state, action)).toEqual(merge(state, {
      passphrase: data.passphrase,
      info: { LSK: data.accountA.address },
    }));
  });

  it('should retain the state in case of accountUpdated', () => {
    const action = {
      type: actionTypes.accountUpdated,
      data: {
        account: data.accountB,
        activeToken: data.activeToken,
      },
    };

    expect(accounts(state, action)).toEqual(merge(state, {
      info: merge(state.info, {
        [data.activeToken]: data.accountB,
      }),
    }));
  });

  it('should empty accounts.active in case of accountSignedOut', () => {
    state = merge(state, {
      passphrase: data.passphrase,
      info: {
        [data.activeToken]: data.accountA,
      },
    });

    const action = { type: actionTypes.accountSignedOut };

    expect(accounts(state, action)).toEqual(INITIAL_STATE);
  });

  it('should add data to state.followed array in case of accountFollowed', () => {
    state = merge(state, { followed: [data.accountA] });
    const action = { type: actionTypes.accountFollowed, data: data.accountB };
    const changedState = accounts(state, action);
    expect(changedState.followed).toEqual([data.accountA, data.accountB]);
  });

  it('should remove given account from state.followed array in case of accountUnFollowed', () => {
    state = merge(state, { followed: [data.accountA] });
    const action = { type: actionTypes.accountUnFollowed, data: data.accountA.address };
    const changedState = accounts(state, action);
    expect(changedState.followed).toHaveLength(0);
  });

  it('should edit given account from state.followed array in case of accountEdited', () => {
    state = merge(state, { followed: data.followed });
    const expectedValue = {
      address: data.followed[1].address,
      label: 'label3',
    };
    const action = {
      type: actionTypes.accountEdited,
      data: expectedValue,
    };
    const changedState = accounts(state, action);
    expect(changedState.followed[1]).toEqual(expectedValue);
  });

  it('should update one of the followed accounts in case of followedAccountsRetrieved', () => {
    const action = {
      type: actionTypes.followedAccountsRetrieved,
      data: [data.accountA, data.accountB],
    };
    const changedState = accounts(state, action);
    expect(changedState.followed).toHaveLength(2);
  });

  it('should make no change in case of accountsStored', () => {
    const action = { type: actionTypes.accountsStored, data: [data.accountA] };
    const changedState = accounts(state, action);
    expect(changedState.followed).toHaveLength(0);
  });
});
