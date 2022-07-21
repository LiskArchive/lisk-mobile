import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks'
import actionTypes from '../store/actionTypes'
import { usePinBlockchainApplication } from './usePinBlockchainApplication'

const mockStore = configureMockStore()
const mockDispatch = jest.fn()
const mockState = {
  blockchainApplications: {
    pins: BLOCKCHAIN_APPLICATIONS_MOCK.map(({ chainID }) => chainID),
  },
}

const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}))

describe('usePinBlockchainApplication hook', () => {
  const store = mockStore(mockState)

  const wrapper = ({ children }) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>

  beforeEach(() => {
    mockDispatch.mockClear()
  })

  const { result } = renderHook(() => usePinBlockchainApplication(), { wrapper })

  it('togglePin should not be triggered on mounting', async () => {
    expect(store.getActions()).toEqual([])
  })

  it('togglePin should dispatch an action', async () => {
    const { togglePin } = result.current

    const chainId = BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID

    const expectedAction = {
      type: actionTypes.toggleApplicationPin,
      chainId,
    }

    act(() => {
      togglePin(chainId)
    })

    expect(store.getActions()).toEqual([expectedAction])
  })

  it('should return pins as an array', async () => {
    const { pins, togglePin } = result.current
    const chainId = BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID

    act(() => {
      togglePin(chainId)
    })

    const expectPins = BLOCKCHAIN_APPLICATIONS_MOCK.map(({ chainID }) => chainID)

    expect(pins).toEqual(expect.arrayContaining(expectPins))
  })

  it('should flag chain as a pinned application', async () => {
    const { checkPinByChainId, togglePin } = result.current
    const chainId = BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID

    act(() => {
      togglePin(chainId)
    })
    expect(checkPinByChainId(chainId)).toBeTruthy()
  })

  it('should not flag chain as a pinned application', async () => {
    mockState.blockchainApplications.pins = []

    const {
      result: {
        current: { checkPinByChainId },
      },
    } = renderHook(() => usePinBlockchainApplication(), { wrapper })

    const chainId = BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID

    expect(checkPinByChainId(chainId)).not.toBeTruthy()
  })
})
