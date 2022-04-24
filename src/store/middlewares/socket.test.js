import BackgroundTimer from 'react-native-background-timer';
import actionTypes from 'packages/Accounts/actionTypes';
import { INITIAL_STATE as settings } from 'packages/Settings/reducer';
import { account as accountAPI } from 'utilities/api';
import { merge } from 'utilities/helpers';
import { tokenKeys } from 'constants/tokens';
import socketMiddleware, { checkBalance } from './socket';

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

  describe('In case of accountSignedIn', () => {
    const action = {
      type: actionTypes.accountSignedIn,
      data: account,
    };

    it('should create an interval to make fire actions', () => {
      socketMiddleware(store)(next)(action);
      expect(BackgroundTimer.runBackgroundTimer).toBeCalled();
    });

    describe('checkBalance function', () => {
      it('should not dispatch blockUpdated if the account has the same balance', async () => {
        accountAPI.getSummary.mockResolvedValue(account);
        socketMiddleware(store)(next)(action);
        await checkBalance(store);
        expect(store.dispatch).not.toBeCalled();
      });

      it('should dispatch blockUpdated if the account has not the same balance', async () => {
        accountAPI.getSummary.mockResolvedValue(merge(account, { balance: 0 }));
        socketMiddleware(store)(next)(action);
        await checkBalance(store);
        expect(store.dispatch).toBeCalled();
      });
    });
  });

  describe('In case of accountSignedOut', () => {
    it('should clear the interval', () => {
      const action = { type: actionTypes.accountSignedOut };
      socketMiddleware(store)(next)(action);
      expect(BackgroundTimer.stopBackgroundTimer).toBeCalled();
    });
  });
});
