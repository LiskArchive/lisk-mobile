import { renderHook } from '@testing-library/react-hooks';
import { useApplicationsManagement } from './useApplicationsManagement';
import * as useApplications from '../context/ApplicationsContext';
import * as useApplicationsLocalStorage from './useApplicationsLocalStorage';
import * as useApplicationsFullDataQuery from '../api/useApplicationsFullDataQuery';

import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';

const dispatchApplicationsDataMock = jest.fn();
const addApplicationToStorageMock = jest.fn(() => Promise.resolve());
const deleteApplicationToStorageMock = jest.fn(() => Promise.resolve());
const applicationsDataMock = mockApplicationsFullData;
const applicationsSetStatusMock = jest.fn();
const applicationsSetErrorMock = jest.fn();

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  applications: {
    data: applicationsDataMock,
    dispatchData: dispatchApplicationsDataMock,
    setStatus: applicationsSetStatusMock,
    setError: applicationsSetErrorMock,
  },
}));

jest.spyOn(useApplicationsLocalStorage, 'useApplicationsLocalStorage').mockImplementation(() => ({
  data: [],
  addApplication: addApplicationToStorageMock,
  deleteApplication: deleteApplicationToStorageMock,
}));

jest.spyOn(useApplicationsFullDataQuery, 'useApplicationsFullDataQuery').mockImplementation(() => ({
  data: applicationsDataMock,
  status: 'success',
  refetch: jest.fn(),
  error: null,
}));

describe('useApplicationsManagement hook', () => {
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

  it('should set the status and error based on the data from the API', () => {
    renderHook(() => useApplicationsManagement());

    expect(applicationsSetStatusMock).toHaveBeenCalledWith('success');
    expect(applicationsSetErrorMock).toHaveBeenCalledWith(null);
  });
});
