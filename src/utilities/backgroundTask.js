import queueFactory from 'react-native-queue';
import BackgroundTask from 'react-native-background-task'; // eslint-disable-line
import { sendNotifications } from './notifications';
import { fetchData } from './storage';

export const backgroundTaskInit = () => {
  BackgroundTask.define(async () => {
    // Init queue
    const queue = await queueFactory();
    // Register job worker
    queue.addWorker('check-balance', (id, payload) => {
      fetch(`${payload.serverUrl}/api/accounts?address=${payload.address}`)
        .then(res => res.json())
        .then(async (res) => {
          const { balance } = res.data[0];
          const oldBalance = await fetchData('balance') || payload.balance;
          if (balance !== oldBalance) {
            const changes = res.data[0].balance - oldBalance;
            sendNotifications(changes, res.data[0].balance);
          }
        });
    });
    // Start the queue with a lifespan
    await queue.start(25000); // Run queue for at most 25 seconds.
    // finish() must be called before OS hits timeout.
    BackgroundTask.finish();
  });
};

export const initQueue = () => queueFactory();

// 7056261880661230236L
