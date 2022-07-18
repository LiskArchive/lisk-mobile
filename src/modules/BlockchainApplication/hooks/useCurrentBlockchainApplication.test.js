import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import actionTypes from '../store/actionTypes';
import { useCurrentBlockchainApplication } from './useCurrentBlockchainApplication';

const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    current: BLOCKCHAIN_APPLICATIONS_MOCK[0],
  },
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

describe('useCurrentBlockchainApplication hook', () => {
  const store = mockStore(mockState);

  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const { result } = renderHook(() => useCurrentBlockchainApplication(), { wrapper });

  it('setCurrentApplication should not trigger on mounting', async () => {
    expect(store.getActions()).toEqual([]);
  });

  it('should return correct current application', async () => {
    const [currentApplication] = result.current;

    expect(currentApplication).toEqual(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
  });

  it('setCurrentApplication should dispatch an action', async () => {
    const [, setCurrentApplication] = result.current;

    const expectedAction = {
      type: actionTypes.setCurrentApplication,
      application: BLOCKCHAIN_APPLICATIONS_MOCK[0],
    };

    act(() => {
      setCurrentApplication(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });
});