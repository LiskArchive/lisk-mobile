import { useCallback, useEffect, useContext } from 'react';
import ConnectionContext from './connectionContext';
import { EVENTS } from '../constants/lifeCycle';
import { useSession } from '../hooks/useSession';
import { useEvents } from '../hooks/useEvents';

export const ConnectionEventsManagerWrapper = ({ children }) => {
  const { pushEvent } = useEvents();
  const { setSessionRequest, setSessions } = useSession();
  const { signClient } = useContext(ConnectionContext);

  const onSessionRequest = useCallback(
    async (event) => {
      const request = signClient.session.get(event.topic);
      setSessionRequest(request);
    },
    [signClient]
  );

  const onSessionDelete = useCallback(
    (event) => {
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.topic !== event.topic)
      );
    },
    [signClient]
  );

  const eventHandler = useCallback(
    async (name, meta) => {
      pushEvent({ name, meta });

      if (name === EVENTS.SESSION_DELETE) {
        onSessionDelete(meta);
      } else if (name === EVENTS.SESSION_REQUEST) {
        await onSessionRequest(meta);
      }
    },
    [signClient]
  );

  useEffect(() => {
    if (signClient?.on) {
      Object.keys(EVENTS).forEach((eventName) => {
        signClient.on(EVENTS[eventName], eventHandler.bind(null, EVENTS[eventName]));
      });
    }
  }, [onSessionRequest, onSessionDelete, eventHandler, signClient?.on]);

  return children;
};
