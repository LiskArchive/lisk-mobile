import { useEffect } from 'react';
import NotificationsService from '../NotificationsService';

export function useNotifications() {
  useEffect(() => {
    const notificationsService = new NotificationsService();

    const initNotifications = async () => {
      try {
        await notificationsService.cancelAllNotifications(); // Reset notifications on mount
        await notificationsService.scheduleWeeklyNotifications();
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
