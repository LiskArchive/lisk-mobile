import React from 'react';
import Lottie from 'lottie-react-native';
import lottieSource from 'assets/animations/scanner.json';

export default function ScanDeviceAnimation({ style, ...props }) {
  return <Lottie source={lottieSource} autoPlay loop style={style} {...props} />;
}
