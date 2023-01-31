import { renderHook } from '@testing-library/react-hooks';

import { useApplicationsExplorer } from './useApplicationsExplorer';
import * as useApplicationsFullDataQuery from '../api/useApplicationsFullDataQuery';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';

jest.spyOn(useApplicationsFullDataQuery, 'useApplicationsFullDataQuery').mockImplementation(() => ({
  data: { data: mockApplicationsFullData },
  status: 'success',
  error: null,
}));

describe('useApplicationsExplorer hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useApplicationsExplorer).toBeDefined();
  });

  it('should return the data, status, error and refetch function', () => {
    const { result } = renderHook(() => useApplicationsExplorer());

    expect(result.current.data).toEqual(mockApplicationsFullData);
    expect(result.current.status).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('should call useApplicationsFullDataQuery on mount', () => {
    renderHook(() => useApplicationsExplorer());

    expect(useApplicationsFullDataQuery.useApplicationsFullDataQuery).toHaveBeenCalled();
  });
});
