import Lisk from 'lisk-elements';
import actionTypes from '../constants/actions';

const network = 'customNode';
const serverAddress = 'http://localhost:4000';

const peerSet = config => ({
  data: new Lisk.APIClient(config.nodes, { nethash: config.nethash }),
  type: actionTypes.activePeerSet,
});

/**
 * Returns required action object to set
 * the given peer data as active peer
 * This should be called once in login page
 *
 * @param {Object} data - Active peer data and the passphrase of account
 * @returns {Object} Action object
 */
export const activePeerSet = data =>
  (dispatch) => {
    const config = { nethash: 'net' };

    if (network === 'customNode') {
      config.nodes = [serverAddress];
      const liskAPIClient = new Lisk.APIClient(config.nodes, { nethash: config.nethash });
      // loadingStarted('getConstants');
      liskAPIClient.node.getConstants().then((response) => {
        // loadingFinished('getConstants');
        config.nethash = response.data.nethash;
        dispatch(peerSet(config));
      }).catch(() => {
        // loadingFinished('getConstants');
        // dispatch(errorToastDisplayed({ label: i18next.t('Unable to connect to the node') }));
      });
    } else if (network === 'testnet') {
      config.nodes = Lisk.APIClient.constants.TESTNET_NODES;
      config.nethash = Lisk.APIClient.constants.TESTNET_NETHASH;
      dispatch(peerSet(data, config));
    } else if (network === 'mainnet') {
      config.nodes = Lisk.APIClient.constants.MAINNET_NODES;
      config.nethash = Lisk.APIClient.constants.MAINNET_NETHASH;
      dispatch(peerSet(data, config));
    }
  };

/**
 * Returns required action object to partially
 * update the active peer
 *
 * @param {Object} data - Active peer data
 * @returns {Object} Action object
 */
export const activePeerUpdated = data => ({
  data,
  type: actionTypes.activePeerUpdated,
});
