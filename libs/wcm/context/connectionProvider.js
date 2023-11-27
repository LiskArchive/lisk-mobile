/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import ConnectionContext from './connectionContext';
import { createSignClient } from '../utils/connectionCreator';
import { ConnectionEventsManagerWrapper } from './ConnectionEventsManagerWrapper';

const ConnectionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [sessionProposal, setSessionProposal] = useState();
  const [sessionRequest, setSessionRequest] = useState();
  const [signClient, setSignClient] = useState();
  const [isLoadingSignClient, setIsLoadingSignClient] = useState(true);
  const [errorSignClient, setErrorSignClient] = useState();

  const value = {
    events,
    pairings,
    sessions,
    sessionProposal,
    sessionRequest,
    setSessions,
    setEvents,
    setPairings,
    setSessionProposal,
    setSessionRequest,
    signClient,
    isLoadingSignClient,
    errorSignClient,
  };

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const client = await createSignClient();

        setIsLoadingSignClient(false);

        setSignClient(client);
      } catch (error) {
        setIsLoadingSignClient(false);
        setErrorSignClient(error);
      }
    };

    if (!signClient) {
      initializeClient();
    }
  }, [signClient]);

  return (
    <ConnectionContext.Provider value={value}>
      <ConnectionEventsManagerWrapper>{children}</ConnectionEventsManagerWrapper>
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
