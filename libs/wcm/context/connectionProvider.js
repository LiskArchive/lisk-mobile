import React, { useState, useEffect, useCallback } from 'react';
import ConnectionContext from './connectionContext';
import { createSignClient } from '../utils/connectionCreator';

const ConnectionProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [errorOnInitialized, setErrorOnInitialized] = useState();

  const [session, setSession] = useState({
    request: false,
    data: false,
    loaded: false,
  });
  const [events, setEvents] = useState([]);
  const [pairings, setPairings] = useState([]);

  const pushEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleInitialize = useCallback(async () => {
    try {
      await createSignClient();

      setInitialized(true);
    } catch (error) {
      console.log({ errorOnHandleInitialized: error });

      setErrorOnInitialized(error);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      handleInitialize();
    }
  }, [initialized, handleInitialize]);

  const value = {
    events,
    pairings,
    session,
    setSession,
    pushEvent,
    setPairings,
    initialized,
    errorOnInitialized,
  };

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

export default ConnectionProvider;
