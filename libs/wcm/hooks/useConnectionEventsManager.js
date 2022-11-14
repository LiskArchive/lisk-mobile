import { useCallback, useEffect, useContext } from 'react';
import { signClient } from '../utils/connectionCreator';
import ConnectionContext from '../context/connectionContext';
import { EVENTS } from '../constants/lifeCycle';

const useWalletConnectEventsManager = () => {
  const { pushEvent, disconnect, session, setSession } = useContext(ConnectionContext);

  const onSessionRequest = useCallback(async (event) => {
    const request = signClient.session.get(event.topic);

    setSession({ ...session, request });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSessionDelete = useCallback((event) => {
    disconnect(event.topic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventHandler = useCallback((name, meta) => {
    pushEvent({ name, meta });

    if (name === EVENTS.SESSION_DELETE) {
      onSessionDelete(meta);
    } else if (name === EVENTS.SESSION_REQUEST) {
      onSessionRequest(meta);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (signClient?.on) {
      Object.keys(EVENTS).forEach((eventName) => {
        signClient.on(EVENTS[eventName], eventHandler.bind(null, EVENTS[eventName]));
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('There was an error initializing the client');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSessionRequest, onSessionDelete, eventHandler, signClient?.on]);
};

export default useWalletConnectEventsManager;
