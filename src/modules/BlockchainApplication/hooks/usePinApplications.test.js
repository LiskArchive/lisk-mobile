import { renderHook } from '@testing-library/react-hooks';

import * as useApplications from '../context/ApplicationsContext';
import * as usePinApplicationsLocalStorage from './usePinApplicationsLocalStorage';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';
import { usePinApplications } from './usePinApplications';

const dispatchPinsDataMock = jest.fn();
const getPinsMock = jest.fn(() => Promise.resolve(['123']));
const addPinToStorage = jest.fn(() => Promise.resolve());
const deletePinFromStorage = jest.fn(() => Promise.resolve());
const pinsSetStatusMock = jest.fn();
const pinsSetErrorMock = jest.fn();

const pinsMock = mockApplicationsFullData.map((app) => app.chainID);

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  pins: {
    data: pinsMock,
    dispatchData: dispatchPinsDataMock,
    setStatus: pinsSetStatusMock,
    setError: pinsSetErrorMock,
  },
}));

jest
  .spyOn(usePinApplicationsLocalStorage, 'usePinApplicationsLocalStorage')
  .mockImplementation(() => ({
    getPins: getPinsMock,
    addPin: addPinToStorage,
    deletePin: deletePinFromStorage,
    status: 'success',
    error: null,
  }));

describe('usePinApplications hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usePinApplications).toBeDefined();
  });

  it('returns pins properly', () => {
    const { result } = renderHook(() => usePinApplications());

    expect(result.current.pins.data).toEqual(pinsMock);
  });

  it('should check if a pin exists by chain ID', () => {
    const { result } = renderHook(() => usePinApplications());

    expect(result.current.checkPin(pinsMock[0])).toBe(true);
    expect(result.current.checkPin('nonExistingPinChainID')).toBe(false);
  });

  it('should add a pin to storage and update the data in context', async () => {
    const { result } = renderHook(() => usePinApplications());
    const chainID = 'nonExistingPinChainID';

    await result.current.togglePin(chainID);

    expect(addPinToStorage).toHaveBeenCalledWith(chainID);
    expect(result.current.pins.dispatchData).toHaveBeenCalledWith({ type: 'add', chainID });
  });

  it('should delete a pin from storage and update the data in context', async () => {
    const { result } = renderHook(() => usePinApplications());
    const chainID = pinsMock[0];

    await result.current.togglePin(chainID);

    expect(deletePinFromStorage).toHaveBeenCalledWith(chainID);
    expect(result.current.pins.dispatchData).toHaveBeenCalledWith({ type: 'delete', chainID });
  });

  it('should set the status and error based on the data from local storage', () => {
    const { result } = renderHook(() => usePinApplications());

    expect(result.current.pins.setStatus).toHaveBeenCalledWith('success');
    expect(result.current.pins.setError).toHaveBeenCalledWith(null);
  });

  it('should initialize the pins data from local storage', async () => {
    jest.clearAllMocks();

    const spy = jest.spyOn(useApplications, 'useApplications');

    spy.mockImplementation(() => ({
      pins: {
        data: undefined,
        dispatchData: dispatchPinsDataMock,
        setStatus: pinsSetStatusMock,
        setError: pinsSetErrorMock,
      },
    }));

    renderHook(() => usePinApplications());

    await expect(getPinsMock).toHaveBeenCalled();

    expect(dispatchPinsDataMock).toHaveBeenCalledWith({ type: 'init', pins: ['123'] });

    spy.mockRestore();
  });
});
