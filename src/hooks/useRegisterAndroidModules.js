import { useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';

const { AppOpsManagerModule, ProviderInstaller } = NativeModules;

/**
 * Registers native modules for android OS
 * Performs data auditing for monitoring user's private data access on the app.
 * Registers ProviderInstaller module which provides a secure library for network
 * connections that can be updated independently of the Android OS
 */
export function useRegisterAndroidModules() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      AppOpsManagerModule.startWatching();
      ProviderInstaller.installIfNeeded();
    }
  }, []);
}
