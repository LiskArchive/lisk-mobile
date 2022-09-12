import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { renderHook, act } from '@testing-library/react-hooks';

import { mockApplicationsMeta, mockMappedApplicationsMeta } from '../__fixtures__';
import actionTypes from '../store/actionTypes';
import { useBlockchainApplicationManagement } from './useBlockchainApplicationManagement';

import * as useCurrentBlockchainApplication from './useCurrentBlockchainApplication';

const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    applications: mockMappedApplicationsMeta,
    pins: [],
  },
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);
const mockCurrentApplication = mockApplicationsMeta[0];
const mockSetCurrentApplication = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

jest
  .spyOn(useCurrentBlockchainApplication, 'useCurrentBlockchainApplication')
  .mockImplementation(() => [mockCurrentApplication, mockSetCurrentApplication]);

jest.mock('./usePinBlockchainApplication.js', () => ({
  usePinBlockchainApplication: jest.fn(() => ({
    pins: [],
    togglePin: jest.fn(),
    checkPinByChainId: jest.fn(),
  })),
}));

describe('useBlockchainApplicationManagement hook', () => {
  const store = mockStore(mockState);

  const wrapper = ({ children }) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>;

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const { result } = renderHook(() => useBlockchainApplicationManagement(), { wrapper });

  it('addApplication should not trigger on mounting', () => {
    expect(store.getActions()).toEqual([]);
  });

  it('addApplication should dispatch an action', () => {
    const { addApplication } = result.current;

    const expectedAction = {
      type: actionTypes.addApplication,
      application: mockApplicationsMeta[3],
    };

    act(() => {
      addApplication(mockApplicationsMeta[3]);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('addApplication should not dispatch an action while adding default application', () => {
    const { addApplication } = result.current;

    act(() => {
      addApplication(mockApplicationsMeta[0]);
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('getApplicationByChainId should return an application if chainId exists', () => {
    const { getApplicationByChainId } = result.current;

    const updatedApplication = { ...mockApplicationsMeta[3], isPinned: false };

    expect(getApplicationByChainId(mockApplicationsMeta[3].chainID)).toEqual(
      updatedApplication
    );
  });

  it('getApplicationByChainId should return undefined if chainId does not exist', () => {
    const { getApplicationByChainId } = result.current;

    expect(getApplicationByChainId('anUndefinedChainID')).toBeUndefined();
  });

  it('deleteApplicationByChainId should dispatch an action', () => {
    const { deleteApplicationByChainId } = result.current;

    const expectedAction = {
      type: actionTypes.deleteApplicationByChainId,
      chainId: mockApplicationsMeta[3].chainID,
    };

    store.clearActions();

    act(() => {
      deleteApplicationByChainId(mockApplicationsMeta[3].chainID);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('deleteApplicationByChainId should dispatch an action and set application to Lisk if current application is being deleted', async () => {
    const { deleteApplicationByChainId } = result.current;

    const expectedActions = [
      {
        type: actionTypes.deleteApplicationByChainId,
        chainId: mockCurrentApplication.chainID,
      },
    ];

    store.clearActions();

    act(() => {
      deleteApplicationByChainId(mockCurrentApplication.chainID);
    });

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockSetCurrentApplication).toHaveBeenCalledTimes(1);
  });
});
