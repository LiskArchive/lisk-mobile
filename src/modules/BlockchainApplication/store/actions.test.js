import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import actionTypes from './actionTypes';
import {
  toggleApplicationPin,
  addApplicationByChainId,
  deleteApplicationByChainId,
  setCurrentApplication,
} from './actions';

const chainId = BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID;
const sampleBlockchainApplication = BLOCKCHAIN_APPLICATIONS_MOCK[0];

describe('actions:  blockchainApplication', () => {
  it('should create an action to toggle blockchain application', () => {
    const expectedAction = {
      type: actionTypes.toggleApplicationPin,
      chainId,
    };

    expect(toggleApplicationPin(chainId)).toEqual(expectedAction);
  });

  it('should create an action to add blockchain application', () => {
    const expectedAction = {
      type: actionTypes.addApplicationByChainId,
      application: sampleBlockchainApplication,
    };

    expect(addApplicationByChainId(sampleBlockchainApplication)).toEqual(expectedAction);
  });

  it('should create an action to delete blockchain application', () => {
    const expectedAction = {
      type: actionTypes.deleteApplicationByChainId,
      chainId,
    };

    expect(deleteApplicationByChainId(chainId)).toEqual(expectedAction);
  });

  it('should create an action to set current application', () => {
    const expectedAction = {
      type: actionTypes.setCurrentApplication,
      application: BLOCKCHAIN_APPLICATIONS_MOCK[0],
    };

    expect(setCurrentApplication(BLOCKCHAIN_APPLICATIONS_MOCK[0])).toEqual(expectedAction);
  });
});
