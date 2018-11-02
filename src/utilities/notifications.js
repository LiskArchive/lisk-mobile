
import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS, Platform } from 'react-native';
import { fromRawLsk } from './conversions';
import { persistData } from './storage';

export const initPushNotifications = () => {
  PushNotification.configure({
    onNotification: (notification) => {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: true,
    requestPermissions: false,
  });
};

export const sendNotifications = (message) => {
  PushNotification.localNotificationSchedule({
    foreground: true,
    message,
    date: new Date(Date.now() + (2 * 1000)),
  });
};

export const createNotification = (changes, balance) => {
  persistData('balance', balance);
  let message;
  if ((changes * 1) > 0) {
    message = `you have received ${fromRawLsk(changes)} LSK. your new balance is ${fromRawLsk(balance)} LSk`;
  } else {
    message = `you have sent ${fromRawLsk(Math.abs(changes))} LSK. your new balance is ${fromRawLsk(balance)} LSk`;
  }
  sendNotifications(message);
};

export const requestNotificationPermissions = () => new Promise((resolve, reject) => {
  if (Platform.OS === 'ios') {
    PushNotification.checkPermissions(({ alert, badge, sound }) => {
      if (!alert || !badge || !sound) {
        PushNotification.requestPermissions()
          .then((target) => {
            if (target.alert || target.badge || target.sound) {
              resolve();
            } else {
              reject();
            }
          });
      } else {
        resolve();
      }
    });
  } else {
    resolve();
  }
});

