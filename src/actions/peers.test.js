import Lisk from '@liskhq/lisk-client';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  activePeerSet,
  activePeerUpdated,
} from './peers';
import actionTypes from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action: Accounts', () => {
  it('should activePeerUpdated return a redux action', () => {
    const expectedValue = {
      data: 'data',
      type: actionTypes.activePeerUpdated,
    };
    expect(activePeerUpdated('data')).toEqual(expectedValue);
  });
  it('should activePeerSet set up a testnet as an active peer', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        data: new Lisk.APIClient(
          Lisk.APIClient.constants.TESTNET_NODES,
          { nethash: Lisk.APIClient.constants.TESTNET_NETHASH },
        ),
        type: actionTypes.activePeerSet,
      },
    ];
    store.dispatch(activePeerSet({ network: 'testnet' }));
    expect(store.getActions()[0].data.nodes).toEqual(expectedActions[0].data.nodes);
  });

  it('should activePeerSet set up a mainnet as an active peer by default', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        data: new Lisk.APIClient(
          Lisk.APIClient.constants.MAINNET_NODES,
          { nethash: Lisk.APIClient.constants.MAINNET_NETHASH },
        ),
        type: actionTypes.activePeerSet,
      },
    ];
    store.dispatch(activePeerSet());
    expect(store.getActions()[0].data.nodes).toEqual(expectedActions[0].data.nodes);
  });
  it.skip('should it set up a custom network as an active peer', async () => {
    const store = mockStore({});
    const expectedNodes = 'serverAddress';
    const expectedActions = [
      {
        data: new Lisk.APIClient(
          Lisk.APIClient.constants.MAINNET_NODES,
          { nethash: Lisk.APIClient.constants.MAINNET_NETHASH },
        ),
        type: actionTypes.activePeerSet,
      },
    ];

    await moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 200,
        response: { data: { nethash: 'nethash' } },
      });
    });
    await store.dispatch(activePeerSet({
      network: 'customNode', address: expectedNodes,
    }));
    expect(store.getActions()).toEqual(expectedNodes);
  });
});
