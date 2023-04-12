import { renderHook } from '@testing-library/react-hooks';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';
import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';
import { APPLICATION_STATUSES } from '../constants';
import { transformApplicationsMetaQueryResult } from '../utils';
import { useApplicationsExplorer } from './useApplicationsExplorer';

jest.mock('../api/useApplicationsMetaQuery');

const wrapper = ({ children }) => applicationsWrapper({ children });

describe('useApplicationsExplorer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all applications in explore mode', () => {
    const mockData = { data: [{ chainID: 1 }, { chainID: 2 }] };
    useApplicationsMetaQuery.mockReturnValue({ data: mockData });

    const { result } = renderHook(() => useApplicationsExplorer('explore'), { wrapper });

    expect(result.current.data).toEqual(mockData.data);
  });

  it('should return only registered applications in manage mode', () => {
    const mockData = {
      data: [
        { chainID: 1, status: APPLICATION_STATUSES.registered },
        { chainID: 2, status: APPLICATION_STATUSES.unregistered },
      ],
    };
    useApplicationsMetaQuery.mockReturnValue({ data: mockData });

    const { result } = renderHook(() => useApplicationsExplorer('manage'), { wrapper });

    expect(result.current.data).toEqual([mockData.data[0]]);
  });

  it('should call useApplicationsMetaQuery with transformResult in explore mode', () => {
    renderHook(() => useApplicationsExplorer('explore'), { wrapper });

    expect(useApplicationsMetaQuery).toHaveBeenCalledWith({
      config: { transformResult: transformApplicationsMetaQueryResult },
    });
  });

  it('should call useApplicationsMetaQuery without transformResult in manage mode', () => {
    renderHook(() => useApplicationsExplorer('manage'), { wrapper });

    expect(useApplicationsMetaQuery).toHaveBeenCalledWith({ config: {} });
  });
});
