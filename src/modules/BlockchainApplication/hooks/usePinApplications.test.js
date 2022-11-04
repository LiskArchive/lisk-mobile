import { renderHook } from '@testing-library/react-hooks';

import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsStorage from './useApplicationsStorage';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';
import { usePinApplications } from './usePinApplications';

const dispatchPinsMock = jest.fn();
const addPinToStorage = jest.fn(() => Promise.resolve());
const deletePinFromStorage = jest.fn(() => Promise.resolve());

const pinsMock = {
  data: mockApplicationsFullData.map((app) => app.chainID),
  isLoading: false,
  isError: false,
  error: undefined,
};

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  pins: pinsMock,
  dispatchPins: dispatchPinsMock,
}));

jest.spyOn(useApplicationsStorage, 'useApplicationsStorage').mockImplementation(() => ({
  addApplication: addPinToStorage,
  deleteApplication: deletePinFromStorage,
}));

describe('usePinApplications hook', () => {
  beforeEach(() => {
    dispatchPinsMock.mockClear();
    addPinToStorage.mockClear();
    deletePinFromStorage.mockClear();
  });

  it('should be defined', () => {
    expect(usePinApplications).toBeDefined();
  });

  it('returns pins properly', () => {
    const { result } = renderHook(() => usePinApplications());

    expect(result.current.pins).toEqual(pinsMock);
  });

  it('calls dispatchPins on toggle pin', async () => {
    const { result } = renderHook(() => usePinApplications());

    await result.current.togglePin(mockApplicationsFullData[0].chainID);

    expect(dispatchPinsMock).toBeCalledTimes(1);
  });

  it('calls addPinToStorage on toggle not-existing pin', async () => {
    const { result } = renderHook(() => usePinApplications());

    await result.current.togglePin('nonExistingPinChainID');

    expect(addPinToStorage).toBeCalledTimes(1);
    expect(deletePinFromStorage).toBeCalledTimes(0);
  });

  it('calls deletePinFromStorage on toggle already-existing pin', async () => {
    const { result } = renderHook(() => usePinApplications());

    await result.current.togglePin(mockApplicationsFullData[0].chainID);

    expect(deletePinFromStorage).toBeCalledTimes(1);
    expect(addPinToStorage).toBeCalledTimes(0);
  });

  it('checkPin returns true for already-existing pin', async () => {
    const { result } = renderHook(() => usePinApplications());

    expect(result.current.checkPin(mockApplicationsFullData[0].chainID)).toBeTruthy();
    expect(result.current.checkPin('nonExistingPinChainID')).toBeFalsy();
  });
});
