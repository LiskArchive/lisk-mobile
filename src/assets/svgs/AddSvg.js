import React from 'react';
import { Animated } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default ({ color, height = 16, width = 16 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <AnimatedPath
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.39997 2.19998C8.39997 1.86861 8.13134 1.59998 7.79997 1.59998C7.46859 1.59998 7.19997 1.8686 7.19997 2.19998V7.37581H2.19998C1.86861 7.37581 1.59998 7.64443 1.59998 7.97581C1.59998 8.30718 1.8686 8.57581 2.19998 8.57581H7.19997V13.8C7.19997 14.1313 7.46859 14.4 7.79997 14.4C8.13134 14.4 8.39997 14.1313 8.39997 13.8V8.57581H13.8C14.1313 8.57581 14.4 8.30718 14.4 7.97581C14.4 7.64443 14.1313 7.37581 13.8 7.37581H8.39997V2.19998Z"
      fill={color || '#4070F4'}
    />
  </Svg>
);
