// import io from 'socket.io-client';
import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';
import { getAccount } from '../../utilities/api/account';

/* To-Do We have to disable socket connection because of lisk core problem. we will enable
socket connection when lisk core fix the issue */
// let connection;
let interval;

const closeConnection = () => {
  clearInterval(interval);
  // To-Do th
  // if (connection) {
  //   connection.close();
  // }
};

const socketSetup = (store) => {
  const { activePeer } = store.getState().peers;
  interval = setInterval(() => {
    const { address, balance } = store.getState().accounts.active;
    getAccount(activePeer, address).then((res) => {
      if (res.balance !== balance) {
        store.dispatch(blockUpdated());
      }
    });
  }, 60000);
  // connection = io.connect(store.getState().peers.activePeer.currentNode, {
  //   transports: ['websocket'],
  // });
  // connection.on('blocks/change', (block) => {
  //   store.dispatch(blockUpdated(block));
  // });
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
    next(action);
    switch (action.type) {
      case actionTypes.accountLoggedIn:
        socketSetup(store, action);
        break;
      case actionTypes.accountLoggedOut:
        closeConnection();
        break;
      default: break;
    }
  });

export default socketMiddleware;
