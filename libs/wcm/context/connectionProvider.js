/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import ConnectionContext from './connectionContext';
import { createSignClient } from '../utils/connectionCreator';
import { useApplicationsMetaQuery } from '../../../src/modules/BlockchainApplication/api/useApplicationsMetaQuery';

const ConnectionProvider = ({ children }) => {
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

  const removeEvent = (event) => {
    const newEvents = events.filter((e) => e.name !== event.name);
    setEvents(newEvents);
  };

  const { data: liskApplication } = useApplicationsMetaQuery({
    config: { params: { chainName: 'Lisk' } },
  });

  const icon = liskApplication?.data[0]?.logo.svg;

  const value = {
    events,
    pairings,
    session,
    setSession,
    pushEvent,
    removeEvent,
    setPairings,
  };

  useEffect(() => {
    if (icon) {
      createSignClient(icon);
    }
  }, [icon]);

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

export default ConnectionProvider;
