import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as apiClient from 'utilities/api/lisk/apiClient';
import { renderHook } from '@testing-library/react-hooks';
import { mockSavedAccounts } from 'tests/fixtures/accounts';
import { useAccountInfo } from './useAccountInfo';

const account = {
  summary: {
    address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
    balance: '10000',
    publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
    unconfirmedBalance: '10000',
    initialized: true,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const mockDispatch = jest.fn();

const mockState = {
  account: {
    summary: account,
    current: mockSavedAccounts[0]
  },
};
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

describe('useAccountInfo hook', () => {
  const store = mockStore(mockState);
  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );
  beforeEach(() => {
    mockDispatch.mockClear();
    apiClient.getAccount = jest.fn();
    global.fetch = jest.fn();
  });
  const { result } = renderHook(() => useAccountInfo(), { wrapper });
  it('useAccountInfo Should not trigger on mounting', async () => {
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('getAccount should make api call to get account details', async () => {
    const { getAccount } = result.current;
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => ({ data: [account] }) });
    const data = await getAccount(account.address);
    expect(data).toEqual([account]);
  });
});
