import accounts from './accounts';
import actionTypes from '../../constants/actions';

describe("Reducers: Accounts", () => {
  const followed = [
    { id: '1234567890L' },
    { id: '1234567891L' },
  ];
  test("should empty accounts.active in case of accountLoggedOut", () => {
        const currentState = { active: '1234567890L', followed };
        const action = { type: actionTypes.accountLoggedOut };
        const changedState = accounts(currentState, action);
        expect(changedState.active).toBe(null);
  });
  test("should retain the state in case of accountUpdated", () => {
    const currentState = { active: '1234567890L', followed };
    const action = { type: actionTypes.accountUpdated, data: {} };
    const changedState = accounts(currentState, action);
      expect(changedState).toBe(currentState);
  });
});
