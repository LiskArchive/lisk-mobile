import { BLOCKCHAIN_APPLICATIONS_MOCK, MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import { selectPinnedApplications, selectApplications, selectCurrentApplication } from './selectors';

describe('Application Explorer selector', () => {
  it('Should return list of pinned applications if action type is triggered', async () => {
    const pins = BLOCKCHAIN_APPLICATIONS_MOCK.map(({ chainID }) => chainID);

    const state = {
      blockchainApplications: { pins }
    };

    expect(selectPinnedApplications(state)).toEqual(pins);
  });

  it('Should return list of all applications if action type is triggered', async () => {
    const state = { blockchainApplications: { applications: MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } };

    expect(selectApplications(state)).toEqual(MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK);
  });

  it('Should return current application if setCurrentApplication action type is tiggered', async () => {
    const state = { blockchainApplications: { current: BLOCKCHAIN_APPLICATIONS_MOCK[0] } };

    expect(selectCurrentApplication(state)).toEqual(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
  });
});
