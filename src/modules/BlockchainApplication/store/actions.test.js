import { mockApplications } from '../__fixtures__';
import actionTypes from './actionTypes';
import {
  toggleApplicationPin,
  addApplication,
  deleteApplicationByChainId,
  setCurrentApplication,
} from './actions';

const chainId = mockApplications[0].chainID;
const sampleBlockchainApplication = mockApplications[0];

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
      type: actionTypes.addApplication,
      application: sampleBlockchainApplication,
    };

    expect(addApplication(sampleBlockchainApplication)).toEqual(expectedAction);
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
      application: mockApplications[0],
    };

    expect(setCurrentApplication(mockApplications[0])).toEqual(expectedAction);
  });
});
