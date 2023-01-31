import { renderHook } from '@testing-library/react-hooks';

import * as useApplications from '../context/ApplicationsContext';
import { mockApplicationsFullData } from '../__fixtures__/mockApplicationsFullData';
import { useCurrentApplication } from './useCurrentApplication';

const currentApplicationDataMock = mockApplicationsFullData[0];
const setCurrentApplicationDataMock = jest.fn();
const currentApplicationMock = {
  data: currentApplicationDataMock,
  setData: setCurrentApplicationDataMock,
};

jest.spyOn(useApplications, 'useApplications').mockImplementation(() => ({
  currentApplication: currentApplicationMock,
}));

describe('useCurrentApplication hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCurrentApplication).toBeDefined();
  });

  it('should return the current application data and setData function', () => {
    const { result } = renderHook(() => useCurrentApplication());

    expect(result.current[0]).toEqual(currentApplicationMock);
    expect(result.current[1]).toEqual(setCurrentApplicationDataMock);
  });
});
