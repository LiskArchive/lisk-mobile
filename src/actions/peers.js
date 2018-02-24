import Lisk from 'lisk-js';
import actionTypes from '../constants/actions';
import { getMainNetNode, getNetHash } from '../utilities/networks';

const peerSet = (data, config) => ({
  data: Object.assign({
    passphrase: data.passphrase,
    publicKey: data.publicKey,
    activePeer: Lisk.api(config),
    noSavedAccounts: data.noSavedAccounts,
  }),
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
export const activePeerSet = data => ({
  data,
  type: actionTypes.activePeerSet,
});


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
