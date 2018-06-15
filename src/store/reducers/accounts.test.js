import accounts from './accounts';
import actionTypes from '../../constants/actions';

describe('Reducers: Accounts', () => {
  const followed = [
    { id: '1234567890L' },
    { id: '1234567891L' },
  ];
  const accountA = {
    id: '1234567890L',
    publicKey: 'sample_key_A',
    balance: 1200000000,
  };

  test('should empty accounts.active in case of accountLoggedOut', () => {
    const currentState = { active: accountA, followed };
    const action = { type: actionTypes.accountLoggedOut };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
  });

  test('should retain the state in case of accountUpdated', () => {
    const currentState = { active: accountA, followed };
    const action = { type: actionTypes.accountUpdated, data: {} };
    const changedState = accounts(currentState, action);
    expect(changedState).toEqual(currentState);
  });

  test('should add data to state.followed array in case of accountFollowed', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountFollowed, data: accountA };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toEqual([accountA]);
  });

  test('should remove given account from state.followed array in case of accountUnFollowed', () => {
    const currentState = { active: null, followed: [accountA] };
    const action = { type: actionTypes.accountUnFollowed, data: accountA };
    const changedState = accounts(currentState, action);
    expect(changedState.followed.length).toBe(0);
  });

  test('should fill followed account with given list in case of accountUnFollowed', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountsRetrieved, data: [accountA] };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
    expect(changedState.followed).toEqual([accountA]);
  });

  test('should make no change in case of accountsStored', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountsStored, data: [accountA] };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
    expect(changedState.followed.length).toBe(0);
  });
});
