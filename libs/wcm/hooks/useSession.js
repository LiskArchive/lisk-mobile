import { useContext, useEffect, useCallback } from 'react';
import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { onApprove, onReject } from '../utils/sessionHandlers';
import usePairings from './usePairings';
import { EVENTS, PAIRING_PROPOSAL_STATUS } from '../constants/lifeCycle';

const useSession = () => {
  const { events, session, setSession } = useContext(ConnectionContext);
  const { refreshPairings } = usePairings();

  const approve = useCallback(async (selectedAccounts) => {
    let status = PAIRING_PROPOSAL_STATUS.FAILED;
    const proposalEvents = events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);
    if (proposalEvents) {
      setSession({
        ...session,
        request: false,
        data: proposalEvents.meta,
      });
      status = await onApprove(proposalEvents.meta, selectedAccounts);
      refreshPairings();
    }

    return status;
  }, []);

  const reject = useCallback(async () => {
    const proposalEvents = events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);
    if (proposalEvents) {
      setSession({ ...session, request: false });
      await onReject(proposalEvents.meta);
    }
  }, []);

  useEffect(() => {
    if (signClient?.session && !session.loaded) {
      const lastKeyIndex = signClient.session.keys.length - 1;
      const data =
        lastKeyIndex === 0 ? signClient.session.get(signClient.session.keys[lastKeyIndex]) : false;
      setSession({ ...session, loaded: true, data });
    }
  }, [signClient, session]);

  return {
    reject,
    approve,
    session,
    setSession,
  };
};

export default useSession;
