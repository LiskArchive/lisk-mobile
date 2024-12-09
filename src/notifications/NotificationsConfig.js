import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: function (token) {
    console.log('Registered for push notifications:', token);
  },

  onNotification: function (notification) {
    // Required on iOS only
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default PushNotification;
