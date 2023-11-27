import { renderHook } from '@testing-library/react-hooks';

import { useApplicationsManagement } from './useApplicationsManagement';
import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsLocalStorage from './useApplicationsLocalStorage';
import * as usePinApplications from './usePinApplications';

const dispatchApplicationsDataMock = jest.fn();
const addApplicationToStorageMock = jest.fn(() => Promise.resolve());
const deleteApplicationToStorageMock = jest.fn(() => Promise.resolve());
const applicationsSetIsLoadingMock = jest.fn();
const applicationsSetIsSuccessMock = jest.fn();
const applicationsSetErrorMock = jest.fn();

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  applications: {
    data: [{ chainID: '123' }],
    dispatchData: dispatchApplicationsDataMock,
    setIsLoading: applicationsSetIsLoadingMock,
    setIsSuccess: applicationsSetIsSuccessMock,
    setError: applicationsSetErrorMock,
  },
}));

jest.spyOn(usePinApplications, 'usePinApplications').mockImplementation(() => ({
  togglePin: jest.fn(),
  checkPin: jest.fn(),
}));

jest.spyOn(useApplicationsLocalStorage, 'useApplicationsLocalStorage').mockImplementation(() => ({
  data: [{ chainID: '456' }],
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
});
