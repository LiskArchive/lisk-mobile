import socketMiddleware from './socket';
import actionTypes from '../../constants/actions';
import * as accountUtility from '../../utilities/api/account';

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
    });

    it('should create an interval to make fire actions', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);

      expect(setInterval).toBeCalled();
    });

    it('should use getAccount utility to get the account info', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);

      expect(accountUtility.getAccount).not.toBeCalled();
      jest.advanceTimersByTime(60001);
      expect(accountUtility.getAccount).toBeCalledWith(activePeer, accountA.address);
    });

    it('should not dispatch blockUpdated if the account has the same balance', () => {
      accountUtility.getAccount.mockResolvedValue(accountA);
      socketMiddleware(store)(next)(action);
      jest.advanceTimersByTime(60001);

      expect(store.dispatch).not.toBeCalled();
    });

    it('should dispatch blockUpdated if the balance has changed', async () => {
      accountUtility.getAccount.mockResolvedValue(accountB);
      socketMiddleware(store)(next)(action);
      jest.advanceTimersByTime(60001);

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

      expect(clearInterval).toBeCalled();
    });
  });
});
