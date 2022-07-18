import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { renderHook, act } from '@testing-library/react-hooks';

import { BLOCKCHAIN_APPLICATIONS_MOCK, MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import actionTypes from '../store/actionTypes';
import { useBlockchainApplicationManagement } from './useBlockchainApplicationManagement';

import * as useCurrentBlockchainApplication from './useCurrentBlockchainApplication';

const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    applications: MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK,
    pins: [],
  },
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);
const mockCurrentApplication = BLOCKCHAIN_APPLICATIONS_MOCK[3];
const mockSetCurrentApplication = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

jest.spyOn(useCurrentBlockchainApplication,
  'useCurrentBlockchainApplication').mockImplementation(
  () => ([mockCurrentApplication, mockSetCurrentApplication])
);

jest.mock('./usePinBlockchainApplication.js', () => ({
  usePinBlockchainApplication: jest.fn(() => (
    { pins: [], togglePin: jest.fn(), checkPinByChainId: jest.fn() }
  )),
}));

describe('useBlockchainApplicationManagement hook', () => {
  const store = mockStore(mockState);
  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  const { result } = renderHook(() => useBlockchainApplicationManagement(), { wrapper });

  it('addApplicationByChainId should not trigger on mounting', () => {
    const { addApplicationByChainId } = result.current;

    expect(addApplicationByChainId).toHaveBeenCalledTimes(0);
  });

  it('addApplicationByChainId should dispatch an action', () => {
    const { addApplicationByChainId } = result.current;

    const expectedAction = {
      type: actionTypes.addApplicationByChainId,
      application: BLOCKCHAIN_APPLICATIONS_MOCK[3],
    };

    act(() => {
      addApplicationByChainId(BLOCKCHAIN_APPLICATIONS_MOCK[3]);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('addApplicationByChainId should not dispatch an action while adding default application', () => {
    const { addApplicationByChainId } = result.current;

    act(() => {
      addApplicationByChainId(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('getApplicationByChainId should return an application if chainId exists', () => {
    const { getApplicationByChainId } = result.current;

    const updatedApplication = { ...BLOCKCHAIN_APPLICATIONS_MOCK[4], isPinned: false };

    expect(
      getApplicationByChainId(BLOCKCHAIN_APPLICATIONS_MOCK[4].chainID)
    ).toEqual(updatedApplication);
  });

  it('getApplicationByChainId should return undefined if chainId does not exist', () => {
    const { getApplicationByChainId } = result.current;

    expect(getApplicationByChainId('anUndefinedChainID')).toBeUndefined();
  });

  it('deleteApplicationByChainId should dispatch an action', () => {
    const { deleteApplicationByChainId } = result.current;

    const expectedAction = {
      type: actionTypes.deleteApplicationByChainId,
      chainId: BLOCKCHAIN_APPLICATIONS_MOCK[4].chainID,
    };

    store.clearActions();

    act(() => {
      deleteApplicationByChainId(BLOCKCHAIN_APPLICATIONS_MOCK[4].chainID);
    });

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('deleteApplicationByChainId should dispatch an action and set application to Lisk if current application is being deleted', async () => {
    const { deleteApplicationByChainId } = result.current;

    const expectedActions = [
      {
        type: actionTypes.deleteApplicationByChainId,
        chainId: mockCurrentApplication.chainID,
      }
    ];

    store.clearActions();

    act(() => {
      deleteApplicationByChainId(mockCurrentApplication.chainID);
    });

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockSetCurrentApplication).toHaveBeenCalledTimes(1);
  });
});
