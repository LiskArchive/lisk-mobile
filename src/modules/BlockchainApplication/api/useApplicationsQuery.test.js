import { renderHook } from '@testing-library/react-hooks';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

import { mockApplications } from '../__fixtures__';

import { useApplicationsQuery } from './useApplicationsQuery';

jest.useRealTimers();

describe('useApplicationsQuery hook', () => {
  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('should fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useApplicationsQuery(), { wrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockApplications,
      meta: {
        count: mockApplications.length,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
