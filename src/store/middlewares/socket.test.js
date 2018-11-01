import BackgroundTimer from 'react-native-background-timer';
import socketMiddleware from './socket';
import actionTypes from '../../constants/actions';
import * as accountUtility from '../../utilities/api/account';
import * as notificaionUtility from '../../utilities/notifications';

describe('Middleware: Accounts', () => {
  const accountA = {
    address: '1234567890L',
    publicKey: 'sample_public_Key_A',
    balance: 10000000,
  };
  const accountB = {
    address: '1234567890L',
    publicKey: 'sample_public_Key_A',
    balance: 20000000,
  };

  const next = jest.fn();
  const activePeer = {};
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      peers: {
        activePeer,
      },
      settings: {
        notificationAccess: true,
        notification: true,
      },
      accounts: {
        active: accountA,
        followed: [],
      },
    }),
  };

  it('should pass the action', () => {
    const action = {
      type: 'Any_Action',
    };

    socketMiddleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
  });

  describe('In case of accountLoggedIn', () => {
    const action = {
      type: actionTypes.accountLoggedIn,
      data: accountA,
    };

    beforeEach(() => {
      jest.useFakeTimers();
      accountUtility.getAccount = jest.fn();
      notificaionUtility.sendNotifications = jest.fn();
    });

    it('should create an interval to make fire actions', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);
      expect(BackgroundTimer.runBackgroundTimer).toBeCalled();
    });

    it.skip('should use getAccount utility to get the account info', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);

      expect(accountUtility.getAccount).not.toBeCalled();
      BackgroundTimer.runBackgroundTimer.mockResolvedValue(accountA);
      expect(accountUtility.getAccount).toBeCalledWith(activePeer, accountA.address);
    });

    it('should not dispatch blockUpdated if the account has the same balance', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);
      BackgroundTimer.runBackgroundTimer.mockResolvedValue();

      expect(store.dispatch).not.toBeCalled();
    });

    it('should dispatch blockUpdated if the balance has changed', async () => {
      accountUtility.getAccount.mockResolvedValue(accountB);
      socketMiddleware(store)(next)(action);
      BackgroundTimer.runBackgroundTimer.mockResolvedValue();

      expect(store.dispatch).not.toBeCalled();
    });
  });

  describe('In case of accountLoggedOut', () => {
    it('should clear the interval', () => {
      const action = {
        type: actionTypes.accountLoggedOut,
      };
      jest.useFakeTimers();
      socketMiddleware(store)(next)(action);

      expect(BackgroundTimer.stopBackgroundTimer).toBeCalled();
    });
  });
});
