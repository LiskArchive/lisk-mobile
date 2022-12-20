import React, { useEffect } from 'react';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';

const SecureView = ({ children }) => {
  useEffect(() => {
    RNScreenshotPrevent.enabled(true);
    return () => RNScreenshotPrevent.enabled(false);
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SecureView;
