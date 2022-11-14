import { useEffect, useContext, useCallback } from 'react';
import { getSdkError } from '@walletconnect/utils';

import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { ERROR_CASES, STATUS } from '../constants/lifeCycle';

const usePairings = () => {
  const { pairings, setPairings } = useContext(ConnectionContext);

  /**
   * Sets the pairing URI as an acknowledgement to the client.
   * Once the handshake is completed, the client will be able to
   * Request a pairing.
   *
   * @param {string} uri - The URI received from the web app.
   */
  const setUri = useCallback(async (uri) => {
    try {
      const data = await signClient.core.pairing.pair({ uri });

      return {
        status: STATUS.SUCCESS,
        data,
      };
    } catch (e) {
      return {
        status: STATUS.FAILURE,
        message: e.message,
      };
    }
  }, []);

  const removePairing = useCallback((topic) => {
    const newPairings = pairings.filter((pairing) => pairing.topic !== topic);
    // Also inform the bridge
    setPairings(newPairings);
  }, []);

  const addPairing = useCallback((pairing) => {
    setPairings([...pairings, pairing]);
  }, []);

  /**
   * Disconnect a given pairing. Removes the pairing from context and the bridge.
   *
   * @param {string} topic - The pairing topic (Connection ID) to disconnect.
   */
  const disconnect = useCallback(async (topic) => {
    removePairing(topic);
    try {
      await signClient.disconnect({
        topic,
        reason: getSdkError(ERROR_CASES.USER_DISCONNECTED),
      });
      return {
        status: STATUS.SUCCESS,
      };
    } catch (e) {
      return {
        status: STATUS.FAILURE,
        message: e.message,
      };
    }
  }, []);

  /**
   * Retrieves the active parings and refreshes the list.
   */
  const refreshPairings = useCallback(async () => {
    const activePairings = signClient.pairing.getAll({ active: true });
    setPairings([{ loaded: true }, ...activePairings]);
  }, []);

  useEffect(() => {
    if (signClient?.pairing?.getAll && pairings?.length === 0) {
      const activePairings = signClient.pairing.getAll({ active: true });
      setPairings([{ loaded: true }, ...activePairings]);
    }
  }, [signClient]);

  return {
    pairings,
    setUri,
    disconnect,
    addPairing,
    setPairings,
    removePairing,
    refreshPairings,
  };
};

export default usePairings;
