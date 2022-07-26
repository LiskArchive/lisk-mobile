import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';

import { BLOCKCHAIN_APPLICATIONS_MOCK, MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import actionTypes from '../store/actionTypes';

import { useGetApplicationsMetaQuery } from './useGetApplicationsQuery';

const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    applications: MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK,
    pins: [],
  },
};

const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>;

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

describe('useGetApplicationsMetaQuery hook', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  function setupHook() {
    const store = mockStore(mockState);

    const wrapper = ({ children }) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>;

    const hook = renderHook(() => useGetApplicationsMetaQuery(), { wrapper });

    return { hook, store };
  }

  it('should return loading state and empty data before mounting', async () => {
    const {
      hook: { result, waitForNextUpdate },
    } = setupHook();

    expect(result.current).toMatchObject({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    await waitForNextUpdate();
  });

  it('should return the correct data after mounting', async () => {
    const {
      hook: { result, waitForNextUpdate },
    } = setupHook();

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: BLOCKCHAIN_APPLICATIONS_MOCK,
      isLoading: false,
      error: undefined,
    });
  });

  it('setApplicationsAction should trigger on mounting', async () => {
    const expectedAction = {
      type: actionTypes.setApplications,
      applications: BLOCKCHAIN_APPLICATIONS_MOCK,
    };

    const {
      hook: { waitForNextUpdate },
      store,
    } = setupHook();

    await waitForNextUpdate();

    expect(store.getActions()).toEqual([expectedAction]);
  });
});
