import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { renderHook, act } from '@testing-library/react-hooks';
import { mockSavedAccounts } from 'tests/fixtures/accounts';
import actionTypes from '../../actionTypes';
import { useCurrentAccount } from './useCurrentAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const mockDispatch = jest.fn();

const mockState = {
  account: {
    current: mockSavedAccounts[0],
  },
};
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

describe('useCurrentAccount hook', () => {
  const store = mockStore(mockState);
  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );
  beforeEach(() => {
    mockDispatch.mockClear();
  });
  const { result } = renderHook(() => useCurrentAccount(), { wrapper });
  it('setAccount Should not trigger on mounting', async () => {
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('setAccount should dispatch an action', async () => {
    const [, setAccount] = result.current;
    const expectedAction = {
      type: actionTypes.setCurrentAccount,
      encryptedAccount: mockSavedAccounts[0],
    };
    act(() => {
      setAccount(mockSavedAccounts[0]);
    });
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('getAccount should return specific account selected by address', async () => {
    const [currentAccount] = result.current;
    expect(currentAccount).toMatchObject(mockSavedAccounts[0]);
  });
});
