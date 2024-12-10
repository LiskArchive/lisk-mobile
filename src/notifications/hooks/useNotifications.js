import { useEffect } from 'react';
import { Platform } from 'react-native';
import NotificationsService from '../NotificationsService';

export function useNotifications() {
  useEffect(() => {
    const notificationsService = new NotificationsService();

    const initNotifications = async () => {
      try {
        // Request permission before proceeding with notifications
        const permissionGranted = await notificationsService.requestNotificationPermission();
        if (!permissionGranted && Platform.OS === 'android' && Platform.Version >= 33) {
          console.log('Notification permission not granted');
          return;
        }

        await notificationsService.cancelAllNotifications(); // Reset notifications on mount
        await notificationsService.scheduleBiWeeklyNotifications();
      } catch (error) {
        console.error('Failed to schedule notifications:', error);
      }
    };

    initNotifications();

    return () => {
      // Cleanup function
      notificationsService.cancelAllNotifications();
    };
  }, []);
}
