import { renderHook } from '@testing-library/react-hooks';

import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsStorage from './useApplicationsStorage';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';
import { useApplicationsManagement } from './useApplicationsManagement';

const dispatchApplicationsMock = jest.fn();
const addApplicationToStorage = jest.fn(() => Promise.resolve());
const deleteApplicationFromStorage = jest.fn(() => Promise.resolve());

const applicationsMock = {
  data: mockApplicationsFullData,
  isLoading: false,
  isError: false,
  error: undefined,
};

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  applications: applicationsMock,
  dispatchApplications: dispatchApplicationsMock,
}));

jest.spyOn(useApplicationsStorage, 'useApplicationsStorage').mockImplementation(() => ({
  addApplication: addApplicationToStorage,
  deleteApplication: deleteApplicationFromStorage,
}));

describe('useApplicationsManagement hook', () => {
  beforeEach(() => {
    dispatchApplicationsMock.mockClear();
    addApplicationToStorage.mockClear();
    deleteApplicationFromStorage.mockClear();
  });

  it('should be defined', () => {
    expect(useApplicationsManagement).toBeDefined();
  });

  it('returns applications properly', () => {
    const { result } = renderHook(() => useApplicationsManagement());

    expect(result.current.applications).toEqual(applicationsMock);
  });

  it('calls dispatchApplications on add action', async () => {
    const { result } = renderHook(() => useApplicationsManagement());

    await result.current.addApplication(mockApplicationsFullData[0]);

    expect(addApplicationToStorage).toBeCalledTimes(1);
    expect(dispatchApplicationsMock).toBeCalledTimes(1);
    expect(deleteApplicationFromStorage).toBeCalledTimes(0);
  });

  it('calls dispatchApplications on delete action', async () => {
    const { result } = renderHook(() => useApplicationsManagement());

    await result.current.deleteApplication(mockApplicationsFullData[0].chainID);

    expect(deleteApplicationFromStorage).toBeCalledTimes(1);
    expect(dispatchApplicationsMock).toBeCalledTimes(1);
    expect(addApplicationToStorage).toBeCalledTimes(0);
  });
});
