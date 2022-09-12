import { INITIAL_STATE as settings } from 'modules/Settings/reducer';
import { account as accountAPI } from 'utilities/api';
import { tokenKeys } from 'constants/tokens';
import socketMiddleware from './socket';

describe('Middleware: Accounts', () => {
  beforeEach(() => {
    accountAPI.getSummary = jest.fn();
  });

  const account = {
    address: '1234567890L',
    publicKey: 'sample_public_Key_A',
    balance: 10000000,
  };
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      accounts: {
        info: { [tokenKeys[0]]: account },
        followed: [],
      },
      settings,
    }),
  };

  it('should pass the action', () => {
    const action = { type: 'ANY_ACTION' };
    socketMiddleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
  });
});
