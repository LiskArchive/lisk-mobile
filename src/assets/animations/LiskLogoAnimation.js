import React from 'react';
import Lottie from 'lottie-react-native';

export default function LiskLogoAnimation({ variant = 'blue', style, ...props }) {
  let src;

  switch (variant) {
    case 'blue':
      src = require('assets/animations/lisk-logo-animation-blue.json');
      break;

    case 'white':
      src = require('assets/animations/lisk-logo-animation-white.json');
      break;

    default:
      break;
  }

  if (!src) {
    return null;
  }

  return <Lottie source={src} autoPlay loop style={style} {...props} />;
}
