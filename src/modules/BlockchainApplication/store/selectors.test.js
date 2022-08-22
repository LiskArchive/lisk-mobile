import { mockApplications, mockMappedApplications } from '../__fixtures__';
import {
  selectPinnedApplications,
  selectApplications,
  selectCurrentApplication,
} from './selectors';

describe('Application Explorer selector', () => {
  it('Should return list of pinned applications if action type is triggered', async () => {
    const pins = mockApplications.map(({ chainID }) => chainID);

    const state = {
      blockchainApplications: { pins },
    };

    expect(selectPinnedApplications(state)).toEqual(pins);
  });

  it('Should return list of all applications if action type is triggered', async () => {
    const state = { blockchainApplications: { applications: mockMappedApplications } };

    expect(selectApplications(state)).toEqual(mockMappedApplications);
  });

  it('Should return current application if setCurrentApplication action type is tiggered', async () => {
    const state = { blockchainApplications: { current: mockApplications[0] } };

    expect(selectCurrentApplication(state)).toEqual(mockApplications[0]);
  });
});
