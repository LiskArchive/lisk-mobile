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
  const accountB = {
    address: '1234567891L',
    publicKey: 'sample_key_B',
    balance: 2100000000,
  };

  it('should create the empty state initially', () => {
    const createdState = accounts();
    const emptyState = { active: null, followed: [] };
    expect(createdState).toEqual(emptyState);
  });

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

  it('should set accounts.active in case of accountLoggedIn', () => {
    const currentState = { active: null, followed };
    const action = {
      type: actionTypes.accountLoggedIn,
      data: accountA,
    };
    const changedState = accounts(currentState, action);
    expect(changedState).toEqual({
      active: accountA,
      followed,
    });
  });

  it('should add data to state.followed array in case of accountFollowed', () => {
    const currentState = { active: null, followed: [accountA] };
    const action = { type: actionTypes.accountFollowed, data: accountB };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toEqual([accountA, accountB]);
  });

  it('should remove given account from state.followed array in case of accountUnFollowed', () => {
    const currentState = { active: null, followed: [accountA] };
    const action = { type: actionTypes.accountUnFollowed, data: accountA.address };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toHaveLength(0);
  });

  it('should update one of the followed accounts in case of accountsRetrieved', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountsRetrieved, data: [accountA, accountB] };
    const changedState = accounts(currentState, action);
    expect(changedState.followed).toHaveLength(2);
  });

  it('should make no change in case of accountsStored', () => {
    const currentState = { active: null, followed: [] };
    const action = { type: actionTypes.accountsStored, data: [accountA] };
    const changedState = accounts(currentState, action);
    expect(changedState.active).toBeNull();
    expect(changedState.followed).toHaveLength(0);
  });

  it('should leave the state untouched if no case matched', () => {
    const currentState = { active: accountA, followed };
    const action1 = { data: accountB };
    const changedState1 = accounts(currentState, action1);
    expect(changedState1).toEqual(currentState);

    const action2 = { data: [accountB] };
    const changedState2 = accounts(currentState, action2);
    expect(changedState2).toEqual(currentState);
  });
});
