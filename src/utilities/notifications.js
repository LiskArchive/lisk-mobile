
import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

export const initPushNotifications = () => {
  PushNotification.configure({
    onNotification: (notification) => {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: true,
  });
};

export const sendNotifications = (message) => {
  PushNotification.localNotificationSchedule({
    foreground: true,
    message,
    date: new Date(Date.now() + (2 * 1000)),
  });
};
