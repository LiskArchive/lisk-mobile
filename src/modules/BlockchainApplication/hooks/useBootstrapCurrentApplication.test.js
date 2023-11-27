import { renderHook } from '@testing-library/react-hooks';

import apiClient from 'utilities/api/APIClient';
import { act } from 'react-test-renderer';
import * as useApplications from '../context/ApplicationsContext';
import { useBootstrapCurrentApplication } from './useBootstrapCurrentApplication';
import * as useApplicationsQuery from '../api/useApplicationsQuery';
import * as useApplicationsMetaQuery from '../api/useApplicationsMetaQuery';
import { mockApplicationsMeta } from '../__fixtures__/mockApplicationsMeta';
import { mockApplications } from '../__fixtures__/mockApplications';
import { mockCurrentApplication } from '../__fixtures__/mockCurrentApplication';

const currentApplicationDataMock = mockCurrentApplication;
const setCurrentApplicationDataMock = jest.fn();
const setCurrentApplicationStatusMock = jest.fn();
const setCurrentApplicationErrorMock = jest.fn();
const refetchApplicationsMetaQueryMock = jest.fn();
const refetchApplicationsQueryMock = jest.fn();

jest.spyOn(apiClient, 'create').mockImplementation(() => Promise.resolve());
jest.spyOn(apiClient, 'rest').mockImplementation(() => Promise.resolve({ data: {} }));

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  currentApplication: {
    data: undefined,
    setData: setCurrentApplicationDataMock,
    setStatus: setCurrentApplicationStatusMock,
    setError: setCurrentApplicationErrorMock,
  },
}));

jest.spyOn(useApplicationsMetaQuery, 'useApplicationsMetaQuery').mockImplementation(() => ({
  data: { data: mockApplicationsMeta },
  status: 'success',
  refetch: refetchApplicationsMetaQueryMock,
  error: null,
}));

jest.spyOn(useApplicationsQuery, 'useApplicationsQuery').mockImplementation(() => ({
  data: { data: mockApplications },
  status: 'success',
  refetch: refetchApplicationsQueryMock,
  error: null,
}));

describe('useBootstrapCurrentApplication hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useBootstrapCurrentApplication).toBeDefined();
  });

  it('should bootstrap the current application', async () => {
    renderHook(() => useBootstrapCurrentApplication());

    expect(apiClient.create).toHaveBeenCalledWith({
      ...currentApplicationDataMock.serviceURLs[0],
      enableCertPinning: true,
    });
    expect(setCurrentApplicationDataMock).toHaveBeenCalledWith(currentApplicationDataMock);
    expect(setCurrentApplicationStatusMock).toHaveBeenCalledWith('success');
    expect(setCurrentApplicationErrorMock).not.toHaveBeenCalled();
  });

  it('should retry the bootstrap process', async () => {
    const { result } = renderHook(() => useBootstrapCurrentApplication());

    const retry = result.current;

    act(() => {
      retry();
    });

    expect(refetchApplicationsMetaQueryMock).toHaveBeenCalled();
    expect(refetchApplicationsQueryMock).toHaveBeenCalled();
  });
});
