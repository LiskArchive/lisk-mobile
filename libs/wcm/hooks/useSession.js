/* eslint-disable max-statements */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useCallback, useState } from 'react';
import { getSdkError } from '@walletconnect/utils';

import { formatJsonRpcError, formatJsonRpcResult } from '../utils/jsonRPCFormat';
import ConnectionContext from '../context/connectionContext';
import { onApprove, onReject } from '../utils/sessionHandlers';
import { EVENTS, STATUS, ERROR_CASES } from '../constants/lifeCycle';
import { useEvents } from './useEvents';

export const useSession = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    events,
    sessions,
    sessionRequest,
    sessionProposal,
    setSessions,
    setSessionProposal,
    setSessionRequest,
    signClient,
    isLoadingSignClient,
    errorSignClient,
  } = useContext(ConnectionContext);
  const { removeEvent } = useEvents();

  const loadSessions = async () => {
    setIsLoading(true);
    const loadedSessions = [];

    await Promise.all(
      signClient.session.keys.map(async (key, index) => {
        loadedSessions[index] = signClient.session.get(key);
      })
    );

    setIsLoading(false);
    setHasLoaded(true);
    setSessions(loadedSessions);
  };

  const approve = useCallback(async (selectedAccounts) => {
    const proposalEvents = events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);
    try {
      const status = await onApprove(proposalEvents.meta, selectedAccounts, signClient);
      removeEvent(proposalEvents);
      setSessionProposal(null);
      setSessionRequest(null);
      await loadSessions();
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

  const reject = useCallback(async (event) => {
    const proposalEvents = event || events.find((e) => e.name === EVENTS.SESSION_PROPOSAL);

    try {
      await onReject(proposalEvents.meta, signClient);

      removeEvent(proposalEvents);
      setSessionProposal(null);
      setSessionRequest(null);
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

  const rejectRequest = useCallback(async () => {
    const requestEvent = events.find((e) => e.name === EVENTS.SESSION_REQUEST);

    const topic = requestEvent.meta.topic;
    const response = formatJsonRpcError(
      requestEvent.meta.id,
      getSdkError(ERROR_CASES.USER_REJECTED_METHODS).message
    );

    try {
      const data = await signClient.respond({
        topic,
        response,
      });

      removeEvent(requestEvent);
      setSessionRequest(null);

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

  /**
   * Disconnect a given pairing. Removes the pairing from context and the bridge.
   */
  const disconnect = useCallback(
    async (topic) => {
      setSessions((prevSessions) => prevSessions.filter((session) => session.topic !== topic));
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
    },
    [signClient]
  );

  useEffect(() => {
    if (signClient?.session && !hasLoaded) {
      loadSessions();
    }
  }, [signClient, sessions]);

  return {
    reject,
    approve,
    respond,
    rejectRequest,
    sessions,
    sessionRequest,
    setSessions,
    sessionProposal,
    disconnect,
    setSessionRequest,
    isLoading: isLoadingSignClient || isLoading,
    error: errorSignClient,
  };
};
