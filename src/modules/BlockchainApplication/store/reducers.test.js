import { BLOCKCHAIN_APPLICATIONS_MOCK, MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import actionTypes from './actionTypes';
import { pinsReducer, applicationsReducer, currentReducer } from './reducers';

describe('BlockchainApplication reducers', () => {
  describe('pinsReducer', () => {
    it('Should return list of chainIds', async () => {
      const actionData = {
        type: actionTypes.toggleApplicationPin,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID,
      };

      expect(pinsReducer([], actionData)).toContain(actionData.chainId);
    });

    it('Should return list of chainIds without the removed one', () => {
      const actionData = {
        type: actionTypes.toggleApplicationPin,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID,
      };

      expect(pinsReducer([BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID], actionData)).not.toContain(
        actionData.data
      );
    });
  });

  describe('applicationsReducer', () => {
    it('Should return list of applicationsReducer with newly added application', () => {
      const newApplication = {
        name: 'New app',
        chainID: 'aq02qkbb35u4jdq2szo6ytre',
        state: 'active',
        serviceURLs: ['https://service.newapp.com'],
        lastUpdated: 789456123,
      };
      const actionData = {
        type: actionTypes.addApplication,
        application: newApplication,
      };
      const changedState = applicationsReducer(MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK, actionData);

      expect(changedState).toHaveProperty(newApplication.chainID, newApplication);
    });

    it('Should return list of applicationsReducer without the removed one', () => {
      const actionData = {
        type: actionTypes.deleteApplicationByChainId,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[1].chainID,
      };
      const changedState = applicationsReducer(MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK, actionData);

      expect(changedState).not.toHaveProperty(actionData.chainId);
    });
  });

  describe('currentReducer', () => {
    it('Should return currentReducer application if setCurrentApplication action type is triggered', () => {
      const actionData = {
        type: actionTypes.setCurrentApplication,
        application: BLOCKCHAIN_APPLICATIONS_MOCK[0],
      };
      expect(currentReducer({}, actionData)).toEqual(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
    });
  });
});
