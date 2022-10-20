import { useEffect, useContext, useCallback } from 'react';
import { getSdkError } from '@walletconnect/utils';

import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { ERROR_CASES } from '../constants/lifeCycle';

const usePairings = () => {
  const { pairings, setPairings } = useContext(ConnectionContext);

  /**
   * Sets the pairing URI as an aknowledgement to the signClient.
   * Once the handshake is completed, the signClient will be able to
   * Request a pairing.
   *
   * @param {string} uri - The URI received from the web app.
   */
  const setUri = useCallback(async (uri) => {
    console.log({ signClient });

    if (signClient?.pair && uri) {
      await signClient.pair({ uri });
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
    await signClient.disconnect({ topic, reason: getSdkError(ERROR_CASES.USER_DISCONNECTED) });
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
