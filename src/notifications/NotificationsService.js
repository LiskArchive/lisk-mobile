/* eslint-disable max-statements */
import moment from 'moment';
import PushNotification, { Importance } from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class NotificationsService {
  constructor() {
    this.createChannels();
  }

  createChannels() {
    PushNotification.createChannel(
      {
        channelId: 'weekly-channel',
        channelName: 'Weekly Notifications',
        channelDescription: 'Channel for weekly reminders',
        importance: Importance.HIGH,
        vibrate: true,
        playSound: true,
        soundName: 'default',
      },
      (created) => console.log(`Channel created: ${created}`)
    );
  }

  async scheduleWeeklyNotifications() {
    try {
      const isScheduled = await AsyncStorage.getItem('notifications_scheduled');
      console.log('Notifications scheduled status:', isScheduled);

      if (isScheduled) {
        console.log('Notifications already scheduled');
        return;
      }

      const nextMinute = moment().add(1, 'minutes').startOf('minute').toDate();
      console.log('Scheduling notification for:', nextMinute);

      PushNotification.localNotificationSchedule({
        channelId: 'weekly-channel',
        title: 'Migrate to Lisk L2',
        message:
          "Lisk has transitioned to a Layer 2 network powered by Optimism's OP Stack in 2024. To continue using Lisk, migrate your accounts seamlessly on the Lisk Portal.",
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
