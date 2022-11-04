/* eslint-disable max-statements */
import { useState, useContext, useEffect, useCallback } from 'react';
import { formatJsonRpcResult } from '@json-rpc-tools/utils';

import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { onApprove, onReject } from '../utils/sessionHandlers';
import usePairings from './usePairings';
import { EVENTS, PAIRING_PROPOSAL_STATUS } from '../constants/lifeCycle';

const useSession = () => {
  const { events, session, setSession } = useContext(ConnectionContext);
  const { refreshPairings } = usePairings();

  const [isRespondLoading, setIsRespondLoading] = useState(false);
  const [isRespondSuccess, setIsRespondSuccess] = useState(false);
  const [errorOnRespond, setErrorOnResponse] = useState();

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

  const respond = useCallback(
    async ({ payload }) => {
      if (isRespondSuccess) {
        setIsRespondSuccess(false);
      }
      if (errorOnRespond) {
        setErrorOnResponse(undefined);
      }

      setIsRespondLoading(true);

      const requestEvent = events.find((e) => e.name === EVENTS.SESSION_REQUEST);
      const topic = requestEvent.meta.topic;

      const response = formatJsonRpcResult(requestEvent.meta.id, payload);

      try {
        await signClient.respond({
          topic,
          response,
        });

        setIsRespondLoading(false);

        setIsRespondSuccess(true);
      } catch (_error) {
        setErrorOnResponse(_error);

        setIsRespondLoading(false);
      }
    },
    [errorOnRespond, events]
  );

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
    isRespondLoading,
    isRespondSuccess,
    errorOnRespond,
  };
};

export default useSession;
