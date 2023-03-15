import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { ApplicationsProvider } from '../context/ApplicationsContext';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';
import { useCurrentApplication } from './useCurrentApplication';

describe('useCurrentApplication hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCurrentApplication).toBeDefined();
  });

  it('should return the current application and handleSetData function', () => {
    const wrapper = ({ children }) => <ApplicationsProvider>{children}</ApplicationsProvider>;

    const { result } = renderHook(() => useCurrentApplication(), { wrapper });

    expect(result.current).toEqual([expect.any(Object), expect.any(Function)]);
  });

  it('should set the data for the current application', () => {
    const wrapper = ({ children }) => <ApplicationsProvider>{children}</ApplicationsProvider>;

    const { result } = renderHook(() => useCurrentApplication(), { wrapper });

    act(() => {
      result.current[1](mockApplicationsFullData[1]);
    });

    expect(result.current[0].data).toEqual(mockApplicationsFullData[1]);
  });
});
