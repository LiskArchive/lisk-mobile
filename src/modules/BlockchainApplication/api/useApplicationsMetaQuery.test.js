import { renderHook } from '@testing-library/react-hooks';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

import { mockApplicationsMeta } from '../__fixtures__';

import { useApplicationsMetaQuery } from './useApplicationsMetaQuery';

describe('useApplicationsMetaQuery hook', () => {
  it('should fetch data correctly', async () => {
    const wrapper = ({ children }) => applicationsWrapper({ children });

    const { result, waitFor } = renderHook(() => useApplicationsMetaQuery(), { wrapper });

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockApplicationsMeta,
      meta: {
        count: mockApplicationsMeta.length,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
