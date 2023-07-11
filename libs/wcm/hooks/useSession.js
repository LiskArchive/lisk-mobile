import { useContext, useEffect, useCallback, useMemo } from 'react';

import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { onApprove, onReject } from '../utils/sessionHandlers';
import usePairings from './usePairings';
import { EVENTS, STATUS } from '../constants/lifeCycle';

const formatJsonRpcResult = (id, result) => ({
  id,
  jsonrpc: '2.0',
  result,
});

const useSession = () => {
  const { events, removeEvent, session, setSession } = useContext(ConnectionContext);
  const { refreshPairings } = usePairings();

  const approve = useCallback(async (selectedAccounts) => {
    const proposalEvents = events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);

    try {
      await setSession({
        ...session,
        request: false,
        data: proposalEvents.meta,
      });
      const status = await onApprove(proposalEvents.meta, selectedAccounts);
      refreshPairings();
      removeEvent(proposalEvents);
      return {
        status,
        data: proposalEvents.meta,
      };
    } catch (e) {
      return {
        status: STATUS.FAILURE,
        message: e.message,
      };
    }
  }, []);

  const reject = useCallback(async () => {
    const proposalEvents = events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);

    try {
      await setSession({ ...session, request: false });
      await onReject(proposalEvents.meta);
      removeEvent(proposalEvents);
      return {
        status: STATUS.SUCCESS,
        data: proposalEvents.meta,
      };
    } catch (e) {
      return {
        status: STATUS.FAILURE,
        message: e.message,
      };
    }
  }, []);

  const respond = useCallback(async ({ payload }) => {
    const requestEvent = events.find((e) => e.name === EVENTS.SESSION_REQUEST);
    const topic = requestEvent.meta.topic;
    const response = formatJsonRpcResult(requestEvent.meta.id, payload);

    try {
      await setSession({ ...session, request: false });

      const data = await signClient.respond({
        topic,
        response,
      });

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
    respond,
    session,
    setSession,
  };
};

export default useSession;
