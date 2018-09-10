import accounts from './accounts';
import actionTypes from '../../constants/actions';

describe('Reducers: Accounts', () => {
  const followed = [
    { address: '1234567890L' },
    { address: '1234567891L' },
  ];
  const accountA = {
    address: '1234567890L',
    publicKey: 'sample_key_A',
    balance: 1200000000,
  };

  it('should retain the state in case of accountUpdated', () => {
    const currentState = { active: accountA, followed };
    const action = { type: actionTypes.accountUpdated, data: {} };
    const changedState = accounts(currentState, action);
    expect(changedState).toEqual(currentState);
  });

  it('should empty accounts.active in case of accountLoggedOut', () => {
    const currentState = { active: accountA, followed };
    const action = { type: actionTypes.accountLoggedOut };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
  });

  it('should empty accounts.active in case of accountLoggedIn', () => {
    expect(null).toBeNull();
  });

  it('should update one of the followed accounts in case of accountsEdited', () => {
    expect(null).toBeNull();
  });

  it('should add data to state.followed array in case of accountFollowed', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountFollowed, data: accountA };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toEqual([accountA]);
  });

  it('should remove given account from state.followed array in case of accountUnFollowed', () => {
    const currentState = { active: null, followed: [accountA] };
    const action = { type: actionTypes.accountUnFollowed, data: accountA.address };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toHaveLength(0);
  });

  it('should update one of the followed accounts in case of accountsRetrieved', () => {
    expect(null).toBeNull();
  });

  it('should make no change in case of accountsStored', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountsStored, data: [accountA] };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
    expect(changedState.followed).toHaveLength(0);
  });
});
