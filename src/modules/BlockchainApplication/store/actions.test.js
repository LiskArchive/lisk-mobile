import { mockApplicationsMeta } from '../__fixtures__';
import actionTypes from './actionTypes';
import {
  toggleApplicationPin,
  addApplication,
  deleteApplicationByChainId,
  setCurrentApplication,
} from './actions';

const chainId = mockApplicationsMeta[0].chainID;
const sampleBlockchainApplication = mockApplicationsMeta[0];

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
      application: mockApplicationsMeta[0],
    };

    expect(setCurrentApplication(mockApplicationsMeta[0])).toEqual(expectedAction);
  });
});
