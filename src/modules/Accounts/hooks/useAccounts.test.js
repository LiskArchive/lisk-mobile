import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react-native';

import { mockSavedAccounts } from '../__fixtures__';
import actionTypes from '../actionTypes';
import { useAccounts } from './useAccounts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const mockDispatch = jest.fn();
const accountStateObject = {
  [mockSavedAccounts[0].metadata.address]: mockSavedAccounts[0],
};
const mockState = {
  account: {
    list: accountStateObject,
  },
};
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
  Provider: ({ children }) => children,
}));

describe('useAccount hook', () => {
  const store = mockStore(mockState);
  const wrapper = ({ children }) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>;
  beforeEach(() => {
    mockDispatch.mockClear();
  });
  const { result } = renderHook(() => useAccounts(), { wrapper });
  it('setAccount Should not trigger on mounting', async () => {
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('setAccount should dispatch an action', async () => {
    const { setAccount } = result.current;
    const expectedAction = {
      type: actionTypes.addAccount,
      encryptedAccount: mockSavedAccounts[0],
    };
    act(() => {
      setAccount(mockSavedAccounts[0]);
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('accounts should return and convert state as an array', async () => {
    const { accounts } = result.current;
    const expectArrayAccounts = [mockSavedAccounts[0]];
    expect(accounts).toMatchObject(expectArrayAccounts);
  });

  it('getAccount should return specific account selected by address', async () => {
    const { getAccount } = result.current;
    const address = mockSavedAccounts[0].metadata.address;
    const account = getAccount(address);
    expect(account).toMatchObject(mockSavedAccounts[0]);
  });

  it('deleteAccount should dispatch an action', async () => {
    const { deleteAccount } = result.current;
    store.clearActions();
    const address = mockSavedAccounts[0].metadata.address;
    const expectedAction = {
      type: actionTypes.deleteAccount,
      address,
    };
    act(() => {
      deleteAccount(address);
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });
});
