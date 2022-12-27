import { useEffect } from 'react';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';

export default function useScreenshotPrevent() {
  useEffect(() => {
    RNScreenshotPrevent.enabled(true);
    return () => RNScreenshotPrevent.enabled(false);
  }, []);
}
