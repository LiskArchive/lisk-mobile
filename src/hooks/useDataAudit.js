import { useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';

const { AppOpsManagerModule } = NativeModules;

/**
 * Performs data auditing for monitoring user's private data access on the app.
 */
export function useDataAudit() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      AppOpsManagerModule.startWatching();
    }
  }, []);
}
