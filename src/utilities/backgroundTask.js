import queueFactory from 'react-native-queue';
import BackgroundTask from 'react-native-background-task'; // eslint-disable-line
import { createNotification } from './notifications';
import { fetchData } from './storage';

export const backgroundTaskInit = () => {
  BackgroundTask.define(async () => {
    // Init queue
    const queue = await queueFactory();
    let data;
    // Register job worker
    queue.addWorker('check-balance', (id, payload) => {
      data = payload;
      fetch(`${payload.serverUrl}/api/accounts?address=${payload.address}`)
        .then(res => res.json())
        .then(async (res) => {
          const { balance } = res.data[0];
          const oldBalance = await fetchData('balance') || payload.balance;
          const changes = balance - oldBalance.match(/\d+/g)[0];
          if (changes !== 0) {
            createNotification(changes, balance);
          }
        });
    });
    // Start the queue with a lifespan
    await queue.start(25000); // Run queue for at most 25 seconds.
    // finish() must be called before OS hits timeout.
    queue.createJob('check-balance', data, { attempts: 1, timeout: 15000 }, false);
    BackgroundTask.finish();
  });
};

export const initQueue = () => queueFactory();

// 7056261880661230236L
