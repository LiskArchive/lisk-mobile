import io from 'socket.io-client';
import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';

let connection;

const closeConnection = () => {
  if (connection) {
    connection.close();
  }
};

const socketSetup = (store) => {
  connection = io.connect(store.getState().peers.activePeer.currentNode);
  connection.on('blocks/change', (block) => {
    store.dispatch(blockUpdated(block));
  });
  // To-Do enable this lines when offline mode is implemented
  // connection.on('disconnect', () => {
  //   if (!forcedClosing) {
  //     store.dispatch(activePeerUpdate({ online: false }));
  //   }
  // });
  // connection.on('reconnect', () => {
  //   store.dispatch(activePeerUpdate({ online: true }));
  // });
};

const socketMiddleware = store => (
  next => (action) => {
    switch (action.type) {
      case actionTypes.accountLoggedIn:
        socketSetup(store, action);
        break;
      case actionTypes.accountLoggedOut:
        closeConnection();
        break;
      default: break;
    }
    next(action);
  });

export default socketMiddleware;
