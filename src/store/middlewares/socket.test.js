import BackgroundTimer from 'react-native-background-timer';
import socketMiddleware, { checkBalance } from './socket';
import actionTypes from '../../constants/actions';
import * as accountUtility from '../../utilities/api/account';
import { merge } from '../../utilities/helpers';

describe('Middleware: Accounts', () => {
  beforeEach(() => {
    accountUtility.getAccount = jest.fn();
  });

  const account = {
    address: '1234567890L',
    publicKey: 'sample_public_Key_A',
    balance: 10000000,
  };
  const next = jest.fn();
  const activePeer = {};
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      peers: {
        activePeer,
      },
      accounts: {
        active: account,
        followed: [],
      },
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
        accountUtility.getAccount.mockResolvedValue(account);
        socketMiddleware(store)(next)(action);
        await checkBalance(store);
        expect(store.dispatch).not.toBeCalled();
      });

      it('should dispatch blockUpdated if the account has not the same balance', async () => {
        accountUtility.getAccount.mockResolvedValue(merge(account, { balance: 0 }));
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
