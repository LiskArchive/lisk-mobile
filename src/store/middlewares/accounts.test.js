import * as storageUtility from 'utilities/storage';
import actionTypes from 'modules/Accounts/actionTypes';
import accountsMiddleware from './accounts';

describe('Middleware: Accounts', () => {
  const accountA = {
    address: '1234567890L',
    label: 'account A',
  };
  const accountB = {
    address: '1234567891L',
    label: 'account B',
  };

  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      accounts: {
        followed: [accountA, accountB],
      },
    }),
  };

  it('should pass the action', () => {
    const action = { type: 'ANY_ACTION' };
    accountsMiddleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
  });

  it('should store followed account at any activity over the followedAccounts', () => {
    const action = {
      type: actionTypes.accountFollowed,
      data: accountB,
    };

    storageUtility.storeFollowedAccount = jest.fn();

    accountsMiddleware(store)(next)(action);
    expect(storageUtility.storeFollowedAccount).toBeCalledWith([
      accountA,
      accountB,
    ]);
  });
});
