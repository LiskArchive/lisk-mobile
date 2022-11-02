import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { mockApplicationsMeta } from '../__fixtures__';
import actionTypes from '../store/actionTypes';
import { usePinApplications } from './usePinApplications';

const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    pins: mockApplicationsMeta.map(({ chainID }) => chainID),
  },
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

describe('usePinApplications hook', () => {
  const store = mockStore(mockState);

  const wrapper = ({ children }) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>;

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const { result } = renderHook(() => usePinApplications(), { wrapper });

  it('togglePin should not be triggered on mounting', async () => {
    expect(store.getActions()).toEqual([]);
  });

  it('togglePin should dispatch an action', async () => {
    const { togglePin } = result.current;

    const chainId = mockApplicationsMeta[0].chainID;

    const expectedAction = {
      type: actionTypes.toggleApplicationPin,
      chainId,
    };

    act(() => {
      togglePin(chainId);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should return pins as an array', async () => {
    const { pins, togglePin } = result.current;
    const chainId = mockApplicationsMeta[0].chainID;

    act(() => {
      togglePin(chainId);
    });

    const expectPins = mockApplicationsMeta.map(({ chainID }) => chainID);

    expect(pins).toEqual(expect.arrayContaining(expectPins));
  });

  it('should flag chain as a pinned application', async () => {
    const { checkPin, togglePin } = result.current;
    const chainId = mockApplicationsMeta[0].chainID;

    act(() => {
      togglePin(chainId);
    });
    expect(checkPin(chainId)).toBeTruthy();
  });

  it('should not flag chain as a pinned application', async () => {
    mockState.blockchainApplications.pins = [];

    const {
      result: {
        current: { checkPin },
      },
    } = renderHook(() => usePinApplications(), { wrapper });

    const chainId = mockApplicationsMeta[0].chainID;

    expect(checkPin(chainId)).not.toBeTruthy();
  });
});
