/* eslint-disable max-statements */
import moment from 'moment';
import PushNotification, { Importance } from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';

export default class NotificationsService {
  constructor() {
    this.createChannels();
  }

  async requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notifications Permission',
            message: 'Lisk Mobile needs notification permissions to send you updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Failed to request notification permission:', err);
        return false;
      }
    }
    return true;
  }

  createChannels() {
    PushNotification.createChannel(
      {
        channelId: 'lisk-mobile-notifications',
        channelName: 'Lisk Mobile Notifications',
        channelDescription: 'Channel for Lisk mobile notifications',
        importance: Importance.HIGH,
        vibrate: true,
        playSound: true,
        soundName: 'default',
      },
      (created) => {
        console.log(`Channel created: ${created}`);
        if (!created) {
          // Check if channel already exists
          PushNotification.channelExists('lisk-mobile-notifications', (exists) => {
            console.log('Channel exists:', exists);
            if (!exists) {
              console.error('Failed to create notification channel');
            }
          });
        }
      }
    );
  }

  async scheduleWeeklyNotifications() {
    try {
      const permissionGranted = await this.requestNotificationPermission();
      if (!permissionGranted) {
        console.log('Notification permission denied');
        return;
      }

      const isScheduled = await AsyncStorage.getItem('notifications_scheduled');
      console.log('Notifications scheduled status:', isScheduled);

      if (isScheduled) {
        console.log('Notifications already scheduled');
        return;
      }

      const nextMinute = moment().add(1, 'minutes').startOf('minute').toDate();
      console.log('Scheduling notification for:', nextMinute);

      PushNotification.localNotificationSchedule({
        channelId: 'lisk-mobile-notifications',
        title: 'Migrate to Lisk L2',
        message: 'Migrate your Lisk accounts to the new L2 network on Lisk Portal.',
        date: nextMinute,
        repeatType: 'minute',
        repeatTime: 1,
        allowWhileIdle: true,
        importance: 'high',
        priority: 'high',
        userInfo: {},
        playSound: true,
        soundName: 'default',
      });

      await AsyncStorage.setItem('notifications_scheduled', 'true');
      console.log('Notification scheduled successfully');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async cancelAllNotifications() {
    try {
      PushNotification.cancelAllLocalNotifications();
      await AsyncStorage.removeItem('notifications_scheduled');
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  }
}
