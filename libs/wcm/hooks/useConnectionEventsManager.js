import { useCallback, useEffect, useContext } from 'react';
import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { EVENTS } from '../constants/lifeCycle';

const useWalletConnectEventsManager = () => {
  const { pushEvent, disconnect, session, setSession } = useContext(ConnectionContext);

  const onSessionRequest = useCallback(async (event) => {
    const request = signClient.session.get(event.topic);

    setSession({ ...session, request });
  }, []);

  const onSessionDelete = useCallback((event) => {
    disconnect(event.topic);
  }, []);

  const eventHandler = useCallback((name, meta) => {
    pushEvent({ name, meta });

    if (name === EVENTS.SESSION_DELETE) {
      onSessionDelete(meta);
    } else if (name === EVENTS.SESSION_REQUEST) {
      onSessionRequest(meta);
    }
  }, []);

  useEffect(() => {
    if (signClient?.on) {
      Object.keys(EVENTS).forEach((eventName) => {
        signClient.on(EVENTS[eventName], eventHandler.bind(null, EVENTS[eventName]));
      });
    }
  }, [onSessionRequest, onSessionDelete, eventHandler, signClient?.on]);
};

export default useWalletConnectEventsManager;
