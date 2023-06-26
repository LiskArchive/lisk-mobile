import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ApplicationsProvider, useApplications } from '../context/ApplicationsContext';
import { useApplicationsFullDataQuery } from '../api/useApplicationsFullDataQuery';
import { useApplicationsLocalStorage } from './useApplicationsLocalStorage';

import { useBootstrapApplications } from './useBootstrapApplications';

jest.mock('../api/useApplicationsFullDataQuery');
jest.mock('./useApplicationsLocalStorage');

let setIsLoadingMock;
let setIsSuccessMock;
let setErrorMock;
let dispatchDataMock;

const createWrapper =
  () =>
  ({ children }) => {
    setIsLoadingMock = jest.fn();
    setIsSuccessMock = jest.fn();
    setErrorMock = jest.fn();
    dispatchDataMock = jest.fn();

    return (
      <ApplicationsProvider
        value={{
          applications: {
            data: null,
            isLoading: false,
            isSuccess: false,
            error: null,
            dispatchData: dispatchDataMock,
            setIsLoading: setIsLoadingMock,
            setIsSuccess: setIsSuccessMock,
            setError: setErrorMock,
          },
        }}
      >
        {children}
      </ApplicationsProvider>
    );
  };

describe('useBootstrapApplications', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should init applications with merged data when both API calls are successful', () => {
    const defaultApps = [{ chainID: 1 }, { chainID: 2 }];
    const storageApps = [{ chainID: 3 }, { chainID: 4 }];
    const expectedMergedApps = [{ chainID: 1 }, { chainID: 2 }, { chainID: 3 }, { chainID: 4 }];

    useApplicationsFullDataQuery.mockReturnValue({
      data: { data: defaultApps },
      isSuccess: true,
    });

    useApplicationsLocalStorage.mockReturnValue({
      data: storageApps,
      isSuccess: true,
    });

    const { result } = renderHook(
      () => {
        useBootstrapApplications();
        return useApplications();
      },
      { wrapper: createWrapper() }
    );

    expect(result.current.applications.data).toEqual(expectedMergedApps);
  });

  it('should set isLoading when any of the API calls is loading', () => {
    useApplicationsFullDataQuery.mockReturnValue({
      isLoading: true,
    });

    useApplicationsLocalStorage.mockReturnValue({
      isLoading: false,
    });

    const { result } = renderHook(
      () => {
        useBootstrapApplications();
        return useApplications();
      },
      { wrapper: createWrapper() }
    );

    expect(result.current.applications.isLoading).toBe(true);
  });

  it('should set isSuccess when both API calls are successful', () => {
    useApplicationsFullDataQuery.mockReturnValue({
      isSuccess: true,
    });

    useApplicationsLocalStorage.mockReturnValue({
      isSuccess: true,
    });

    const { result } = renderHook(
      () => {
        useBootstrapApplications();
        return useApplications();
      },
      { wrapper: createWrapper() }
    );

    expect(result.current.applications.isSuccess).toBe(true);
  });

  it('should set error when any of the API calls returns an error', () => {
    const error = new Error('Error');

    useApplicationsFullDataQuery.mockReturnValue({
      error,
    });

    const { result } = renderHook(
      () => {
        useBootstrapApplications();
        return useApplications();
      },
      { wrapper: createWrapper() }
    );

    expect(result.current.applications.error).toEqual(error);
  });
});
