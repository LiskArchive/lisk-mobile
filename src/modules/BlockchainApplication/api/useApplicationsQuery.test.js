import { renderHook } from '@testing-library/react-hooks';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

import { mockApplications } from '../__fixtures__';

import { useApplicationsQuery } from './useApplicationsQuery';

// TODO: Un-skip this test when SDK have the fix.
describe.skip('useApplicationsQuery hook', () => {
  it('should fetch data correctly', async () => {
    const wrapper = ({ children }) => applicationsWrapper({ children });

    const { result, waitFor } = renderHook(() => useApplicationsQuery(), { wrapper });

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockApplications,
      meta: {
        count: 20,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
