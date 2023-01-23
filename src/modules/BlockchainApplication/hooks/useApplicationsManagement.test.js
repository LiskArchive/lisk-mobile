import { renderHook } from '@testing-library/react-hooks';

import { useApplicationsManagement } from './useApplicationsManagement';
import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsLocalStorage from './useApplicationsLocalStorage';
import * as useApplicationsFullDataQuery from '../api/useApplicationsFullDataQuery';

const dispatchApplicationsDataMock = jest.fn();
const addApplicationToStorageMock = jest.fn(() => Promise.resolve());
const deleteApplicationToStorageMock = jest.fn(() => Promise.resolve());
const applicationsSetStatusMock = jest.fn();
const applicationsSetErrorMock = jest.fn();

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  applications: {
    data: undefined,
    dispatchData: dispatchApplicationsDataMock,
    setStatus: applicationsSetStatusMock,
    setError: applicationsSetErrorMock,
  },
}));

jest.spyOn(useApplicationsFullDataQuery, 'useApplicationsFullDataQuery').mockImplementation(() => ({
  data: { data: [{ chainID: '123' }] },
  status: 'success',
  refetch: jest.fn(),
  error: null,
}));

jest.spyOn(useApplicationsLocalStorage, 'useApplicationsLocalStorage').mockImplementation(() => ({
  data: { data: [{ chainID: '456' }] },
  addApplication: addApplicationToStorageMock,
  deleteApplication: deleteApplicationToStorageMock,
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

    expect(applicationsSetStatusMock).toHaveBeenCalledWith('success');
    expect(applicationsSetErrorMock).toHaveBeenCalledWith(null);
  });
});
