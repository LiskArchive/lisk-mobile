import { renderHook } from '@testing-library/react-hooks';

import { useApplicationsManagement } from './useApplicationsManagement';
import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsLocalStorage from './useApplicationsLocalStorage';
import * as useApplicationsFullDataQuery from '../api/useApplicationsFullDataQuery';

const dispatchApplicationsDataMock = jest.fn();
const addApplicationToStorageMock = jest.fn(() => Promise.resolve());
const deleteApplicationToStorageMock = jest.fn(() => Promise.resolve());
const applicationsSetIsLoadingMock = jest.fn();
const applicationsSetIsSuccessMock = jest.fn();
const applicationsSetErrorMock = jest.fn();

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  applications: {
    data: undefined,
    dispatchData: dispatchApplicationsDataMock,
    setIsLoading: applicationsSetIsLoadingMock,
    setIsSuccess: applicationsSetIsSuccessMock,
    setError: applicationsSetErrorMock,
  },
}));

jest.spyOn(useApplicationsFullDataQuery, 'useApplicationsFullDataQuery').mockImplementation(() => ({
  data: { data: [{ chainID: '123' }] },
  isLoading: false,
  isSuccess: true,
  refetch: jest.fn(),
  error: null,
}));

jest.spyOn(useApplicationsLocalStorage, 'useApplicationsLocalStorage').mockImplementation(() => ({
  data: { data: [{ chainID: '456' }] },
  isLoading: false,
  isSuccess: true,
  addApplication: addApplicationToStorageMock,
  deleteApplication: deleteApplicationToStorageMock,
  error: null,
}));

describe('useApplicationsManagement hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add an application to storage and update the data in context', async () => {
    const { result } = renderHook(() => useApplicationsManagement());

    const application = { chainID: '123' };

    await result.current.addApplication(application);

    expect(dispatchApplicationsDataMock).toHaveBeenCalledWith({
      type: 'add',
      application,
    });
    expect(addApplicationToStorageMock).toHaveBeenCalledWith(application.chainID);
  });

  it('should delete an application from storage and update the data in context', async () => {
    const { result } = renderHook(() => useApplicationsManagement());

    const chainID = '123';

    await result.current.deleteApplication(chainID);

    expect(dispatchApplicationsDataMock).toHaveBeenCalledWith({
      type: 'delete',
      chainID,
    });
    expect(deleteApplicationToStorageMock).toHaveBeenCalledWith(chainID);
  });

  it('should initialize the applications context data', async () => {
    renderHook(() => useApplicationsManagement());

    expect(dispatchApplicationsDataMock).toHaveBeenCalledWith({
      type: 'init',
      applications: [{ chainID: '123' }, { chainID: '456' }],
    });
  });

  it('should set the status and error based on the data from the API', () => {
    renderHook(() => useApplicationsManagement());

    expect(applicationsSetIsLoadingMock).toHaveBeenCalledWith(false);
    expect(applicationsSetIsSuccessMock).toHaveBeenCalledWith(true);
    expect(applicationsSetErrorMock).toHaveBeenCalledWith(null);
  });
});
